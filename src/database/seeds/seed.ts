import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Campus } from '../../modules/user/entities/campus.entity';
import { Role } from '../../modules/user/entities/role.entity';
import { User } from '../../modules/user/entities/user.entity';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'secret',
  database: 'greenwich_ap',
  entities: [Campus, Role, User],
  synchronize: false,
});

async function seed() {
  await AppDataSource.initialize();

  // --- Seed Campuses ---
  const campusData = [
    { code: 'HCM', name: 'Ho Chi Minh' },
    { code: 'HN', name: 'Ha Noi' },
    { code: 'DN', name: 'Da Nang' },
    { code: 'CT', name: 'Can Tho' },
  ];

  for (const campus of campusData) {
    const exists = await AppDataSource.getRepository(Campus).findOne({
      where: { code: campus.code },
    });
    if (!exists) {
      await AppDataSource.getRepository(Campus).save(campus);
    }
  }

  // --- Seed Roles ---
  const roleData = [
    { name: 'Admin' },
    { name: 'Student' },
    { name: 'Staff' },
    { name: 'Guardian' },
  ];

  for (const role of roleData) {
    const exists = await AppDataSource.getRepository(Role).findOne({
      where: { name: role.name },
    });
    if (!exists) {
      await AppDataSource.getRepository(Role).save(role);
    }
  }

  // --- Seed Admin User ---
  const adminEmail = 'admin@greenwich.edu';
  const adminPassword = 'secret';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const adminRole = await AppDataSource.getRepository(Role).findOne({
    where: { name: 'Admin' },
  });
  const hcmCampus = await AppDataSource.getRepository(Campus).findOne({
    where: { code: 'HCM' },
  });

  if (!adminRole || !hcmCampus) {
    throw new Error(
      'Admin role or Ho Chi Minh campus not found. Ensure seeding of roles and campuses completed successfully.',
    );
  }

  const existingAdmin = await AppDataSource.getRepository(User).findOne({
    where: { email: adminEmail },
  });
  if (!existingAdmin) {
    await AppDataSource.getRepository(User).save({
      email: adminEmail,
      password: hashedPassword,
      roleId: adminRole.id,
      campusId: hcmCampus.id,
    });
  }

  await AppDataSource.destroy();
}

seed().catch(async () => {
  await AppDataSource.destroy();
  process.exit(1);
});

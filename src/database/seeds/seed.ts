import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Campus } from '../../modules/user/entities/campus.entity';
import { Role } from '../../modules/user/entities/role.entity';
import { User } from '../../modules/user/entities/user.entity';
import path from 'path';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'secret',
  database: 'greenwich_ap',
  entities: [path.join(__dirname, '../../modules/**/*.entity.{ts,js}')],
  synchronize: false,
  logging: true,
});

export const seed = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('✅ Database connection established.');

    // --- Seed Campuses ---
    const campusRepo = AppDataSource.getRepository(Campus);
    const campusData = [
      { code: 'HCM', name: 'Ho Chi Minh' },
      { code: 'HN', name: 'Ha Noi' },
      { code: 'DN', name: 'Da Nang' },
      { code: 'CT', name: 'Can Tho' },
    ];

    for (const campus of campusData) {
      const exists = await campusRepo.findOne({ where: { code: campus.code } });
      if (!exists) {
        await campusRepo.save(campus);
        console.log(`🌱 Added campus: ${campus.name}`);
      }
    }

    // --- Seed Roles ---
    const roleRepo = AppDataSource.getRepository(Role);
    const roleData = [
      { name: 'Admin' },
      { name: 'Student' },
      { name: 'Staff' },
      { name: 'Guardian' },
    ];

    for (const role of roleData) {
      const exists = await roleRepo.findOne({ where: { name: role.name } });
      if (!exists) {
        await roleRepo.save(role);
        console.log(`🌱 Added role: ${role.name}`);
      }
    }

    // --- Seed Admin User ---
    const userRepo = AppDataSource.getRepository(User);
    const adminEmail = 'admin@greenwich.edu';
    const adminPassword = 'secret';
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const adminRole = await roleRepo.findOne({ where: { name: 'Admin' } });
    const hcmCampus = await campusRepo.findOne({ where: { code: 'HCM' } });

    if (!adminRole || !hcmCampus) {
      throw new Error(
        'Admin role or Ho Chi Minh campus not found. Please ensure previous seeding completed successfully.',
      );
    }

    const existingAdmin = await userRepo.findOne({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      await userRepo.save({
        email: adminEmail,
        password: hashedPassword,
        roleId: adminRole.id,
        campusId: hcmCampus.id,
      });
      console.log(`🌱 Admin user created: ${adminEmail}`);
    } else {
      console.log(`ℹ️ Admin user already exists: ${adminEmail}`);
    }

    console.log('✅ Seeding complete!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      console.log('🧹 Database connection closed.');
    }
  }
};

// Run seed when executed directly
void seed();

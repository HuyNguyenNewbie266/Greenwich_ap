import { DataSource, DataSourceOptions } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import path from 'path';
import { Campus } from '../../modules/user/entities/campus.entity';
import { Role } from '../../modules/user/entities/role.entity';
import { User } from '../../modules/user/entities/user.entity';
import { Admin } from '../../modules/admin/entities/admin.entity';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

let config: DataSourceOptions;

if (isProduction) {
  config = {
    type: 'postgres',
    url: process.env.DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },
    entities: [path.join(__dirname, '../../modules/**/*.entity.js')],
    synchronize: false,
    logging: false, // Changed to false for a truly silent script
  };
} else {
  config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [path.join(__dirname, '../../modules/**/*.entity.{ts,js}')],
    synchronize: false,
    logging: false, // Changed to false for a truly silent script
  };
}

const AppDataSource = new DataSource(config);

export const seed = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();

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
      }
    }

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
      }
    }

    const userRepo = AppDataSource.getRepository(User);
    const adminRepo = AppDataSource.getRepository(Admin);
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
      const adminUser = await userRepo.save({
        email: adminEmail,
        roleId: adminRole.id,
        campusId: hcmCampus.id,
      });

      // Create admin record with password
      await adminRepo.save({
        userId: adminUser.id,
        password: hashedPassword,
      });
    }
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
};

void seed();

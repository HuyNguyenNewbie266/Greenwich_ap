import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import appConfig from '../config/app.config';
import databaseConfig from '../config/database.config';
import jwtConfig from '../config/jwt.config';
import { Programme } from '../modules/programme/entities/programme.entity';
import { Term } from '../modules/term/entities/term.entity';
import { User } from '../modules/user/entities/user.entity';
import { hash } from '../modules/user/utils/hash';

ConfigModule.forRoot({
  isGlobal: true,
  load: [appConfig, databaseConfig, jwtConfig],
});

async function seed() {
  const dataSource = new DataSource({
    ...(databaseConfig() as Record<string, unknown>),
    entities: [Programme, Term, User],
  });
  await dataSource.initialize();

  const userRepo = dataSource.getRepository(User);
  const programmeRepo = dataSource.getRepository(Programme);
  const termRepo = dataSource.getRepository(Term);

  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? 'admin@greenwich.edu';
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe123!';

  const existing = await userRepo.findOne({ where: { email: adminEmail } });
  if (!existing) {
    const user = userRepo.create({
      email: adminEmail,
      passwordHash: await hash(adminPassword),
      displayName: 'System Admin',
    });
    await userRepo.save(user);
  }

  if ((await programmeRepo.count()) === 0) {
    const programme = programmeRepo.create({ code: 'SE', name: 'Software Engineering' });
    await programmeRepo.save(programme);

    const terms = termRepo.create([
      { programmeId: programme.id, code: 'Y1T1', name: 'Year 1 Term 1', order: 1 },
      { programmeId: programme.id, code: 'Y1T2', name: 'Year 1 Term 2', order: 2 },
    ]);
    await termRepo.save(terms);
  }

  await dataSource.destroy();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});

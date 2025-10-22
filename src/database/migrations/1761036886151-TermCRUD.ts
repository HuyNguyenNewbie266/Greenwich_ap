import { MigrationInterface, QueryRunner } from 'typeorm';

export class TermCRUD1761036886151 implements MigrationInterface {
  name = 'TermCRUD1761036886151';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "term" DROP CONSTRAINT "UQ_c753d64484e3ef4818002327877"`,
    );
    await queryRunner.query(
      `ALTER TABLE "term" ADD CONSTRAINT "UQ_term_programme_code" UNIQUE ("programme_id", "code")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "term" DROP CONSTRAINT "UQ_term_programme_code"`,
    );
    await queryRunner.query(
      `ALTER TABLE "term" ADD CONSTRAINT "UQ_c753d64484e3ef4818002327877" UNIQUE ("programme_id", "code")`,
    );
  }
}

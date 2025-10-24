import { MigrationInterface, QueryRunner } from 'typeorm';

export class TempAuthCodeTable1761317263117 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "temp_auth_codes" (
        "code" character varying NOT NULL,
        "email" character varying NOT NULL,
        "expiresAt" TIMESTAMP NOT NULL,
        CONSTRAINT "PK_temp_auth_codes" PRIMARY KEY ("code")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "temp_auth_codes"`);
  }
}

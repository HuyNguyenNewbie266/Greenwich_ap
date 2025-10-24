import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTempAuthCodesTable1761308872581
  implements MigrationInterface
{
  name = 'CreateTempAuthCodesTable1761308872581';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temp_auth_codes" ("code" character varying NOT NULL, "email" character varying NOT NULL, "expiresAt" TIMESTAMP NOT NULL, CONSTRAINT "PK_d4db0ead421b4ea65d16b6af9f4" PRIMARY KEY ("code"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_account" ADD "password" character varying(255)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_account" DROP COLUMN "password"`,
    );
    await queryRunner.query(`DROP TABLE "temp_auth_codes"`);
  }
}

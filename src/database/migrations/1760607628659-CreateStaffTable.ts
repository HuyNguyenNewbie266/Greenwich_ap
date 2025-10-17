import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStaffTable1760607628659 implements MigrationInterface {
  name = 'CreateStaffTable1760607628659';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."staff_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'SABBATICAL', 'LEFT', 'OTHER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "staff" ("id" BIGSERIAL NOT NULL, "user_id" bigint NOT NULL, "staff_code" character varying(30) NOT NULL, "hire_date" date, "end_date" date, "status" "public"."staff_status_enum" NOT NULL DEFAULT 'ACTIVE', "notes" character varying(30), CONSTRAINT "UQ_4506225c77d4810fe9ff9dd20d4" UNIQUE ("staff_code"), CONSTRAINT "PK_e4ee98bb552756c180aec1e854a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "FK_cec9365d9fc3a3409158b645f2e" FOREIGN KEY ("user_id") REFERENCES "user_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "FK_cec9365d9fc3a3409158b645f2e"`,
    );
    await queryRunner.query(`DROP TABLE "staff"`);
    await queryRunner.query(`DROP TYPE "public"."staff_status_enum"`);
  }
}

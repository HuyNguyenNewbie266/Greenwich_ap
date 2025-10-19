import { MigrationInterface, QueryRunner } from 'typeorm';

export class TermTables1760888265585 implements MigrationInterface {
  name = 'TermTables1760888265585';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "term" DROP CONSTRAINT "UQ_c753d64484e3ef4818002327877"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."staff_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'SABBATICAL', 'LEFT')`,
    );
    await queryRunner.query(
      `CREATE TABLE "staff" ("id" BIGSERIAL NOT NULL, "user_id" bigint NOT NULL, "staff_code" character varying(30) NOT NULL, "hire_date" date, "end_date" date, "status" "public"."staff_status_enum" NOT NULL DEFAULT 'ACTIVE', "notes" character varying(500), CONSTRAINT "UQ_4506225c77d4810fe9ff9dd20d4" UNIQUE ("staff_code"), CONSTRAINT "PK_e4ee98bb552756c180aec1e854a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."staff_role_role_enum" AS ENUM('TEACHER', 'ACADEMIC_STAFF', 'DEPT_HEAD', 'ADMIN', 'MENTOR')`,
    );
    await queryRunner.query(
      `CREATE TABLE "staff_role" ("id" BIGSERIAL NOT NULL, "staff_id" bigint NOT NULL, "role" "public"."staff_role_role_enum" NOT NULL, CONSTRAINT "UQ_cb4a998f47eb5230ac49646cafd" UNIQUE ("staff_id"), CONSTRAINT "REL_cb4a998f47eb5230ac49646caf" UNIQUE ("staff_id"), CONSTRAINT "PK_c3fe01125c99573751fe5e55666" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "term" ADD CONSTRAINT "UQ_term_programme_code" UNIQUE ("programme_id", "code")`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "FK_cec9365d9fc3a3409158b645f2e" FOREIGN KEY ("user_id") REFERENCES "user_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff_role" ADD CONSTRAINT "FK_cb4a998f47eb5230ac49646cafd" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff_role" DROP CONSTRAINT "FK_cb4a998f47eb5230ac49646cafd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "FK_cec9365d9fc3a3409158b645f2e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "term" DROP CONSTRAINT "UQ_term_programme_code"`,
    );
    await queryRunner.query(`DROP TABLE "staff_role"`);
    await queryRunner.query(`DROP TYPE "public"."staff_role_role_enum"`);
    await queryRunner.query(`DROP TABLE "staff"`);
    await queryRunner.query(`DROP TYPE "public"."staff_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "term" ADD CONSTRAINT "UQ_c753d64484e3ef4818002327877" UNIQUE ("programme_id", "code")`,
    );
  }
}

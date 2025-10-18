import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStaffRoleTable1760658039736 implements MigrationInterface {
  name = 'CreateStaffRoleTable1760658039736';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."staff_role_role_enum" AS ENUM('TEACHER', 'ACADEMIC_STAFF', 'DEPT_HEAD', 'ADMIN', 'MENTOR')`,
    );
    await queryRunner.query(
      `CREATE TABLE "staff_role" ("id" BIGSERIAL NOT NULL, "staff_id" bigint NOT NULL, "role" "public"."staff_role_role_enum" NOT NULL, CONSTRAINT "UQ_cb4a998f47eb5230ac49646cafd" UNIQUE ("staff_id"), CONSTRAINT "REL_cb4a998f47eb5230ac49646caf" UNIQUE ("staff_id"), CONSTRAINT "PK_c3fe01125c99573751fe5e55666" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff_role" ADD CONSTRAINT "FK_cb4a998f47eb5230ac49646cafd" FOREIGN KEY ("staff_id") REFERENCES "staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff_role" DROP CONSTRAINT "FK_cb4a998f47eb5230ac49646cafd"`,
    );
    await queryRunner.query(`DROP TABLE "staff_role"`);
    await queryRunner.query(`DROP TYPE "public"."staff_role_role_enum"`);
  }
}

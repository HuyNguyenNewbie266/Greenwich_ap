import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCourseTable1758272559827 implements MigrationInterface {
  name = 'CreateCourseTable1758272559827';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."course_status_enum" AS ENUM('ACTIVE', 'INACTIVE')`,
    );
    await queryRunner.query(
      `CREATE TABLE "course" ("id" BIGSERIAL NOT NULL, "department_id" bigint NOT NULL, "code" character varying(20) NOT NULL, "title" character varying(255) NOT NULL, "credits" integer, "level" character varying(20) NOT NULL, "teacher_id" bigint, "slot" integer, "status" "public"."course_status_enum" NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_5cf4963ae12285cda6432d5a3a4" UNIQUE ("code"), CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "course"`);
    await queryRunner.query(`DROP TYPE "public"."course_status_enum"`);
  }
}

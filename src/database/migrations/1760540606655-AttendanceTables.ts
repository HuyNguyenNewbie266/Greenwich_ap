import { MigrationInterface, QueryRunner } from 'typeorm';

export class AttendanceTables1760540606655 implements MigrationInterface {
  name = 'AttendanceTables1760540606655';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."attendance_status_enum" AS ENUM('PRESENT', 'ABSENT', 'LATE', 'EXCUSED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "attendance" ("id" BIGSERIAL NOT NULL, "student_id" bigint NOT NULL, "session_id" bigint NOT NULL, "status" "public"."attendance_status_enum" NOT NULL DEFAULT 'PRESENT', "note" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ee0ffe42c1f1a01e72b725c0cb2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD CONSTRAINT "FK_6200532f3ef99f639a27bdcae7f" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" ADD CONSTRAINT "FK_5940f7beb6d791a618dbf88361e" FOREIGN KEY ("session_id") REFERENCES "class_session"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP CONSTRAINT "FK_5940f7beb6d791a618dbf88361e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "attendance" DROP CONSTRAINT "FK_6200532f3ef99f639a27bdcae7f"`,
    );
    await queryRunner.query(`DROP TABLE "attendance"`);
    await queryRunner.query(`DROP TYPE "public"."attendance_status_enum"`);
  }
}

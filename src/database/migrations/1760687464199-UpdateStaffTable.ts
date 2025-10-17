import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateStaffTable1760687464199 implements MigrationInterface {
  name = 'UpdateStaffTable1760687464199';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."staff_status_enum" RENAME TO "staff_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."staff_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'SABBATICAL', 'LEFT')`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ALTER COLUMN "status" TYPE "public"."staff_status_enum" USING "status"::"text"::"public"."staff_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`,
    );
    await queryRunner.query(`DROP TYPE "public"."staff_status_enum_old"`);
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "notes"`);
    await queryRunner.query(
      `ALTER TABLE "staff" ADD "notes" character varying(500)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "notes"`);
    await queryRunner.query(
      `ALTER TABLE "staff" ADD "notes" character varying(30)`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."staff_status_enum_old" AS ENUM('ACTIVE', 'INACTIVE', 'SABBATICAL', 'LEFT', 'OTHER')`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ALTER COLUMN "status" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ALTER COLUMN "status" TYPE "public"."staff_status_enum_old" USING "status"::"text"::"public"."staff_status_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ALTER COLUMN "status" SET DEFAULT 'ACTIVE'`,
    );
    await queryRunner.query(`DROP TYPE "public"."staff_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."staff_status_enum_old" RENAME TO "staff_status_enum"`,
    );
  }
}

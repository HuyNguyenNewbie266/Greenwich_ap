import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateStudent1760602805518 implements MigrationInterface {
  name = 'UpdateStudent1760602805518';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "guardian" ("id" BIGSERIAL NOT NULL, "user_id" bigint NOT NULL, "occupation" character varying(150), "notes" text, CONSTRAINT "PK_5eb51ec9378bc6b07702717160e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."student_guardian_relationship_enum" AS ENUM('FATHER', 'MOTHER', 'GUARDIAN', 'RELATIVE', 'OTHER')`,
    );
    await queryRunner.query(
      `CREATE TABLE "student_guardian" ("id" BIGSERIAL NOT NULL, "student_id" bigint NOT NULL, "guardian_id" bigint NOT NULL, "relationship" "public"."student_guardian_relationship_enum" NOT NULL DEFAULT 'GUARDIAN', "is_primary" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_9022016ef2693e1d0c92cf7a297" UNIQUE ("student_id", "guardian_id"), CONSTRAINT "PK_9835070fcc474de5e2e25fe8060" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "gender"`);
    await queryRunner.query(`DROP TYPE "public"."student_gender_enum"`);
    await queryRunner.query(
      `ALTER TABLE "guardian" ADD CONSTRAINT "FK_2a8a3239a2868ec2fd2c34e0fb2" FOREIGN KEY ("user_id") REFERENCES "user_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_guardian" ADD CONSTRAINT "FK_6cc634e8176332de785dc61dac1" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_guardian" ADD CONSTRAINT "FK_986f782417afbca26a068d59339" FOREIGN KEY ("guardian_id") REFERENCES "guardian"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "student_guardian" DROP CONSTRAINT "FK_986f782417afbca26a068d59339"`,
    );
    await queryRunner.query(
      `ALTER TABLE "student_guardian" DROP CONSTRAINT "FK_6cc634e8176332de785dc61dac1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "guardian" DROP CONSTRAINT "FK_2a8a3239a2868ec2fd2c34e0fb2"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."student_gender_enum" AS ENUM('MALE', 'FEMALE', 'OTHER', 'UNSPECIFIED')`,
    );
    await queryRunner.query(
      `ALTER TABLE "student" ADD "gender" "public"."student_gender_enum" NOT NULL DEFAULT 'UNSPECIFIED'`,
    );
    await queryRunner.query(`DROP TABLE "student_guardian"`);
    await queryRunner.query(
      `DROP TYPE "public"."student_guardian_relationship_enum"`,
    );
    await queryRunner.query(`DROP TABLE "guardian"`);
  }
}

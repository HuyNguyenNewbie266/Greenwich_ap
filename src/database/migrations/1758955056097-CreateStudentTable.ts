import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStudentTable1758955056097 implements MigrationInterface {
    name = 'CreateStudentTable1758955056097'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "student" ("id" BIGSERIAL NOT NULL, "user_id" bigint NOT NULL, "student_code" character varying(30) NOT NULL, "enrolment_day" date, "mentor_id" bigint, "faculty" character varying(150), "status" "public"."student_status_enum" NOT NULL DEFAULT 'ENROLLED', "gender" "public"."student_gender_enum" NOT NULL DEFAULT 'UNSPECIFIED', "academic_year" character varying(20), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6b904603cbf51e5aeeac832f0cc" UNIQUE ("student_code"), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_account" ADD "dateOfBirth" date`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_0cc43638ebcf41dfab27e62dc09" FOREIGN KEY ("user_id") REFERENCES "user_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_dca07fba91b82def10e2c752faf" FOREIGN KEY ("mentor_id") REFERENCES "user_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_dca07fba91b82def10e2c752faf"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_0cc43638ebcf41dfab27e62dc09"`);
        await queryRunner.query(`ALTER TABLE "user_account" DROP COLUMN "dateOfBirth"`);
        await queryRunner.query(`DROP TABLE "student"`);
    }

}

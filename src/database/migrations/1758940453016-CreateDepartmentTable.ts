import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDepartmentTable1758940453016 implements MigrationInterface {
    name = 'CreateDepartmentTable1758940453016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "department" ("id" BIGSERIAL NOT NULL, "code" character varying(20) NOT NULL, "name" character varying(150) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_62690f4fe31da9eb824d909285f" UNIQUE ("code"), CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" BIGSERIAL NOT NULL, "code" character varying(20) NOT NULL, "title" character varying(255) NOT NULL, "credits" integer, "level" character varying(20) NOT NULL, "teacher_id" bigint, "slot" integer, "status" "public"."course_status_enum" NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "department_id" bigint NOT NULL, CONSTRAINT "UQ_5cf4963ae12285cda6432d5a3a4" UNIQUE ("code"), CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_4e824d130a4d1465c0df7dd277d" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_4e824d130a4d1465c0df7dd277d"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "department"`);
    }

}

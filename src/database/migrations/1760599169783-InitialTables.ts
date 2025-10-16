import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialTables1760599169783 implements MigrationInterface {
    name = 'InitialTables1760599169783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" BIGSERIAL NOT NULL, "name" character varying(150) NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student" ("id" BIGSERIAL NOT NULL, "user_id" bigint NOT NULL, "class_id" bigint, "student_code" character varying(30) NOT NULL, "enrolment_day" date, "mentor_id" bigint, "faculty" character varying(150), "status" "public"."student_status_enum" NOT NULL DEFAULT 'ENROLLED', "academic_year" character varying(20), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_6b904603cbf51e5aeeac832f0cc" UNIQUE ("student_code"), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "department" ("id" BIGSERIAL NOT NULL, "code" character varying(20) NOT NULL, "name" character varying(150) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_62690f4fe31da9eb824d909285f" UNIQUE ("code"), CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "course" ("id" BIGSERIAL NOT NULL, "code" character varying(20) NOT NULL, "title" character varying(255) NOT NULL, "credits" integer, "level" character varying(20) NOT NULL, "teacher_id" bigint, "slot" integer, "status" "public"."course_status_enum" NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "department_id" bigint NOT NULL, CONSTRAINT "UQ_5cf4963ae12285cda6432d5a3a4" UNIQUE ("code"), CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "class_course" ("id" BIGSERIAL NOT NULL, "note" character varying(255), "class_id" bigint, "course_id" bigint, CONSTRAINT "PK_57476b73061271c061ae6dd16ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "class" ("id" BIGSERIAL NOT NULL, "name" character varying(50) NOT NULL, "capacity" integer, "status" "public"."class_status_enum" NOT NULL DEFAULT 'PLANNING', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0b9024d21bdfba8b1bd1c300eae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "time_slot" ("id" SERIAL NOT NULL, "name" character varying(30) NOT NULL, "start_time" TIME NOT NULL, "end_time" TIME NOT NULL, CONSTRAINT "PK_03f782f8c4af029253f6ad5bacf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."class_session_status_enum" AS ENUM('SCHEDULED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED')`);
        await queryRunner.query(`CREATE TABLE "class_session" ("id" BIGSERIAL NOT NULL, "date_on" date NOT NULL, "room_id" bigint NOT NULL, "teacher_id" bigint NOT NULL, "status" "public"."class_session_status_enum" NOT NULL DEFAULT 'SCHEDULED', "class_id" bigint, "course_id" bigint, CONSTRAINT "PK_a3d6e3f59db21b19a3b6eb908d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "room" ("id" BIGSERIAL NOT NULL, "campus_id" bigint NOT NULL, "code" character varying(40) NOT NULL, "name" character varying(100) NOT NULL, "capacity" integer NOT NULL, "note" character varying(255), CONSTRAINT "UQ_0ab3536ee398cffd79acd2803cb" UNIQUE ("code"), CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "campus" ("id" BIGSERIAL NOT NULL, "code" character varying(100) NOT NULL, "name" character varying(150) NOT NULL, CONSTRAINT "UQ_5730c1de08758fab2ba865e8882" UNIQUE ("code"), CONSTRAINT "PK_150aa1747b3517c47f9bd98ea6d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdById" bigint NOT NULL, "threadId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "threads" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdById" bigint NOT NULL, CONSTRAINT "PK_d8a74804c34fc3900502cd27275" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_account" ("id" BIGSERIAL NOT NULL, "role_id" bigint NOT NULL, "campus_id" bigint, "email" character varying(190) NOT NULL, "password" character varying(255), "phone" character varying(30), "phone_alt" character varying(30), "address" character varying(255), "surname" character varying(80), "middle_name" character varying(80), "given_name" character varying(80), "gender" "public"."user_account_gender_enum" NOT NULL DEFAULT 'UNSPECIFIED', "dateOfBirth" date, "avatar" character varying(300), "note" text, "status" "public"."user_account_status_enum" NOT NULL DEFAULT 'ACTIVE', "refresh_token" character varying(128), "refresh_token_expires_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_56a0e4bcec2b5411beafa47ffa5" UNIQUE ("email"), CONSTRAINT "PK_6acfec7285fdf9f463462de3e9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "guardian" ("id" BIGSERIAL NOT NULL, "user_id" bigint NOT NULL, "occupation" character varying(150), "notes" text, CONSTRAINT "PK_5eb51ec9378bc6b07702717160e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student_guardian" ("id" BIGSERIAL NOT NULL, "student_id" bigint NOT NULL, "guardian_id" bigint NOT NULL, "relationship" "public"."student_guardian_relationship_enum" NOT NULL DEFAULT 'GUARDIAN', "is_primary" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_9022016ef2693e1d0c92cf7a297" UNIQUE ("student_id", "guardian_id"), CONSTRAINT "PK_9835070fcc474de5e2e25fe8060" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."attendance_status_enum" AS ENUM('PRESENT', 'ABSENT', 'LATE', 'EXCUSED')`);
        await queryRunner.query(`CREATE TABLE "attendance" ("id" BIGSERIAL NOT NULL, "student_id" bigint NOT NULL, "session_id" bigint NOT NULL, "status" "public"."attendance_status_enum" NOT NULL DEFAULT 'PRESENT', "note" character varying(255), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ee0ffe42c1f1a01e72b725c0cb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "class_session_slot" ("session_id" bigint NOT NULL, "slot_id" integer NOT NULL, CONSTRAINT "PK_70c2a1933142f617d1c2fac7d15" PRIMARY KEY ("session_id", "slot_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0b7d4c38be6a99a601ce7f764c" ON "class_session_slot" ("session_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_d5734f74f5c2236f6eedf49551" ON "class_session_slot" ("slot_id") `);
        await queryRunner.query(`CREATE TABLE "comment_tagged_users" ("commentsId" integer NOT NULL, "userAccountId" bigint NOT NULL, CONSTRAINT "PK_dd99e363798da18c95d82f5f118" PRIMARY KEY ("commentsId", "userAccountId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2c92951744df55efa63e3afec9" ON "comment_tagged_users" ("commentsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e8c2296fe827ce1ccfb4b0243b" ON "comment_tagged_users" ("userAccountId") `);
        await queryRunner.query(`CREATE TABLE "thread_tagged_users" ("threadsId" integer NOT NULL, "userAccountId" bigint NOT NULL, CONSTRAINT "PK_4a2176937f9c9d78b8975035250" PRIMARY KEY ("threadsId", "userAccountId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_119729d11176bfb9ff5d6a6800" ON "thread_tagged_users" ("threadsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_817406c77a219a1d33056af013" ON "thread_tagged_users" ("userAccountId") `);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_0cc43638ebcf41dfab27e62dc09" FOREIGN KEY ("user_id") REFERENCES "user_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_85874ee23f2927b59ff5f769f3c" FOREIGN KEY ("class_id") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_dca07fba91b82def10e2c752faf" FOREIGN KEY ("mentor_id") REFERENCES "user_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_4e824d130a4d1465c0df7dd277d" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "class_course" ADD CONSTRAINT "FK_1a4d91b2f0f213b607b6ebfc629" FOREIGN KEY ("class_id") REFERENCES "class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "class_course" ADD CONSTRAINT "FK_78dab6a9101c123309b2eb3e531" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "class_session" ADD CONSTRAINT "FK_d311babdafa3f4831b808e3643b" FOREIGN KEY ("class_id") REFERENCES "class"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "class_session" ADD CONSTRAINT "FK_60d19acfb6d4ffcd3987c1bfd34" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "class_session" ADD CONSTRAINT "FK_f0f0028eb303dc16b91d0ee35ca" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_fa95bab7713e75cfd59cef55c59" FOREIGN KEY ("campus_id") REFERENCES "campus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_cd31cf1f563a06aeeaab821bd1c" FOREIGN KEY ("createdById") REFERENCES "user_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_f682eb665c360168731f596b0e3" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "threads" ADD CONSTRAINT "FK_7f6695f253ce017caee293da4f0" FOREIGN KEY ("createdById") REFERENCES "user_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_account" ADD CONSTRAINT "FK_c57754862d92d288007ce87b4af" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_account" ADD CONSTRAINT "FK_d8caf78eed2d2792f98c3e3c879" FOREIGN KEY ("campus_id") REFERENCES "campus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "guardian" ADD CONSTRAINT "FK_2a8a3239a2868ec2fd2c34e0fb2" FOREIGN KEY ("user_id") REFERENCES "user_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_guardian" ADD CONSTRAINT "FK_6cc634e8176332de785dc61dac1" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_guardian" ADD CONSTRAINT "FK_986f782417afbca26a068d59339" FOREIGN KEY ("guardian_id") REFERENCES "guardian"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_6200532f3ef99f639a27bdcae7f" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_5940f7beb6d791a618dbf88361e" FOREIGN KEY ("session_id") REFERENCES "class_session"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "class_session_slot" ADD CONSTRAINT "FK_0b7d4c38be6a99a601ce7f764c1" FOREIGN KEY ("session_id") REFERENCES "class_session"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "class_session_slot" ADD CONSTRAINT "FK_d5734f74f5c2236f6eedf495511" FOREIGN KEY ("slot_id") REFERENCES "time_slot"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "comment_tagged_users" ADD CONSTRAINT "FK_2c92951744df55efa63e3afec9f" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "comment_tagged_users" ADD CONSTRAINT "FK_e8c2296fe827ce1ccfb4b0243b0" FOREIGN KEY ("userAccountId") REFERENCES "user_account"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "thread_tagged_users" ADD CONSTRAINT "FK_119729d11176bfb9ff5d6a6800e" FOREIGN KEY ("threadsId") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "thread_tagged_users" ADD CONSTRAINT "FK_817406c77a219a1d33056af0133" FOREIGN KEY ("userAccountId") REFERENCES "user_account"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "thread_tagged_users" DROP CONSTRAINT "FK_817406c77a219a1d33056af0133"`);
        await queryRunner.query(`ALTER TABLE "thread_tagged_users" DROP CONSTRAINT "FK_119729d11176bfb9ff5d6a6800e"`);
        await queryRunner.query(`ALTER TABLE "comment_tagged_users" DROP CONSTRAINT "FK_e8c2296fe827ce1ccfb4b0243b0"`);
        await queryRunner.query(`ALTER TABLE "comment_tagged_users" DROP CONSTRAINT "FK_2c92951744df55efa63e3afec9f"`);
        await queryRunner.query(`ALTER TABLE "class_session_slot" DROP CONSTRAINT "FK_d5734f74f5c2236f6eedf495511"`);
        await queryRunner.query(`ALTER TABLE "class_session_slot" DROP CONSTRAINT "FK_0b7d4c38be6a99a601ce7f764c1"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_5940f7beb6d791a618dbf88361e"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_6200532f3ef99f639a27bdcae7f"`);
        await queryRunner.query(`ALTER TABLE "student_guardian" DROP CONSTRAINT "FK_986f782417afbca26a068d59339"`);
        await queryRunner.query(`ALTER TABLE "student_guardian" DROP CONSTRAINT "FK_6cc634e8176332de785dc61dac1"`);
        await queryRunner.query(`ALTER TABLE "guardian" DROP CONSTRAINT "FK_2a8a3239a2868ec2fd2c34e0fb2"`);
        await queryRunner.query(`ALTER TABLE "user_account" DROP CONSTRAINT "FK_d8caf78eed2d2792f98c3e3c879"`);
        await queryRunner.query(`ALTER TABLE "user_account" DROP CONSTRAINT "FK_c57754862d92d288007ce87b4af"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP CONSTRAINT "FK_7f6695f253ce017caee293da4f0"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_f682eb665c360168731f596b0e3"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_cd31cf1f563a06aeeaab821bd1c"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_fa95bab7713e75cfd59cef55c59"`);
        await queryRunner.query(`ALTER TABLE "class_session" DROP CONSTRAINT "FK_f0f0028eb303dc16b91d0ee35ca"`);
        await queryRunner.query(`ALTER TABLE "class_session" DROP CONSTRAINT "FK_60d19acfb6d4ffcd3987c1bfd34"`);
        await queryRunner.query(`ALTER TABLE "class_session" DROP CONSTRAINT "FK_d311babdafa3f4831b808e3643b"`);
        await queryRunner.query(`ALTER TABLE "class_course" DROP CONSTRAINT "FK_78dab6a9101c123309b2eb3e531"`);
        await queryRunner.query(`ALTER TABLE "class_course" DROP CONSTRAINT "FK_1a4d91b2f0f213b607b6ebfc629"`);
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_4e824d130a4d1465c0df7dd277d"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_dca07fba91b82def10e2c752faf"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_85874ee23f2927b59ff5f769f3c"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_0cc43638ebcf41dfab27e62dc09"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_817406c77a219a1d33056af013"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_119729d11176bfb9ff5d6a6800"`);
        await queryRunner.query(`DROP TABLE "thread_tagged_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e8c2296fe827ce1ccfb4b0243b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2c92951744df55efa63e3afec9"`);
        await queryRunner.query(`DROP TABLE "comment_tagged_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d5734f74f5c2236f6eedf49551"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0b7d4c38be6a99a601ce7f764c"`);
        await queryRunner.query(`DROP TABLE "class_session_slot"`);
        await queryRunner.query(`DROP TABLE "attendance"`);
        await queryRunner.query(`DROP TYPE "public"."attendance_status_enum"`);
        await queryRunner.query(`DROP TABLE "student_guardian"`);
        await queryRunner.query(`DROP TABLE "guardian"`);
        await queryRunner.query(`DROP TABLE "user_account"`);
        await queryRunner.query(`DROP TABLE "threads"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "campus"`);
        await queryRunner.query(`DROP TABLE "room"`);
        await queryRunner.query(`DROP TABLE "class_session"`);
        await queryRunner.query(`DROP TYPE "public"."class_session_status_enum"`);
        await queryRunner.query(`DROP TABLE "time_slot"`);
        await queryRunner.query(`DROP TABLE "class"`);
        await queryRunner.query(`DROP TABLE "class_course"`);
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TABLE "department"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}

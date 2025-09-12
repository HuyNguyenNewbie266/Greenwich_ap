import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialTables1757720096559 implements MigrationInterface {
  name = 'InitialTables1757720096559';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" BIGSERIAL NOT NULL, "name" character varying(100) NOT NULL, "type" "public"."roles_type_enum" NOT NULL, "permissions" json, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "UQ_ff503f858b61860b2b7d7a55ceb" UNIQUE ("type"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "campuses" ("id" BIGSERIAL NOT NULL, "name" character varying(150) NOT NULL, "code" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_2bbf24ecd1945d519656e120787" UNIQUE ("name"), CONSTRAINT "UQ_5c0b535737eac0129c3aea0690a" UNIQUE ("code"), CONSTRAINT "PK_d6a06870edd505bfc2d002cb728" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_account" ("id" BIGSERIAL NOT NULL, "role_id" bigint NOT NULL, "campus_id" bigint, "email" character varying(190) NOT NULL, "password" character varying(255), "phone" character varying(30), "phone_alt" character varying(30), "address" character varying(255), "surname" character varying(80), "middle_name" character varying(80), "given_name" character varying(80), "gender" "public"."user_account_gender_enum" NOT NULL DEFAULT 'UNSPECIFIED', "date_of_birth" date, "avatar" character varying(300), "note" text, "status" "public"."user_account_status_enum" NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_56a0e4bcec2b5411beafa47ffa5" UNIQUE ("email"), CONSTRAINT "PK_6acfec7285fdf9f463462de3e9f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "email" ON "user_account" ("email") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user_account" ADD CONSTRAINT "FK_c57754862d92d288007ce87b4af" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_account" ADD CONSTRAINT "FK_d8caf78eed2d2792f98c3e3c879" FOREIGN KEY ("campus_id") REFERENCES "campuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_account" DROP CONSTRAINT "FK_d8caf78eed2d2792f98c3e3c879"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_account" DROP CONSTRAINT "FK_c57754862d92d288007ce87b4af"`,
    );
    await queryRunner.query(`DROP INDEX "public"."email"`);
    await queryRunner.query(`DROP TABLE "user_account"`);
    await queryRunner.query(`DROP TABLE "campuses"`);
    await queryRunner.query(`DROP TABLE "roles"`);
  }
}

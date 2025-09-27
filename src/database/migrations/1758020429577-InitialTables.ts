import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialTables1758020429577 implements MigrationInterface {
  name = 'InitialTables1758020429577';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role" ("id" BIGSERIAL NOT NULL, "name" character varying(150) NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "campus" ("id" BIGSERIAL NOT NULL, "code" character varying(100) NOT NULL, "name" character varying(150) NOT NULL, CONSTRAINT "UQ_5730c1de08758fab2ba865e8882" UNIQUE ("code"), CONSTRAINT "PK_150aa1747b3517c47f9bd98ea6d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_account" ("id" BIGSERIAL NOT NULL, "role_id" bigint NOT NULL, "campus_id" bigint, "email" character varying(190) NOT NULL, "password" character varying(255), "phone" character varying(30), "phone_alt" character varying(30), "address" character varying(255), "surname" character varying(80), "middle_name" character varying(80), "given_name" character varying(80), "avatar" character varying(300), "note" text, "status" "public"."user_account_status_enum" NOT NULL DEFAULT 'ACTIVE', "gender" "public"."user_account_gender_enum" NOT NULL DEFAULT 'UNSPECIFIED', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_56a0e4bcec2b5411beafa47ffa5" UNIQUE ("email"), CONSTRAINT "PK_6acfec7285fdf9f463462de3e9f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_account" ADD CONSTRAINT "FK_c57754862d92d288007ce87b4af" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_account" ADD CONSTRAINT "FK_d8caf78eed2d2792f98c3e3c879" FOREIGN KEY ("campus_id") REFERENCES "campus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_account" DROP CONSTRAINT "FK_d8caf78eed2d2792f98c3e3c879"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_account" DROP CONSTRAINT "FK_c57754862d92d288007ce87b4af"`,
    );
    await queryRunner.query(`DROP TABLE "user_account"`);
    await queryRunner.query(`DROP TABLE "campus"`);
    await queryRunner.query(`DROP TABLE "role"`);
  }
}

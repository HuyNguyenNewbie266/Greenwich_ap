import { MigrationInterface, QueryRunner } from 'typeorm';

export class CommentAndThreadTables1760428196517 implements MigrationInterface {
  name = 'CommentAndThreadTables1760428196517';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comments" ("id" SERIAL NOT NULL, "content" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdById" bigint NOT NULL, "threadId" integer, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "threads" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdById" bigint NOT NULL, CONSTRAINT "PK_d8a74804c34fc3900502cd27275" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "comment_tagged_users" ("commentsId" integer NOT NULL, "userAccountId" bigint NOT NULL, CONSTRAINT "PK_dd99e363798da18c95d82f5f118" PRIMARY KEY ("commentsId", "userAccountId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2c92951744df55efa63e3afec9" ON "comment_tagged_users" ("commentsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e8c2296fe827ce1ccfb4b0243b" ON "comment_tagged_users" ("userAccountId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "thread_tagged_users" ("threadsId" integer NOT NULL, "userAccountId" bigint NOT NULL, CONSTRAINT "PK_4a2176937f9c9d78b8975035250" PRIMARY KEY ("threadsId", "userAccountId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_119729d11176bfb9ff5d6a6800" ON "thread_tagged_users" ("threadsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_817406c77a219a1d33056af013" ON "thread_tagged_users" ("userAccountId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_cd31cf1f563a06aeeaab821bd1c" FOREIGN KEY ("createdById") REFERENCES "user_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_f682eb665c360168731f596b0e3" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "threads" ADD CONSTRAINT "FK_7f6695f253ce017caee293da4f0" FOREIGN KEY ("createdById") REFERENCES "user_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_tagged_users" ADD CONSTRAINT "FK_2c92951744df55efa63e3afec9f" FOREIGN KEY ("commentsId") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_tagged_users" ADD CONSTRAINT "FK_e8c2296fe827ce1ccfb4b0243b0" FOREIGN KEY ("userAccountId") REFERENCES "user_account"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "thread_tagged_users" ADD CONSTRAINT "FK_119729d11176bfb9ff5d6a6800e" FOREIGN KEY ("threadsId") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "thread_tagged_users" ADD CONSTRAINT "FK_817406c77a219a1d33056af0133" FOREIGN KEY ("userAccountId") REFERENCES "user_account"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "thread_tagged_users" DROP CONSTRAINT "FK_817406c77a219a1d33056af0133"`,
    );
    await queryRunner.query(
      `ALTER TABLE "thread_tagged_users" DROP CONSTRAINT "FK_119729d11176bfb9ff5d6a6800e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_tagged_users" DROP CONSTRAINT "FK_e8c2296fe827ce1ccfb4b0243b0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment_tagged_users" DROP CONSTRAINT "FK_2c92951744df55efa63e3afec9f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "threads" DROP CONSTRAINT "FK_7f6695f253ce017caee293da4f0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_f682eb665c360168731f596b0e3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_cd31cf1f563a06aeeaab821bd1c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_817406c77a219a1d33056af013"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_119729d11176bfb9ff5d6a6800"`,
    );
    await queryRunner.query(`DROP TABLE "thread_tagged_users"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e8c2296fe827ce1ccfb4b0243b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2c92951744df55efa63e3afec9"`,
    );
    await queryRunner.query(`DROP TABLE "comment_tagged_users"`);
    await queryRunner.query(`DROP TABLE "threads"`);
    await queryRunner.query(`DROP TABLE "comments"`);
  }
}

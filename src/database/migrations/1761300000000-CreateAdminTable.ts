import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAdminTable1761300000000 implements MigrationInterface {
  name = 'CreateAdminTable1761300000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create admin table (only stores password, no refresh tokens)
    await queryRunner.query(`
      CREATE TABLE "admin" (
        "id" BIGSERIAL NOT NULL,
        "user_id" bigint NOT NULL,
        "password" character varying(255) NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_admin_user_id" UNIQUE ("user_id"),
        CONSTRAINT "PK_admin" PRIMARY KEY ("id")
      )
    `);

    // Add foreign key constraint
    await queryRunner.query(`
      ALTER TABLE "admin"
      ADD CONSTRAINT "FK_admin_user_id"
      FOREIGN KEY ("user_id")
      REFERENCES "user_account"("id")
      ON DELETE CASCADE
      ON UPDATE NO ACTION
    `);

    // Migrate existing admin users' password data (keep refresh tokens in user_account)
    await queryRunner.query(`
      INSERT INTO "admin" ("user_id", "password", "created_at", "updated_at")
      SELECT 
        u.id,
        u.password,
        u.created_at,
        u.updated_at
      FROM "user_account" u
      INNER JOIN "role" r ON u.role_id = r.id
      WHERE r.name = 'Admin' AND u.password IS NOT NULL
    `);

    // Remove only password column from user_account table
    // Keep refresh_token and refresh_token_expires_at for all users
    await queryRunner.query(`
      ALTER TABLE "user_account"
      DROP COLUMN "password"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Add back password column to user_account
    await queryRunner.query(`
      ALTER TABLE "user_account"
      ADD COLUMN "password" character varying(255)
    `);

    // Migrate admin password data back to user_account
    await queryRunner.query(`
      UPDATE "user_account" u
      SET password = a.password
      FROM "admin" a
      WHERE u.id = a.user_id
    `);

    // Drop foreign key constraint
    await queryRunner.query(`
      ALTER TABLE "admin"
      DROP CONSTRAINT "FK_admin_user_id"
    `);

    // Drop admin table
    await queryRunner.query(`DROP TABLE "admin"`);
  }
}

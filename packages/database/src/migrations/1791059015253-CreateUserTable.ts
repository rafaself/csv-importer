import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1791059015253 implements MigrationInterface {
    name = 'CreateUserTable1791059015253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "fullName" character varying(128), "email" character varying(256), "company" character varying(128), CONSTRAINT "CHK_7e39bd967287de637f19933264" CHECK (
  NULLIF(BTRIM("fullName"), '') IS NOT NULL OR
  NULLIF(BTRIM("email"), '') IS NOT NULL OR
  NULLIF(BTRIM("company"), '') IS NOT NULL
), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "import_rows" ADD "issues" jsonb NOT NULL DEFAULT '[]'::jsonb`);
        await queryRunner.query(`ALTER TABLE "import_rows" ADD CONSTRAINT "UQ_IMPORT_ROWS_IMPORT_ID_ROW_NUMBER" UNIQUE ("importId", "rowNumber")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "import_rows" DROP CONSTRAINT "UQ_IMPORT_ROWS_IMPORT_ID_ROW_NUMBER"`);
        await queryRunner.query(`ALTER TABLE "import_rows" DROP COLUMN "issues"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEntities1791058924804 implements MigrationInterface {
    name = 'UpdateEntities1791058924804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "import_rows" ADD "issues" jsonb NOT NULL DEFAULT '[]'::jsonb`);
        await queryRunner.query(`ALTER TABLE "import_rows" ADD CONSTRAINT "UQ_IMPORT_ROWS_IMPORT_ID_ROW_NUMBER" UNIQUE ("importId", "rowNumber")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "import_rows" DROP CONSTRAINT "UQ_IMPORT_ROWS_IMPORT_ID_ROW_NUMBER"`);
        await queryRunner.query(`ALTER TABLE "import_rows" DROP COLUMN "issues"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateImport1791043644004 implements MigrationInterface {
    name = 'CreateImport1791043644004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."import_rows_status_enum" AS ENUM('valid', 'invalid', 'pending')`);
        await queryRunner.query(`CREATE TABLE "import_rows" ("id" SERIAL NOT NULL, "status" "public"."import_rows_status_enum" NOT NULL DEFAULT 'pending', "rowNumber" integer NOT NULL, "rawValue" jsonb NOT NULL, "importId" uuid, CONSTRAINT "CHK_c888e035c9e7b9861494519258" CHECK ("rowNumber >= 0), CONSTRAINT "PK_45b442c5ced30d539ba20c3ec32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."imports_status_enum" AS ENUM('processing', 'completed', 'failed', 'pending')`);
        await queryRunner.query(`CREATE TABLE "imports" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "originalFileName" character varying NOT NULL, "storageKey" character varying NOT NULL, "status" "public"."imports_status_enum" NOT NULL DEFAULT 'pending', "totalRows" integer, "processedRows" integer NOT NULL DEFAULT '0', "successRows" integer NOT NULL DEFAULT '0', "failedRows" integer NOT NULL DEFAULT '0', "failureReason" character varying(225), "startedAt" TIMESTAMP WITH TIME ZONE, "completedAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3099d60cbabbf5385fe0a45fb06" UNIQUE ("storageKey"), CONSTRAINT "CHK_f90d7e52a9d2c61baf2a60a4bd" CHECK ("totalRows" IS NULL OR "processedRows" <= "totalRows"), CONSTRAINT "CHK_e79554a4659ea398f48ca39884" CHECK ("successRows" + "failedRows" = "processedRows"), CONSTRAINT "CHK_22c3df2e65e99bb9efa6fb6179" CHECK ("failedRows" >= 0), CONSTRAINT "CHK_731523c1def907e25118956863" CHECK ("successRows" >= 0), CONSTRAINT "CHK_8a6d2679a69dfa9c4ee1794480" CHECK ("processedRows" >= 0), CONSTRAINT "CHK_e5f9a747affc75e7e4e2578e57" CHECK ("totalRows" IS NULL OR "totalRows" >= 0), CONSTRAINT "PK_ea10c62f5eb1d75e83d8b5225db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_import_storage_key" ON "imports"  ("storageKey") `);
        await queryRunner.query(`ALTER TABLE "import_rows" ADD CONSTRAINT "FK_9b7ed21ecfabc9578dc307ce870" FOREIGN KEY ("importId") REFERENCES "imports"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "import_rows" DROP CONSTRAINT "FK_9b7ed21ecfabc9578dc307ce870"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_import_storage_key"`);
        await queryRunner.query(`DROP TABLE "imports"`);
        await queryRunner.query(`DROP TYPE "public"."imports_status_enum"`);
        await queryRunner.query(`DROP TABLE "import_rows"`);
        await queryRunner.query(`DROP TYPE "public"."import_rows_status_enum"`);
    }

}

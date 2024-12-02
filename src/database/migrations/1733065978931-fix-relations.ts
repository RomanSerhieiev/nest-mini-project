import { MigrationInterface, QueryRunner } from "typeorm";

export class FixRelations1733065978931 implements MigrationInterface {
    name = 'FixRelations1733065978931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests-to-create-brand" ADD "brandId" uuid`);
        await queryRunner.query(`ALTER TABLE "requests-to-create-brand" ADD CONSTRAINT "UQ_b1144512f25b5e49d342d7fb84e" UNIQUE ("brandId")`);
        await queryRunner.query(`ALTER TABLE "requests-to-create-model" ADD "modelId" uuid`);
        await queryRunner.query(`ALTER TABLE "requests-to-create-model" ADD CONSTRAINT "UQ_9ad7eadb25e2a4d261b43c04f77" UNIQUE ("modelId")`);
        await queryRunner.query(`ALTER TABLE "requests-to-create-brand" ADD CONSTRAINT "FK_b1144512f25b5e49d342d7fb84e" FOREIGN KEY ("brandId") REFERENCES "brands"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests-to-create-model" ADD CONSTRAINT "FK_9ad7eadb25e2a4d261b43c04f77" FOREIGN KEY ("modelId") REFERENCES "models"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests-to-create-model" DROP CONSTRAINT "FK_9ad7eadb25e2a4d261b43c04f77"`);
        await queryRunner.query(`ALTER TABLE "requests-to-create-brand" DROP CONSTRAINT "FK_b1144512f25b5e49d342d7fb84e"`);
        await queryRunner.query(`ALTER TABLE "requests-to-create-model" DROP CONSTRAINT "UQ_9ad7eadb25e2a4d261b43c04f77"`);
        await queryRunner.query(`ALTER TABLE "requests-to-create-model" DROP COLUMN "modelId"`);
        await queryRunner.query(`ALTER TABLE "requests-to-create-brand" DROP CONSTRAINT "UQ_b1144512f25b5e49d342d7fb84e"`);
        await queryRunner.query(`ALTER TABLE "requests-to-create-brand" DROP COLUMN "brandId"`);
    }

}

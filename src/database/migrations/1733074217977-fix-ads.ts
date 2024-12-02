import { MigrationInterface, QueryRunner } from "typeorm";

export class FixAds1733074217977 implements MigrationInterface {
    name = 'FixAds1733074217977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "isPremium"`);
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "year" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "year" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "isPremium" boolean NOT NULL DEFAULT false`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class FixCurrencyEnum1733093057054 implements MigrationInterface {
    name = 'FixCurrencyEnum1733093057054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."advertisements_currency_enum" RENAME TO "advertisements_currency_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."advertisements_currency_enum" AS ENUM('USD', 'EUR', 'UAH')`);
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "currency" TYPE "public"."advertisements_currency_enum" USING "currency"::"text"::"public"."advertisements_currency_enum"`);
        await queryRunner.query(`DROP TYPE "public"."advertisements_currency_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."advertisements_currency_enum_old" AS ENUM('usd', 'eur', 'uah')`);
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "currency" TYPE "public"."advertisements_currency_enum_old" USING "currency"::"text"::"public"."advertisements_currency_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."advertisements_currency_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."advertisements_currency_enum_old" RENAME TO "advertisements_currency_enum"`);
    }

}

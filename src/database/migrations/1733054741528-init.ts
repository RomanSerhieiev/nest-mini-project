import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1733054741528 implements MigrationInterface {
    name = 'Init1733054741528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dealerships" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "deleted" TIMESTAMP, "name" text NOT NULL, CONSTRAINT "PK_88e709c5fee21b34c492451a5a4" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "body" text NOT NULL, "userId" uuid NOT NULL, "dialogueId" uuid NOT NULL, CONSTRAINT "PK_79fc28532440f34f2d1e725940d" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "dialogues" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "deleted" TIMESTAMP, "buyerId" uuid NOT NULL, "sellerId" uuid NOT NULL, "advertisementId" uuid NOT NULL, CONSTRAINT "PK_b97222ad929f78b6e6df4ad035b" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "requests-to-create-brand" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "deleted" TIMESTAMP, "name" text NOT NULL, "status" "public"."requests-to-create-brand_status_enum" NOT NULL DEFAULT 'pending', "userId" uuid NOT NULL, CONSTRAINT "PK_8d9065c8e78e50d0f0506b3f4ca" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "reviews" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "deleted" TIMESTAMP, "status" "public"."reviews_status_enum" NOT NULL DEFAULT 'pending', "isTestDrive" boolean NOT NULL, "userId" uuid NOT NULL, "advertisementId" uuid NOT NULL, CONSTRAINT "PK_f48e736a1868cbee475aedd7d07" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "refresh-tokens" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "refreshToken" text NOT NULL, "deviceId" text NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_799b0390314fdf47527c194bd04" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "deleted" TIMESTAMP, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "image" text, "role" "public"."users_role_enum" NOT NULL, "membership" "public"."users_membership_enum" NOT NULL DEFAULT 'base', "dealershipId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_46c438e5a956fb9c3e86e73e321" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "views" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "advertisementId" uuid NOT NULL, CONSTRAINT "PK_22270975df26300aa18d5bb2a73" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "models" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "deleted" TIMESTAMP, "name" text NOT NULL, "brandId" uuid NOT NULL, CONSTRAINT "UQ_3492c71396207453cf17c0928fb" UNIQUE ("name"), CONSTRAINT "PK_c461d1a3df05040724ab1b59129" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "advertisements" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "deleted" TIMESTAMP, "title" text NOT NULL, "description" text, "price" numeric(10,2) NOT NULL, "currency" "public"."advertisements_currency_enum" NOT NULL, "year" text NOT NULL, "city" text NOT NULL, "region" text NOT NULL, "failedAttempts" integer NOT NULL DEFAULT '0', "isAvailable" boolean NOT NULL DEFAULT true, "isPremium" boolean NOT NULL DEFAULT false, "image" text, "userId" uuid NOT NULL, "brandId" uuid NOT NULL, "modelId" uuid NOT NULL, CONSTRAINT "PK_4955b7ccd06bcae67dd7dc02ae7" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "brands" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "deleted" TIMESTAMP, "name" text NOT NULL, CONSTRAINT "UQ_96db6bbbaa6f23cad26871339b6" UNIQUE ("name"), CONSTRAINT "PK_fccd13f3d4cd2a3bb17b0d3c9fb" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "requests-to-create-model" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "deleted" TIMESTAMP, "name" text NOT NULL, "brandId" uuid NOT NULL, "status" "public"."requests-to-create-model_status_enum" NOT NULL DEFAULT 'pending', "userId" uuid NOT NULL, CONSTRAINT "PK_306501ae9c1178aaa367e994d7a" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_45ff6be942e14923dbcb1399d5e" FOREIGN KEY ("dialogueId") REFERENCES "dialogues"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dialogues" ADD CONSTRAINT "FK_ecf44ded8ce6da8ead6d01df9a8" FOREIGN KEY ("buyerId") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dialogues" ADD CONSTRAINT "FK_95d6a4eee19e8503676a8c9a0c7" FOREIGN KEY ("sellerId") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dialogues" ADD CONSTRAINT "FK_f1ef9520ede349f0d15b74565eb" FOREIGN KEY ("advertisementId") REFERENCES "advertisements"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests-to-create-brand" ADD CONSTRAINT "FK_d934a84c643981e8971fca2989f" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_bb94ab2c4c332413fa07dbcce81" FOREIGN KEY ("advertisementId") REFERENCES "advertisements"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh-tokens" ADD CONSTRAINT "FK_88bd85554c3fa712cd505ec7b1b" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a431fdd92fdaa6b4b31813304ae" FOREIGN KEY ("dealershipId") REFERENCES "dealerships"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "views" ADD CONSTRAINT "FK_1a136367d53567a43ba7aae5a7b" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "views" ADD CONSTRAINT "FK_70599a00f5cce5b1ba70239e8e5" FOREIGN KEY ("advertisementId") REFERENCES "advertisements"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "models" ADD CONSTRAINT "FK_1f36b4eb435f410c6749378cf8c" FOREIGN KEY ("brandId") REFERENCES "brands"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD CONSTRAINT "FK_5b3a17dd0adeba4fbb27d977304" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD CONSTRAINT "FK_da240bca06429a4621f69ae67be" FOREIGN KEY ("brandId") REFERENCES "brands"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD CONSTRAINT "FK_147df42e3d9d93ad833bc20d48a" FOREIGN KEY ("modelId") REFERENCES "models"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests-to-create-model" ADD CONSTRAINT "FK_3d7cf1b9be8d91728fde8c7de26" FOREIGN KEY ("brandId") REFERENCES "brands"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "requests-to-create-model" ADD CONSTRAINT "FK_ffec4bc332d6aed2db87492b448" FOREIGN KEY ("userId") REFERENCES "users"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "requests-to-create-model" DROP CONSTRAINT "FK_ffec4bc332d6aed2db87492b448"`);
        await queryRunner.query(`ALTER TABLE "requests-to-create-model" DROP CONSTRAINT "FK_3d7cf1b9be8d91728fde8c7de26"`);
        await queryRunner.query(`ALTER TABLE "advertisements" DROP CONSTRAINT "FK_147df42e3d9d93ad833bc20d48a"`);
        await queryRunner.query(`ALTER TABLE "advertisements" DROP CONSTRAINT "FK_da240bca06429a4621f69ae67be"`);
        await queryRunner.query(`ALTER TABLE "advertisements" DROP CONSTRAINT "FK_5b3a17dd0adeba4fbb27d977304"`);
        await queryRunner.query(`ALTER TABLE "models" DROP CONSTRAINT "FK_1f36b4eb435f410c6749378cf8c"`);
        await queryRunner.query(`ALTER TABLE "views" DROP CONSTRAINT "FK_70599a00f5cce5b1ba70239e8e5"`);
        await queryRunner.query(`ALTER TABLE "views" DROP CONSTRAINT "FK_1a136367d53567a43ba7aae5a7b"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a431fdd92fdaa6b4b31813304ae"`);
        await queryRunner.query(`ALTER TABLE "refresh-tokens" DROP CONSTRAINT "FK_88bd85554c3fa712cd505ec7b1b"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_bb94ab2c4c332413fa07dbcce81"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`ALTER TABLE "requests-to-create-brand" DROP CONSTRAINT "FK_d934a84c643981e8971fca2989f"`);
        await queryRunner.query(`ALTER TABLE "dialogues" DROP CONSTRAINT "FK_f1ef9520ede349f0d15b74565eb"`);
        await queryRunner.query(`ALTER TABLE "dialogues" DROP CONSTRAINT "FK_95d6a4eee19e8503676a8c9a0c7"`);
        await queryRunner.query(`ALTER TABLE "dialogues" DROP CONSTRAINT "FK_ecf44ded8ce6da8ead6d01df9a8"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_45ff6be942e14923dbcb1399d5e"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_4838cd4fc48a6ff2d4aa01aa646"`);
        await queryRunner.query(`DROP TABLE "requests-to-create-model"`);
        await queryRunner.query(`DROP TABLE "brands"`);
        await queryRunner.query(`DROP TABLE "advertisements"`);
        await queryRunner.query(`DROP TABLE "models"`);
        await queryRunner.query(`DROP TABLE "views"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "refresh-tokens"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TABLE "requests-to-create-brand"`);
        await queryRunner.query(`DROP TABLE "dialogues"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "dealerships"`);
    }

}

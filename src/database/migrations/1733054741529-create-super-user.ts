import * as bcrypt from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSuperUser1733054741529 implements MigrationInterface {
  name = 'CreateSuperUser1733054741529'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const name = process.env.SUPER_USER_NAME;
    const email = process.env.SUPER_USER_EMAIL;
    const password = await bcrypt.hash(process.env.SUPER_USER_PASSWORD, 10);
    const role = process.env.SUPER_USER_ROLE;
    const membership = process.env.SUPER_USER_MEMBERSHIP;

    await queryRunner.query(`
        INSERT INTO "users" (
            "_id", "name", "email", "password", "role", "membership", "created", "updated", "deleted"
        ) VALUES (
                     uuid_generate_v4(), '${name}', '${email}', '${password}', '${role}', '${membership}', now(), now(), null
                 )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const email = process.env.SUPER_USER_EMAIL;
    await queryRunner.query(`DELETE FROM "users" WHERE "email" = '${email}'`);
  }
}
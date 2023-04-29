import { MigrationInterface, QueryRunner } from "typeorm";

export class A1682735408603 implements MigrationInterface {
    name = 'A1682735408603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`age\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

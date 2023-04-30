import { MigrationInterface, QueryRunner } from "typeorm"

export class Migrations1682734898468 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE user DROP COLUMN age")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

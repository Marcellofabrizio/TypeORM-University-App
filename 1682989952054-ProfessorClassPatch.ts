import { MigrationInterface, QueryRunner } from "typeorm";

export class ProfessorClassPatch1682989952054 implements MigrationInterface {
    name = 'ProfessorClassPatch1682989952054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_cf4b33fbbbeb7df1b1c01efbaba\``);
        await queryRunner.query(`ALTER TABLE \`class\` DROP FOREIGN KEY \`FK_6cb63bf34d900006e44543931e1\``);
        await queryRunner.query(`DROP INDEX \`IDX_cf4b33fbbbeb7df1b1c01efbab\` ON \`student\``);
        await queryRunner.query(`DROP INDEX \`REL_cf4b33fbbbeb7df1b1c01efbab\` ON \`student\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP COLUMN \`enrollmentId\``);
        await queryRunner.query(`ALTER TABLE \`class\` DROP COLUMN \`professorId\``);
        await queryRunner.query(`ALTER TABLE \`professor\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`student\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD \`enrollmentId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD UNIQUE INDEX \`IDX_cf4b33fbbbeb7df1b1c01efbab\` (\`enrollmentId\`)`);
        await queryRunner.query(`ALTER TABLE \`professor\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`class\` ADD \`professorId\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_cf4b33fbbbeb7df1b1c01efbab\` ON \`student\` (\`enrollmentId\`)`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_cf4b33fbbbeb7df1b1c01efbaba\` FOREIGN KEY (\`enrollmentId\`) REFERENCES \`enrollment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`class\` ADD CONSTRAINT \`FK_6cb63bf34d900006e44543931e1\` FOREIGN KEY (\`professorId\`) REFERENCES \`professor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`class\` DROP FOREIGN KEY \`FK_6cb63bf34d900006e44543931e1\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP FOREIGN KEY \`FK_cf4b33fbbbeb7df1b1c01efbaba\``);
        await queryRunner.query(`DROP INDEX \`REL_cf4b33fbbbeb7df1b1c01efbab\` ON \`student\``);
        await queryRunner.query(`ALTER TABLE \`class\` DROP COLUMN \`professorId\``);
        await queryRunner.query(`ALTER TABLE \`professor\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP INDEX \`IDX_cf4b33fbbbeb7df1b1c01efbab\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP COLUMN \`enrollmentId\``);
        await queryRunner.query(`ALTER TABLE \`student\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`professor\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`class\` ADD \`professorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD \`enrollmentId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_cf4b33fbbbeb7df1b1c01efbab\` ON \`student\` (\`enrollmentId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_cf4b33fbbbeb7df1b1c01efbab\` ON \`student\` (\`enrollmentId\`)`);
        await queryRunner.query(`ALTER TABLE \`class\` ADD CONSTRAINT \`FK_6cb63bf34d900006e44543931e1\` FOREIGN KEY (\`professorId\`) REFERENCES \`professor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`student\` ADD CONSTRAINT \`FK_cf4b33fbbbeb7df1b1c01efbaba\` FOREIGN KEY (\`enrollmentId\`) REFERENCES \`enrollment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

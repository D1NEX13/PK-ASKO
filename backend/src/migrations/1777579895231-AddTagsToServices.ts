import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTagsToServices1777579895231 implements MigrationInterface {
    name = 'AddTagsToServices1777579895231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" ADD "tags" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "tags"`);
    }

}

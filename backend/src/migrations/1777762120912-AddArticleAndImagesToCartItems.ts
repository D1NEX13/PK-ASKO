import { MigrationInterface, QueryRunner } from "typeorm";

export class AddArticleAndImagesToCartItems1777762120912 implements MigrationInterface {
    name = 'AddArticleAndImagesToCartItems1777762120912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "article" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD CONSTRAINT "UQ_081cb24c478a512854801827f60" UNIQUE ("article")`);
        await queryRunner.query(`ALTER TABLE "cart_items" ADD "images" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "images"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP CONSTRAINT "UQ_081cb24c478a512854801827f60"`);
        await queryRunner.query(`ALTER TABLE "cart_items" DROP COLUMN "article"`);
    }

}

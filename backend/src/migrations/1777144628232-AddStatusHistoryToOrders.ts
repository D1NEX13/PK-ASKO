import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatusHistoryToOrders1777144628232 implements MigrationInterface {
    name = 'AddStatusHistoryToOrders1777144628232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "statusHistory" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "statusHistory"`);
    }

}

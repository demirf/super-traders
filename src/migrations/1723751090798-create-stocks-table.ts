import {MigrationInterface, QueryRunner, Table} from "typeorm";
import {Stock} from "../entities/Stock";

export class CreateStocksTable1723751090798 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: Stock.tableName,
      columns: [
        {
          name: "symbol",
          type: "varchar",
          length: "3",
          isPrimary: true,
        },
        {
          name: "name",
          type: "varchar",
          length: "100",
        },
        {
          name: "price",
          type: "decimal",
          scale: 2,
        },
        {
          name: "lastUpdated",
          type: "timestamp",
          default: 'CURRENT_TIMESTAMP',
          onUpdate: 'CURRENT_TIMESTAMP',
        },
      ],
    });

    await queryRunner.createTable(table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("stocks");
  }

}

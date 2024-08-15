import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";
import {Transaction} from "../entities/Transaction";

export class CreateTransactionTable1723754235412 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: Transaction.tableName,
      columns: [
        {
          name: "transactionId",
          type: "int",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: "stockSymbol",
          type: "varchar",
          length: "3"
        },
        {
          name: "quantity",
          type: "int",
          isNullable: false
        },
        {
          name: "transactionType",
          type: "varchar",
          length: "4",
          isNullable: false
        },
        {
          name: "transactionDate",
          type: "timestamp",
          default: 'CURRENT_TIMESTAMP',
        }
      ]
    });

    await queryRunner.createTable(table, true);

    await queryRunner.createForeignKey("transactions", new TableForeignKey({
      columnNames: ["stockSymbol"],
      referencedTableName: "stocks",
      referencedColumnNames: ["symbol"],
      onDelete: "CASCADE"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("transactions");
    const foreignKeys = table.foreignKeys;

    for (const fk of foreignKeys) {
      await queryRunner.dropForeignKey("transactions", fk);
    }

    await queryRunner.dropTable("transactions");
  }

}

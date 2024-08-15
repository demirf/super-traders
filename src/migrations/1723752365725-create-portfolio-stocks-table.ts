import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";
import {PortfolioStock} from "../entities/PortfolioStock";

export class CreatePortfolioStocksTable1723752365725 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: PortfolioStock.tableName,
      columns: [
        {
          name: "portfolioId",
          type: "int",
          isPrimary: true,
        },
        {
          name: "stockSymbol",
          type: "varchar",
          length: "3",
          isPrimary: true,
        },
        {
          name: "quantity",
          type: "int",
          isNullable: false
        },
        {
          name: "averagePrice",
          type: "decimal",
          scale: 2,
          isNullable: false
        }
      ]
    });

    await queryRunner.createTable(table, true);

    await queryRunner.createForeignKeys("portfolio_stocks", [
      new TableForeignKey({
        columnNames: ["portfolioId"],
        referencedTableName: "portfolios",
        referencedColumnNames: ["portfolioId"],
        onDelete: "CASCADE"
      }),
      new TableForeignKey({
        columnNames: ["stockSymbol"],
        referencedTableName: "stocks",
        referencedColumnNames: ["symbol"],
        onDelete: "CASCADE"
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("portfolio_stocks");
    const foreignKeys = table.foreignKeys;

    for (const fk of foreignKeys) {
      await queryRunner.dropForeignKey("portfolio_stocks", fk);
    }

    await queryRunner.dropTable("portfolio_stocks");
  }

}

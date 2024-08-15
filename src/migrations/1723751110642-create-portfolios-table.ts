import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";
import {Portfolio} from "../entities/Portfolio";

export class CreatePortfoliosTable1723751110642 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: Portfolio.tableName,
      columns: [
        {
          name: "portfolioId",
          type: "int",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: "userId",
          type: "int",
        },
      ],
    });

    await queryRunner.createTable(table, true);

    await queryRunner.createForeignKey("portfolios", new TableForeignKey({
      columnNames: ["userId"],
      referencedTableName: "users",
      referencedColumnNames: ["userId"],
      onDelete: "CASCADE"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("portfolios");
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("userId") !== -1);
    await queryRunner.dropForeignKey("portfolios", foreignKey);
    await queryRunner.dropTable("portfolios");
  }

}

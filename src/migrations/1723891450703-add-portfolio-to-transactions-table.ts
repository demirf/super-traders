import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";
import {Transaction} from "../entities/Transaction";

export class AddPortfolioToTransactionsTable1723891450703 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(Transaction.tableName, new TableColumn({
      name: 'portfolioId',
      type: 'int',
      isNullable: true
    }));

    await queryRunner.createForeignKey(Transaction.tableName, new TableForeignKey({
      columnNames: ['portfolioId'],
      referencedTableName: 'portfolios',
      referencedColumnNames: ['portfolioId'],
      onDelete: 'CASCADE'
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(Transaction.tableName);
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('portfolioId') !== -1);
    if (foreignKey) {
      await queryRunner.dropForeignKey(Transaction.tableName, foreignKey);
    }
    await queryRunner.dropColumn(Transaction.tableName, 'portfolioId');
  }
}

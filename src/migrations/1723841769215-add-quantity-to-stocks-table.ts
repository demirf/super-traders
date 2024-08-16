import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";
import {Stock} from "../entities/Stock";

export class AddQuantityToStocksTable1723841769215 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(Stock.tableName, new TableColumn({
      name: "quantity",
      type: "int",
      isNullable: false,
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(Stock.tableName, "quantity");
  }

}

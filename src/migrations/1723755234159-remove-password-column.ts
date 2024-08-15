import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";
import {User} from "../entities/User";

export class RemovePasswordColumn1723755234159 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(User.tableName, "password");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(User.tableName, new TableColumn({
      name: "password",
      type: "varchar",
      length: "255"
    }));
  }

}

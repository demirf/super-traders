import {MigrationInterface, QueryRunner, Table} from "typeorm";
import {User} from "../entities/User";

export class CreateUsersTable1723744985455 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: User.tableName,
      columns: [
        {
          name: "userId",
          type: "int",
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: "username",
          type: "varchar",
          length: "50",
          isUnique: true,
        },
        {
          name: "password",
          type: "varchar",
          length: "255",
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          default: 'CURRENT_TIMESTAMP',
          onUpdate: 'CURRENT_TIMESTAMP',
        },
      ],
    });

    await queryRunner.createTable(table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }

}

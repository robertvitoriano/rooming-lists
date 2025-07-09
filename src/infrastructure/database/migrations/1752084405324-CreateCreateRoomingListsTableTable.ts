import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCreateRoomingListsTableTable1752084405324
  implements MigrationInterface
{
  name = 'CreateCreateRoomingListsTableTable1752084405324';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rooming_lists',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'event_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'hotel_id',
            type: 'varchar',
          },
          {
            name: 'rfp_name',
            type: 'varchar',
          },
          {
            name: 'cut_off_date',
            type: 'date',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'agreement_type',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'rooming_lists',
      new TableForeignKey({
        columnNames: ['event_id'],
        referencedTableName: 'events',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rooming_lists');
  }
}

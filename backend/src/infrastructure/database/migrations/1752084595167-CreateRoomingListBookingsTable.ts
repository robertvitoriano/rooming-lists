import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateRoomingListBookingsTable1752084595167
  implements MigrationInterface
{
  name = 'CreateRoomingListBookingsTable1752084595167';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: 'rooming_list_bookings',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'rooming_list_id',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'booking_id',
            type: 'varchar',
            isNullable: false,
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
        uniques: [
          {
            name: 'UNIQUE_rooming_list_booking',
            columnNames: ['rooming_list_id', 'booking_id'],
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'rooming_list_bookings',
      new TableForeignKey({
        columnNames: ['rooming_list_id'],
        referencedTableName: 'rooming_lists',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'rooming_list_bookings',
      new TableForeignKey({
        columnNames: ['booking_id'],
        referencedTableName: 'bookings',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rooming_list_bookings');
  }
}

import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBookingsTable1752084339990 implements MigrationInterface {
    name = 'CreateBookingsTable1752084339990'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bookings',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'guest_name',
            type: 'varchar',
          },
          {
            name: 'guest_phone_number',
            type: 'varchar',
          },
          {
            name: 'check_in_date',
            type: 'date',
          },
          {
            name: 'check_out_date',
            type: 'date',
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
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bookings');
  }

}

import { DataSource } from 'typeorm';
import { BookingModel } from '../models/booking.model';
import { EventModel } from '../models/event.model';
import { RoomingListModel } from '../models/rooming-list.model';
import { RoomingListBookingModel } from '../models/rooming-list-bookings.model';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'mydb',
  entities: [
    BookingModel,
    RoomingListModel,
    EventModel,
    RoomingListBookingModel,
  ],
  migrations: ['src/infrastructure/database/migrations/*.ts'],
});

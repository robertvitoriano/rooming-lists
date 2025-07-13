import { DataSource } from 'typeorm';
import { BookingModel } from '../models/booking.model';
import { EventModel } from '../models/event.model';
import { RoomingListModel } from '../models/rooming-list.model';
import { RoomingListBookingModel } from '../models/rooming-list-bookings.model';
import { env } from 'src/config/env';
console.log({currentEnv:env.POSTGRES_HOST})
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.POSTGRES_HOST || 'postgres',
  port: Number(env.POSTGRES_PORT) || 5432,
  username: env.POSTGRES_USER || 'myuser',
  password: env.POSTGRES_PASSWORD || 'mypassword',
  database: env.POSTGRES_DB || 'mydatabase',
  entities: [
    BookingModel,
    RoomingListModel,
    EventModel,
    RoomingListBookingModel,
  ],
  migrations: ['src/infrastructure/database/migrations/*.ts'],
});

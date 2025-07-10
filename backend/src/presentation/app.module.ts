import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoomingListModel } from '../infrastructure/database/models/rooming-list.model';
import { PostgresModule } from '../infrastructure/database/postgres/postgres.module';
import {
  createEventsAndRoomingLists,
  eventsRepository,
  fetchRoomingLists,
  fetchRoomingListsByEvent,
  roomingListsRepository,
} from './providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomingListBookingModel } from 'src/infrastructure/database/models/rooming-list-bookings.model';
import { EventModel } from 'src/infrastructure/database/models/event.model';
import { BookingModel } from 'src/infrastructure/database/models/booking.model';
import { RoomingListsController } from './controllers/rooming-lists.controller';
import { SeedEventsAndRoomingLists } from 'src/infrastructure/database/seeders/seed-events-and-rooming-lists';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RoomingListModel,
      EventModel,
      BookingModel,
      RoomingListBookingModel,
    ]),
    PostgresModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [
    roomingListsRepository,
    eventsRepository,
    fetchRoomingLists,
    createEventsAndRoomingLists,
    fetchRoomingListsByEvent,
    SeedEventsAndRoomingLists,
  ],
  controllers: [RoomingListsController],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoomingListModel } from '../infrastructure/database/models/rooming-list.model';
import { PostgresModule } from '../infrastructure/database/postgres/postgres.module';
import {
  bookingsRepository,
  createBookings,
  createEventsAndRoomingLists,
  eventsRepository,
  fetchBookings,
  fetchRoomingLists,
  fetchRoomingListsByEvent,
  roomingListsRepository,
} from './providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomingListBookingModel } from 'src/infrastructure/database/models/rooming-list-bookings.model';
import { EventModel } from 'src/infrastructure/database/models/event.model';
import { BookingModel } from 'src/infrastructure/database/models/booking.model';
import { RoomingListsController } from './controllers/rooming-lists.controller';
import { SeedService } from 'src/application/seed/seed.service';
import { BookingsController } from './controllers/bookings-controller';
import { EventsController } from './controllers/events-controller';
import { FileReaderService } from 'src/infrastructure/file/file-reader.service';

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
    bookingsRepository,
    fetchRoomingLists,
    createEventsAndRoomingLists,
    fetchRoomingListsByEvent,
    createBookings,
    fetchBookings,
    SeedService,
    FileReaderService,
  ],
  controllers: [RoomingListsController, BookingsController, EventsController],
})
export class AppModule {}

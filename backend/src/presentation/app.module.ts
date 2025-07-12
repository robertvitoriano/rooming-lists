import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoomingListModel } from '../infrastructure/database/models/rooming-list.model';
import { PostgresModule } from '../infrastructure/database/postgres/postgres.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomingListBookingModel } from 'src/infrastructure/database/models/rooming-list-bookings.model';
import { EventModel } from 'src/infrastructure/database/models/event.model';
import { BookingModel } from 'src/infrastructure/database/models/booking.model';
import { RoomingListsController } from './controllers/rooming-lists.controller';
import { SeedService } from 'src/application/services/seed.service';
import { BookingsController } from './controllers/bookings-controller';
import { EventsController } from './controllers/events-controller';
import { FileReaderService } from 'src/infrastructure/file/file-reader.service';
import {
  bookingsRepository,
  createBookings,
  createEventsAndRoomingLists,
  eventsRepository,
  fetchBookings,
  fetchBookingsByRoomingList,
  fetchRoomingLists,
  fetchRoomingListsByEvent,
  fetchRoomingListsByEventUseCase,
  roomingListsRepository,
  truncateDatabaseUseCase,
} from './providers';
import { SeedController } from './controllers/seed-controller';
import { AuthModule } from './auth.module';

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
    AuthModule
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
    fetchBookingsByRoomingList,
    fetchRoomingListsByEventUseCase,
    truncateDatabaseUseCase,
    SeedService,
    FileReaderService,
  ],
  controllers: [
    RoomingListsController,
    BookingsController,
    EventsController,
    SeedController,
  ],
})
export class AppModule {}

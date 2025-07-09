import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoomingListModel } from '../infrastructure/database/models/rooming-list.model';
import { PostgresModule } from '../infrastructure/database/postgres/postgres.module';
import { fetchRoomingLists, roomingListsRepository } from './providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomingListBookingModel } from 'src/infrastructure/database/models/rooming-list-bookings.model';
import { EventModel } from 'src/infrastructure/database/models/event.model';
import { BookingModel } from 'src/infrastructure/database/models/booking.model';

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
  providers: [roomingListsRepository, fetchRoomingLists],
  controllers: [],
})
export class AppModule {}

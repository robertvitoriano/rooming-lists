import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingModel } from '../models/booking.model';
import { RoomingListModel } from '../models/rooming-list.model';
import { EventModel } from '../models/event.model';
import { RoomingListBookingModel } from '../models/rooming-list-bookings.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/test.sqlite',
      entities: [
        BookingModel,
        RoomingListModel,
        EventModel,
        RoomingListBookingModel,
      ],
      synchronize: true,
    }),
  ],
})
export class SqliteModule {}

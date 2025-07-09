import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingModel } from '../../../infrastructure/database/models/booking.model';
import { RoomingListModel } from '../../../infrastructure/database/models/rooming-list.model';
import { EventModel } from '../../../infrastructure/database/models/event.model';
import { RoomingListBookingModel } from '../../../infrastructure/database/models/rooming-list-bookings.model';

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

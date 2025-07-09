import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingModel } from 'src/infrastructure/database/models/booking.model';
import { EventModel } from 'src/infrastructure/database/models/event.model';
import { RoomingListBookingModel } from 'src/infrastructure/database/models/rooming-list-bookings.model';
import { RoomingListModel } from 'src/infrastructure/database/models/rooming-list.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
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

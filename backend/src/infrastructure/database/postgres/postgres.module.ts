import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomingListModel } from '../models/rooming-list.model';
import { EventModel } from '../models/event.model';
import { RoomingListBookingModel } from '../models/rooming-list-bookings.model';
import { BookingModel } from '../models/booking.model';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST', 'localhost'),
        port: configService.get<number>('POSTGRES_PORT', 5432),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DB'),
        entities: [
          BookingModel,
          RoomingListModel,
          EventModel,
          RoomingListBookingModel,
        ],
        synchronize: false,
      }),
    }),
  ],
})
export class PostgresModule {}

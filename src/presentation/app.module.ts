import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoomingListModel } from '../infrastructure/database/models/rooming-list.model';
import { PostgresModule } from '../infrastructure/database/postgres/postgres.module';
import { fetchRoomingLists, roomingListsRepository } from './providers';

@Module({
  imports: [
    RoomingListModel,
    PostgresModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [roomingListsRepository, fetchRoomingLists],
  controllers: [],
})
export class AppModule {}

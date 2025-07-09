import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoomingListModel } from './infrastructure/database/models/rooming-list.model';
import { PostgresModule } from './infrastructure/database/postgres/postgres.module';

@Module({
  imports: [
    RoomingListModel,
    PostgresModule,
    ConfigModule.forRoot({isGlobal:true}),
  ],
})
export class AppModule {}

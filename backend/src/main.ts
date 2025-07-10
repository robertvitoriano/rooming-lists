import { NestFactory } from '@nestjs/core';
import { AppModule } from './presentation/app.module';
import { SeedEventsAndRoomingLists } from './infrastructure/database/seeders/seed-events-and-rooming-lists';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  
  const seedEventsAndRoomingLists = app.get<SeedEventsAndRoomingLists>(SeedEventsAndRoomingLists)
  await seedEventsAndRoomingLists.handle()
  await app.listen(process.env.PORT ?? 3000);
  
  
}
bootstrap();

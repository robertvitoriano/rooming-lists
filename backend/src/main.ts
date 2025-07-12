import { Logger } from '@nestjs/common';
import { SeedService } from './application/services/seed.service';
import { GlobalExceptionFilter } from './infrastructure/http/global-exception-filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './presentation/app.module';
import { env } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors({ origin: '*', credentials: true });
  
  const seedService = app.get<SeedService>(SeedService);
  await seedService.handle();

  await app.listen(env.PORT ?? 3000);
}
bootstrap();

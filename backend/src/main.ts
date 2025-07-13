import { SeedService } from './application/services/seed.service';
import { GlobalExceptionFilter } from './presentation/http/global-exception-filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './presentation/app.module';
import { env } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.enableCors({ origin: '*', credentials: true });
  await app.listen(env.PORT ?? 3000);
}
bootstrap();

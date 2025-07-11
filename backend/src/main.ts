import { NestFactory } from '@nestjs/core';
import { AppModule } from './presentation/app.module';
import { SeedService } from './application/seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  
  const seedService = app.get<SeedService>(SeedService)
  await seedService.handle()
  await app.listen(process.env.PORT ?? 3000);
  
  
}
bootstrap();

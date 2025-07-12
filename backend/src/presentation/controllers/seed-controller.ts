import { Body, Controller, Get, Post } from '@nestjs/common';
import { SeedService } from 'src/application/services/seed.service';
import { TruncateDatabaseUseCase } from 'src/core/use-cases/truncate-database-use-case';

@Controller('/seed')
export class SeedController {
  constructor(
    private readonly seedService: SeedService,
    private readonly truncateDatabaseUseCase: TruncateDatabaseUseCase,
  ) {}

  @Post('/')
  async seed(@Body() body: { truncate?: boolean }) {
    const truncate = body?.truncate ?? true;

    if (truncate) {
      await this.truncateDatabaseUseCase.execute();
    }
    
    await this.seedService.handle();
    
  }
}

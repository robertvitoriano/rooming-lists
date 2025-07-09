import { Inject } from '@nestjs/common';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { CreateEventsAndRoomingListsUseCase } from 'src/core/use-cases/create-events-and-rooming-lists';

export class SeedEventsAndRoomingLists {
  constructor(
    @Inject(CreateEventsAndRoomingListsUseCase)
    private readonly createRoomingListsAndEventsUseCase: CreateEventsAndRoomingListsUseCase,
  ) {}
  async handle() {
    const rawData = JSON.parse(
      readFileSync(
        resolve(__dirname, '..', '..', '..', 'data', 'rooming-lists.json'),
        'utf-8',
      ),
    );
    await this.createRoomingListsAndEventsUseCase.execute({eventRoomingLists:rawData})
  }
}

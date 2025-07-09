import { Inject } from '@nestjs/common';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { CreateEventsAndRoomingListsUseCase } from 'src/core/use-cases/create-events-and-rooming-lists';

export class SeedEventsAndRoomingLists {
  constructor(
    @Inject(CreateEventsAndRoomingListsUseCase)
    private readonly createRoomingListsAndEventsUseCase: CreateEventsAndRoomingListsUseCase,
  ) {}
  handle() {
    if (this.createRoomingListsAndEventsUseCase) {
      console.log('DEPENDENCY INJECTION WORKED');
    } else {
      console.log('DEPENDENCY INJECTION DID NOT WORK');
    }
    const rawData = JSON.parse(
      readFileSync(
        resolve(__dirname, '..', '..', '..', 'data', 'rooming-lists.json'),
        'utf-8',
      ),
    );
  }
}

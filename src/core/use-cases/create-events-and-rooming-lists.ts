import { readFileSync } from 'fs';
import { IEventsRepository } from '../repositories/IEventsRepository';
import { IRoomingListsRepository } from '../repositories/IRoomingListsRepository';

export class CreateEventsAndRoomingListsUseCase {
  constructor(
    private readonly EventsRepository: IEventsRepository,
    private readonly roomingListsRepository: IRoomingListsRepository,
  ) {}
  execute(rawData: any) {

    console.log(rawData)
  }
}

import { IEventsRepository } from 'src/core/repositories/IEventsRepository';
import { IRoomingListsRepository } from 'src/core/repositories/IRoomingListsRepository';
import { CreateEventsAndRoomingListsUseCase } from 'src/core/use-cases/create-events-and-rooming-lists';
import { FetchRoomingListsUseCase } from 'src/core/use-cases/fetch-rooming-lists';
import { RoomingListsRepository } from 'src/infrastructure/database/repositories/booking-lists-repository';

export const roomingListsRepository = {
  provide: 'IRoomingListsRepository',
  useClass: RoomingListsRepository,
};

export const eventsRepository = {
  provide: 'IEventsRepository',
  useClass: RoomingListsRepository,
};

export const fetchRoomingLists = {
  inject: ['IRoomingListsRepository'],
  provide: FetchRoomingListsUseCase,
  useFactory: (roomingListsRepository: IRoomingListsRepository) => {
    return new FetchRoomingListsUseCase(roomingListsRepository);
  },
};

export const createEventsAndRoomingLists = {
  inject: ['IRoomingListsRepository', 'IEventsRepository'],
  provide: CreateEventsAndRoomingListsUseCase,
  useFactory: (roomingListsRepository: IRoomingListsRepository, eventsRepository:IEventsRepository) => {
    return new CreateEventsAndRoomingListsUseCase(eventsRepository, roomingListsRepository);
  },
};

import { IRoomingListsRepository } from 'src/core/repositories/IRoomingListsRepository';
import { FetchRoomingListsUseCase } from 'src/core/use-cases/fetch-rooming-lists';
import { RoomingListsRepository } from 'src/infrastructure/database/repositories/booking-lists-repository';

export const roomingListsRepository = {
  provide: 'IRoomingListsRepository',
  useClass: RoomingListsRepository,
};

export const fetchRoomingLists = {
  inject: ['IRoomingListsRepository'],
  provide: FetchRoomingListsUseCase,
  useFactory: (roomingListsRepository: IRoomingListsRepository) => {
    return new FetchRoomingListsUseCase(roomingListsRepository);
  },
};

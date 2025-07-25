import { IEventsRepository } from 'src/core/repositories/IEventsRepository';
import { IRoomingListsRepository } from 'src/core/repositories/IRoomingListsRepository';
import { CreateEventsAndRoomingListsUseCase } from 'src/core/use-cases/create-events-and-rooming-lists';
import { FetchRoomingListsUseCase } from 'src/core/use-cases/fetch-rooming-lists';
import { RoomingListsRepository } from 'src/infrastructure/database/repositories/rooming-lists-repository';
import { EventsRepository } from 'src/infrastructure/database/repositories/events-repository';
import { FetchEventsWithRoomingListsUseCase } from 'src/core/use-cases/fetch-events-with-rooming-lists';
import { CreateBookingsUseCase } from 'src/core/use-cases/create-bookings';
import { IBookingsRepository } from 'src/core/repositories/IBookingsRepository';
import { BookingsRepository } from 'src/infrastructure/database/repositories/bookings-repository';
import { FetchBookingsUseCase } from 'src/core/use-cases/fetch-bookings';
import { FetchBookingsByRoomingListUseCase } from 'src/core/use-cases/fetch-bookings-by-rooming-list';
import { FetchRoomingListsByEventUseCase } from 'src/core/use-cases/fetch-rooming-list-by-event';
import { TruncateDatabaseUseCase } from 'src/core/use-cases/truncate-database-use-case';

export const roomingListsRepository = {
  provide: 'IRoomingListsRepository',
  useClass: RoomingListsRepository,
};

export const eventsRepository = {
  provide: 'IEventsRepository',
  useClass: EventsRepository,
};

export const bookingsRepository = {
  provide: 'IBookingsRepository',
  useClass: BookingsRepository,
};

export const fetchRoomingLists = {
  inject: ['IRoomingListsRepository'],
  provide: FetchRoomingListsUseCase,
  useFactory: (roomingListsRepository: IRoomingListsRepository) => {
    return new FetchRoomingListsUseCase(roomingListsRepository);
  },
};

export const fetchBookings = {
  inject: ['IBookingsRepository'],
  provide: FetchBookingsUseCase,
  useFactory: (BookingsRepository: IBookingsRepository) => {
    return new FetchBookingsUseCase(BookingsRepository);
  },
};

export const fetchRoomingListsByEvent = {
  inject: ['IEventsRepository'],
  provide: FetchEventsWithRoomingListsUseCase,
  useFactory: (eventsRepository) => {
    return new FetchEventsWithRoomingListsUseCase(eventsRepository);
  },
};

export const createEventsAndRoomingLists = {
  inject: ['IRoomingListsRepository', 'IEventsRepository'],
  provide: CreateEventsAndRoomingListsUseCase,
  useFactory: (
    roomingListsRepository: IRoomingListsRepository,
    eventsRepository: IEventsRepository,
  ) => {
    return new CreateEventsAndRoomingListsUseCase(
      eventsRepository,
      roomingListsRepository,
    );
  },
};

export const fetchBookingsByRoomingList = {
  inject: ['IBookingsRepository', 'IRoomingListsRepository'],
  provide: FetchBookingsByRoomingListUseCase,
  useFactory: (
    bookingsRepository: IBookingsRepository,
    roomingListsRepository: IRoomingListsRepository,
  ) => {
    return new FetchBookingsByRoomingListUseCase(
      bookingsRepository,
      roomingListsRepository,
    );
  },
};

export const fetchRoomingListsByEventUseCase = {
  inject: ['IRoomingListsRepository', 'IEventsRepository'],
  provide: FetchRoomingListsByEventUseCase,
  useFactory: (
    roomingListsRepository: IRoomingListsRepository,
    eventsRepository: IEventsRepository,
  ) => {
    return new FetchRoomingListsByEventUseCase(
      roomingListsRepository,
      eventsRepository,
    );
  },
};

export const createBookings = {
  inject: ['IBookingsRepository', 'IRoomingListsRepository'],
  provide: CreateBookingsUseCase,
  useFactory: (
    bookingsRepository: IBookingsRepository,
    roomingListRepository: IRoomingListsRepository,
  ) => {
    return new CreateBookingsUseCase(bookingsRepository, roomingListRepository);
  },
};

export const truncateDatabaseUseCase = {
  inject: [
    'IBookingsRepository',
    'IRoomingListsRepository',
    'IEventsRepository',
  ],
  provide: TruncateDatabaseUseCase,
  useFactory: (
    bookingsRepository: IBookingsRepository,
    roomingListRepository: IRoomingListsRepository,
    eventsRepository: IEventsRepository,
  ) => {
    return new TruncateDatabaseUseCase(
      eventsRepository,
      roomingListRepository,
      bookingsRepository,
    );
  },
};

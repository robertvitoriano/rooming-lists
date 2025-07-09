import { IRoomingListsRepository } from '../repositories/IRoomingListsRepository';
import { FetchRoomingListsUseCase } from './fetch-rooming-lists';
import { RoomingList } from '../entities/rooming-list';
import { Event } from '../entities/event';
import { RoomingListModel } from 'src/infrastructure/database/models/rooming-list.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { SqliteModule } from 'src/test/infrastructure/sqlite.module';
import { RoomingListsRepository } from 'src/infrastructure/database/repositories/booking-lists-repository';
import { EventsRepository } from 'src/infrastructure/database/repositories/events-repository';
import { IEventsRepository } from '../repositories/IEventsRepository';
import { EventModel } from 'src/infrastructure/database/models/event.model';
describe('FetchRoomingListsUseCase', () => {
  let roomingListsRepository: IRoomingListsRepository;
  let eventsRepository: IEventsRepository;

  let sut: FetchRoomingListsUseCase;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        SqliteModule,
        TypeOrmModule.forFeature([RoomingListModel, EventModel]),
      ],
      providers: [
        {
          provide: 'IRoomingListsRepository',
          useClass: RoomingListsRepository,
        },
        {
          provide: 'IEventsRepository',
          useClass: EventsRepository,
        },
        {
          inject: ['IRoomingListsRepository'],
          provide: FetchRoomingListsUseCase,
          useFactory: (roomingListsRepository: IRoomingListsRepository) => {
            return new FetchRoomingListsUseCase(roomingListsRepository);
          },
        },
      ],
    }).compile();

    sut = app.get<FetchRoomingListsUseCase>(FetchRoomingListsUseCase);
    roomingListsRepository = app.get<IRoomingListsRepository>(
      'IRoomingListsRepository',
    );
    eventsRepository = app.get<IEventsRepository>('IEventsRepository');
  });

  it('Should be able to list created RoomingLists', async () => {
    
    const event = new Event({ name: 'Incredible event' }, { id: '1' });
    
    const roomingList = new RoomingList({
      agreementType: 'artist',
      cutOffDate: new Date(),
      eventId: event.id.toValue(),
      hotelId: '1',
      rfpName: 'ASDSA',
      status: 'active',
    });

    await eventsRepository.create(event);
    await roomingListsRepository.create(roomingList);

    const { roomingLists } = await sut.execute({});

    expect(roomingLists.length).toBe(1);
  });
});

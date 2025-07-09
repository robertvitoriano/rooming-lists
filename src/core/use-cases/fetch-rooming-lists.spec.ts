import { IRoomingListsRepository } from '../repositories/IRoomingListsRepository';
import { FetchRoomingListsUseCase } from './fetch-rooming-lists';
import { RoomingList } from '../entities/rooming-list';
import { SqliteModule } from 'src/test/infrastructure/sqlite/sqlite.module';
import { SqliteRoomingListRepository } from 'src/test/infrastructure/sqlite/repositories/sqlite-booking-lists-repository.ts';
import { RoomingListModel } from 'src/infrastructure/database/models/rooming-list.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';

describe('FetchRoomingListsUseCase', () => {
  let roomingListsRepository: IRoomingListsRepository;
  let sut: FetchRoomingListsUseCase;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [SqliteModule, TypeOrmModule.forFeature([RoomingListModel])],
      providers: [
        FetchRoomingListsUseCase,
        {
          provide: 'IRoomingListsRepository',
          useClass: SqliteRoomingListRepository,
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
    roomingListsRepository = app.get<IRoomingListsRepository>('IRoomingListsRepository');

  });

  it('Should be able to list created RoomingLists', async () => {
    const roomingList = new RoomingList({
      agreementType: 'artist',
      cutOffDate: new Date(),
      eventId: '1',
      hotelId: '1',
      rfpName: 'ASDSA',
      status: 'active',
    });

    await roomingListsRepository.create(roomingList);

    const { roomingLists } = await sut.execute({});

    expect(roomingLists.length).toBe(1);
  });
});

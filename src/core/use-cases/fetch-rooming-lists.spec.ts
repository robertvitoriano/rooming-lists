import { IRoomingListsRepository } from '../repositories/IRoomingListsRepository';
import { FetchRoomingListsUseCase } from './fetch-rooming-lists';
import { RoomingList } from '../entities/rooming-list';
import { InMemoryRoomingListsRepository } from '../../test/repositories/in-memory-rooming-lists-repository';

describe('FetchRoomingListsUseCase', () => {
  let roomingListsRepository: IRoomingListsRepository;
  let sut: FetchRoomingListsUseCase;
  
  beforeEach(() => {
    roomingListsRepository = new InMemoryRoomingListsRepository();
    sut = new FetchRoomingListsUseCase(roomingListsRepository);
  });
  
  it('Should be able to list created RoomingLists', async () => {
    const roomingList = RoomingList.create({
      agreementType: 'artist',
      cut0ffDate: new Date(),
      eventId: '1',
      hotelId: '1',
      rfpName: 'ASDSA',
      status: 'active',
    });
     
    await roomingListsRepository.create(roomingList)
    
    const {roomingLists} = await sut.execute({})
    
    expect(roomingLists.length).toBe(1)
  
    
  });
});

import { RoomingList } from '../entities/rooming-list';
import { IRoomingListsRepository } from '../repositories/IRoomingListsRepository';
export class ListRoomingListsUseCase{
  constructor(private readonly roominglistRepository: IRoomingListsRepository) {}
  async execute():Promise<RoomingList[]> {
   const roominglists =  await this.roominglistRepository.list()
   return roominglists
  }
}

import { RoomingList } from "src/core/entities/rooming-list";
import { IRoomingListsRepository } from "src/core/repositories/IRoomingListsRepository";

export class InMemoryRoomingListsRepository implements IRoomingListsRepository {
  roomingLists:RoomingList[] = []
  
  async create(roomingList: RoomingList): Promise<void> {
    this.roomingLists.push(roomingList)
  }
  async list(): Promise<RoomingList[]> {
    return this.roomingLists
  }
  delete(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  update(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}

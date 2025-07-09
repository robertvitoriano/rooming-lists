import { RoomingList } from "../entities/rooming-list";

export interface EventWithRoomingLists{
  roomingLists:RoomingList[]
}

export interface IRoomingListsRepository {
  create(roomingLit: RoomingList):Promise<void>;
  list():Promise<RoomingList[]>
  listByEvents():Promise<EventWithRoomingLists[]>
  findByEvent():Promise<EventWithRoomingLists>
  findManyById(ids: string[]):Promise<RoomingList[]>
  delete():Promise<void>;
  update():Promise<void>;
}

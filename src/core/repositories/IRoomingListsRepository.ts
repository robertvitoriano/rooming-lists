import { RoomingList } from "../entities/rooming-list";

export interface IRoomingListsRepository {
  create(roomingLit: RoomingList):Promise<void>;
  list():Promise<RoomingList[]>
  delete():Promise<void>;
  update():Promise<void>;
}

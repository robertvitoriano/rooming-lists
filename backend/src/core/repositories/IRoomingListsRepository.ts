import { RoomingList } from "../entities/rooming-list";
import { UniqueId } from "../entities/value-objects/unique-id";

export interface IRoomingListsRepository {
  create(roomingLit: RoomingList):Promise<void>;
  list():Promise<RoomingList[]>
  findManyById(ids: string[]):Promise<RoomingList[]>
  delete():Promise<void>;
  update():Promise<void>;
}

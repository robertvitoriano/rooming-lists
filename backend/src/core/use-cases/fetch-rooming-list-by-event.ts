import { RoomingList } from '../entities/rooming-list';
import { IRoomingListsRepository } from '../repositories/IRoomingListsRepository';
interface FetchRoomingListsByEventRequest {
  eventId:string
}
interface FetchRoomingListsResponse {
  roomingLists: RoomingList[];
}
export class FetchRoomingListsByEventUseCase {
  constructor(
    private readonly roominglistRepository: IRoomingListsRepository,
  ) {}
  async execute(
    params: FetchRoomingListsByEventRequest,
  ): Promise<FetchRoomingListsResponse> {
    const {
      eventId
    } = params
    const roomingLists = await this.roominglistRepository.findManyByEventId(eventId)

    return { roomingLists };
  }
}

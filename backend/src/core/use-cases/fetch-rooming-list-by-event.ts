import { RoomingList } from '../entities/rooming-list';
import { IRoomingListsRepository } from '../repositories/IRoomingListsRepository';
import { PaginationParams } from '../repositories/pagination-params';
interface FetchRoomingListsByEventRequest extends PaginationParams {
  eventId: string;
}
interface FetchRoomingListsResponse {
  roomingLists: RoomingList[];
  total: number
}
export class FetchRoomingListsByEventUseCase {
  constructor(
    private readonly roominglistRepository: IRoomingListsRepository,
  ) {}
  async execute(
    params: FetchRoomingListsByEventRequest,
  ): Promise<FetchRoomingListsResponse> {
    const { eventId, page, perPage } = params;
    const {roomingLists, total} = await this.roominglistRepository.findManyByEventId(
      eventId,
      {
        page,
        perPage,
      },
    );

    return { roomingLists, total };
  }
}

import { RoomingList } from '../entities/rooming-list';
import { EventNotFoundError } from '../errors/event-not-fount-error';
import { IEventsRepository } from '../repositories/IEventsRepository';
import { IRoomingListsRepository } from '../repositories/IRoomingListsRepository';
import { PaginationParams } from '../repositories/types';
interface FetchRoomingListsByEventRequest extends PaginationParams {
  eventId: string;
}
interface FetchRoomingListsResponse {
  roomingLists: RoomingList[];
  total: number;
}
export class FetchRoomingListsByEventUseCase {
  constructor(
    private readonly roominglistRepository: IRoomingListsRepository,
    private readonly eventsRepository: IEventsRepository,
  ) {}
  async execute(
    params: FetchRoomingListsByEventRequest,
  ): Promise<FetchRoomingListsResponse> {
    const { eventId, page, perPage, sort } = params;
    const event = await this.eventsRepository.findById(eventId);

    if (!event) throw new EventNotFoundError(eventId);

    const { roomingLists, total } =
      await this.roominglistRepository.findManyByEventId(
        eventId,
        {
          page,
          perPage,
          sort,
        },
      );

    return { roomingLists, total };
  }
}

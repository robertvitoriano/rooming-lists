import { RoomingList } from '../entities/rooming-list';
import { IRoomingListAgreementType } from '../entities/value-objects/rooming-list-agreement-type';
import { IRoomingListStatus } from '../entities/value-objects/rooming-list-status';
import { EventNotFoundError } from '../errors/event-not-fount-error';
import { IEventsRepository } from '../repositories/IEventsRepository';
import { IRoomingListsRepository } from '../repositories/IRoomingListsRepository';
import { PaginationParams } from '../repositories/types';
interface FetchRoomingListsByEventRequest extends PaginationParams {
  eventId: string;
  status?: IRoomingListStatus[];
  rfpName?: string;
  agreementType?: IRoomingListAgreementType;
  eventName?: string;
  search:string
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
    const {
      eventId,
      page,
      perPage,
      sort,
      agreementType,
      eventName,
      rfpName,
      status,
      search
    } = params;
    const event = await this.eventsRepository.findById(eventId);

    if (!event) throw new EventNotFoundError(eventId);

    const { roomingListsWithBookings, total } =
      await this.roominglistRepository.findManyByEventId(
        eventId,
        {
          page,
          perPage,
          sort,
        },
        {
          agreementType,
          eventName,
          rfpName,
          status,
          search
        },
      );
    const roomingLists = roomingListsWithBookings.map(
      ({ bookings, roomingList }) => {
        roomingList.setStartAndEndDateBasedOnBookings(bookings);
        return roomingList;
      },
    );

    return { roomingLists, total };
  }
}

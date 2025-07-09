import { Event } from '../entities/event';
import { RoomingList } from '../entities/rooming-list';
import { IRoomingListAgreementType } from '../entities/value-objects/rooming-list-agreement-type';
import { IRoomingListStatus } from '../entities/value-objects/rooming-list-status';
import { IEventsRepository } from '../repositories/IEventsRepository';
import { IRoomingListsRepository } from '../repositories/IRoomingListsRepository';
interface EventRoomingListData {
  roomingListId: number;
  eventId: number;
  eventName: string;
  hotelId: number;
  rfpName: string;
  cutOffDate: string;
  status: IRoomingListStatus;
  agreementType: IRoomingListAgreementType;
}
interface CreateEventsAndRoomingListsRequest {
  eventRoomingLists: EventRoomingListData[];
}
export class CreateEventsAndRoomingListsUseCase {
  constructor(
    private readonly eventsRepository: IEventsRepository,
    private readonly roomingListsRepository: IRoomingListsRepository,
  ) {}
  async execute({
    eventRoomingLists,
  }: CreateEventsAndRoomingListsRequest): Promise<void> {
    for (const eventRoomingList of eventRoomingLists) {
      const {
        agreementType,
        cutOffDate,
        eventId,
        eventName,
        hotelId,
        rfpName,
        roomingListId,
        status,
      } = eventRoomingList;
      const event = new Event(
        {
          name: eventName,
        },
        { id: String(eventId) },
      );
      await this.eventsRepository.create(event);

      const roomingList = new RoomingList(
        {
          agreementType,
          cutOffDate: new Date(cutOffDate),
          eventId: String(event.id),
          hotelId: String(hotelId),
          rfpName,
          status,
        },
        {
          id: String(roomingListId),
        },
      );

      await this.roomingListsRepository.create(roomingList);
    }
  }
}

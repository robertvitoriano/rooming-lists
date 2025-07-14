import { writeFileSync } from 'fs';
import { IRoomingListAgreementType } from '../entities/value-objects/rooming-list-agreement-type';
import { IRoomingListStatus } from '../entities/value-objects/rooming-list-status';
import {
  EventWithRoomingLists,
  IEventsRepository,
} from '../repositories/IEventsRepository';
import { PaginationParams } from '../repositories/types';
import { RoomingList } from '../entities/rooming-list';

interface FetchEventsWithRoomingListsRequest extends PaginationParams {
  status?: IRoomingListStatus[];
  rfpName?: string;
  agreementType?: IRoomingListAgreementType;
  eventName?: string;
  search?: string;
}
export interface FetchEventsWithRoomingListsResponse {
  eventsWithRoomingLists: {
    id: string;
    name: string;
    roomingLists: RoomingList[];
  }[];
  total: number;
}

export class FetchEventsWithRoomingListsUseCase {
  constructor(private readonly eventslistRepository: IEventsRepository) {}
  async execute(
    params: FetchEventsWithRoomingListsRequest,
  ): Promise<FetchEventsWithRoomingListsResponse> {
    const { status = [], search, page, perPage, sort } = params;

    const { eventsWithRoomingLists, total } =
      await this.eventslistRepository.listWithRoomingLists(
        {
          page,
          perPage,
          sort,
        },
        {
          status,
          search,
        },
      );

    const events = eventsWithRoomingLists.map(
      ({ id, name, roomingListsWithBooking }) => {
        return {
          id,
          name,
          roomingLists: roomingListsWithBooking.map(
            ({ bookings, roomingList }) => {
              roomingList.setStartAndEndDateBasedOnBookings(bookings);
              return roomingList;
            },
          ),
        };
      },
    );

    return { eventsWithRoomingLists: events, total };
  }
}

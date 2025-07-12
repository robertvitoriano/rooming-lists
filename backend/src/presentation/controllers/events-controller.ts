import { Controller, Get, Query } from '@nestjs/common';
import {
  FetchEventsWithRoomingListsResponse,
  FetchEventsWithRoomingListsUseCase,
} from 'src/core/use-cases/fetch-events-with-rooming-lists';
import {
  FetchRoomingListsQueryDto,
  roomingListsStatusMap,
} from '../dto/fetch-events-with-rooming-lists.dto';
import { ControllerResponse } from '../types/controller-response';
import { EventWithRoomingListResponseData } from '../types/events-with-rooming-lists';

@Controller('/events')
export class EventsController {
  constructor(
    private readonly fetchEventsWithRoomingListsUseCase: FetchEventsWithRoomingListsUseCase,
  ) {}

  @Get('with-rooming-lists')
  async fetchRoomingListsByEvents(
    @Query() query: FetchRoomingListsQueryDto,
  ): Promise<ControllerResponse<EventWithRoomingListResponseData[]>> {
    const { eventsWithRoomingLists } =
      await this.fetchEventsWithRoomingListsUseCase.execute({
        status: roomingListsStatusMap[query.status as string],
      });

    const data = eventsWithRoomingLists.map(({ id, name, roomingLists }) => ({
      id,
      name,
      roomingLists: roomingLists.map(
        ({
          agreementType,
          createdAt,
          cutOffDate,
          eventId,
          hotelId,
          id: roomingListId,
          rfpName,
          status,
          updatedAt,
          bookingsCount,
        }) => ({
          id: roomingListId.toValue(),
          agreementType,
          createdAt,
          cutOffDate,
          eventId,
          hotelId,
          rfpName,
          status,
          updatedAt,
          bookingsCount,
        }),
      ),
    }));

    return {
      data,
      meta: {
        totalEvents: data.length,
        totalRoomingLists: data.reduce(
          (count, event) => count + event.roomingLists.length,
          0,
        ),
      },
      message: 'Events with rooming lists fetched successfully',
    };
  }
}

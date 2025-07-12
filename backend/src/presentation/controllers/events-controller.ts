import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  FetchEventsWithRoomingListsResponse,
  FetchEventsWithRoomingListsUseCase,
} from 'src/core/use-cases/fetch-events-with-rooming-lists';
import {
  FetchRoomingListsQueryDto,
  roomingListsStatusMap,
} from '../dto/fetch-events-with-rooming-lists.dto';
import { ControllerResponse } from '../types/controller-response';
import {
  EventWithRoomingListResponseData,
  RoomingListResponseData,
} from '../types/events-with-rooming-lists';
import { FetchRoomingListsByEventUseCase } from 'src/core/use-cases/fetch-rooming-list-by-event';

@Controller('/events')
export class EventsController {
  constructor(
    private readonly fetchEventsWithRoomingListsUseCase: FetchEventsWithRoomingListsUseCase,
    private readonly fetchRoomingListsByEventUseCase: FetchRoomingListsByEventUseCase,
  ) {}

  @Get('/')
  async fetchEventsWithRoomingLists(
    @Query() query: FetchRoomingListsQueryDto,
  ): Promise<ControllerResponse<EventWithRoomingListResponseData[]>> {
    const { status, eventName } = query;
    const { eventsWithRoomingLists } =
      await this.fetchEventsWithRoomingListsUseCase.execute({
        status: roomingListsStatusMap[status as string],
        eventName,
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

  @Get('/:eventId/rooming-lists')
  async fetchRoomingListsByEventId(
    @Param('eventId') eventId: string,
  ): Promise<ControllerResponse<RoomingListResponseData[]>> {
    const { roomingLists } = await this.fetchRoomingListsByEventUseCase.execute(
      { eventId },
    );
    return {
      message: 'Rooming Lists fetched successfully by event',
      data: roomingLists.map(
        ({
          agreementType,
          createdAt,
          cutOffDate,
          eventId,
          hotelId,
          id,
          rfpName,
          status,
          updatedAt,
          bookingsCount,
        }) => ({
          id: id.toValue(),
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
    };
  }
}

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
import { Sorting } from 'src/core/repositories/types';

@Controller('/events')
export class EventsController {
  constructor(
    private readonly fetchEventsWithRoomingListsUseCase: FetchEventsWithRoomingListsUseCase,
    private readonly fetchRoomingListsByEventUseCase: FetchRoomingListsByEventUseCase,
  ) {}

  @Get('/')
  async fetchEventsWithRoomingLists(
    @Query() query: FetchRoomingListsQueryDto,
    @Query('page') page = 1,
    @Query('perPage') perPage = 10,
    @Query('sort') sort: Sorting,
  ): Promise<ControllerResponse<EventWithRoomingListResponseData[]>> {
    const { status, eventName } = query;
    const { eventsWithRoomingLists, total } =
      await this.fetchEventsWithRoomingListsUseCase.execute({
        status: roomingListsStatusMap[status as string],
        eventName,
        page,
        perPage,
        sort: sort.toUpperCase() as Sorting,
      });

    const data = eventsWithRoomingLists.map(({ id, name, roomingLists }) => ({
      id,
      name,
      roomingLists: roomingLists.map(
        ({
          id: roomingListId,
          agreementType,
          createdAt,
          cutOffDate,
          eventId,
          hotelId,
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
        total,
        pagination: {
          currentPage: Number(page),
          perPage: Number(perPage),
          currentPageTotal: eventsWithRoomingLists.length,
          totalPages: Math.ceil(total / perPage),
        },
      },
      message: 'Events fetched successfully',
    };
  }

  @Get('/:eventId/rooming-lists')
  async fetchRoomingListsByEventId(
    @Param('eventId') eventId: string,
    @Query('page') page = 1,
    @Query('perPage') perPage = 3,
    @Query('sort') sort: Sorting = 'DESC',
  ): Promise<ControllerResponse<RoomingListResponseData[]>> {
    const { roomingLists, total } =
      await this.fetchRoomingListsByEventUseCase.execute({
        eventId,
        page,
        perPage,
        sort:sort.toUpperCase() as Sorting,
      });

    return {
      meta: {
        total,
        pagination: {
          currentPage: Number(page),
          perPage: Number(perPage),
          currentPageTotal: roomingLists.length,
          totalPages: Math.ceil(total / perPage),
        },
      },
      message: 'Rooming Lists fetched successfully by event',
      data: roomingLists.map((roomingList) => ({
        id: roomingList.id.toValue(),
        agreementType: roomingList.agreementType,
        createdAt: roomingList.createdAt,
        cutOffDate: roomingList.cutOffDate,
        eventId: roomingList.eventId,
        hotelId: roomingList.hotelId,
        rfpName: roomingList.rfpName,
        status: roomingList.status,
        updatedAt: roomingList.updatedAt,
        bookingsCount: roomingList.bookingsCount,
      })),
    };
  }
}

import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
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
import { IRoomingListAgreementType } from 'src/core/entities/value-objects/rooming-list-agreement-type';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IRoomingListStatus } from 'src/core/entities/value-objects/rooming-list-status';
@UseGuards(JwtAuthGuard)
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
    const queryDto = plainToInstance(FetchRoomingListsQueryDto, query);

    const { search, page, perPage, sort } = queryDto;
    const status = queryDto['status[]'];

    const validStatuses: IRoomingListStatus[] = [];
    
    if (status?.length > 0 && typeof status !== "string") {
      status.forEach((value: string) => {
        if (roomingListsStatusMap[value]) {
          validStatuses.push(roomingListsStatusMap[value]);
        }
      });
    } else if (status) {
      validStatuses.push(roomingListsStatusMap[status]);
    }
    
    const { eventsWithRoomingLists, total } =
      await this.fetchEventsWithRoomingListsUseCase.execute({
        status: validStatuses.length > 0 ? validStatuses : [],
        search,
        page,
        perPage,
        sort,
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
          currentPage: page,
          perPage: perPage,
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
    @Query() query: FetchRoomingListsQueryDto,
  ): Promise<ControllerResponse<RoomingListResponseData[]>> {
    const queryDto = plainToInstance(FetchRoomingListsQueryDto, query);

    const { status, rfpName, agreementType, page, perPage, sort } = queryDto;
    const { roomingLists, total } =
      await this.fetchRoomingListsByEventUseCase.execute({
        status: roomingListsStatusMap[status as string],
        rfpName,
        agreementType: agreementType as IRoomingListAgreementType,
        eventId,
        page: Number(page),
        perPage: Number(perPage),
        sort: sort.toUpperCase() as Sorting,
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

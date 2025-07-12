import { Controller, Get, Query } from '@nestjs/common';
import { FetchEventsWithRoomingListsUseCase } from 'src/core/use-cases/fetch-events-with-rooming-lists';
import { FetchRoomingListsQueryDto, roomingListsStatusMap } from '../dto/fetch-events-with-rooming-lists.dto';

@Controller('/events')
export class EventsController {
  constructor(
    private readonly fetchEventsWithRoomingListsUseCase: FetchEventsWithRoomingListsUseCase,
  ) {}

  @Get('with-rooming-lists')
  async fetchRoomingListsByEvents(
    @Query() query: FetchRoomingListsQueryDto,
  ) {
    
    const { eventsWithRoomingLists } =
      await this.fetchEventsWithRoomingListsUseCase.execute({
        status: roomingListsStatusMap[query.status as string],
      });
      
    return eventsWithRoomingLists.map(({ id, name, roomingLists }) => ({
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
  }
}

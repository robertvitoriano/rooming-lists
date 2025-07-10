import { Controller, Get } from '@nestjs/common';
import { FetchEventsWithRoomingListsUseCase } from 'src/core/use-cases/fetch-events-with-rooming-lists';
import { FetchRoomingListsUseCase } from 'src/core/use-cases/fetch-rooming-lists';

@Controller('/rooming-lists')
export class RoomingListsController {
  constructor(
    private readonly fetchRoomingListsUseCase: FetchRoomingListsUseCase,
    private readonly fetchEventsWithRoomingListsUseCase: FetchEventsWithRoomingListsUseCase,
  ) {}

  @Get('/')
  async fetchRoomingLists() {
    const { roomingLists } = await this.fetchRoomingListsUseCase.execute({});
    return roomingLists.map(
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
      }),
    );
  }
  @Get('/by-events')
  async fetchRoomingListsByEvents() {
    const { eventsWithRoomingLists } =
      await this.fetchEventsWithRoomingListsUseCase.execute({});
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
          bookingsCount
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
          bookingsCount
        }),
      ),
    }));
  }
  // async fetchRoomingListsByEvent() {
  //   await this.fetchRoomingListsUseCase.execute();
  // }

  // async createRoomingListsFromUpload() {
  //   await this.fetchRoomingListsUseCase.execute();
  // }
}

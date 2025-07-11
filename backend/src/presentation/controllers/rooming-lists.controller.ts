import { Controller, Get } from '@nestjs/common';
import { FetchEventsWithRoomingListsUseCase } from 'src/core/use-cases/fetch-events-with-rooming-lists';
import { FetchRoomingListsUseCase } from 'src/core/use-cases/fetch-rooming-lists';

@Controller('/rooming-lists')
export class RoomingListsController {
  constructor(
    private readonly fetchRoomingListsUseCase: FetchRoomingListsUseCase,
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
  
  // async fetchRoomingListsByEvent() {
  //   await this.fetchRoomingListsUseCase.execute();
  // }

  // async createRoomingListsFromUpload() {
  //   await this.fetchRoomingListsUseCase.execute();
  // }
}

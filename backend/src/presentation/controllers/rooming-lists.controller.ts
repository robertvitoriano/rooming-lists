import { Controller, Get, Param } from '@nestjs/common';
import { FetchRoomingListsUseCase } from 'src/core/use-cases/fetch-rooming-lists';
import { ControllerResponse } from '../types/controller-response';
import { FetchBookingsByRoomingListUseCase } from 'src/core/use-cases/fetch-bookings-by-rooming-list';

@Controller('/rooming-lists')
export class RoomingListsController {
  constructor(
    private readonly fetchRoomingListsUseCase: FetchRoomingListsUseCase,
    private readonly fetchBookingsByRoomingListUseCase: FetchBookingsByRoomingListUseCase,
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

  @Get('/:id/bookings')
  async getBookingsForRoomingList(
    @Param('id') roomingListId: string,
  ): Promise<ControllerResponse<any>> {
    const { bookings } = await this.fetchBookingsByRoomingListUseCase.execute({
      roomingListId,
    });

    const data = bookings.map((booking) => ({
      ...booking
    }));

    return {
      data,
      meta: {
        total: data.length,
      },
      message: 'Bookings fetched successfully',
    };
  }

  // async fetchRoomingListsByEvent() {
  //   await this.fetchRoomingListsUseCase.execute();
  // }

  // async createRoomingListsFromUpload() {
  //   await this.fetchRoomingListsUseCase.execute();
  // }
}

import { Controller, Get, Param } from '@nestjs/common';
import { FetchRoomingListsUseCase } from 'src/core/use-cases/fetch-rooming-lists';
import { ControllerResponse } from '../types/controller-response';
import { FetchBookingsByRoomingListUseCase } from 'src/core/use-cases/fetch-bookings-by-rooming-list';
import { BookingResponseData } from '../types/booking';

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
  async fetchBookingsForRoomingList(
    @Param('id') roomingListId: string,
  ): Promise<ControllerResponse<BookingResponseData[]>> {
    const { bookings } = await this.fetchBookingsByRoomingListUseCase.execute({
      roomingListId,
    });

    return {
      data: bookings.map(
        ({
          checkInDate,
          checkOutDate,
          createdAt,
          guestName,
          guestPhoneNumber,
          id,
          updatedAt,
        }) => ({
          id: id.toValue(),
          checkInDate,
          checkOutDate,
          createdAt,
          guestName,
          guestPhoneNumber,
          updatedAt,
        }),
      ),
      meta: {
        total: bookings.length,
      },
      message: 'Bookings fetched successfully',
    };
  }
}

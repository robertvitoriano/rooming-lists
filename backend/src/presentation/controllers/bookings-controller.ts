import { Controller, Get, UseGuards } from '@nestjs/common';
import { FetchBookingsUseCase } from 'src/core/use-cases/fetch-bookings';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('/bookings')
export class BookingsController {
  constructor(private readonly fetchBookingsUseCase: FetchBookingsUseCase) {}
  
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async fetchBookings() {
    const { bookings } = await this.fetchBookingsUseCase.execute({});
    return bookings.map(
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
    );
  }

  // async fetchBookingsByEvent() {
  //   await this.fetchBookingsUseCase.execute();
  // }

  // async createBookingsFromUpload() {
  //   await this.fetchBookingsUseCase.execute();
  // }
}

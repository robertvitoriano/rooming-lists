import { Booking } from "../entities/booking";
import { IBookingsRepository } from "../repositories/IBookingsRepository";

interface FetchBookingsRequest {
  roomingListId: string;
}

interface FetchBookingsResponse {
  bookings: Booking[];
}

export class FetchBookingsByRoomingListUseCase {
  constructor(private readonly bookingRepository: IBookingsRepository) {}

  async execute(
    params: FetchBookingsRequest,
  ): Promise<FetchBookingsResponse> {
    const bookings = await this.bookingRepository.listByRoomingListId(params.roomingListId);

    return { bookings };
  }
}

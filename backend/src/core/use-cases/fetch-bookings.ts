import { Booking } from '../entities/booking';
import { IBookingsRepository } from '../repositories/IBookingsRepository';

interface FetchBookingsRequest {}
interface FetchBookingsResponse {
  bookings: Booking[];
}

export class FetchBookingsUseCase {
  constructor(
    private readonly bookingRepository: IBookingsRepository,
  ) {}
  async execute(
    params: FetchBookingsRequest,
  ): Promise<FetchBookingsResponse> {
    const bookings = await this.bookingRepository.list();

    return { bookings };
  }
}

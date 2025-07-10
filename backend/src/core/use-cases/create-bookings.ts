import { IBookingsRepository } from '../repositories/IBookingsRepository';
import { IRoomingListsRepository } from '../repositories/IRoomingListsRepository';
export interface BookingData {
  bookingId: number;
  Id: number;
  Name: string;
  hotelId: number;
  rfpName: string;
  cutOffDate: string;
}
interface CreateBookingsRequest {
  bookings: BookingData[];
}
export class CreateBookingsUseCase {
  constructor(
    private readonly roomingListsRepository: IRoomingListsRepository,
    private readonly bookingsRepository: IBookingsRepository,
  ) {}
  async execute({
    bookings,
  }: CreateBookingsRequest): Promise<void> {
    const providedBookingIds = new Set<string>();

  }
}

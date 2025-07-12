import { Booking } from '../entities/booking';
import { RoomingListNotFoundError } from '../errors/rooming-list-not-found-error';
import { IBookingsRepository } from '../repositories/IBookingsRepository';
import { IRoomingListsRepository } from '../repositories/IRoomingListsRepository';

interface FetchBookingsRequest {
  roomingListId: string;
}

interface FetchBookingsResponse {
  bookings: Booking[];
}

export class FetchBookingsByRoomingListUseCase {
  constructor(
    private readonly bookingRepository: IBookingsRepository,
    private readonly roomingListRepository: IRoomingListsRepository,
  ) {}

  async execute(params: FetchBookingsRequest): Promise<FetchBookingsResponse> {
    const { roomingListId } = params;

    const roomingList = await this.roomingListRepository.findById(roomingListId);

    if (!roomingList) {
      throw new RoomingListNotFoundError(roomingListId);
    }

    const bookings = await this.bookingRepository.listByRoomingListId(roomingListId);

    return { bookings };
  }
}

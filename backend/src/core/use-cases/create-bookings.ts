import { Booking } from '../entities/booking';
import { IBookingsRepository } from '../repositories/IBookingsRepository';
import { IRoomingListsRepository } from '../repositories/IRoomingListsRepository';
export interface BookingData {
  bookingId: number;
  hotelId: number;
  eventId: number;
  guestName: string;
  guestPhoneNumber: string;
  checkInDate: string;
  checkOutDate: string;
}

export interface BookingRoomingListRelationData {
  roomingListId: number;
  bookingId: number;
}
interface CreateBookingsRequest {
  bookings: BookingData[];
  roomingListBookingRelations: BookingRoomingListRelationData[];
}
export class CreateBookingsUseCase {
  constructor(
    private readonly bookingsRepository: IBookingsRepository,
    private readonly roomingListsRepository: IRoomingListsRepository,
  ) {}
  async execute({
    bookings,
    roomingListBookingRelations,
  }: CreateBookingsRequest): Promise<void> {
    const providedBookingIds = new Set<string>();

    bookings.forEach(({ bookingId }) => {
      providedBookingIds.add(String(bookingId));
    });

    const existingBookings = await this.bookingsRepository.findManyById(
      Array.from(providedBookingIds),
    );
    const roomingListBookingRelationsIdsList = roomingListBookingRelations.map(
      ({ bookingId, roomingListId }) => ({
        bookingId: String(bookingId),
        roomingListId: String(roomingListId),
      }),
    );

    for (const bookingData of bookings) {
      const {
        bookingId,
        guestName,
        guestPhoneNumber,
        checkInDate,
        checkOutDate,
      } = bookingData;

      const bookingAlreadyCreated = !!existingBookings.find(
        (existingBooking) => existingBooking.id.toValue() === String(bookingId),
      );
      
      if (bookingAlreadyCreated) continue;

      const booking = new Booking(
        {
          checkInDate: new Date(checkInDate),
          checkOutDate: new Date(checkOutDate),
          guestName,
          guestPhoneNumber,
        },
        {
          id: String(bookingId),
        },
      );
      await this.bookingsRepository.create(booking);
    }

    for (const roomingListBookingRelationIds of roomingListBookingRelationsIdsList) {
      const { bookingId, roomingListId } = roomingListBookingRelationIds;
      const roomingListBookingRelationExists =
        !!(await this.bookingsRepository.findBookingsWithRoomingListByIds(
          roomingListBookingRelationIds,
        ));
        
      if (roomingListBookingRelationExists) continue;

      const bookingExists = !!(await this.bookingsRepository.findById(bookingId));
      const roomingListExists = !!(await this.roomingListsRepository.findById(roomingListId));
      
      if (bookingExists && roomingListExists) {
        await this.bookingsRepository.createRoomingListBooking(roomingListBookingRelationIds);
      }
    }
  }
}

import { Booking } from '../entities/booking';
import { IBookingsRepository } from '../repositories/IBookingsRepository';
export interface BookingData {
  bookingId: number;
  hotelId: number;
  eventId: number;
  guestName: string;
  guestPhoneNumber: string;
  checkInDate: string;
  checkOutDate: string;
}
interface CreateBookingsRequest {
  bookings: BookingData[];
}
export class CreateBookingsUseCase {
  constructor(private readonly bookingsRepository: IBookingsRepository) {}
  async execute({ bookings }: CreateBookingsRequest): Promise<void> {
    const providedBookingIds = new Set<string>();

    bookings.forEach(({ bookingId }) => {
      providedBookingIds.add(String(bookingId));
    });

    const existingBookings = await this.bookingsRepository.findManyById(
      Array.from(providedBookingIds),
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
  }
}

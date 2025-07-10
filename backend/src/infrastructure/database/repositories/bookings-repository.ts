import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BookingModel } from '../models/booking.model';
import { IBookingsRepository } from 'src/core/repositories/IBookingsRepository';
import { Booking } from 'src/core/entities/booking';

export class BookingsRepository implements IBookingsRepository {
  constructor(
    @InjectRepository(BookingModel)
    private bookingsRepository: Repository<BookingModel>,
  ) {}

  findByEvent(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async list(): Promise<Booking[]> {
    const result = await this.bookingsRepository.find();

    const rommingLists: Booking[] = result.map(
      ({
        checkInDate,
        checkOutDate,
        guestName,
        guestPhoneNumber,
        createdAt,
        id,
        updatedAt,
      }) =>
        new Booking(
          {
            checkInDate,
            checkOutDate,
            guestName,
            guestPhoneNumber,
          },
          { id },
        ),
    );
    return rommingLists;
  }
  async create({
    checkInDate,
    checkOutDate,
    guestName,
    guestPhoneNumber,
    id,
  }: Booking) {
    const bookingRecord = this.bookingsRepository.create({
      id: id.toValue(),
      checkInDate,
      checkOutDate,
      guestName,
      guestPhoneNumber,
    });
    await this.bookingsRepository.save(bookingRecord);
  }

  async findManyById(ids: string[]): Promise<Booking[]> {
    const result = await this.bookingsRepository.find({
      where: {
        id: In(ids),
      },
    });

    const events: Booking[] = result.map(
      ({
        id,
        checkInDate,
        checkOutDate,
        guestName,
        guestPhoneNumber,
        updatedAt,
        createdAt,
      }) =>
        new Booking(
          {
            checkInDate,
            checkOutDate,
            guestName,
            guestPhoneNumber,
          },
          { id, createdAt, updatedAt },
        ),
    );
    return events;
  }
  async delete() {
    throw new Error('Method not implemented.');
  }
  async update() {
    throw new Error('Method not implemented.');
  }
}

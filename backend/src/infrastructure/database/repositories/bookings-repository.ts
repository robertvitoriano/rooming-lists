import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BookingModel } from '../models/booking.model';
import {
  BookingWithRoomingList,
  IBookingsRepository,
  RoomingListBookingRelationIds,
} from 'src/core/repositories/IBookingsRepository';
import { Booking } from 'src/core/entities/booking';
import { RoomingListBookingModel } from '../models/rooming-list-bookings.model';
import { RoomingList } from 'src/core/entities/rooming-list';

export class BookingsRepository implements IBookingsRepository {
  constructor(
    @InjectRepository(BookingModel)
    private bookingsRepository: Repository<BookingModel>,
    @InjectRepository(RoomingListBookingModel)
    private roomingListBookingRepository: Repository<RoomingListBookingModel>,
  ) {}

  async createRoomingListBooking({
    bookingId,
    roomingListId,
  }: RoomingListBookingRelationIds): Promise<void> {
    const roomingListBookingRecord = this.roomingListBookingRepository.create({
      bookingId,
      roomingListId,
    });
    
    await this.roomingListBookingRepository.save(roomingListBookingRecord)
  }

  async findById(id: string): Promise<Booking | null> {
    const result = await this.bookingsRepository.findOne({
      where: {
        id,
      },
    });

    if (!result) return null;
    const {
      id: foundBookingId,
      checkInDate,
      checkOutDate,
      guestName,
      guestPhoneNumber,
      createdAt,
      updatedAt,
    } = result;
    return new Booking(
      {
        checkInDate,
        checkOutDate,
        guestName,
        guestPhoneNumber,
      },
      {
        id: foundBookingId,
        createdAt,
        updatedAt,
      },
    );
  }
  async findBookingsWithRoomingListByIds(
    roomingListBookingRelationIds: RoomingListBookingRelationIds,
  ): Promise<BookingWithRoomingList | null> {
    const { bookingId, roomingListId } = roomingListBookingRelationIds;

    const result = await this.roomingListBookingRepository.findOne({
      where: {
        bookingId,
        roomingListId,
      },
    });

    if (!result) return null;
    
    const { booking, roomingList } = result;
    
    if (!booking || !roomingList) return null;

    const {
      id: foundRoomingListId,
      agreementType,
      cutOffDate,
      eventId,
      hotelId,
      rfpName,
      status,
      updatedAt: foundRoomingListUpdatedAt,
      createdAt: foundRoomingListCreatedAt,
    } = roomingList;

    const {
      id: foundBookingId,
      checkInDate,
      checkOutDate,
      guestName,
      guestPhoneNumber,
      createdAt: foundBookingCreatedAt,
      updatedAt: foundBookingUpdatedAt,
    } = booking;

    return {
      booking: new Booking(
        {
          checkInDate,
          checkOutDate,
          guestName,
          guestPhoneNumber,
        },
        {
          id: foundBookingId,
          createdAt: foundBookingCreatedAt,
          updatedAt: foundBookingUpdatedAt,
        },
      ),
      roomingList: new RoomingList(
        {
          agreementType,
          cutOffDate,
          eventId,
          hotelId,
          rfpName,
          status,
        },
        {
          id: foundRoomingListId,
          createdAt: foundRoomingListCreatedAt,
          updatedAt: foundRoomingListUpdatedAt,
        },
      ),
    };
  }

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
          { id, createdAt, updatedAt },
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

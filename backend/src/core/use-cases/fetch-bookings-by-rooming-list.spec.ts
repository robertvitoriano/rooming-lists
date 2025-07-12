import { IRoomingListsRepository } from '../repositories/IRoomingListsRepository';
import { RoomingList } from '../entities/rooming-list';
import { Event } from '../entities/event';
import { RoomingListModel } from 'src/infrastructure/database/models/rooming-list.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { SqliteModule } from 'src/test/infrastructure/sqlite.module';
import { RoomingListsRepository } from 'src/infrastructure/database/repositories/rooming-lists-repository';
import { EventsRepository } from 'src/infrastructure/database/repositories/events-repository';
import { IEventsRepository } from '../repositories/IEventsRepository';
import { EventModel } from 'src/infrastructure/database/models/event.model';
import { FetchBookingsByRoomingListUseCase } from './fetch-bookings-by-rooming-list';
import { BookingsRepository } from 'src/infrastructure/database/repositories/bookings-repository';
import { IBookingsRepository } from '../repositories/IBookingsRepository';
import { Booking } from '../entities/booking';
import { BookingModel } from 'src/infrastructure/database/models/booking.model';
import { RoomingListBookingModel } from 'src/infrastructure/database/models/rooming-list-bookings.model';
import { UniqueId } from '../entities/value-objects/unique-id';

describe('FetchBookingsByRoomingListUseCase', () => {
  let roomingListsRepository: IRoomingListsRepository;
  let bookingsRespository: IBookingsRepository;
  let eventsRepository: IEventsRepository;
  let sut: FetchBookingsByRoomingListUseCase;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        SqliteModule,
        TypeOrmModule.forFeature([
          RoomingListModel,
          BookingModel,
          RoomingListBookingModel,
          EventModel,
        ]),
      ],
      providers: [
        {
          provide: 'IRoomingListsRepository',
          useClass: RoomingListsRepository,
        },
        {
          provide: 'IBookingsRepository',
          useClass: BookingsRepository,
        },
        {
          provide: 'IEventsRepository',
          useClass: EventsRepository,
        },
        {
          inject: ['IRoomingListsRepository', 'IBookingsRepository'],
          provide: FetchBookingsByRoomingListUseCase,
          useFactory: (
            roomingListsRepository: IRoomingListsRepository,
            bookingsRepository: IBookingsRepository,
          ) => {
            return new FetchBookingsByRoomingListUseCase(
              bookingsRepository,
              roomingListsRepository,
            );
          },
        },
      ],
    }).compile();

    sut = app.get<FetchBookingsByRoomingListUseCase>(
      FetchBookingsByRoomingListUseCase,
    );
    roomingListsRepository = app.get<IRoomingListsRepository>(
      'IRoomingListsRepository',
    );
    bookingsRespository = app.get<IBookingsRepository>('IBookingsRepository');
    eventsRepository = app.get<IEventsRepository>('IEventsRepository');
  });

  it('Should be able to list created RoomingLists', async () => {
    const event = new Event({ name: 'Incredible event' });

    await eventsRepository.create(event);

    const roomingList = new RoomingList({
      agreementType: 'artist',
      cutOffDate: new Date(),
      eventId: event.id.toValue(),
      hotelId: '5',
      rfpName: 'ASDSA',
      status: 'active',
    });
    
    const booking = new Booking({
      checkInDate: new Date(),
      checkOutDate: new Date(),
      guestName: 'some guest name',
      guestPhoneNumber: '1199955562',
    });

    await bookingsRespository.create(booking);
    await roomingListsRepository.create(roomingList);

    await bookingsRespository.createRoomingListBooking({
      id: (new UniqueId).toValue(),
      bookingId: booking.id.toValue(),
      roomingListId: roomingList.id.toValue(),
    });

    const { bookings } = await sut.execute({
      roomingListId: roomingList.id.toValue(),
    });
        
    expect(bookings.length).toBe(1);
    expect(bookings.every((b) => b instanceof Booking)).toBe(true);
  });
});

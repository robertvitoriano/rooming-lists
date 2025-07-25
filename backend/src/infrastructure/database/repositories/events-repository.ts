import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';

import { EventModel } from '../models/event.model';
import { Event } from 'src/core/entities/event';
import {
  EventWithRoomingLists,
  IEventsRepository,
} from 'src/core/repositories/IEventsRepository';
import { RoomingList } from 'src/core/entities/rooming-list';
import { PaginationParams } from 'src/core/repositories/types';
import { RoomingListFilteringOptions } from 'src/core/repositories/IRoomingListsRepository';
import { Booking } from 'src/core/entities/booking';
export class EventsRepository implements IEventsRepository {
  constructor(
    @InjectRepository(EventModel)
    private eventsRepository: Repository<EventModel>,
    private readonly dataSource: DataSource,
  ) {}
  async deleteAll(): Promise<void> {
    await this.eventsRepository.deleteAll();
  }
  async findById(eventId: string): Promise<Event | null> {
    const eventResult = await this.eventsRepository.findOne({
      where: {
        id: eventId,
      },
    });
    if (!eventResult) return null;
    const { createdAt, updatedAt, id, name } = eventResult;
    const event = new Event({ name }, { id, createdAt, updatedAt });

    return event;
  }

  async listWithRoomingLists(
    paginationParams: PaginationParams,
    filters?: RoomingListFilteringOptions,
  ): Promise<{
    eventsWithRoomingLists: EventWithRoomingLists[];
    total: number;
  }> {
    const { page, perPage, sort } = paginationParams;
    const skip = (page - 1) * perPage;

    const baseQuery = this.dataSource
      .getRepository(EventModel)
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.roomingLists', 'roomingList')
      .leftJoinAndSelect(
        'roomingList.roomingListBookings',
        'roomingListBooking',
      )
      .leftJoinAndSelect('roomingListBooking.booking', 'booking');

    const countQuery = this.dataSource
      .getRepository(EventModel)
      .createQueryBuilder('event');

    if (filters?.search) {
      baseQuery
        .andWhere('roomingList.rfp_name ILIKE :search', {
          search: `%${filters.search}%`,
        })
        .orWhere('roomingList.agreement_type ILIKE :search', {
          search: `%${filters.search}%`,
        })
        .orWhere('event.name ILIKE :search', {
          search: `%${filters.search}%`,
        });

      countQuery
        .leftJoin('event.roomingLists', 'roomingList')
        .orWhere('roomingList.rfp_name ILIKE :search', {
          search: `%${filters.search}%`,
        })
        .orWhere('roomingList.agreement_type ILIKE :search', {
          search: `%${filters.search}%`,
        })
        .orWhere('event.name ILIKE :search', {
          search: `%${filters.search}%`,
        });
    }

    const status = filters?.status;

    if (status && status.length > 0) {
      baseQuery.andWhere('roomingList.status IN (:...status)', {
        status,
      });
      if(!filters.search) countQuery.leftJoin('event.roomingLists', 'roomingList')

      countQuery
        .andWhere('roomingList.status IN (:...status)', {
          status,
        });
    }



    baseQuery.skip(skip).take(perPage).orderBy('event.createdAt', sort);

    const [result, total] = await Promise.all([
      baseQuery.getMany(),
      countQuery.getCount(),
    ]);

    const eventsWithRoomingLists: EventWithRoomingLists[] = result.map(
      ({ id, name, roomingLists }) => ({
        id,
        name,
        roomingListsWithBooking: roomingLists
          .sort((a, b) => b.cutOffDate.getTime() - a.cutOffDate.getTime())
          .map(
            ({
              agreementType,
              cutOffDate,
              eventId,
              hotelId,
              id,
              rfpName,
              status,
              createdAt,
              roomingListBookings,
            }) => ({
              roomingList: new RoomingList(
                {
                  eventId,
                  hotelId,
                  rfpName,
                  agreementType,
                  cutOffDate,
                  status,
                },
                { id, createdAt },
                { bookingsCount: roomingListBookings?.length ?? 0 },
              ),
              bookings: roomingListBookings.map(
                ({
                  booking: {
                    checkInDate,
                    checkOutDate,
                    createdAt,
                    guestName,
                    guestPhoneNumber,
                    id,
                    updatedAt,
                  },
                }) =>
                  new Booking(
                    {
                      checkInDate,
                      checkOutDate,
                      guestName,
                      guestPhoneNumber,
                    },
                    {
                      createdAt,
                      id,
                      updatedAt,
                    },
                  ),
              ),
            }),
          ),
      }),
    );

    return {
      eventsWithRoomingLists,
      total,
    };
  }

  async list(): Promise<Event[]> {
    const result = await this.eventsRepository.find();

    const events: Event[] = result.map(
      ({ id, name }) => new Event({ name }, { id }),
    );
    return events;
  }

  async findManyById(ids: string[]): Promise<Event[]> {
    const result = await this.eventsRepository.find({
      where: {
        id: In(ids),
      },
    });

    const events: Event[] = result.map(
      ({ id, name }) => new Event({ name }, { id }),
    );
    return events;
  }
  async create({ id, name }: Event) {
    const eventRecord = this.eventsRepository.create({
      id: id.toValue(),
      name,
    });

    await this.eventsRepository.save(eventRecord);
  }
}

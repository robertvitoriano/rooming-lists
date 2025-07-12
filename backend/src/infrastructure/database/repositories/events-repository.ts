import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';

import { EventModel } from '../models/event.model';
import { Event } from 'src/core/entities/event';
import {
  EventWithRoomingLists,
  IEventsRepository,
  RoomingListFilteringOptions,
} from 'src/core/repositories/IEventsRepository';
import { RoomingList } from 'src/core/entities/rooming-list';
import { PaginationParams } from 'src/core/repositories/pagination-params';
export class EventsRepository implements IEventsRepository {
  constructor(
    @InjectRepository(EventModel)
    private eventsRepository: Repository<EventModel>,
    private readonly dataSource: DataSource,
  ) {}

  async listWithRoomingLists(
    paginationParams: PaginationParams,
    filters?: RoomingListFilteringOptions,
  ): Promise<{
    eventsWithRoomingLists: EventWithRoomingLists[];
    total: number;
  }> {
    const {
      page,
      perPage
    } = paginationParams
    const baseQuery = this.dataSource
      .getRepository(EventModel)
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.roomingLists', 'roomingList')
      .leftJoinAndSelect('roomingList.roomingListBookings', 'booking');

    const countQuery = this.dataSource
      .getRepository(EventModel)
      .createQueryBuilder('event');

    if (filters?.eventName) {
      baseQuery.andWhere('event.name ILIKE :eventName', {
        eventName: `%${filters.eventName}%`,
      });

      countQuery.andWhere('event.name ILIKE :eventName', {
        eventName: `%${filters.eventName}%`,
      });
    }

    if (filters?.status) {
      baseQuery.andWhere('roomingList.status = :status', {
        status: filters.status,
      });

      countQuery
        .leftJoin('event.roomingLists', 'roomingList')
        .andWhere('roomingList.status = :status', {
          status: filters.status,
        });
    }

    const [result, total] = await Promise.all([
      baseQuery.getMany(),
      countQuery.getCount(),
    ]);

    const eventsWithRoomingLists: EventWithRoomingLists[] = result.map(
      ({ id, name, roomingLists }) => ({
        id,
        name,
        roomingLists: roomingLists.map(
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
          }) =>
            new RoomingList(
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

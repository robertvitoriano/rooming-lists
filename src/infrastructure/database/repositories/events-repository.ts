import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { EventModel } from '../models/event.model';
import { Event } from 'src/core/entities/event';
import {
  EventWithRoomingLists,
  IEventsRepository,
} from 'src/core/repositories/IEventsRepository';
import { RoomingList } from 'src/core/entities/rooming-list';
export class EventsRepository implements IEventsRepository {
  constructor(
    @InjectRepository(EventModel)
    private eventsRepository: Repository<EventModel>,
  ) {}
  async listWithRoomingLists(): Promise<EventWithRoomingLists[]> {
    const result = await this.eventsRepository.find({
      select: ['id', 'name', 'roomingLists'],
      relations: ['roomingLists'],
    });

    const events = result.map(({ id, name, roomingLists }) => ({
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
            { bookingsCount: roomingListBookings.length },
          ),
      ),
    }));

    return events;
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

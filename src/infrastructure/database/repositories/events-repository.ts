import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { EventModel } from '../models/event.model';
import { Event } from 'src/core/entities/event';
import { IEventsRepository } from 'src/core/repositories/IEventsRepository';
export class EventsRepository implements IEventsRepository {
  constructor(
    @InjectRepository(EventModel)
    private eventsRepository: Repository<EventModel>,
  ) {}

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

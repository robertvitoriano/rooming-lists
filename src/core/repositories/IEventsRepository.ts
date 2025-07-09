import { Event } from "../entities/event";

export interface EventWithEvents{
  Events:Event[]
}

export interface IEventsRepository {
  create(roomingLit: Event):Promise<void>;
  list():Promise<Event[]>
}

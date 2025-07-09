import { Event } from "../entities/event";

export interface EventWithEvents{
  Events:Event[]
}

export interface IEventsRepository {
  create(event: Event):Promise<void>;
  findManyById(ids:string[]):Promise<Event[]>
  list():Promise<Event[]>
}

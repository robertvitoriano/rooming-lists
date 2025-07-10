import { Booking } from '../entities/booking';


export interface IBookingsRepository {
  create(booking: Booking): Promise<void>;
  findManyById(ids: string[]): Promise<Booking[]>;
  list(): Promise<Booking[]>;
}

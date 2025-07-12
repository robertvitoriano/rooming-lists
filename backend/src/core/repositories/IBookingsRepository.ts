import { Booking } from '../entities/booking';
import { RoomingList } from '../entities/rooming-list';

export interface RoomingListBookingRelationIds {
  bookingId: string;
  roomingListId: string;
}
export interface BookingWithRoomingList {
  booking: Booking;
  roomingList: RoomingList;
}
export interface IBookingsRepository {
  create(booking: Booking): Promise<void>;
  findManyById(ids: string[]): Promise<Booking[]>;
  findById(id: string): Promise<Booking | null>
  findBookingsWithRoomingListByIds(
    roomingListBookingRelationIds: RoomingListBookingRelationIds,
  ): Promise<BookingWithRoomingList | null>;
  list(): Promise<Booking[]>;
  createRoomingListBooking(roomingListBookingRelationsIds:RoomingListBookingRelationIds):Promise<void>
  listByRoomingListId(roomingListId: string): Promise<Booking[]>;
  deleteAll():Promise<void>
  deleteAllRoomingListsRelations():Promise<void>


}

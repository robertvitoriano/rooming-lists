import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { RoomingListModel } from './rooming-list.model';
import { BookingModel } from './booking.model';

@Entity({ name: 'rooming_list_bookings' })
export class RoomingListBookingModel {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'rooming_list_id' })
  roomingListId: string;

  @Column({ name: 'booking_id' })
  bookingId: string;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  
  @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  
  @ManyToOne(() => RoomingListModel, (rl) => rl.roomingListBookings)
  @JoinColumn({ name: 'rooming_list_id' })
  roomingList: RoomingListModel;

  @OneToOne(() => BookingModel, (booking) => booking.roomingListBooking)
  @JoinColumn({ name: 'booking_id' })
  booking: BookingModel;
}

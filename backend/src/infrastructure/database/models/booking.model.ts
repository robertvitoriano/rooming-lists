import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { RoomingListBookingModel } from './rooming-list-bookings.model';
@Entity({name:"bookings"})

export class BookingModel {
  @PrimaryColumn()
  id: string;
  
  @Column({ name: 'guest_name' })
  guestName: string;
  
  @Column({ name: 'guest_phone_number' })
  guestPhoneNumber: string;
  
  @Column({ name: 'check_in_date' })
  checkInDate: Date;
  
  @Column({ name: 'check_out_date' })
  checkOutDate: Date;
  
  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  
  @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  
  @OneToOne(() => RoomingListBookingModel, rlb => rlb.booking)
  roomingListBooking: RoomingListBookingModel;
}

import { Column, PrimaryColumn } from 'typeorm';

export class RoomingListBookingModel {
  @PrimaryColumn()
  id: string;
  
  @Column({name:"rooming_list_id"})
  roomingListId: string
  
  @Column({name:"booking_id"})
  bookingId: string

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

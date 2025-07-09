import { Column, PrimaryColumn } from 'typeorm';

export class RoomingListModelBookingModel {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'event_id' })
  eventId: string;

  @Column({ name: 'hotel_id' })
  hotelId: string;

  @Column({ name: 'rfp_name' })
  rfpName: string;

  @Column({ name: 'cut_off_date' })
  cut0ffDate: string;

  @Column({ name: 'status' })
  status: "active" | "closed" | "cancelled";

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

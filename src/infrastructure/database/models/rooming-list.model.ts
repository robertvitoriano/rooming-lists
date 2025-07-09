import { IRoomingListAgreementType } from 'src/core/entities/value-objects/rooming-list-agreement-type';
import { IRoomingListStatus } from 'src/core/entities/value-objects/rooming-list-status';
import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EventModel } from './event.model';

@Entity()
export class RoomingListModel {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'event_id' })
  eventId: string;

  @Column({ name: 'hotel_id' })
  hotelId: string;

  @Column({ name: 'rfp_name' })
  rfpName: string;

  @Column({ name: 'cut_off_date' })
  cutOffDate: Date;

  @Column({ name: 'status' })
  status: IRoomingListStatus;

  @Column({ name: 'agreement_type' })
  agreementType: IRoomingListAgreementType;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => EventModel, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'event_id' })
  event: EventModel;
}

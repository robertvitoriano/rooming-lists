import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class RoomingListModel {

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

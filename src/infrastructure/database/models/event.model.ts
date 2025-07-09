import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RoomingListModel } from './rooming-list.model';
@Entity({name:"events"})
export class EventModel {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => RoomingListModel, (roomingList) => roomingList.event)
  roomingLists: RoomingListModel[];
}

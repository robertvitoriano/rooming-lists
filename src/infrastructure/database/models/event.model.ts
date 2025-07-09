import { Column, PrimaryColumn } from "typeorm";

export class EventModel {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;
  
    @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}

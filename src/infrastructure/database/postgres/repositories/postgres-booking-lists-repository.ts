import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomingListModel } from '../../models/rooming-list.model';
import { IRoomingListsRepository } from 'src/core/repositories/IRoomingListsRepository';
import { RoomingList } from 'src/core/entities/rooming-list';

export class PostgresRoomingListsRepository implements IRoomingListsRepository {
  constructor(
    @InjectRepository(RoomingListModel)
    private roomingListsRepository: Repository<RoomingListModel>,
  ) {}
  list(): Promise<RoomingList[]> {
    throw new Error('Method not implemented.');
  }
  async create(roominglist: RoomingList) {
    // await this.roomingListsRepository.save({
    //   id: roominglist.id,
    //   name: roominglist.name,
    //   url: roominglist.url,
    //   createdAt: roominglist.createdAt,
    //   updatedAt: roominglist.updatedAt,
    // });
  }
  async delete() {
    throw new Error('Method not implemented.');
  }
  async update() {
    throw new Error('Method not implemented.');
  }
}

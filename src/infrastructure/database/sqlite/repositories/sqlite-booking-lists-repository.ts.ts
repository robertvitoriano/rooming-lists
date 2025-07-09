import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomingListModel } from '../../models/rooming-list.model';
import { IRoomingListsRepository } from 'src/core/repositories/IRoomingListsRepository';
import { RoomingList } from 'src/core/entities/rooming-list';

export class SqliteRoomingListRepository implements IRoomingListsRepository {
  constructor(
    @InjectRepository(RoomingListModel)
    private readonly roominglistRepository: Repository<RoomingListModel>,
  ) {}
  async list(): Promise<RoomingList[]> {
    return []
  }
  async create(roominglist: RoomingList) {

  }
  async delete() {
    throw new Error('Method not implemented.');
  }
  async update() {
    throw new Error('Method not implemented.');
  }
}

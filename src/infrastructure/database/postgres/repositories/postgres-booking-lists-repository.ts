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
  async list(): Promise<RoomingList[]> {
    const result = await this.roomingListsRepository.find();

    const rommingLists: RoomingList[] = result.map(
      ({ eventId, hotelId, rfpName, status, cut0ffDate, agreementType, id }) =>
        RoomingList.create(
          {
            eventId,
            hotelId,
            rfpName,
            status,
            cut0ffDate,
            agreementType,
          },
          id,
        ),
    );
    return rommingLists;
  }
  async create({
    agreementType,
    cutOffDate,
    eventId,
    hotelId,
    rfpName,
    status,
    createdAt,
    updatedAt,
  }: RoomingList) {
    await this.roomingListsRepository.save({
      agreementType,
      cutOffDate,
      eventId,
      hotelId,
      rfpName,
      status,
      createdAt,
      updatedAt,
    });
  }
  async delete() {
    throw new Error('Method not implemented.');
  }
  async update() {
    throw new Error('Method not implemented.');
  }
}

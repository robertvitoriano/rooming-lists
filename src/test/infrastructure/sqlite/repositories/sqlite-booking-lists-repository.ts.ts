import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomingListModel } from '../../../../infrastructure/database/models/rooming-list.model';
import { IRoomingListsRepository } from 'src/core/repositories/IRoomingListsRepository';
import { RoomingList } from 'src/core/entities/rooming-list';

export class SqliteRoomingListRepository implements IRoomingListsRepository {
  constructor(
    @InjectRepository(RoomingListModel)
    private readonly roomingListsRepository: Repository<RoomingListModel>,
  ) {}
  async list(): Promise<RoomingList[]> {
    const result = await this.roomingListsRepository.find();

    const rommingLists: RoomingList[] = result.map(
      ({ eventId, hotelId, rfpName, status, cutOffDate, agreementType, id }) =>
        new RoomingList(
          {
            eventId,
            hotelId,
            rfpName,
            status,
            cutOffDate,
            agreementType,
          },
          { id },
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
    id,
  }: RoomingList) {
    const roomingListRecord = this.roomingListsRepository.create({
      agreementType,
      cutOffDate,
      eventId,
      hotelId,
      rfpName,
      status,
      id: id.toValue(),
    });
    await this.roomingListsRepository.save(roomingListRecord);
  }
  async delete() {
    throw new Error('Method not implemented.');
  }
  async update() {
    throw new Error('Method not implemented.');
  }
}

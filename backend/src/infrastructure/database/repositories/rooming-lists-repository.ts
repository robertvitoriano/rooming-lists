import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RoomingListModel } from '../models/rooming-list.model';
import { IRoomingListsRepository } from 'src/core/repositories/IRoomingListsRepository';
import { RoomingList } from 'src/core/entities/rooming-list';
import { PaginationParams } from 'src/core/repositories/pagination-params';

export class RoomingListsRepository implements IRoomingListsRepository {
  constructor(
    @InjectRepository(RoomingListModel)
    private roomingListsRepository: Repository<RoomingListModel>,
  ) {}
  async findManyByEventId(
    eventId: string,
    paginationParams: PaginationParams,
  ): Promise<{ roomingLists: RoomingList[]; total: number }> {
    const { page, perPage } = paginationParams;

    const skip = (page - 1) * perPage;
    const take = perPage;

    const [roomingLists, total] =
      await this.roomingListsRepository.findAndCount({
        where: { eventId },
        skip,
        take,
        order: { createdAt: 'DESC' },
      });

    return {
      total,
      roomingLists: roomingLists.map(
        ({
          id,
          agreementType,
          createdAt,
          cutOffDate,
          eventId,
          hotelId,
          rfpName,
          status,
          updatedAt,
        }) =>
          new RoomingList(
            {
              agreementType,
              cutOffDate,
              eventId,
              hotelId,
              rfpName,
              status,
            },
            { id, createdAt, updatedAt },
          ),
      ),
    };
  }

  async findById(roomingListId: string): Promise<RoomingList | null> {
    const result = await this.roomingListsRepository.findOne({
      where: {
        id: roomingListId,
      },
    });

    if (!result) return null;

    const {
      id,
      agreementType,
      createdAt,
      cutOffDate,
      eventId,
      hotelId,
      rfpName,
      status,
      updatedAt,
    } = result;

    const roomingList = new RoomingList(
      {
        agreementType,
        cutOffDate,
        eventId,
        hotelId,
        rfpName,
        status,
      },
      { id, createdAt, updatedAt },
    );

    return roomingList;
  }

  findByEvent(): Promise<void> {
    throw new Error('Method not implemented.');
  }
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
      id: id.toValue(),
      agreementType,
      cutOffDate,
      eventId,
      hotelId,
      rfpName,
      status,
    });
    await this.roomingListsRepository.save(roomingListRecord);
  }

  async findManyById(ids: string[]): Promise<RoomingList[]> {
    const result = await this.roomingListsRepository.find({
      where: {
        id: In(ids),
      },
    });

    const roomingLists: RoomingList[] = result.map(
      ({
        id,
        agreementType,
        createdAt,
        cutOffDate,
        eventId,
        hotelId,
        rfpName,
        status,
        updatedAt,
      }) =>
        new RoomingList(
          {
            agreementType,
            cutOffDate,
            eventId,
            hotelId,
            rfpName,
            status,
          },
          { id, createdAt, updatedAt },
        ),
    );
    return roomingLists;
  }
  async delete() {
    throw new Error('Method not implemented.');
  }
  async update() {
    throw new Error('Method not implemented.');
  }
}

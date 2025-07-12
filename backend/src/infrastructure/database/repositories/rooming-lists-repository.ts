import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RoomingListModel } from '../models/rooming-list.model';
import {
  IRoomingListsRepository,
  RoomingListFilteringOptions,
} from 'src/core/repositories/IRoomingListsRepository';
import { RoomingList } from 'src/core/entities/rooming-list';
import { PaginationParams, Sorting } from 'src/core/repositories/types';

export class RoomingListsRepository implements IRoomingListsRepository {
  constructor(
    @InjectRepository(RoomingListModel)
    private roomingListsRepository: Repository<RoomingListModel>,
  ) {}
  async deleteAll(): Promise<void> {
    await this.roomingListsRepository.deleteAll();
  }
  async findManyByEventId(
    eventId: string,
    paginationParams: PaginationParams,
    filters?: RoomingListFilteringOptions,
  ): Promise<{ roomingLists: RoomingList[]; total: number }> {
    const { page, perPage, sort } = paginationParams;
    const skip = (page - 1) * perPage;
    const take = perPage;

    const query = this.roomingListsRepository
      .createQueryBuilder('roomingList')
      .where('roomingList.eventId = :eventId', { eventId });

    if (filters?.rfpName) {
      query.andWhere('roomingList.rfpName ILIKE :rfpName', {
        rfpName: `%${filters.rfpName}%`,
      });
    }

    if (filters?.status) {
      query.andWhere('roomingList.status = :status', { status: filters.status });
    }

    if (filters?.aggrementType) {
      query.andWhere('roomingList.agreementType = :aggrementType', {
        aggrementType: filters.aggrementType,
      });
    }

    const [roomingLists, total] = await query
      .orderBy('roomingList.cutOffDate', sort)
      .skip(skip)
      .take(take)
      .getManyAndCount();

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

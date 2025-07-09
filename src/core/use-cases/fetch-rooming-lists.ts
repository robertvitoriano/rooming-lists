import { Injectable } from '@nestjs/common';
import { RoomingList } from '../entities/rooming-list';
import { IRoomingListsRepository } from '../repositories/IRoomingListsRepository';
interface FetchRoomingListsRequest {}
interface FetchRoomingListsResponse {
  roomingLists: RoomingList[];
}
export class FetchRoomingListsUseCase {
  constructor(
    private readonly roominglistRepository: IRoomingListsRepository,
  ) {}
  async execute(
    params: FetchRoomingListsRequest,
  ): Promise<FetchRoomingListsResponse> {
    const roomingLists = await this.roominglistRepository.list();

    return { roomingLists };
  }
}

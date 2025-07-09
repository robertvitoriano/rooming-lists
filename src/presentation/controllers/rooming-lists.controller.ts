import { Controller, Get } from '@nestjs/common';
import { FetchRoomingListsUseCase } from 'src/core/use-cases/fetch-rooming-lists';

@Controller('/rooming-lists')
export class RoomingListsController {
  constructor(
    private readonly fetchRoomingListsUseCase: FetchRoomingListsUseCase,
  ) {}
  
  @Get("/")
  async fetchRoomingLists() {
    await this.fetchRoomingListsUseCase.execute({});
  }
  // async fetchRoomingListsByEvents() {
  //   await this.fetchRoomingListsUseCase.execute();
  // }
  // async fetchRoomingListsByEvent() {
  //   await this.fetchRoomingListsUseCase.execute();
  // }

  // async createRoomingListsFromUpload() {
  //   await this.fetchRoomingListsUseCase.execute();
  // }
}

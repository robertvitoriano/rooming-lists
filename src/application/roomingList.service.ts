import { Injectable } from '@nestjs/common';
import { FetchRoomingListsUseCase } from 'src/core/use-cases/fetch-rooming-lists';

@Injectable()
export class RoomingListService  {
  constructor(
    private readonly listRoomingListsUseCase: FetchRoomingListsUseCase,
  ) {
  }

}

import { Injectable } from '@nestjs/common';
import { ListRoomingListsUseCase } from 'src/core/use-cases/list-rooming-lists-use-case';

@Injectable()
export class RoomingListService  {
  constructor(
    private readonly listRoomingListsUseCase: ListRoomingListsUseCase,
  ) {
  }

}

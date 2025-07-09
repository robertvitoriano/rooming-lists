import { IRoomingListsRepository } from '../repositories/IRoomingListsRepository';

interface FetchRoomingListByEventsRequest {}
interface FetchRoomingListByEventsResponse {}
export class FetchRoomingListByEventsUseCase {
  constructor(
    private readonly roominglistRepository: IRoomingListsRepository,
  ) {}
  async execute(
    params: FetchRoomingListByEventsRequest,
  ): Promise<FetchRoomingListByEventsResponse> {
    const roomingListsByEvents = await this.roominglistRepository.listByEvents();

    return { roomingListsByEvents };
  }
}

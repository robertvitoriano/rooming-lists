import { IBookingsRepository } from "../repositories/IBookingsRepository";
import { IEventsRepository } from "../repositories/IEventsRepository";
import { IRoomingListsRepository } from "../repositories/IRoomingListsRepository";

export class TruncateDatabaseUseCase {
  constructor(
    private readonly eventsRepository: IEventsRepository,
    private readonly roomingListsRepository: IRoomingListsRepository,
    private readonly bookingsRepository: IBookingsRepository,
  ) {}

  async execute(): Promise<void> {
    await this.bookingsRepository.deleteAllRoomingListsRelations()
    await this.eventsRepository.deleteAll();
    await this.bookingsRepository.deleteAll();
    await this.roomingListsRepository.deleteAll();
  }
}

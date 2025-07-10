import { Inject } from '@nestjs/common';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { BookingData, BookingRoomingListRelationData, CreateBookingsUseCase } from 'src/core/use-cases/create-bookings';
import {
  CreateEventsAndRoomingListsUseCase,
  EventRoomingListData,
} from 'src/core/use-cases/create-events-and-rooming-lists';

export class SeedEventsAndRoomingLists {
  constructor(
    @Inject(CreateEventsAndRoomingListsUseCase)
    private readonly createRoomingListsAndEventsUseCase: CreateEventsAndRoomingListsUseCase,
    private readonly createBookingsUseCase: CreateBookingsUseCase,
  ) {}
  async handle() {
    const roomingListsRawData = JSON.parse(
      readFileSync(
        resolve(__dirname, '..', '..', '..', 'data', 'rooming-lists.json'),
        'utf-8',
      ),
    );
    const eventRoomingLists: EventRoomingListData[] = roomingListsRawData.map(
      ({ agreement_type, ...rest }) => ({
        agreementType: agreement_type,
        ...rest,
      }),
    );
    await this.createRoomingListsAndEventsUseCase.execute({
      eventRoomingLists,
    });

    const bookings: BookingData[] = JSON.parse(
      readFileSync(
        resolve(__dirname, '..', '..', '..', 'data', 'bookings.json'),
        'utf-8',
      ),
    );
    const roomingListBookingRelations: BookingRoomingListRelationData[] = JSON.parse(
      readFileSync(
        resolve(__dirname, '..', '..', '..', 'data', 'rooming-list-bookings.json'),
        'utf-8',
      ),
    );
    await this.createBookingsUseCase.execute({
      bookings,
      roomingListBookingRelations
    });
  }
}

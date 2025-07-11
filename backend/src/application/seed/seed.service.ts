import { Inject } from '@nestjs/common';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { IRoomingListAgreementType, RoomingListAgreementType } from 'src/core/entities/value-objects/rooming-list-agreement-type';
import { IRoomingListStatus } from 'src/core/entities/value-objects/rooming-list-status';
import { BookingData, BookingRoomingListRelationData, CreateBookingsUseCase } from 'src/core/use-cases/create-bookings';
import {
  CreateEventsAndRoomingListsUseCase,
  EventRoomingListData,
} from 'src/core/use-cases/create-events-and-rooming-lists';
import { FileReaderService } from 'src/infrastructure/file/file-reader.service';

export interface RoomingListItem {
  roomingListId: number;
  eventId: number;
  eventName: string;
  hotelId: number;
  rfpName: string;
  cutOffDate: string;
  status: IRoomingListStatus;
  agreement_type: IRoomingListAgreementType;
}

export class SeedService {
  constructor(
    @Inject(CreateEventsAndRoomingListsUseCase)
    private readonly createRoomingListsAndEventsUseCase: CreateEventsAndRoomingListsUseCase,
    private readonly createBookingsUseCase: CreateBookingsUseCase,
    private readonly fileReaderService:FileReaderService
  ) {}
  async handle() {
    
    const roomingListsRawData = this.fileReaderService.readJson<RoomingListItem[]>('data/rooming-lists.json')
    
    const eventRoomingLists:EventRoomingListData[] = roomingListsRawData.map(
      ({ agreement_type, ...rest }) => ({
        ...rest,
        agreementType: agreement_type,
      }),
    );
    await this.createRoomingListsAndEventsUseCase.execute({
      eventRoomingLists,
    });

    const bookings = this.fileReaderService.readJson<BookingData[]>('data/bookings.json')
    const roomingListBookingRelations = this.fileReaderService.readJson<BookingRoomingListRelationData[]>('data/rooming-list-bookings.json')
    
    await this.createBookingsUseCase.execute({
      bookings,
      roomingListBookingRelations
    });
  }
}

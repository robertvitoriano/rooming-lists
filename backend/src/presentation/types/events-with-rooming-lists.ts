import { IRoomingListAgreementType } from "src/core/entities/value-objects/rooming-list-agreement-type";
import { IRoomingListStatus } from "src/core/entities/value-objects/rooming-list-status";

export type EventWithRoomingListResponseData = {
  id: string;
  name: string;
  roomingLists: RoomingListResponseData[];
};

export type RoomingListResponseData = {
  id: string;
  agreementType: IRoomingListAgreementType;
  createdAt: Date;
  cutOffDate: Date;
  eventId: string;
  hotelId: string;
  rfpName: string;
  status:  IRoomingListStatus;
  updatedAt: Date;
  bookingsCount: number;
};

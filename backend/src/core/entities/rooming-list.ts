import { Booking } from './booking';
import { CoreEntity, OptionalProps } from './core-entity';
import { IRoomingListAgreementType } from './value-objects/rooming-list-agreement-type';
import { IRoomingListStatus } from './value-objects/rooming-list-status';

interface RoomingListProps {
  eventId: string;
  hotelId: string;
  rfpName: string;
  cutOffDate: Date;
  status: IRoomingListStatus;
  agreementType: IRoomingListAgreementType;
}
interface RoomingListMetadata {
  bookingsCount?: number;
  startDate?: Date;
  endDate?: Date;
}

export class RoomingList extends CoreEntity<RoomingListProps> {
  private metadata?: RoomingListMetadata = {};

  constructor(
    props: RoomingListProps,
    optional?: OptionalProps,
    metadata?: RoomingListMetadata,
  ) {
    super(props, optional);
    this.metadata = metadata;
  }

  get eventId() {
    return this.props.eventId;
  }

  get hotelId() {
    return this.props.hotelId;
  }

  get rfpName() {
    return this.props.rfpName;
  }

  get cutOffDate() {
    return this.props.cutOffDate;
  }

  get status() {
    return this.props.status;
  }

  get agreementType() {
    return this.props.agreementType;
  }
  get bookingsCount(): number {
    return this.metadata?.bookingsCount ?? 0;
  }
  set bookingsCount(count: number) {
    this.bookingsCount = count;
  }
  get startDate(): Date | void {
    return this.metadata?.startDate;
  }
  get endDate(): Date | void {
    return this.metadata?.endDate;
  }

  setStartAndEndDateBasedOnBookings(bookings: Booking[]) {
    if (bookings.length === 0) {
      return;
    }

    const checkInDates = bookings.map((b) => new Date(b.checkInDate));
    const checkOutDates = bookings.map((b) => new Date(b.checkOutDate));

    const earliestCheckIn = new Date(
      Math.min(...checkInDates.map((date) => date.getTime())),
    );
    const latestCheckOut = new Date(
      Math.max(...checkOutDates.map((date) => date.getTime())),
    );

    if (!this.metadata) {
      this.metadata = {};
    }

    this.metadata.startDate = earliestCheckIn;
    this.metadata.endDate = latestCheckOut;
  }
}

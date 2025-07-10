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
  bookingsCount: number;
}

export class RoomingList extends CoreEntity<RoomingListProps> {
  private readonly metadata?: RoomingListMetadata;

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
}

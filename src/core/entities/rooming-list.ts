import { CoreEntity } from './core-entity';
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

export class RoomingList extends CoreEntity<RoomingListProps> {

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
}

import { CoreEntity } from './core-entity';

interface BookingProps {
  guestName: string;
  guestPhoneNumber: string;
  checkInDate: Date;
  checkOutDate: Date;
}
export class Booking extends CoreEntity<BookingProps> {

  get guestName() {
    return this.props.guestName;
  }
  
  get guestPhoneNumber() {
    return this.props.guestPhoneNumber;
  }
  
  get checkInDate() {
    return this.props.checkInDate;
  }
  
  get checkOutDate() {
    return this.props.checkOutDate;
  }
}

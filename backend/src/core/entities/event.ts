import { CoreEntity } from "./core-entity";

interface EventProps {
  name:string
}
export class Event extends CoreEntity<EventProps>{

  get name(){
    return this.props.name
  }
}

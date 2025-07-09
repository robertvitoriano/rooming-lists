import { CoreEntity } from "./core-entity";

interface EventProps {
  name:string
}
export class Event extends CoreEntity<EventProps>{
  
  static create(props:EventProps):Event{
    return new Event(props)
  }
  
  get name(){
    return this.props.name
  }
}

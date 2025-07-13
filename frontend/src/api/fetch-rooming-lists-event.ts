import { api } from "@/lib/axios"
import {  Response } from "./types"
import { RoomingList } from "./fetchEvents"

export interface RoomingListData extends Response {
  data: RoomingList[]
}

export async function fetchRoomingListsByEvent(
  eventId:string,
  cutOffDateSort:string
): Promise<RoomingListData> {
  const response = await api.get<RoomingListData>(`/events/${eventId}/rooming-lists`,{
    params:{
      sort:cutOffDateSort
    }
  })
  return response.data
}

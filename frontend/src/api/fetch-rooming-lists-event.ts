import { api } from "@/lib/axios"
import {  Response } from "./types"
import { RoomingList } from "./fetchEvents"

export interface RoomingListData extends Response {
  data: RoomingList[]
}

export type FetchByEventParams  = {
  
  eventId: string,
  cutOffDateSort: string
  search: string
  status: string[]
}

export async function fetchRoomingListsByEvent({eventId, cutOffDateSort, search, status}:FetchByEventParams): Promise<RoomingListData> {
  const response = await api.get<RoomingListData>(`/events/${eventId}/rooming-lists`,{
    params:{
      sort:cutOffDateSort, 
      search,
      status
    }
  })
  return response.data
}

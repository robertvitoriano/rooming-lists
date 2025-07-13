import { api } from "@/lib/axios"
import { PaginationParams, Response } from "./types"
export type Event = {
  id: string
  name: string
  roomingLists: RoomingList[]
}
export interface EventsReponseData extends Response {
  data: Event[]
}

export type RoomingList = {
  id: string
  name: string
  agreementType: string
  cutOffDate: string
  rfpName: string
  createdAt: string
  updatedAt: string
  bookingsCount: number
}

export type EventFilters = {
  search: string
  status: string[]
}

export async function fetchBookingsByRoomingList(
  roomingListId:string
): Promise<EventsReponseData> {
  const response = await api.get<EventsReponseData>(`/rooming-lists/${roomingListId}/bookings`)
  console.log(response.data.data)
  return response.data
}

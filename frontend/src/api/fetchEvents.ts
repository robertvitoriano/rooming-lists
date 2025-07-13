import { api } from "@/lib/axios"
import { Response } from "./types"
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
  eventName: string
  agreementType: string
  status: string
  rfpName: string
}
export type PaginationParams = {
  page: number
  perPage?: number
}

export async function fetchEvents(
  paginationParams: PaginationParams,
  filters?: EventFilters
): Promise<EventsReponseData> {
  const response = await api.get<EventsReponseData>("/events", {
    params: {
      ...(paginationParams ? paginationParams: {}),
      ...(filters ? filters: {})

    },
  })
  return response.data
}

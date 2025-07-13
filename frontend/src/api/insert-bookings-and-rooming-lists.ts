import { api } from "@/lib/axios"

export const insertBookingsAndRoomingLists = async () => {
  
 await  api.post("/seed")
  
}

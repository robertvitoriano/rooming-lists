import { api } from "@/lib/axios";


export async function fetchEvents(){
  const response = await api.get('/events')
  return response.data
}

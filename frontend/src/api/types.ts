export interface Response {
  data?: any
  meta?: Meta
  message: string
}
export type Meta = {
  pagination?: Pagination
  total?: number
  [key: string]: any
}

export interface Pagination {
  currentPage: number
  perPage: number
  currentPageTotal: number
  totalPages: number
}
export type PaginationParams = {
  page: number
  perPage?: number
}

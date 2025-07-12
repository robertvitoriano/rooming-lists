export interface ControllerResponse<T> {
  data: T;
  meta?: {
    total?: number;
    pagination?: PaginationResponse;
    [key: string]: any; 
  };
  message?: string;
}
export interface PaginationResponse {
  currentPage: number;
  currentPageTotal: number;
  totalPages: number;
  perPage: number;
}

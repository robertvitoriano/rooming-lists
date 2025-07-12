export type Sorting = 'DESC' | 'ASC';
export interface PaginationParams {
  page: number;
  perPage: number;
  sort: Sorting;
}


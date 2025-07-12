export enum Sorting {
  ASC = 'ASC',
  DESC = 'DESC',
}export interface PaginationParams {
  page: number;
  perPage: number;
  sort: Sorting;
}


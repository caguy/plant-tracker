export type IPaginated<T> = {
  total: number;
  page: number;
  totalPages: number;
  perPage: number;
  items: T[];
};

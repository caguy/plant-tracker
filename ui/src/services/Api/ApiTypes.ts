import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export type FetchFunction = <T>(
  endpoint: string,
  options?: AxiosRequestConfig | undefined
) => Promise<AxiosResponse<T>>;

type Error = {
  error: string;
  message: string;
  statusCode: number;
};

export type ApiError = AxiosError<Error> & { displayMessage?: string };

export type ErrorResponse = AxiosError<Error>;

export type ApiList<T> = {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
  perPage: number;
};

export type ApiBaseRaw = {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiBase = Omit<ApiBaseRaw, "createdAt" | "updatedAt"> & {
  createdAt: Date;
  updatedAt: Date;
};

export type PaginationRequest = {
  page: number | null;
  perPage: number | null;
  sort: string | null;
};

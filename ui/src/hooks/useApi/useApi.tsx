import React from "react";
import { useUser } from "@/hooks";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { ApiService } from "@/services";
import { useQuery } from "react-query";

const useApi = () => {
  const { accessToken, logout, isAuthenticated } = useUser();

  const fetch = React.useCallback(
    async <T,>(endpoint: string, options?: AxiosRequestConfig) => {
      const authorization = !!accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : undefined;
      const headers = {
        ...authorization,
        ...options?.headers,
      };
      try {
        return await axios.request<T>({
          ...options,
          headers,
          baseURL: process.env.API_BASE_URI,
          url: endpoint,
        });
      } catch (err) {
        if ((err as AxiosError).response?.status === 401 && isAuthenticated) {
          logout();
        }
        throw err;
      }
    },
    [accessToken, isAuthenticated, logout]
  );

  const apiServices = ApiService(fetch);

  return {
    ...apiServices,
    useGetAllPlants: () => useQuery(["getAllPlants"], apiServices.getAllPlants),
  };
};

export default useApi;

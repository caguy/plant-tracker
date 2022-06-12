import React from "react";
import { useUser } from "@/hooks";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { ApiError, ApiService } from "@/services";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Plant } from "@/services/Api/PlantService";

const useApi = () => {
  const { accessToken, logout, isAuthenticated } = useUser();
  const queryClient = useQueryClient();

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
    useGetAllPlants: () =>
      useQuery(["getAllPlants"], apiServices.getAllPlants, {
        staleTime: 60000,
      }),
    useCreatePlant: () =>
      useMutation((props: { name: string }) => apiServices.createPlant(props), {
        onSuccess: () => {
          queryClient.refetchQueries(["getAllPlants"]);
        },
      }),
    useGetPlantById: (id: string) =>
      useQuery<Plant, ApiError>(["getPlantById", { id }], () =>
        apiServices.getPlantById(id)
      ),
    useUpdatePlant: () =>
      useMutation(
        (props: { id: string; data: Partial<Plant> }) =>
          apiServices.updatePlant(props.id, props.data),
        {
          onSuccess: (result) => {
            queryClient.refetchQueries(["getAllPlants"]);
            queryClient.setQueryData(
              ["getPlantById", { id: result._id }],
              result
            );
          },
        }
      ),
    useDeletePlant: () =>
      useMutation((id: string) => apiServices.deletePlant(id), {
        onSuccess: () => {
          queryClient.refetchQueries(["getAllPlants"]);
        },
      }),
  };
};

export default useApi;

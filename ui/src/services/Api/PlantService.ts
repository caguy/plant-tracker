import { ApiBase, ApiBaseRaw, FetchFunction } from "./ApiTypes";

export type PlantBaseRaw = {
  name: string;
  leaves: void[];
};

export type PlantRaw = ApiBaseRaw & PlantBaseRaw;

export type Plant = ApiBase & PlantBaseRaw;

const transformPlant = (plant: PlantRaw): Plant => ({
  ...plant,
  createdAt: new Date(plant.createdAt),
  updatedAt: new Date(plant.updatedAt),
});

export default (fetch: FetchFunction) => ({
  getAllPlants: async (): Promise<Plant[]> => {
    const plants = (await fetch<PlantRaw[]>("/plants")).data;
    return plants.map((plant) => transformPlant(plant));
  },
  createPlant: async (props: { name: string }): Promise<Plant> => {
    const plant = (
      await fetch<PlantRaw>("/plants", {
        method: "POST",
        data: props,
      })
    ).data;
    return transformPlant(plant);
  },
  getPlantById: async (id: string): Promise<Plant> => {
    const plant = (await fetch<PlantRaw>(`/plants/${id}`)).data;
    return transformPlant(plant);
  },
  updatePlant: async (id: string, data: Partial<Plant>): Promise<Plant> => {
    const plant = (
      await fetch<PlantRaw>(`/plants/${id}`, { method: "PATCH", data })
    ).data;
    return transformPlant(plant);
  },
  deletePlant: async (id: string): Promise<void> => {
    await fetch<PlantRaw>(`/plants/${id}`, { method: "DELETE" });
  },
});

import { FetchFunction } from "./ApiTypes";

export type Plant = {
  _id: string;
  name: string;
  leaves: void[];
};

export default (fetch: FetchFunction) => ({
  getAllPlants: async () => {
    return (await fetch<Plant[]>("/plants")).data;
  },
  createPlant: async (props: { name: string }) => {
    return (
      await fetch<Plant>("/plants", {
        method: "POST",
        data: props,
      })
    ).data;
  },
});

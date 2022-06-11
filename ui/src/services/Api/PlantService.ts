import { FetchFunction } from "./ApiTypes";

export default (fetch: FetchFunction) => ({
  getTMP: async () => await fetch<null>("/"),
  getAllPlants: async () => {
    return Promise.resolve([
      { id: "A", name: "Plante 1" },
      { id: "B", name: "Plante 2" },
    ]);
  },
});

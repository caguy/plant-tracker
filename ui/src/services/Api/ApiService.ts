import { FetchFunction } from "./ApiTypes";
import AuthenticationService from "./AuthenticationService";
import PlantService from "./PlantService";

export default (fetch: FetchFunction) => ({
  ...AuthenticationService(fetch),
  ...PlantService(fetch),
});

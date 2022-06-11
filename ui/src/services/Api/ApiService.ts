import { FetchFunction } from "./ApiTypes";
import AuthenticationService from "./AuthenticationService";

export default (fetch: FetchFunction) => ({
  ...AuthenticationService(fetch),
});

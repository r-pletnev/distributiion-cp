import * as api from "./Endpoints";

export function GetProfiles() {
  return api.client.get(api.GET_PROFILES_URL);
}

import * as api from "./Endpoints.js";

export function GetAdblocks(data) {
  return api.client.post(api.GET_ADBLOCKS_URL, data);
}

export function SetAdblocks(data) {
  return api.client.post(api.SET_ADBLOCKS_URL, data);
}

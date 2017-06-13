import * as api from "./Endpoints.js";

export function AddAge(data) {
  return api.client.post(api.ADD_AGE_URL, data);
}

export function GetAges() {
  return api.client.post(api.GET_AGES_URL);
}

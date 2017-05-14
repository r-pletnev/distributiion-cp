import * as api from "./Endpoints";

export function AddOS(data) {
  return api.client.post(api.ADD_OS_URL, data);
}

export function GetOSES() {
  return api.client.get(api.GET_OSES_URL);
}

export function RemoveOSES(data) {
  return api.client.post(api.REMOVE_OSES_URL, data);
}

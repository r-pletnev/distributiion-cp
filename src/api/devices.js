import * as api from "./Endpoints";

export function AddDevice(data) {
  return api.client.post(api.ADD_DEVICE_URL, data);
}

export function GetDevices() {
  return api.client.get(api.GET_DEVICES_URL);
}

import * as api from "./Endpoints";

export function AddDevice(data) {
  return api.client.post(api.ADD_DEVICE_URL, data);
}

export function GetDevices() {
  return api.client.get(api.GET_DEVICES_URL);
}

export function RemoveDevices(data) {
  return api.client.post(api.REMOVE_DEVICES_URL, data);
}

export function GetDevicePriorities(data) {
  return api.client.post(api.GET_DEVICE_PRIORITIES_URL, data);
}

export function SetDevicePriorities(data) {
  return api.client.post(api.SET_DEVICE_PRIORITIES_URL, data);
}

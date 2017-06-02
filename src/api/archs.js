import * as api from "./Endpoints";

export function AddArch(data) {
  return api.client.post(api.ADD_ARCH_URL, data);
}

export function GetArchs() {
  return api.client.get(api.GET_ARCHS_URL);
}

export function RemoveArchs(data) {
  return api.client.post(api.REMOVE_ARCHS_URL, data);
}

export function GetArchPriorities(data) {
  return api.client.post(api.GET_ARCH_PRIORITIES_URL, data);
}

export function SetArchPriority(data) {
  return api.client.post(api.SET_ARCH_PRIORITY_URL, data);
}

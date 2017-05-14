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

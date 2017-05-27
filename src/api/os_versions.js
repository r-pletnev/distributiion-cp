import * as api from "./Endpoints";

export function AddOSVersion(data) {
  return api.client.post(api.ADD_OS_VERSION_URL, data);
}

export function GetOSVersions() {
  return api.client.get(api.GET_OS_VERSIONS_URL);
}

export function RemoveOSVersions(data) {
  return api.client.post(api.REMOVE_OS_VERSIONS_URL, data);
}

export function GetOsVersionPriorities(data) {
  return api.client.post(api.GET_OS_VERSION_PRIORITIES_URL, data);
}

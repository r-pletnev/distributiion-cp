import * as api from "./Endpoints";

export function AddOSVersion(data) {
  return api.client.post(api.ADD_OS_VERSION_URL, data);
}

export function GetOSVersions() {
  return api.client.get(api.GET_OS_VERSIONS_URL);
}

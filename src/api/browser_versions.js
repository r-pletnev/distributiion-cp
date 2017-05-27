import * as api from "./Endpoints";

export function AddBrowserVersion(data) {
  return api.client.post(api.ADD_BROWSER_VERSION_URL, data);
}

export function GetBrowserVersions() {
  return api.client.get(api.GET_BROWSER_VERSIONS_URL);
}

export function RemoveBrowserVersions(data) {
  return api.client.post(api.REMOVE_BROWSER_VERSIONS_URL, data);
}

export function GetBrowserVersionPriorities(data) {
  return api.client.post(api.GET_BROWSER_VERSION_PRIORITIES_URL, data);
}

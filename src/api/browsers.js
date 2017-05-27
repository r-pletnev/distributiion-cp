import * as api from "./Endpoints";

export function AddBrowser(data) {
  return api.client.post(api.ADD_BROWSER_URL, data);
}

export function GetBrowsers() {
  return api.client.get(api.GET_BROWSERS_URL);
}

export function RemoveBrowsers(data) {
  return api.client.post(api.REMOVE_BROWSERS_URL, data);
}

export function GetBrowserPriorities(data) {
  return api.client.post(api.GET_BROWSER_PRIORITIES_URL, data);
}

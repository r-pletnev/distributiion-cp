import * as api from "./Endpoints";

export function AddBrowserPanel(data) {
  return api.client.post(api.ADD_BROWSER_PANEL_URL, data);
}

export function GetBrowserPanels() {
  return api.client.get(api.GET_BROWSER_PANELS_URL);
}

export function RemoveBrowserPanels(data) {
  return api.client.post(api.REMOVE_BROWSER_PANELS_URL, data);
}

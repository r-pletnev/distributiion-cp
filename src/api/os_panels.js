import * as api from "./Endpoints";

export function AddOSPanel(data) {
  return api.client.post(api.ADD_OS_PANEL_URL, data);
}

export function GetOSPanels() {
  return api.client.get(api.GET_OS_PANELS_URL);
}

export function RemoveOSPanels(data) {
  return api.client.post(api.REMOVE_OS_PANELS_URL, data);
}

import * as api from "./Endpoints";

export function AddScreen(data) {
  return api.client.post(api.ADD_SCREEN_URL, data);
}

export function GetScreens() {
  return api.client.get(api.GET_SCREENS_URL);
}

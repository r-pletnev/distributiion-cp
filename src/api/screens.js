import * as api from "./Endpoints";

export function AddScreen(data) {
  return api.client.post(api.ADD_SCREEN_URL, data);
}

export function GetScreens() {
  return api.client.get(api.GET_SCREENS_URL);
}

export function RemoveScreens(data) {
  return api.client.post(api.REMOVE_SCREENS_URL, data);
}

export function GetScreenPriorities(data){
  return api.client.post(api.GET_SCREEN_PRIORITIES_URL, data)
}

export function SetScreenPriority(data){
  return api.client.post(api.SET_SCREEN_PRIORITY_URL, data)
}


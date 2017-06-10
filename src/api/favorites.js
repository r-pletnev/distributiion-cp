import * as api from "./Endpoints";

export function AddFavorite(data) {
  return api.client.post(api.ADD_FAVORITE_URL, data);
}

export function GetFavorites() {
  return api.client.post(api.GET_FAVORITES_URL);
}

export function RemoveFavorites(data) {
  return api.client.post(api.REMOVE_FAVORITES_URL, data);
}

export function GetFavoritePriorities(data) {
  return api.client.post(api.GET_FAVORITE_PRIORITIES_URL, data);
}

export function SetFavoritePriorities(data) {
  return api.client.post(api.SET_FAVORITE_PRIORITY_URL, data);
}

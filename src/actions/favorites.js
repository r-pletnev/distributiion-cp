import {
  AddFavorite,
  GetFavorites,
  RemoveFavorites,
  GetFavoritePriorities,
  SetFavoritePriorities
} from "../api/favorites";
import {
  ADD_FAVORITE_SUCCESS,
  GET_ALL_FAVORITES_SUCCESS,
  REMOVE_FAVORITES_SUCCESS,
  GET_FAVORITE_PRIORITIES_SUCCESS,
  SET_FAVORITE_PRIORITIES_SUCCESS
} from "../constants/favorites";

export function fetchAllFavorites() {
  return dispatch => {
    return GetFavorites()
      .then(response => {
        dispatch(fetchAllFavoritesSuccess(response.data));
      })
      .catch(error => {
        console.error(error);
      });
  };
}

function fetchAllFavoritesSuccess(payload) {
  const favorites = payload.map(elm => ({
    id: elm.favorite_id,
    name: elm.name
  }));
  return {
    type: GET_ALL_FAVORITES_SUCCESS,
    payload: favorites
  };
}

export function fetchAddFavorite(nameOb, onSuccess) {
  return dispatch => {
    return AddFavorite(nameOb)
      .then(response => {
        onSuccess();
        dispatch(addFavoriteSuccess(response.data));
      })
      .catch(error => {
        console.error(error);
      });
  };
}

function addFavoriteSuccess(payload) {
  const { favorite_id, name } = payload;
  return {
    type: ADD_FAVORITE_SUCCESS,
    payload: {
      id: favorite_id,
      name
    }
  };
}

export function fetchRemoveFavorites(items) {
  return dispatch => {
    return RemoveFavorites(items)
      .then(response => {
        dispatch(removeFavoritesSuccess(items));
      })
      .catch(error => {
        console.error(error);
      });
  };
}

function removeFavoritesSuccess(payload) {
  return {
    type: REMOVE_FAVORITES_SUCCESS,
    payload
  };
}

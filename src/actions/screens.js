import { AddScreen, GetScreens, RemoveScreens } from "../api/screens";
import {
  ADD_SCREEN_SUCCESS,
  GET_SCREENS_SUCCESS,
  REMOVE_SCREENS_SUCCESS
} from "../constants/screens";

export function fetchAllScreens() {
  return dispatch => {
    return GetScreens()
      .then(response => {
        dispatch(fetchAllScreensSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function fetchAllScreensSuccess(payload) {
  const screens = payload.map(elm => ({
    id: elm.screen_id,
    width: elm.width,
    height: elm.height,
    model_id: elm.model_id
  }));

  return {
    type: GET_SCREENS_SUCCESS,
    payload: screens
  };
}

export function fetchAddScreen(screen, onSuccess) {
  return dispatch => {
    return AddScreen(screen)
      .then(response => {
        onSuccess();
        dispatch(addScreenSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function addScreenSuccess(payload) {
  const { screen_id, width, height } = payload;
  return {
    type: ADD_SCREEN_SUCCESS,
    payload: {
      id: screen_id,
      width,
      height
    }
  };
}

export function fetchRemoveScreens(items) {
  return dispatch => {
    return RemoveScreens(items)
      .then(response => {
        dispatch(removeScreensSuccess(items));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function removeScreensSuccess(payload) {
  return {
    type: REMOVE_SCREENS_SUCCESS,
    payload
  };
}

import { AddScreen, GetScreens } from "../api/screens";
import { ADD_SCREEN_SUCCESS, GET_SCREENS_SUCCESS } from "../constants/screens";

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
    height: elm.height
  }));

  return {
    type: GET_SCREENS_SUCCESS,
    payload: screens
  };
}

export function fetchAddScreen(screen, onSuccess) {
  const { model_id } = screen;
  return dispatch => {
    return fetchAddScreen(screen)
      .then(response => {
        onSuccess();
        dispatch(addScreenSuccess({ ...response.data, ...{ model_id } }));
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

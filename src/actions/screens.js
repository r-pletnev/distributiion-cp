import {
  AddScreen,
  GetScreens,
  RemoveScreens,
  GetScreenPriorities,
  SetScreenPriority
} from "../api/screens";
import {
  ADD_SCREEN_SUCCESS,
  GET_SCREENS_SUCCESS,
  REMOVE_SCREENS_SUCCESS,
  GET_SCREEN_PRIORITIES_SUCCESS,
  SET_SCREEN_PRIORITY_SUCCESS
} from "../constants/screens";
import { sortById } from "../utils/ramda";

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
    model_id: elm.model_id,
    name: `${elm.height}x${elm.width}`
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
      height,
      name: `${height}x${width}`
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

export function fetchScreenPriorities({ profile_name, device_id, model_id }) {
  const query = arguments[0];
  return dispatch => {
    return GetScreenPriorities(query)
      .then(response => {
        dispatch(getScreenPrioritiesSuccess(response.data, query));
      })
      .catch(error => {
        console.error(error);
      });
  };
}

function getScreenPrioritiesSuccess(payload, { profile_name, ...restArgs }) {
  const priorities = payload.reduce(
    (acc, elm) => {
      acc[profile_name] = [
        ...acc[profile_name],
        { ...{ id: elm.screen_id, priority: elm.priority }, ...restArgs }
      ];
      return acc;
    },
    { [profile_name]: [] }
  );

  priorities[profile_name] = sortById(priorities[profile_name]);
  return {
    type: GET_SCREEN_PRIORITIES_SUCCESS,
    payload: priorities
  };
}

export function fetchSetScreenPriority(
  { profile_name, device_id, model_id, screen_id, priority },
  onSuccess
) {
  const query = arguments[0];
  return dispatch => {
    return SetScreenPriority([query])
      .then(_ => {
        dispatch(setScreenPrioritySuccess(query));
        onSuccess();
      })
      .catch(error => console.error(error));
  };
}

function setScreenPrioritySuccess({
  profile_name,
  device_id,
  model_id,
  screen_id,
  priority
}) {
  const priorityProp = {
    id: screen_id,
    device_id,
    model_id,
    priority: Number(priority)
  };

  return {
    type: SET_SCREEN_PRIORITY_SUCCESS,
    payload: { profile_name, priority: priorityProp }
  };
}

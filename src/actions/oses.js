import { AddOS, GetOSES, RemoveOSES, GetOsPriorities } from "../api/oses";
import {
  ADD_OS_SUCCESS,
  GET_OSES_SUCCESS,
  REMOVE_OSES_SUCCESS,
  GET_OS_PRIORITIES_SUCCESS
} from "../constants/oses";

export function fetchAllOses() {
  return dispatch => {
    return GetOSES()
      .then(response => {
        dispatch(fetchAllOsesSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function fetchAllOsesSuccess(payload) {
  const oses = payload.map(elm => ({ id: elm.os_id, name: elm.name }));
  return {
    type: GET_OSES_SUCCESS,
    payload: oses
  };
}

export function fetchAddOS(name, onSuccess) {
  return dispatch => {
    return AddOS({ name })
      .then(response => {
        onSuccess();
        dispatch(addOSSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function addOSSuccess(payload) {
  const { os_id, name } = payload;
  return {
    type: ADD_OS_SUCCESS,
    payload: {
      id: os_id,
      name
    }
  };
}

export function fetchRemoveOSES(items) {
  return dispatch => {
    return RemoveOSES(items)
      .then(response => {
        dispatch(removeOSESSuccess(items));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function removeOSESSuccess(payload) {
  return {
    type: REMOVE_OSES_SUCCESS,
    payload
  };
}

// query shape: profile_name, device_id, model_id
export function fetchOsPriorities(query) {
  return dispatch => {
    return GetOsPriorities(query)
      .then(response => {
        dispatch(getOsPrioritiesSuccess(response.data, query));
      })
      .catch(error => {
        console.error(error);
      });
  };
}

function getOsPrioritiesSuccess(payload, { profile_name, ...restArgs }) {
  const priorities = payload.reduce(
    (acc, elm) => {
      acc[profile_name] = [
        ...acc[profile_name],
        { ...{ id: elm.os_id, priority: elm.priority }, ...restArgs }
      ];
      return acc;
    },
    { [profile_name]: [] }
  );
  return {
    type: GET_OS_PRIORITIES_SUCCESS,
    payload: priorities
  };
}

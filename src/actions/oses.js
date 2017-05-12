import { AddOS, GetOSES } from "../api/oses";
import { ADD_OS_SUCCESS, GET_OSES_SUCCESS } from "../constants/oses";

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

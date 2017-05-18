import { AddArch, GetArchs, RemoveArchs } from "../api/archs";
import {
  ADD_ARCH_SUCCESS,
  GET_ARHCS_SUCCESS,
  REMOVE_ARCHS_SUCCESS
} from "../constants/archs";

export function fetchAllArchs() {
  return dispatch => {
    return GetArchs()
      .then(response => {
        dispatch(GetArchsSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function GetArchsSuccess(payload) {
  const archs = payload.map(elm => ({
    id: elm.arch_id,
    name: elm.name,
    payload: elm.payload
  }));
  return {
    type: GET_ARHCS_SUCCESS,
    payload: archs
  };
}

export function fetchAddArch(arch, onSuccess) {
  return dispatch => {
    return AddArch(arch)
      .then(response => {
        onSuccess();
        dispatch(AddArchSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function AddArchSuccess(payload) {
  const { arch_id, ...rest } = payload;
  return {
    type: ADD_ARCH_SUCCESS,
    payload: {
      id: arch_id,
      ...rest
    }
  };
}

export function fetchRemoveArchs(archs) {
  return dispatch => {
    return RemoveArchs(archs)
      .then(response => {
        dispatch(removeArchsSuccess(archs));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function removeArchsSuccess(payload) {
  return {
    type: REMOVE_ARCHS_SUCCESS,
    payload
  };
}

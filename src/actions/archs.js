import { AddArch, GetArchs } from "../api/archs";
import { ADD_ARCH_SUCCESS, GET_ARHCS_SUCCESS } from "../constants/archs";

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
  const archs = payload.map(elm => ({ id: elm.arch_id, name: elm.name }));
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
  const { arch_id, name } = payload;
  return {
    type: ADD_ARCH_SUCCESS,
    payload: {
      id: arch_id,
      name
    }
  };
}

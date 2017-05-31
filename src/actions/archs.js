import {
  AddArch,
  GetArchs,
  RemoveArchs,
  GetArchPriorities
} from "../api/archs";
import {
  ADD_ARCH_SUCCESS,
  GET_ARHCS_SUCCESS,
  REMOVE_ARCHS_SUCCESS,
  GET_ARCH_PRIORITIES_SUCCESS
} from "../constants/archs";
import { sortById } from "../utils/ramda";

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

export function fetchArchPriorities(
  { profile_name, device_id, model_id, os_id, os_version_id }
) {
  const query = arguments[0];
  return dispatch => {
    return GetArchPriorities(query)
      .then(response => {
        dispatch(getArchPrioritiesSuccess(response.data, query));
      })
      .catch(error => {
        console.error(error);
      });
  };
}

function getArchPrioritiesSuccess(payload, { profile_name, ...restArgs }) {
  const priorities = payload.reduce(
    (acc, elm) => {
      acc[profile_name] = [
        ...acc[profile_name],
        { ...{ id: elm.arch_id, priority: elm.priority }, ...restArgs }
      ];
      return acc;
    },
    { [profile_name]: [] }
  );

  priorities[profile_name] = sortById(priorities[profile_name]);
  return {
    type: GET_ARCH_PRIORITIES_SUCCESS,
    payload: priorities
  };
}

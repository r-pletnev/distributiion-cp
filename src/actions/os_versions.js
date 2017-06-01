import {
  AddOSVersion,
  GetOSVersions,
  RemoveOSVersions,
  GetOsVersionPriorities,
  SetOsVersionPriority
} from "../api/os_versions";
import {
  ADD_OS_VERSION_SUCCESS,
  GET_OS_VERSIONS_SUCCESS,
  REMOVE_OS_VERSIONS_SUCCESS,
  GET_OS_VERSION_PRIORITIES_SUCCESS,
  SET_OS_VERSION_PRIORITY_SUCCESS
} from "../constants/os_versions";
import { sortById } from "../utils/ramda";

export function fetchAllOsVersions() {
  return dispatch => {
    return GetOSVersions()
      .then(response => {
        dispatch(fetchAllOsVersionsSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function fetchAllOsVersionsSuccess(payload) {
  const os_versions = payload.map(elm => ({
    id: elm.os_version_id,
    name: elm.name,
    payload: elm.payload,
    os_id: elm.os_id
  }));
  return {
    type: GET_OS_VERSIONS_SUCCESS,
    payload: os_versions
  };
}

export function fetchAddOsVersion(os_version, onSuccess) {
  return dispatch => {
    return AddOSVersion(os_version)
      .then(response => {
        onSuccess();
        dispatch(addOsVersionSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function addOsVersionSuccess(payload) {
  const { os_version_id, ...rest } = payload;
  return {
    type: ADD_OS_VERSION_SUCCESS,
    payload: {
      id: os_version_id,
      ...rest
    }
  };
}

export function fetchRemoveOSVersions(items) {
  return dispatch => {
    return RemoveOSVersions(items)
      .then(response => {
        dispatch(removeOSVersionsSuccess(items));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function removeOSVersionsSuccess(payload) {
  return {
    type: REMOVE_OS_VERSIONS_SUCCESS,
    payload
  };
}

export function fetchOsVersionPriorities(
  {
    profile_name,
    device_id,
    model_id,
    os_id
  }
) {
  const query = arguments[0];
  return dispatch => {
    return GetOsVersionPriorities(query)
      .then(response => {
        dispatch(getOsVersionPrioritiesSuccess(response.data, query));
      })
      .catch(error => {
        console.error(error);
      });
  };
}

function getOsVersionPrioritiesSuccess(payload, { profile_name, ...restArgs }) {
  const priorities = payload.reduce(
    (acc, elm) => {
      acc[profile_name] = [
        ...acc[profile_name],
        { ...{ id: elm.os_version_id, priority: elm.priority }, ...restArgs }
      ];
      return acc;
    },
    { [profile_name]: [] }
  );

  priorities[profile_name] = sortById(priorities[profile_name]);
  return {
    type: GET_OS_VERSION_PRIORITIES_SUCCESS,
    payload: priorities
  };
}

export function fetchSetOsVersionPriority({profile_name, device_id, model_id, os_id, os_version_id, priority}, onSuccess){
  const query = arguments[0]
  return dispatch => {
    return SetOsVersionPriority(query)
      .then(_ => {
        dispatch(setOsVersionPrioritySuccess(query))
        onSuccess()
      })
      .catch(error => (console.error(error)))
  }
}

function setOsVersionPrioritySuccess({profile_name, model_id, device_id, os_id, os_version_id, priority}){
  const priorityProp = {
    id: os_version_id,
    model_id,
    device_id, 
    os_id,
    priority: Number(priority)
  }

  return {
    type: SET_OS_VERSION_PRIORITY_SUCCESS,
    payload: {profile_name, priority: priorityProp}
  }
}

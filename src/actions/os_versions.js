import {
  AddOSVersion,
  GetOSVersions,
  RemoveOSVersions
} from "../api/os_versions";
import {
  ADD_OS_VERSION_SUCCESS,
  GET_OS_VERSIONS_SUCCESS,
  REMOVE_OS_VERSIONS_SUCCESS
} from "../constants/os_versions";

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

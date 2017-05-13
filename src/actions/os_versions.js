import { AddOSVersion, GetOSVersions } from "../api/os_versions";
import {
  ADD_OS_VERSION_SUCCESS,
  GET_OS_VERSIONS_SUCCESS
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
    panel_height: elm.panel_height,
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
  const { os_version_id, name, panel_height } = payload;
  return {
    type: ADD_OS_VERSION_SUCCESS,
    payload: {
      id: os_version_id,
      name,
      panel_height
    }
  };
}

import { AddBrowserVersion, GetBrowserVersions } from "../api/browser_versions";
import {
  ADD_BROWSER_VERSION_SUCCESS,
  GET_BROWSER_VERSIONS_SUCCESS
} from "../constants/browser_versions";

export function fetchAllBrowserVersions() {
  return dispatch => {
    return GetBrowserVersions()
      .then(response => {
        dispatch(fetchAllBrowserVersionsSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function fetchAllBrowserVersionsSuccess(payload) {
  const browser_versions = payload.map(elm => ({
    id: elm.browser_version_id,
    name: elm.name,
    engine_version: elm.engine_version,
    browser_version: elm.browser_version,
    sub_version: elm.sub_version,
    browser_id: elm.browser_id
  }));

  return {
    type: GET_BROWSER_VERSIONS_SUCCESS,
    payload: browser_versions
  };
}

export function fetchAddBrowserVersion(browserVersion, onSuccess) {
  return dispatch => {
    return AddBrowserVersion(browserVersion)
      .then(response => {
        onSuccess();
        dispatch(addBrowserVersionSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function addBrowserVersionSuccess(payload) {
  const {
    browser_id,
    name,
    engine_version,
    browser_version,
    sub_version,
    browser_version_id
  } = payload;
  return {
    type: ADD_BROWSER_VERSION_SUCCESS,
    payload: {
      id: browser_version_id,
      name,
      engine_version,
      browser_version,
      sub_version,
      browser_id
    }
  };
}

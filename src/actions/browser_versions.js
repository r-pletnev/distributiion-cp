import {
  AddBrowserVersion,
  GetBrowserVersions,
  RemoveBrowserVersions,
  GetBrowserVersionPriorities
} from "../api/browser_versions";
import {
  ADD_BROWSER_VERSION_SUCCESS,
  GET_BROWSER_VERSIONS_SUCCESS,
  REMOVE_BROWSER_VERSIONS_SUCCESS,
  GET_BROWSER_VERSION_PRIORITIES_SUCCESS
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

export function fetchRemoveBrowserVersions(items) {
  return dispatch => {
    return RemoveBrowserVersions(items)
      .then(response => {
        dispatch(removeBrowserVersionsSuccess(items));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function removeBrowserVersionsSuccess(payload) {
  return {
    type: REMOVE_BROWSER_VERSIONS_SUCCESS,
    payload
  };
}

export function fetchBrowserVersionPriorities(
  { profile_name, device_id, model_id, os_id, browser_id }
) {
  const query = arguments[0];
  return dispatch => {
    return GetBrowserVersionPriorities(query)
      .then(response => {
        dispatch(getBrowserVersionPrioritiesSuccess(response.data, query));
      })
      .catch(error => {
        console.error(error);
      });
  };
}

function getBrowserVersionPrioritiesSuccess(
  payload,
  { profile_name, ...restArgs }
) {
  const priorities = payload.reduce(
    (acc, elm) => {
      acc[profile_name] = [
        ...acc[profile_name],
        {
          ...{ id: elm.browser_version_id, priority: elm.priority },
          ...restArgs
        }
      ];
      return acc;
    },
    { [profile_name]: [] }
  );
  return {
    type: GET_BROWSER_VERSION_PRIORITIES_SUCCESS,
    payload: priorities
  };
}

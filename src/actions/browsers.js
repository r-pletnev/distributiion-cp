import {
  AddBrowser,
  GetBrowsers,
  RemoveBrowsers,
  GetBrowserPriorities,
  SetBrowserPriority
} from "../api/browsers";
import {
  ADD_BROWSER_SUCCESS,
  GET_BROWSERS_SUCCESS,
  REMOVE_BROWSERS_SUCCESS,
  GET_BROWSER_PRIORITIES_SUCCESS,
  SET_BROWSER_PRIORITY_SUCCESS
} from "../constants/browsers";
import { sortById } from "../utils/ramda";

export function fetchAllBrowsers() {
  return dispatch => {
    return GetBrowsers()
      .then(response => {
        dispatch(fetchAllBrowsersSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function fetchAllBrowsersSuccess(payload) {
  const browsers = payload.map(elm => {
    const { browser_id: id, ...rest } = elm;
    return {
      id: elm.browser_id,
      name: elm.name
    };
  });

  return {
    type: GET_BROWSERS_SUCCESS,
    payload: browsers
  };
}

export function fetchAddBrowser(browser, onSuccess) {
  return dispatch => {
    return AddBrowser(browser)
      .then(response => {
        onSuccess();
        dispatch(addBrowserSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function addBrowserSuccess(payload) {
  const { browser_id, name, panel_height, template, os_version_id } = payload;
  return {
    type: ADD_BROWSER_SUCCESS,
    payload: {
      id: browser_id,
      name,
      panel_height,
      template,
      os_version_id
    }
  };
}

export function fetchRemoveBrowsers(items) {
  return dispatch => {
    return RemoveBrowsers(items)
      .then(response => {
        dispatch(removeBrowsersSuccess(items));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function removeBrowsersSuccess(payload) {
  return {
    type: REMOVE_BROWSERS_SUCCESS,
    payload
  };
}

export function fetchBrowserPriorities({
  profile_name,
  device_id,
  model_id,
  os_id
}) {
  const query = arguments[0];
  return dispatch => {
    return GetBrowserPriorities(query)
      .then(response => {
        dispatch(getBrowserPrioritiesSuccess(response.data, query));
      })
      .catch(error => {
        console.error(error);
      });
  };
}

function getBrowserPrioritiesSuccess(payload, { profile_name, ...restArgs }) {
  const priorities = payload.reduce(
    (acc, elm) => {
      acc[profile_name] = [
        ...acc[profile_name],
        {
          ...{
            id: elm.browser_id,
            priority: elm.priority,
            template_id: elm.template_id
          },
          ...restArgs
        }
      ];
      return acc;
    },
    { [profile_name]: [] }
  );

  priorities[profile_name] = sortById(priorities[profile_name]);
  return {
    type: GET_BROWSER_PRIORITIES_SUCCESS,
    payload: priorities
  };
}

export function fetchSetBrowserPriority(
  {
    profile_name,
    device_id,
    model_id,
    os_id,
    os_version_id,
    browser_id,
    priority
  },
  onSuccess
) {
  const query = arguments[0];
  return dispatch => {
    return SetBrowserPriority([query])
      .then(_ => {
        dispatch(setBrowserPrioritySuccess(query));
        onSuccess();
      })
      .catch(error => console.error(error));
  };
}

function setBrowserPrioritySuccess({
  profile_name,
  device_id,
  model_id,
  os_version_id,
  os_id,
  browser_id,
  priority
}) {
  const priorityProp = {
    id: browser_id,
    device_id,
    model_id,
    os_id,
    os_version_id,
    priority: Number(priority)
  };
  debugger;

  return {
    type: SET_BROWSER_PRIORITY_SUCCESS,
    payload: { profile_name, priority: priorityProp }
  };
}

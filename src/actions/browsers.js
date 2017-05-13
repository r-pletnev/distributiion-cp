import { AddBrowser, GetBrowsers } from "../api/browsers";
import {
  ADD_BROWSER_SUCCESS,
  GET_BROWSERS_SUCCESS
} from "../constants/browsers";

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
  const browsers = payload.map(elm => ({
    id: elm.browser_id,
    name: elm.name,
    panel_height: elm.panel_height,
    template: elm.template,
    os_version_id: elm.os_version_id
  }));

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
        debugger;
        dispatch(addBrowserSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function addBrowserSuccess(payload) {
  const { browser_id, name, panel_height, template, os_version_id } = payload;
  debugger;
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

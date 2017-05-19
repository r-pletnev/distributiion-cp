import { AddBrowser, GetBrowsers, RemoveBrowsers } from "../api/browsers";
import {
  ADD_BROWSER_SUCCESS,
  GET_BROWSERS_SUCCESS,
  REMOVE_BROWSERS_SUCCESS
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
    name: elm.name
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

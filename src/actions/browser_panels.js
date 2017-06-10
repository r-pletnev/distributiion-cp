import {
  AddBrowserPanel,
  GetBrowserPanels,
  RemoveBrowserPanels
} from "../api/browser_panels";
import {
  ADD_BROWSER_PANEL_SUCCESS,
  GET_BROWSER_PANELS_SUCCESS,
  REMOVE_BROWSER_PANELS_SUCCESS
} from "../constants/browser_panels";

export function fetchAllBrowserPanels() {
  return dispatch => {
    return GetBrowserPanels()
      .then(response => {
        dispatch(fetchAllBrowserPanelsSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function fetchAllBrowserPanelsSuccess(payload) {
  const browser_panels = payload.map(elm => ({
    id: elm.browser_panel_id,
    size: elm.size,
    priority: elm.priority,
    browser_id: elm.browser_id
  }));

  return {
    type: GET_BROWSER_PANELS_SUCCESS,
    payload: browser_panels
  };
}

export function fetchAddBrowserPanel(browserPanel, onSuccess) {
  return dispatch => {
    return AddBrowserPanel(browserPanel)
      .then(response => {
        onSuccess();
        dispatch(addBrowserPanelSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function addBrowserPanelSuccess(payload) {
  const { browser_panel_id, ...rest } = payload;
  return {
    type: ADD_BROWSER_PANEL_SUCCESS,
    payload: {
      id: browser_panel_id,
      ...rest
    }
  };
}

export function fetchRemoveBrowserPanels(items) {
  return dispatch => {
    return RemoveBrowserPanels(items)
      .then(response => {
        dispatch(removeBrowserPanelsSuccess(items));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function removeBrowserPanelsSuccess(payload) {
  return {
    type: REMOVE_BROWSER_PANELS_SUCCESS,
    payload
  };
}

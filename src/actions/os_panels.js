import { AddOSPanel, GetOSPanels, RemoveOSPanels } from "../api/os_panels";
import {
  ADD_OS_PANEL_SUCCESS,
  GET_OS_PANELS_SUCCESS,
  REMOVE_OS_PANELS_SUCCESS
} from "../constants/os_panels";

export function fetchAllOsPanels() {
  return dispatch => {
    return GetOSPanels()
      .then(response => {
        dispatch(fetchAllOsPanelsSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function fetchAllOsPanelsSuccess(payload) {
  const os_panels = payload.map(elm => ({
    id: elm.os_panel_id,
    size: elm.size
  }));
  return {
    type: GET_OS_PANELS_SUCCESS,
    payload: os_panels
  };
}

export function fetchAddOsPanel(os_panel, onSuccess) {
  return dispatch => {
    return AddOSPanel(os_panel)
      .then(response => {
        onSuccess();
        dispatch(addOsPanelSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function addOsPanelSuccess(payload) {
  const { os_panel_id, size } = payload;
  return {
    type: ADD_OS_PANEL_SUCCESS,
    payload: {
      id: os_panel_id,
      size
    }
  };
}

export function fetchRemoveOsPanels(items) {
  return dispatch => {
    return RemoveOSPanels(items)
      .then(response => {
        dispatch(removeOSPanelsSuccess(items));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function removeOSPanelsSuccess(payload) {
  return {
    type: REMOVE_OS_PANELS_SUCCESS,
    payload
  };
}

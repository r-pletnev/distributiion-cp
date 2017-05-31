import {
  AddOSPanel,
  GetOSPanels,
  RemoveOSPanels,
  GetOsPanelPriorities
} from "../api/os_panels";
import {
  ADD_OS_PANEL_SUCCESS,
  GET_OS_PANELS_SUCCESS,
  REMOVE_OS_PANELS_SUCCESS,
  GET_OS_PANEL_PRIORITIES_SUCCESS
} from "../constants/os_panels";
import { sortById } from "../utils/ramda";

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
    size: elm.size,
    name: elm.size
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
      size,
      name: size
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

export function fetchOsPanelPriorities(
  { profile_name, device_id, model_id, os_id, os_version_id }
) {
  const query = arguments[0];
  return dispatch => {
    return GetOsPanelPriorities(query)
      .then(response => {
        dispatch(getOsPanelPrioritiesSuccess(response.data, query));
      })
      .catch(error => {
        console.error(error);
      });
  };
}

function getOsPanelPrioritiesSuccess(payload, { profile_name, ...restArgs }) {
  const priorities = payload.reduce(
    (acc, elm) => {
      acc[profile_name] = [
        ...acc[profile_name],
        { ...{ id: elm.os_panel_id, priority: elm.priority }, ...restArgs }
      ];
      return acc;
    },
    { [profile_name]: [] }
  );

  priorities[profile_name] = sortById(priorities[profile_name]);
  return {
    type: GET_OS_PANEL_PRIORITIES_SUCCESS,
    payload: priorities
  };
}

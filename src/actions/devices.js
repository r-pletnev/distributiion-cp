import { AddDevice, GetDevices, RemoveDevices } from "../api/devices";
import {
  ADD_DEVICE_SUCCEES,
  GET_ALL_DEVICES_SUCCESS,
  REMOVE_DEVICES_SUCCESS
} from "../constants/devices";

export function fetchAllDevices() {
  return dispatch => {
    return GetDevices()
      .then(response => {
        dispatch(fetchAllDevicesSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function fetchAllDevicesSuccess(payload) {
  const devices = payload.map(elm => ({ id: elm.device_id, name: elm.name }));
  return {
    type: GET_ALL_DEVICES_SUCCESS,
    payload: devices
  };
}

export function fetchAddDevice(name, onSuccess) {
  return dispatch => {
    return AddDevice({ name })
      .then(response => {
        onSuccess();
        dispatch(addDeviceSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function addDeviceSuccess(payload) {
  const { device_id, name } = payload;
  return {
    type: ADD_DEVICE_SUCCEES,
    payload: {
      id: device_id,
      name
    }
  };
}

export function fetchRemoveDevices(devices) {
  return dispatch => {
    return RemoveDevices(devices)
      .then(response => {
        dispatch(removeDevicesSuccess(devices));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function removeDevicesSuccess(payload) {
  return {
    type: REMOVE_DEVICES_SUCCESS,
    payload
  };
}

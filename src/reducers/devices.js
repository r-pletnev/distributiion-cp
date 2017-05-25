import {
  GET_ALL_DEVICES_SUCCESS,
  ADD_DEVICE_SUCCEES,
  REMOVE_DEVICES_SUCCESS,
  GET_DEVICE_PRIORITIES_SUCCESS
} from "../constants/devices";
import { filterById, sortById, defaultToEmptyArray } from "../utils/ramda";

const initialState = {
  entities: [],
  priorities: {},
  fetchStatus: false,
  priorityFetchStatus: false
};

export default function deviceState(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_DEVICES_SUCCESS: {
      return {
        ...state,
        entities: sortById(payload),
        fetchStatus: true
      };
    }

    case GET_DEVICE_PRIORITIES_SUCCESS: {
      return {
        ...state,
        priorities: { ...state.priorities, ...payload },
        priorityFetchStatus: true
      };
    }

    case ADD_DEVICE_SUCCEES: {
      return {
        ...state,
        entities: sortById([...state.entities, payload])
      };
    }

    case REMOVE_DEVICES_SUCCESS: {
      return filterById(payload, state);
    }

    default: {
      return state;
    }
  }
}

export function getDevices(state) {
  return state.devices.entities;
}

export function getDeviceById(state) {
  const devices = getDevices(state);
  return id => {
    const isEqual = elm => elm.id === id;
    return devices.find(isEqual);
  };
}

export function getDevicePriorities(state, profile) {
  return defaultToEmptyArray(state.devices.priorities[profile]);
}

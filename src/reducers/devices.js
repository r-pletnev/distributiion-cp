import R from "ramda";
import {
  GET_ALL_DEVICES_SUCCESS,
  ADD_DEVICE_SUCCESS,
  REMOVE_DEVICES_SUCCESS,
  GET_DEVICE_PRIORITIES_SUCCESS,
  SET_DEVICE_PRIORITIES_SUCCESS
} from "../constants/devices";
import {
  filterById,
  sortById,
  defaultToEmptyArray,
  mapById
} from "../utils/ramda";

const initialState = {
  entities: [],
  priorities: {},
  fetchStatus: false
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
        priorities: { ...state.priorities, ...payload }
      };
    }

    case SET_DEVICE_PRIORITIES_SUCCESS: {
      const prs = state.priorities[payload.profile_name].filter(
        elm => elm.id !== payload.priority.id
      );

      return {
        ...state,
        priorities: {
          ...state.priorities,
          [payload.profile_name]: sortById([...prs, payload.priority])
        }
      };
    }

    case ADD_DEVICE_SUCCESS: {
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

export function _getDevicePriorities(state, profile) {
  return defaultToEmptyArray(state.devices.priorities[profile]);
}

export function getDevicePriorities(state, profile) {
  const priors = _getDevicePriorities(state, profile);
  const devs = getDevices(state);
  return mapById(priors, devs);
}

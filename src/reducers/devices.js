import {
  GET_ALL_DEVICES_SUCCESS,
  ADD_DEVICE_SUCCEES,
  REMOVE_DEVICES_SUCCESS
} from "../constants/devices";
import { filterById } from "../utils/ramda";

const initialState = {
  entities: []
};

export default function deviceState(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_DEVICES_SUCCESS: {
      return {
        ...state,
        entities: payload
      };
    }

    case ADD_DEVICE_SUCCEES: {
      return {
        ...state,
        entities: [...state.entities, payload]
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

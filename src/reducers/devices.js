import {
  GET_ALL_DEVICES_SUCCESS,
  ADD_DEVICE_SUCCEES
} from "../constants/devices";

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

    default: {
      return state;
    }
  }
}

export function getDevices(state) {
  return state.devices.entities;
}

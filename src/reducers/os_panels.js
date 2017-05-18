import {
  GET_OS_PANELS_SUCCESS,
  ADD_OS_PANEL_SUCCESS,
  REMOVE_OS_PANELS_SUCCESS
} from "../constants/os_panels";
import { filterById, sortById } from "../utils/ramda";

const initialState = {
  entities: []
};

export default function osPanelState(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_OS_PANELS_SUCCESS: {
      return {
        ...state,
        entities: sortById(payload)
      };
    }

    case ADD_OS_PANEL_SUCCESS: {
      return {
        ...state,
        entities: sortById([...state.entities, payload])
      };
    }

    case REMOVE_OS_PANELS_SUCCESS: {
      return filterById(payload, state);
    }

    default: {
      return state;
    }
  }
}

export function getOsPanels(state) {
  return state.os_panels.entities;
}

export function getOsPanelById(state) {
  const items = getOsPanels(state);
  return id => {
    const isEqual = elm => elm.id === id;
    return items.find(isEqual);
  };
}

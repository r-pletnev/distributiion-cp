import {
  GET_BROWSER_PANELS_SUCCESS,
  ADD_BROWSER_PANEL_SUCCESS,
  REMOVE_BROWSER_PANELS_SUCCESS
} from "../constants/browser_panels";
import { filterById, sortById } from "../utils/ramda";

const initialState = {
  entities: [],
  fetchStatus: false
};

export default function browserPanelState(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BROWSER_PANELS_SUCCESS: {
      return {
        ...state,
        entities: sortById(payload),
        fetchStatus: true
      };
    }

    case ADD_BROWSER_PANEL_SUCCESS: {
      return {
        ...state,
        entities: sortById([...state.entities, payload])
      };
    }
    case REMOVE_BROWSER_PANELS_SUCCESS: {
      return filterById(payload, state);
    }

    default: {
      return state;
    }
  }
}

export function getBrowserPanels(state) {
  return state.browser_panels.entities;
}

export function getBrowserPanelById(state) {
  const items = getBrowserPanels(state);
  return id => {
    const isEqual = elm => elm.id === id;
    return items.find(isEqual);
  };
}

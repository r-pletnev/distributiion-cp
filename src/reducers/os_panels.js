import {
  GET_OS_PANELS_SUCCESS,
  ADD_OS_PANEL_SUCCESS,
  REMOVE_OS_PANELS_SUCCESS,
  GET_OS_PANEL_PRIORITIES_SUCCESS
} from "../constants/os_panels";
import {
  filterById,
  sortById,
  mapById,
  defaultToEmptyArray
} from "../utils/ramda";

const initialState = {
  entities: [],
  priorities: {},
  fetchStatus: false
};

export default function osPanelState(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_OS_PANELS_SUCCESS: {
      return {
        ...state,
        entities: sortById(payload),
        fetchStatus: true
      };
    }

    case ADD_OS_PANEL_SUCCESS: {
      return {
        ...state,
        entities: sortById([...state.entities, payload])
      };
    }

    case GET_OS_PANEL_PRIORITIES_SUCCESS: {
      return {
        ...state,
        priorities: { ...state.priorities, ...payload }
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

export function getOsPanelPriorities(state, profile) {
  return mapById(
    defaultToEmptyArray(state.os_panels.priorities[profile]),
    getOsPanels(state)
  );
}

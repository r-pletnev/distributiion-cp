import {
  GET_SCREENS_SUCCESS,
  ADD_SCREEN_SUCCESS,
  REMOVE_SCREENS_SUCCESS,
  GET_SCREEN_PRIORITIES_SUCCESS
} from "../constants/screens";
import { filterById, sortById, mapById, defaultToEmptyArray} from "../utils/ramda";

const initialState = {
  entities: [],
  priorities: {},
  fetchStatus: false
};

export default function screenState(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SCREENS_SUCCESS: {
      return {
        ...state,
        entities: sortById(payload),
        fetchStatus: true
      };
    }

    case ADD_SCREEN_SUCCESS: {
      return {
        ...state,
        entities: sortById([...state.entities, payload])
      };
    }

    case REMOVE_SCREENS_SUCCESS: {
      return filterById(payload, state);
    }

    case GET_SCREEN_PRIORITIES_SUCCESS: {
      return {
        ...state,
        priorities: {...state.priorities, ...payload}
      }
    }

    default: {
      return state;
    }
  }
}

export function getScreens(state) {
  return state.screens.entities;
}

export function getScreenById(state) {
  const items = getScreens(state);
  return id => {
    const isEqual = elm => elm.id === id;
    return items.find(isEqual);
  };
}

export function getScreenPriorities(state, profile){
  return mapById(defaultToEmptyArray(state.screens.priorities[profile]), getScreens(state))
}

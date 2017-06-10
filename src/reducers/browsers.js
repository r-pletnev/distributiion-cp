import {
  GET_BROWSERS_SUCCESS,
  ADD_BROWSER_SUCCESS,
  REMOVE_BROWSERS_SUCCESS,
  GET_BROWSER_PRIORITIES_SUCCESS,
  SET_BROWSER_PRIORITY_SUCCESS
} from "../constants/browsers";
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

export default function browserState(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BROWSERS_SUCCESS: {
      return {
        ...state,
        entities: sortById(payload),
        fetchStatus: true
      };
    }

    case ADD_BROWSER_SUCCESS: {
      return {
        ...state,
        entities: sortById([...state.entities, payload])
      };
    }

    case REMOVE_BROWSERS_SUCCESS: {
      return filterById(payload, state);
    }

    case GET_BROWSER_PRIORITIES_SUCCESS: {
      return {
        ...state,
        priorities: { ...state.priorities, ...payload }
      };
    }

    case SET_BROWSER_PRIORITY_SUCCESS: {
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

    default: {
      return state;
    }
  }
}

export function getBrowsers(state) {
  return state.browsers.entities;
}

export function getBrowserById(state) {
  const items = getBrowsers(state);
  return id => {
    const isEqual = elm => elm.id === id;
    return items.find(isEqual);
  };
}

export function getBrowserPriorities(state, profile) {
  const priorities = defaultToEmptyArray(state.browsers.priorities[profile]);
  const browsers = getBrowsers(state);
  return mapById(priorities, browsers);
}

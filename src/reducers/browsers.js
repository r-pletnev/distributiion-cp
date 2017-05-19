import {
  GET_BROWSERS_SUCCESS,
  ADD_BROWSER_SUCCESS,
  REMOVE_BROWSERS_SUCCESS
} from "../constants/browsers";
import { filterById, sortById } from "../utils/ramda";

const initialState = {
  entities: [],
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

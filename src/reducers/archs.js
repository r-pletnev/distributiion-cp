import {
  GET_ARHCS_SUCCESS,
  ADD_ARCH_SUCCESS,
  REMOVE_ARCHS_SUCCESS
} from "../constants/archs";
import { filterById, sortById } from "../utils/ramda";

const initialState = {
  entities: [],
  fetchStatus: false
};

export default function archState(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ARHCS_SUCCESS: {
      return {
        ...state,
        entities: sortById(payload),
        fetchStatus: true
      };
    }

    case ADD_ARCH_SUCCESS: {
      return {
        ...state,
        entities: sortById([...state.entities, payload])
      };
    }

    case REMOVE_ARCHS_SUCCESS: {
      return filterById(payload, state);
    }

    default: {
      return state;
    }
  }
}

export function getArchs(state) {
  return state.archs.entities;
}

export function getArchById(state) {
  const archs = getArchs(state);
  return id => {
    const isEqual = elm => elm.id === id;
    return archs.find(isEqual);
  };
}

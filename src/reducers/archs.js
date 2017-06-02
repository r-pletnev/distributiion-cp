import {
  GET_ARHCS_SUCCESS,
  ADD_ARCH_SUCCESS,
  REMOVE_ARCHS_SUCCESS,
  GET_ARCH_PRIORITIES_SUCCESS,
  SET_ARCH_PRIORITY_SUCCESS
} from "../constants/archs";
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

    case GET_ARCH_PRIORITIES_SUCCESS: {
      return {
        ...state,
        priorities: { ...state.priorities, ...payload }
      };
    }

    case SET_ARCH_PRIORITY_SUCCESS: {
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

export function getArchPriorities(state, profile) {
  return mapById(
    defaultToEmptyArray(state.archs.priorities[profile]),
    getArchs(state)
  );
}

import {
  GET_ALL_SEARCH_ENGINES_SUCCESS,
  ADD_SEARCH_ENGINES_SUCCESS,
  REMOVE_SEARCH_ENGINES_SUCCESS,
  GET_SEARCH_ENGINE_PRIORITIES_SUCCESS,
  SET_SEARCH_ENGINE_PRIORITIES_SUCCESS
} from "../constants/search_engines";

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

export default function seState(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_SEARCH_ENGINES_SUCCESS: {
      return {
        ...state,
        entities: sortById(payload),
        fetchStatus: true
      };
    }

    case ADD_SEARCH_ENGINES_SUCCESS: {
      return {
        ...state,
        entities: sortById([...state.entities, payload])
      };
    }

    case REMOVE_SEARCH_ENGINES_SUCCESS: {
      return filterById(payload, state);
    }

    case GET_SEARCH_ENGINE_PRIORITIES_SUCCESS: {
      return {
        ...state,
        priorities: { ...state.priorities, ...payload }
      };
    }

    case SET_SEARCH_ENGINE_PRIORITIES_SUCCESS: {
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

export function getSearchEngines(state) {
  return state.search_engines.entities;
}

export function getSearchEnginePriorities(state, profile) {
  return mapById(
    defaultToEmptyArray(state.search_engines.priorities[profile]),
    getSearchEngines(state)
  );
}

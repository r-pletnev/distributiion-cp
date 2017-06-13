import {
  ADD_FAVORITE_SUCCESS,
  GET_ALL_FAVORITES_SUCCESS,
  REMOVE_FAVORITES_SUCCESS,
  ADD_DOMAINS_SUCCESS,
  REMOVE_DOMAINS_SUCCESS,
  GET_ALL_DOMAINS_SUCCESS
} from "../constants/favorites";
import { filterById, sortById, defaultToEmptyArray } from "../utils/ramda";

const initialState = {
  entities: [],
  priorities: {},
  domains: {},
  fetchStatus: false,
  fetchDomainStatus: false
};

export default function favoriteState(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_FAVORITES_SUCCESS: {
      return {
        ...state,
        entities: sortById(payload),
        fetchStatus: true
      };
    }

    case ADD_FAVORITE_SUCCESS: {
      return {
        ...state,
        entities: sortById([...state.entities, payload])
      };
    }

    case REMOVE_FAVORITES_SUCCESS: {
      return filterById(payload, state);
    }

    case GET_ALL_DOMAINS_SUCCESS: {
      return {
        ...state,
        domains: { ...state.domains, ...payload },
        fetchDomainStatus: true
      };
    }

    default: {
      return state;
    }
  }
}

export function getFavorites(state) {
  return state.favorites.entities;
}

export function getDomains(state, favorite_id) {
  return defaultToEmptyArray(state.favorites.domains[favorite_id]);
}

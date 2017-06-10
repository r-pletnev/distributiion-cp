import {
  ADD_FAVORITE_SUCCESS,
  GET_ALL_FAVORITES_SUCCESS,
  REMOVE_FAVORITES_SUCCESS
} from "../constants/favorites";
import { filterById, sortById } from "../utils/ramda";

const initialState = {
  entities: [],
  priorities: {},
  fetchStatus: false
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

    default: {
      return state;
    }
  }
}

export function getFavorites(state) {
  return state.favorites.entities;
}

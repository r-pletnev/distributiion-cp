import { ADD_AGE_SUCCESS, GET_AGES_SUCCESS } from "../constants/ages";
import { sortById } from "../utils/ramda";

const initialState = {
  entities: [],
  fetchStatus: false
};

export default function ageState(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_AGES_SUCCESS: {
      return {
        ...state,
        entities: sortById(payload),
        fetchStatus: true
      };
    }

    case ADD_AGE_SUCCESS: {
      return {
        ...state,
        entities: sortById([...state.entities, payload])
      };
    }

    default: {
      return state;
    }
  }
}

export function getAges(state) {
  return state.ages.entities;
}

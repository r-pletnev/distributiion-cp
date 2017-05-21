import {
  GET_ALL_MODEL_SUCCESS,
  ADD_MODEL_SUCCESS,
  REMOVE_MODELS_SUCCESS
} from "../constants/models";
import { filterById, sortById } from "../utils/ramda";

const initialState = {
  entities: [],
  fetchStatus: false
};

export default function modelState(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_MODEL_SUCCESS: {
      return {
        ...state,
        entities: sortById(payload),
        fetchStatus: true
      };
    }

    case ADD_MODEL_SUCCESS: {
      return {
        ...state,
        entities: sortById([...state.entities, payload])
      };
    }

    case REMOVE_MODELS_SUCCESS: {
      return filterById(payload, state);
    }

    default: {
      return state;
    }
  }
}

export function getModels(state) {
  return state.models.entities;
}

export function getModelById(state) {
  const models = getModels(state);
  return id => {
    const isEqual = elm => elm.id === id;
    return models.find(isEqual);
  };
}

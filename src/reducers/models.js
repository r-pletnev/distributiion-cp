import {
  GET_ALL_MODEL_SUCCESS,
  ADD_MODEL_SUCCESS,
  REMOVE_MODELS_SUCCESS,
  GET_MODEL_PRIORITIES_SUCCESS,
  SET_MODEL_PRIORITY_SUCCESS
} from "../constants/models";
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

    case GET_MODEL_PRIORITIES_SUCCESS: {
      return {
        ...state,
        priorities: { ...state.priorities, ...payload }
      };
    }

    case SET_MODEL_PRIORITY_SUCCESS: {
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

export function _getModelPriorities(state, profile) {
  return defaultToEmptyArray(state.models.priorities[profile]);
}

export function getModelPriorities(state, profile) {
  return mapById(_getModelPriorities(state, profile), getModels(state));
}

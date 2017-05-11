import { GET_ALL_MODEL_SUCCESS, ADD_MODEL_SUCCESS } from "../constants/models";

const initialState = {
  entities: []
};

export default function modelState(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_MODEL_SUCCESS: {
      return {
        ...state,
        entities: payload
      };
    }

    case ADD_MODEL_SUCCESS: {
      return {
        ...state,
        entities: [...state.entities, payload]
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

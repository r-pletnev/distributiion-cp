import { GET_ARHCS_SUCCESS, ADD_ARCH_SUCCESS } from "../constants/archs";

const initialState = {
  entities: []
};

export default function archState(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ARHCS_SUCCESS: {
      return {
        ...state,
        entities: payload
      };
    }

    case ADD_ARCH_SUCCESS: {
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

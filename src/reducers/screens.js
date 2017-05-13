import { GET_SCREENS_SUCCESS, ADD_SCREEN_SUCCESS } from "../constants/screens";

const initialState = {
  entities: []
};

export default function screenState(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SCREENS_SUCCESS: {
      return {
        ...state,
        entities: payload
      };
    }

    case ADD_SCREEN_SUCCESS: {
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

export function getScreens(state) {
  return state.screens.entities;
}

export function getScreenById(state) {
  const items = getScreens(state);
  return id => {
    const isEqual = elm => elm.id === id;
    return items.find(isEqual);
  };
}

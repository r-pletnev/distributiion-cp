import {
  GET_BROWSER_VERSIONS_SUCCESS,
  ADD_BROWSER_VERSION_SUCCESS
} from "../constants/browser_versions";

const initialState = {
  entities: []
};

export default function browserVersionState(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BROWSER_VERSIONS_SUCCESS: {
      return {
        ...state,
        entities: payload
      };
    }

    case ADD_BROWSER_VERSION_SUCCESS: {
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

export function getBrowserVersions(state) {
  return state.browser_versions.entities;
}

export function getBrowserVersionById(state) {
  const items = getBrowserVersions(state);
  return id => {
    const isEqual = elm => elm.id === id;
    return items.find(isEqual);
  };
}

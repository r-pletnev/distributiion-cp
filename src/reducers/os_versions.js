import {
  GET_OS_VERSIONS_SUCCESS,
  ADD_OS_VERSION_SUCCESS
} from "../constants/os_versions";

const initialState = {
  entities: []
};

export default function osVersionState(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_OS_VERSIONS_SUCCESS: {
      return {
        ...state,
        entities: payload
      };
    }

    case ADD_OS_VERSION_SUCCESS: {
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

export function getOsVersions(state) {
  return state.os_versions.entities;
}

export function getOsVersionById(state) {
  const os_versions = getOsVersions(state);
  return id => {
    const isEqual = elm => elm.id === id;
    return os_versions.find(isEqual);
  };
}

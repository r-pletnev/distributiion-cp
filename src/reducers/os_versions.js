import {
  GET_OS_VERSIONS_SUCCESS,
  ADD_OS_VERSION_SUCCESS,
  REMOVE_OS_VERSIONS_SUCCESS
} from "../constants/os_versions";
import { filterById, sortById } from "../utils/ramda";

const initialState = {
  entities: [],
  fetchStatus: false
};

export default function osVersionState(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_OS_VERSIONS_SUCCESS: {
      return {
        ...state,
        entities: sortById(payload),
        fetchStatus: true
      };
    }

    case ADD_OS_VERSION_SUCCESS: {
      return {
        ...state,
        entities: sortById([...state.entities, payload])
      };
    }

    case REMOVE_OS_VERSIONS_SUCCESS: {
      return filterById(payload, state);
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

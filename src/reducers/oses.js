import { getOsVersions } from "../reducers/os_versions";
import {
  GET_OSES_SUCCESS,
  ADD_OS_SUCCESS,
  REMOVE_OSES_SUCCESS,
  GET_OS_PRIORITIES_SUCCESS,
  SET_OS_PRIORITY_SUCCESS
} from "../constants/oses";
import {
  filterById,
  sortById,
  defaultToEmptyArray,
  mapById
} from "../utils/ramda";

const initialState = {
  entities: [],
  priorities: {},
  fetchStatus: false,
};

export default function osState(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_OSES_SUCCESS: {
      return {
        ...state,
        entities: sortById(payload),
        fetchStatus: true
      };
    }

    case ADD_OS_SUCCESS: {
      return {
        ...state,
        entities: sortById([...state.entities, payload])
      };
    }

    case REMOVE_OSES_SUCCESS: {
      return filterById(payload, state);
    }

    case GET_OS_PRIORITIES_SUCCESS: {
      return {
        ...state,
        priorities: { ...state.priorities, ...payload },
      };
    }

    case SET_OS_PRIORITY_SUCCESS: {
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

export function getOses(state) {
  return state.oses.entities;
}

export function getOsById(state) {
  const oses = getOses(state);
  return id => {
    const isEqual = elm => elm.id === id;
    return oses.find(isEqual);
  };
}

export function getOsByOsVersionId(state) {
  const oses = getOses(state);
  const os_versions = getOsVersions(state);
  return os_version_id => {
    const isEqual = elm => elm.id === os_version_id;
    const cur_os_version = os_versions.find(isEqual);
    const isEqualOSId = elm => elm.id === cur_os_version.os_id;
    return oses.find(isEqualOSId);
  };
}

export function _getOsPriorities(state, profile) {
  return defaultToEmptyArray(state.oses.priorities[profile]);
}

export function getOsPriorities(state, profile) {
  return mapById(_getOsPriorities(state, profile), getOses(state));
}

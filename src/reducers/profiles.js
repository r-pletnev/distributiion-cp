import { GET_PROFILES_SUCCESS } from "../constants/profiles";

const initialState = {
  entities: [],
  fetchStatus: false
};

export default function profileState(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILES_SUCCESS: {
      return {
        ...state,
        entities: payload,
        fetchStatus: true
      };
    }

    default: {
      return state;
    }
  }
}

export function getProfiles(state) {
  return state.profiles.entities;
}

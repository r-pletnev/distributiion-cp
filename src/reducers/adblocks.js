import {
  GET_ADBLOCKS_SUCCESS,
  SET_ADBLOCKS_SUCCESS
} from "../constants/adblocks";

import { defaultToEmptyArray } from "../utils/ramda";

const initialState = {
  entities: {}
};

export default function adblockState(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case GET_ADBLOCKS_SUCCESS: {
      return {
        ...state,
        entities: { ...state.entities, ...payload }
      };
    }

    default: {
      return state;
    }
  }
}

export function getAdblocks(state) {
  const adblocks = state.entities;
  return profile_name => defaultToEmptyArray(adblocks[profile_name]);
}

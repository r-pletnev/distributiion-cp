import {
  GET_ADBLOCKS_SUCCESS,
  SET_ADBLOCKS_SUCCESS
} from "../constants/adblocks";
import {getCurrentProfile} from './ux'
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

    case SET_ADBLOCKS_SUCCESS: {
      return {
        ...state,
        entities: {...state.entities, ...payload}
      }

    }

    default: {
      return state;
    }
  }
}

export function getAdblocks(state) {
  const adblocks = state.adblocks.entities;
  return profile_name => defaultToEmptyArray(adblocks[profile_name]);
}

export function getPriorities(state){
  const profile_name = getCurrentProfile(state)
  const [fst, lst] = getAdblocks(state)(profile_name)
  return {without_block: fst ? fst.priority : null, with_block: lst ? lst.priority: null}
}

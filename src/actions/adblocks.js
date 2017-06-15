import { GetAdblocks, SetAdblocks } from "../api/adblocks";
import {
  GET_ADBLOCKS_SUCCESS,
  SET_ADBLOCKS_SUCCESS
} from "../constants/adblocks";

export function fetchAdblocks(profile_name) {
  return dispatch => {
    return GetAdblocks({ profile_name })
      .then(response => {
        dispatch(fetchAdblocksSuccess(response.data, profile_name));
      })
      .catch(error => {
        console.error(error);
      });
  };
}

function fetchAdblocksSuccess(adblocks, profile_name) {
  return {
    type: GET_ADBLOCKS_SUCCESS,
    payload: { [profile_name]: adblocks }
  };
}

export function fetchSetAdblocks(
  { profile_name, is_blocked, priority },
  onSuccess
) {
  const query = arguments[0];
  return dispatch => {
    return SetAdblocks(query)
      .then(_ => {
        dispatch(setAdblocksSuccess(query));
        onSuccess();
      })
      .catch(console.error);
  };
}

function setAdblocksSuccess({ profile_name, is_blocked, priority }) {
  return {
    type: SET_ADBLOCKS_SUCCESS,
    payload: { [profile_name]: { is_blocked, priority } }
  };
}

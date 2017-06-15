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

export function fetchSetAdblocks(prs, profile_name, onSuccess) {
  return dispatch => {
    return SetAdblocks(prs)
      .then(_ => {
        dispatch(setAdblocksSuccess(prs, profile_name));
        onSuccess()
      })
      .catch(console.error);
  };
}

function setAdblocksSuccess(prs, profile_name) {
  return {
    type: SET_ADBLOCKS_SUCCESS,
    payload: { [profile_name]:  prs}
  };
}

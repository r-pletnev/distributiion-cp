import { GetProfiles } from "../api/profiles";
import {
  GET_PROFILES_SUCCESS,
  ADD_PROFILE_SUCCESS
} from "../constants/profiles";
import { SetDevicePriorities } from "../api/devices";

export function fetchAllProfiles() {
  return dispatch => {
    return GetProfiles()
      .then(response => {
        dispatch(GetProfilesSuccess(response.data));
      })
      .catch(error => {
        console.error(error);
      });
  };
}

function GetProfilesSuccess(payload) {
  const profiles = payload.map(elm => ({ name: elm.profile_name }));
  return {
    type: GET_PROFILES_SUCCESS,
    payload: profiles
  };
}

export function fetchCreateProfile(profile_name, onSuccess) {
  return dispatch => {
    return SetDevicePriorities([{ profile_name, device_id: 1, priority: 1 }])
      .then(response => {
        dispatch(createProfileSuccess(profile_name));
        onSuccess();
      })
      .catch(error => {
        console.log(error => {
          console.error(error);
        });
      });
  };
}

function createProfileSuccess(profile_name) {
  return {
    type: ADD_PROFILE_SUCCESS,
    payload: { name: profile_name }
  };
}

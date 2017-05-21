import { GetProfiles } from "../api/profiles";
import { GET_PROFILES_SUCCESS } from "../constants/profiles";

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

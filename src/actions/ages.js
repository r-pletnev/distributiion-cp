import { AddAge, GetAges } from "../api/ages";
import { ADD_AGE_SUCCESS, GET_AGES_SUCCESS } from "../constants/ages";

export function fetchAllAges() {
  return dispatch => {
    return GetAges()
      .then(response => {
        dispatch(fetchAllAgesSuccess(response.data));
      })
      .catch(error => {
        console.error(error);
      });
  };
}

function fetchAllAgesSuccess(items) {
  const ages = items.map(elm => ({
    id: elm.age_id,
    max_age: elm.max_age,
    min_age: elm.min_age
  }));
  return {
    type: GET_AGES_SUCCESS,
    payload: ages
  };
}

export function fetchAddAge({ min_age, max_age }) {
  const query = arguments[0];
  return dispatch => {
    return AddAge(query)
      .then(response => {
        dispatch(addAgeSuccess(response.data));
      })
      .catch(error => {
        console.error(error);
      });
  };
}

function addAgeSuccess({ age_id, ...rest }) {
  const age = { id: age_id, ...rest };
  return {
    type: ADD_AGE_SUCCESS,
    payload: age
  };
}

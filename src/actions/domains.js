import { AddDomains, GetDomains, RemoveDomains } from "../api/domains";
import {
  ADD_DOMAINS_SUCCESS,
  GET_ALL_DOMAINS_SUCCESS,
  REMOVE_DOMAINS_SUCCESS
} from "../constants/favorites";

export function fetchAllDomains(favorite_id_obj) {
  const { favorite_id } = favorite_id_obj;
  return dispatch => {
    return GetDomains({ favorite_id: Number(favorite_id) })
      .then(response => {
        dispatch(fetchAllDomainsSuccess(response.data, Number(favorite_id)));
      })
      .catch(error => {
        console.error(error);
      });
  };
}

function fetchAllDomainsSuccess(pays, favorite_id) {
  const outer = { [favorite_id]: pays };
  return {
    type: GET_ALL_DOMAINS_SUCCESS,
    payload: outer
  };
}

export function fetchAddDomains({ favorite_id, domains }, onSuccess) {
  return dispatch => {
    return AddDomains({ favorite_id, domains })
      .then(_ => {
        onSuccess();
        dispatch(addDomainsSuccess({ favorite_id, domains }));
      })
      .catch(error => {
        console.error(error);
      });
  };
}

function addDomainsSuccess({ favorite_id, domains }) {
  return {
    type: ADD_DOMAINS_SUCCESS,
    payload: { [favorite_id]: domains }
  };
}

export function fetchRemoveDomains({ favorite_id, domains }) {
  const query = arguments[0];
  return dispatch => {
    return RemoveDomains(query)
      .then(_ => {
        dispatch(removeDomainsSuccess(query));
      })
      .catch(error => {
        console.error(error);
      });
  };
}

function removeDomainsSuccess(payload) {
  return {
    type: REMOVE_DOMAINS_SUCCESS,
    payload
  };
}

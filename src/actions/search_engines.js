import R from "ramda";
import {
  AddSearchEngine,
  GetSearchEngines,
  RemoveSearchEngines,
  SetSearchEnginePriorites,
  GetSearchEnginePriorities
} from "../api/search_engines";
import {
  ADD_SEARCH_ENGINES_SUCCESS,
  GET_ALL_SEARCH_ENGINES_SUCCESS,
  REMOVE_SEARCH_ENGINES_SUCCESS,
  GET_SEARCH_ENGINE_PRIORITIES_SUCCESS,
  SET_SEARCH_ENGINE_PRIORITIES_SUCCESS
} from "../constants/search_engines";
// import { sortById } from "../utils/ramda";

export function fetchAllSearchEngines() {
  return dispatch => {
    return GetSearchEngines()
      .then(response => {
        dispatch(GetSearchEnginesSuccess(response.data));
      })
      .catch(console.error);
  };
}

function GetSearchEnginesSuccess(engines) {
  return {
    type: GET_ALL_SEARCH_ENGINES_SUCCESS,
    payload: engines
  };
}

export function fetchAddSearchEngine({ name, payload }, onSuccess) {
  const query = arguments[0];
  return dispatch => {
    return AddSearchEngine([query])
      .then(response => {
        dispatch(addSearchEngineSuccess(response.data));
        onSuccess();
      })
      .catch(console.error);
  };
}

function addSearchEngineSuccess(engines) {
  const [engine] = engines;
  return {
    type: ADD_SEARCH_ENGINES_SUCCESS,
    payload: engine
  };
}

export function fetchRemoveSearchEngine(items) {
  return dispatch => {
    return RemoveSearchEngines(items)
      .then(_ => {
        dispatch(removeSearchEngineSuccess(items));
      })
      .catch(console.error);
  };
}

function removeSearchEngineSuccess(ids) {
  return {
    type: REMOVE_SEARCH_ENGINES_SUCCESS,
    payload: ids
  };
}

export function fetchGetSearchEnginePriorities({ profile_name }) {
  return dispatch => {
    return GetSearchEnginePriorities({ profile_name })
      .then(response => {
        dispatch(getSearchEnginePrioritiesSuccess(response.data, profile_name));
      })
      .catch(console.error);
  };
}

function getSearchEnginePrioritiesSuccess(payload, profile_name) {
  const priorities = payload.reduce(
    (acc, elm) => {
      acc[profile_name] = [...acc[profile_name], elm];
      return acc;
    },
    { [profile_name]: [] }
  );

  return {
    type: GET_SEARCH_ENGINE_PRIORITIES_SUCCESS,
    payload: priorities
  };
}

export function fetchSetSearchEnginePriority(
  { profile_name, se_id, priority },
  onSuccess
) {
  const query = arguments[0];
  return dispatch => {
    return SetSearchEnginePriorites([query])
      .then(_ => {
        dispatch(
          setSearchEnginePrioritySuccess({ se_id, priority }, profile_name)
        );
        onSuccess();
      })
      .catch(console.error);
  };
}

function setSearchEnginePrioritySuccess(payload, profile_name) {
  const priority = R.evolve({ priority: Number }, payload);
  return {
    type: SET_SEARCH_ENGINE_PRIORITIES_SUCCESS,
    payload: { profile_name, priority }
  };
}

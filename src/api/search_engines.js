import * as api from "./Endpoints";

export function AddSearchEngine(data) {
  return api.client.post(api.ADD_SEARCH_ENGINES_URL, data);
}

export function GetSearchEngines(data) {
  return api.client.post(api.GET_SEARCH_ENGINES_URL, data);
}

export function GetSearchEnginePriorities(data) {
  return api.client.post(api.GET_SEARCH_ENGINE_PRIORITIES_URL, data);
}

export function SetSearchEnginePriorites(data) {
  return api.client.post(api.SET_SEARCH_ENGINE_PRIORITIES_URL, data);
}

export function RemoveSearchEngines(data) {
  return api.client.post(api.REMOVE_SEARCH_ENGINES_URL, data);
}

import * as api from "./Endpoints";

export function AddModel(data) {
  return api.client.post(api.ADD_MODEL_URL, data);
}

export function GetModels(data) {
  return api.client.get(api.GET_MODELS_URL, data);
}

export function RemoveModels(data) {
  return api.client.post(api.REMOVE_MODELS_URL, data);
}

export function GetModelPriorities(data) {
  return api.client.post(api.GET_MODEL_PRIORITIES_URL, data);
}

export function SetModelPriorities(data) {
  return api.client.post(api.SET_MODEL_PRIORITIES_URL, data);
}

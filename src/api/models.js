import * as api from "./Endpoints";

export function AddModel(data) {
  return api.client.post(api.ADD_MODEL_URL, data);
}

export function GetModels(data) {
  return api.client.get(api.GET_MODELS_URL, data);
}
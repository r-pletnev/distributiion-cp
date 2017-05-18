import * as api from "./Endpoints";

export function AddTemplate(data) {
  return api.client.post(api.ADD_TEMPLATE_URL, data);
}

export function GetTemplates() {
  return api.client.get(api.GET_TEMPLATES_URL);
}

export function RemoveTemplates(data) {
  return api.client.post(api.REMOVE_TEMPLATES_URL, data);
}

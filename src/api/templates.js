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

export function GetTemplatePriorities(data){
  return api.client.post(api.GET_TEMPLATE_PRIORITIES_URL, data)
}

export function SetTemplatePriorities(data){
  return api.client.post(api.SET_TEMPLATE_PRIORITIES_URL, data)
}

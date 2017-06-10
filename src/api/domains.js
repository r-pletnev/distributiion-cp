import * as api from "./Endpoints";

export function AddDomains(data) {
  return api.client.post(api.ADD_DOMAINS_URL, data);
}

export function GetDomains(data) {
  return api.client.post(api.GET_DOMAINS_URL, data);
}

export function RemoveDomains(data) {
  return api.client.post(api.REMOVE_DOMAINS_URL, data);
}

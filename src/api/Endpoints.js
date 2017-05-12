import axios from "axios";

export const ROOT_URL = "https://develop.antlace.com:10124";

export const client = axios.create({
  baseURL: "https://develop.antlace.com:10124/cyborgs",
  responseType: "json"
});

export const ADD_DEVICE_URL = "/add_device";
export const GET_DEVICES_URL = "/get_devices";

export const ADD_MODEL_URL = "/add_model";
export const GET_MODELS_URL = "/get_models";

export const ADD_OS_URL = "/add_os";
export const GET_OSES_URL = "/get_oses";

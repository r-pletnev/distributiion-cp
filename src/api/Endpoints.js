import axios from "axios";

export const ROOT_URL = "https://develop.antlace.com:10124";

export const client = axios.create({
  baseURL: "https://develop.antlace.com:10124/cyborgs",
  responseType: "json"
});

export const ADD_DEVICE_URL = "/add_device";
export const GET_DEVICES_URL = "/get_devices";
export const REMOVE_DEVIVES_URL = "/remove_devices";

export const ADD_MODEL_URL = "/add_model";
export const GET_MODELS_URL = "/get_models";

export const ADD_OS_URL = "/add_os";
export const GET_OSES_URL = "/get_oses";

export const ADD_ARCH_URL = "/add_arch";
export const GET_ARCHS_URL = "/get_archs";

export const ADD_OS_VERSION_URL = "/add_os_version";
export const GET_OS_VERSIONS_URL = "/get_os_versions";

export const ADD_SCREEN_URL = "/add_screen";
export const GET_SCREENS_URL = "/get_screens";

export const ADD_BROWSER_URL = "/add_browser";
export const GET_BROWSERS_URL = "/get_browsers";

export const ADD_BROWSER_VERSION_URL = "/add_browser_version";
export const GET_BROWSER_VERSIONS_URL = "/get_browser_versions";

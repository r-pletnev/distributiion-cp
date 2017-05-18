import axios from "axios";

export const ROOT_URL = "https://develop.antlace.com:10124";

export const client = axios.create({
  baseURL: "https://develop.antlace.com:10124/cyborgs",
  responseType: "json"
});

export const ADD_DEVICE_URL = "/add_device";
export const GET_DEVICES_URL = "/get_devices";
export const REMOVE_DEVICES_URL = "/remove_devices";

export const ADD_MODEL_URL = "/add_model";
export const GET_MODELS_URL = "/get_models";
export const REMOVE_MODELS_URL = "/remove_models";

export const ADD_OS_URL = "/add_os";
export const GET_OSES_URL = "/get_oses";
export const REMOVE_OSES_URL = "/remove_oses";

export const ADD_ARCH_URL = "/add_arch";
export const GET_ARCHS_URL = "/get_archs";
export const REMOVE_ARCHS_URL = "/remove_archs";

export const ADD_OS_VERSION_URL = "/add_os_version";
export const GET_OS_VERSIONS_URL = "/get_os_versions";
export const REMOVE_OS_VERSIONS_URL = "/remove_os_versions";

export const ADD_OS_PANEL_URL = "/add_os_panel";
export const GET_OS_PANELS_URL = "/get_os_panels";
export const REMOVE_OS_PANELS_URL = "/remove_os_panels";

export const ADD_SCREEN_URL = "/add_screen";
export const GET_SCREENS_URL = "/get_screens";
export const REMOVE_SCREENS_URL = "/remove_screens";

export const ADD_BROWSER_URL = "/add_browser";
export const GET_BROWSERS_URL = "/get_browsers";
export const REMOVE_BROWSERS_URL = "/remove_browsers";

export const ADD_BROWSER_VERSION_URL = "/add_browser_version";
export const GET_BROWSER_VERSIONS_URL = "/get_browser_versions";
export const REMOVE_BROWSER_VERSIONS_URL = "/remove_browser_versions";

export const ADD_BROWSER_PANEL_URL = "/add_browser_panel";
export const GET_BROWSER_PANELS_URL = "/get_browser_panels";
export const REMOVE_BROWSER_PANELS_URL = "/remove_browser_panels";

export const ADD_TEMPLATE_URL = "/add_template";
export const GET_TEMPLATES_URL = "/get_templates";
export const REMOVE_TEMPLATES_URL = "/remove_templates";

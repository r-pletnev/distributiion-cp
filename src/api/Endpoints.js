import axios from "axios";

export const ROOT_URL = "https://develop.antlace.com:10124";

export const client = axios.create({
  baseURL: "https://develop.antlace.com:10124/cyborgs",
  responseType: "json"
});

export const ADD_DEVICE_URL = "/add_device";
export const GET_DEVICES_URL = "/get_devices";
export const REMOVE_DEVICES_URL = "/remove_devices";
export const GET_DEVICE_PRIORITIES_URL = "/get_device_priorities";
export const SET_DEVICE_PRIORITIES_URL = "/set_device_priority";

export const ADD_MODEL_URL = "/add_model";
export const GET_MODELS_URL = "/get_models";
export const REMOVE_MODELS_URL = "/remove_models";
export const GET_MODEL_PRIORITIES_URL = "/get_model_priorities";
export const SET_MODEL_PRIORITIES_URL = "/set_model_priority";

export const ADD_OS_URL = "/add_os";
export const GET_OSES_URL = "/get_oses";
export const REMOVE_OSES_URL = "/remove_oses";
export const GET_OS_PRIORITIES_URL = "/get_os_priorities";
export const SET_OS_PRIORITY_URL = "/set_os_priority";

export const ADD_ARCH_URL = "/add_arch";
export const GET_ARCHS_URL = "/get_archs";
export const REMOVE_ARCHS_URL = "/remove_archs";
export const GET_ARCH_PRIORITIES_URL = "/get_arch_priorities";
export const SET_ARCH_PRIORITY_URL = "/set_arch_priority";

export const ADD_OS_VERSION_URL = "/add_os_version";
export const GET_OS_VERSIONS_URL = "/get_os_versions";
export const REMOVE_OS_VERSIONS_URL = "/remove_os_versions";
export const GET_OS_VERSION_PRIORITIES_URL = "/get_os_version_priorities";
export const SET_OS_VERSION_PRIORITY_URL = "/set_os_version_priority";

export const ADD_OS_PANEL_URL = "/add_os_panel";
export const GET_OS_PANELS_URL = "/get_os_panels";
export const REMOVE_OS_PANELS_URL = "/remove_os_panels";
export const GET_OS_PANEL_PRIORITIES_URL = "/get_os_panel_priorities";
export const SET_OS_PANEL_PRIORITY_URL = "/set_os_panel_priority";

export const ADD_SCREEN_URL = "/add_screen";
export const GET_SCREENS_URL = "/get_screens";
export const REMOVE_SCREENS_URL = "/remove_screens";
export const GET_SCREEN_PRIORITIES_URL = "/get_screen_priorities";
export const SET_SCREEN_PRIORITY_URL = "/set_screen_priority";

export const ADD_BROWSER_URL = "/add_browser";
export const GET_BROWSERS_URL = "/get_browsers";
export const REMOVE_BROWSERS_URL = "/remove_browsers";
export const GET_BROWSER_PRIORITIES_URL = "/get_browser_priorities";
export const SET_BROWSER_PRIORITY_URL = "/set_browser_priority";

export const ADD_BROWSER_VERSION_URL = "/add_browser_version";
export const GET_BROWSER_VERSIONS_URL = "/get_browser_versions";
export const REMOVE_BROWSER_VERSIONS_URL = "/remove_browser_versions";
export const GET_BROWSER_VERSION_PRIORITIES_URL = "/get_browser_version_priorities";
export const SET_BROWSER_VERSION_PRIORITY_URL = "/set_browser_version_priority";

export const ADD_BROWSER_PANEL_URL = "/add_browser_panel";
export const GET_BROWSER_PANELS_URL = "/get_browser_panels";
export const REMOVE_BROWSER_PANELS_URL = "/remove_browser_panels";

export const ADD_TEMPLATE_URL = "/add_template";
export const GET_TEMPLATES_URL = "/get_templates";
export const REMOVE_TEMPLATES_URL = "/remove_templates";
export const GET_TEMPLATE_PRIORITIES_URL = "/get_template_priorities";
export const SET_TEMPLATE_PRIORITY_URL = "/set_template_priority";

export const GET_PROFILES_URL = "/get_profiles";

export const ADD_FAVORITE_URL = "/add_favorite";
export const GET_FAVORITES_URL = "/get_favorites";
export const REMOVE_FAVORITES_URL = "remove_favorites";
export const GET_FAVORITE_PRIORITIES_URL = "/get_favorite_priorities";
export const SET_FAVORITE_PRIORITY_URL = "/set_favorite_priority";

export const ADD_DOMAINS_URL = "/add_favorite_domains";
export const GET_DOMAINS_URL = "/get_favorite_domains";
export const REMOVE_DOMAINS_URL = "/remove_favorite_domains";

export const ADD_AGE_URL = "/add_age";
export const GET_AGES_URL = "/get_ages";

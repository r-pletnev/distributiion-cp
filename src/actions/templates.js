import {
  AddTemplate,
  GetTemplates,
  RemoveTemplates,
  GetTemplatePriorities,
  SetTemplatePriority
} from "../api/templates";
import {
  ADD_TEMPLATE_SUCCESS,
  GET_TEMPLATES_SUCCESS,
  REMOVE_TEMPLATES_SUCCESS,
  GET_TEMPLATE_PRIORITIES_SUCCESS,
  SET_TEMPLATE_PRIORITY_SUCCESS
} from "../constants/templates";
import { sortById } from "../utils/ramda";

export function fetchAllTemplates() {
  return dispatch => {
    return GetTemplates()
      .then(response => {
        dispatch(fetchAllTemplatesSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function fetchAllTemplatesSuccess(payload) {
  const templates = payload.map(elm => ({
    id: elm.template_id,
    browser_id: elm.browser_id,
    payload: elm.payload,
    name: elm.name
  }));
  return {
    type: GET_TEMPLATES_SUCCESS,
    payload: templates
  };
}

export function fetchAddTemplate(template, onSuccess) {
  return dispatch => {
    return AddTemplate(template)
      .then(response => {
        onSuccess();
        dispatch(addTemplateSuccess(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function addTemplateSuccess(payload) {
  const {
    template_id,
    ...rest
  } = payload;
  return {
    type: ADD_TEMPLATE_SUCCESS,
    payload: {
      id: template_id,
      ...rest
    }
  };
}

export function fetchRemoveTemplates(items) {
  return dispatch => {
    return RemoveTemplates(items)
      .then(response => {
        dispatch(removeTemplatesSuccess(items));
      })
      .catch(error => {
        console.log(error);
      });
  };
}

function removeTemplatesSuccess(payload) {
  return {
    type: REMOVE_TEMPLATES_SUCCESS,
    payload
  };
}

export function fetchTemplatePriorities({ profile_name, device_id, model_id }) {
  const query = arguments[0];
  return dispatch => {
    return GetTemplatePriorities(query)
      .then(response => {
        dispatch(getTemplatePrioritiesSuccess(response.data, query));
      })
      .catch(error => {
        console.error(error);
      });
  };
}

function getTemplatePrioritiesSuccess(payload, { profile_name, ...restArgs }) {
  const priorities = payload.reduce(
    (acc, elm) => {
      acc[profile_name] = [
        ...acc[profile_name],
        { ...{ id: elm.template_id, priority: elm.priority }, ...restArgs }
      ];
      return acc;
    },
    { [profile_name]: [] }
  );

  priorities[profile_name] = sortById(priorities[profile_name]);
  return {
    type: GET_TEMPLATE_PRIORITIES_SUCCESS,
    payload: priorities
  };
}

export function fetchSetTemplatePriority(
  {
    profile_name,
    device_id,
    model_id,
    os_id,
    os_version_id,
    browser_id,
    template_id,
    priority
  },
  onSuccess
) {
  const query = arguments[0];
  return dispatch => {
    return SetTemplatePriority(query)
      .then(_ => {
        dispatch(setTemplatePrioritySuccess(query));
        onSuccess();
      })
      .catch(error => console.error(error));
  };
}

function setTemplatePrioritySuccess(
  {
    profile_name,
    device_id,
    model_id,
    os_id,
    os_version_id,
    browser_id,
    template_id,
    priority
  }
) {
  const priorityProp = {
    id: template_id,
    device_id,
    model_id,
    os_id,
    os_version_id,
    browser_id,
    priority: Number(priority)
  };

  return {
    type: SET_TEMPLATE_PRIORITY_SUCCESS,
    payload: { profile_name, priority: priorityProp }
  };
}

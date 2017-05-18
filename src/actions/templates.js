import { AddTemplate, GetTemplates, RemoveTemplates } from "../api/templates";
import {
  ADD_TEMPLATE_SUCCESS,
  GET_TEMPLATES_SUCCESS,
  REMOVE_TEMPLATES_SUCCESS
} from "../constants/templates";

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

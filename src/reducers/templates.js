import {
  GET_TEMPLATES_SUCCESS,
  ADD_TEMPLATE_SUCCESS,
  REMOVE_TEMPLATES_SUCCESS
} from "../constants/templates";
import { filterById, sortById } from "../utils/ramda";

const initialState = {
  entities: [],
  fetchStatus: false
};

export default function templateState(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TEMPLATES_SUCCESS: {
      return {
        ...state,
        entities: sortById(payload),
        fetchStatus: true
      };
    }

    case ADD_TEMPLATE_SUCCESS: {
      return {
        ...state,
        entities: sortById([...state.entities, payload])
      };
    }
    case REMOVE_TEMPLATES_SUCCESS: {
      return filterById(payload, state);
    }

    default: {
      return state;
    }
  }
}

export function getTemplates(state) {
  return state.templates.entities;
}

export function getTemplateById(state) {
  const items = getTemplates(state);
  return id => {
    const isEqual = elm => elm.id === id;
    return items.find(isEqual);
  };
}

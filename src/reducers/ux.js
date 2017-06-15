import {
  UX_OPEN_EDIT_PROFILE_MODAL,
  UX_CLOSE_EDIT_PROFILE_MODAL
} from "../constants/ux";

const initialState = {
  showEditProfileModal: false,
  current_profile: null
};

export default function uxState(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UX_OPEN_EDIT_PROFILE_MODAL: {
      return {
        ...state,
        showEditProfileModal: true,
        current_profile: payload.profile_name
      };
    }

    case UX_CLOSE_EDIT_PROFILE_MODAL: {
      return {
        ...state,
        showEditProfileModal: false,
        current_profile: null
      };
    }

    default: {
      return state;
    }
  }
}

export function getEditProfileStatus(state) {
  return state.ux.showEditProfileModal;
}

export function getCurrentProfile(state) {
  return state.ux.current_profile;
}

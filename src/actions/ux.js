import {
  UX_OPEN_EDIT_PROFILE_MODAL,
  UX_CLOSE_EDIT_PROFILE_MODAL
} from "../constants/ux";

export function openEditProfileModal(profile_name) {
  return {
    type: UX_OPEN_EDIT_PROFILE_MODAL,
    payload: { profile_name }
  };
}

export function closeEditProfleModal() {
  return {
    type: UX_CLOSE_EDIT_PROFILE_MODAL
  };
}

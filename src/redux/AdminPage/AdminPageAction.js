import {
  GET__ALL_ROLES_REQUEST,
  ADD_ADMIN_ROLE_REQUEST,
  MODIFY_ADMIN_ROLE_REQUEST,
  DELETE_ADMIN_ROLE_REQUEST,
} from './AdminPageReducer';

export const getAll_Roles = (payload) => ({ type: GET__ALL_ROLES_REQUEST, payload });

export const addAdminRole = (payload) => ({
  type: ADD_ADMIN_ROLE_REQUEST,
  payload,
});

export const modifyAdminRole = (payload) => ({
  type: MODIFY_ADMIN_ROLE_REQUEST,
  payload,
});

export const deleteAdminRole = (payload) => ({
  type: DELETE_ADMIN_ROLE_REQUEST,
  payload,
});

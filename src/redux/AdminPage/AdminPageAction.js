import {
  GET__ALL_ROLES_REQUEST,
  ADD_ADMIN_ROLE_REQUEST,
  MODIFY_ADMIN_ROLE_REQUEST,
  DELETE_ADMIN_ROLE_REQUEST,
  GET_BU_ZONE_ROLES_REQUEST,
  ADD_BU_ZONE_ADMIN_ROLE_REQUEST,
  MODIFY_BU_ZONE_ADMIN_ROLE_REQUEST,
  DELETE_BU_ZONE_ADMIN_ROLE_REQUEST,
  GET_FUNCTION_ZONE_ROLES_REQUEST,
  ADD_FUNCTION_ZONE_ADMIN_ROLE_REQUEST,
  MODIFY_FUNCTION_ZONE_ADMIN_ROLE_REQUEST,
  DELETE_FUNCTION_ZONE_ADMIN_ROLE_REQUEST,
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

export const get_BU_Zone_Roles = (payload) => ({ type: GET_BU_ZONE_ROLES_REQUEST, payload });

export const add_BU_Zone_AdminRole = (payload) => ({
  type: ADD_BU_ZONE_ADMIN_ROLE_REQUEST,
  payload,
});

export const modify_BU_Zone_AdminRole = (payload) => ({
  type: MODIFY_BU_ZONE_ADMIN_ROLE_REQUEST,
  payload,
});

export const delete_BU_Zone_AdminRole = (payload) => ({
  type: DELETE_BU_ZONE_ADMIN_ROLE_REQUEST,
  payload,
});

export const get_Function_Zone_Roles = (payload) => ({
  type: GET_FUNCTION_ZONE_ROLES_REQUEST,
  payload,
});

export const add_Function_Zone_AdminRole = (payload) => ({
  type: ADD_FUNCTION_ZONE_ADMIN_ROLE_REQUEST,
  payload,
});

export const modify_Function_Zone_AdminRole = (payload) => ({
  type: MODIFY_FUNCTION_ZONE_ADMIN_ROLE_REQUEST,
  payload,
});

export const delete_Function_Zone_AdminRole = (payload) => ({
  type: DELETE_FUNCTION_ZONE_ADMIN_ROLE_REQUEST,
  payload,
});

import {
  SIGNUP_REQUEST,
  LOGIN_REQUEST,
  RESET_BLOCK_AUTH,
  RESET_FLAGS_AUTH,
  LOGOUT,
  SET_LOGIN_USER_INFO,
  SET_LOGIN_USER_ROLE,
  SET_USERS_ROLE,
  SET_SELECTED_MODULE_ROLE,
  SET_SELECT_ROLES,
} from './AuthReducer';

export const signup = (payload) => ({ type: SIGNUP_REQUEST, payload });

export const login = (payload) => ({ type: LOGIN_REQUEST, payload });

export const setLoginInfo = (payload) => ({ type: SET_LOGIN_USER_INFO, payload });

export const setLoginRole = (payload) => ({ type: SET_LOGIN_USER_ROLE, payload });

export const setRoles = (payload) => ({ type: SET_USERS_ROLE, payload });
export const setSelectedModuleRoles = (payload) => ({ type: SET_SELECTED_MODULE_ROLE, payload });
export const setSelectRoles = (payload) => ({ type: SET_SELECT_ROLES, payload });

export const resetBlockAuth = (payload) => ({
  type: RESET_BLOCK_AUTH,
  payload,
});

export const resetFlagsAuth = (payload) => ({
  type: RESET_FLAGS_AUTH,
  payload,
});

export const logout = () => ({
  type: LOGOUT,
});

import {
    SIGNUP_REQUEST,
    LOGIN_REQUEST,
    RESET_BLOCK_AUTH,
    RESET_FLAGS_AUTH,
    LOGOUT,
  } from './AuthReducer';
  
  export const signup = (payload) => ({ type: SIGNUP_REQUEST, payload });
  
  export const login = (payload) => ({ type: LOGIN_REQUEST, payload });
  
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
  
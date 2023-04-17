import { GET_USER_FROM_AD_REQUEST, ID_EMAIL_VALID_AD_REQUEST } from './AD_Reducer';
export const getUserFromAD = (payload) => ({ type: GET_USER_FROM_AD_REQUEST, payload });
export const isEmailValidAD = (payload) => ({ type: ID_EMAIL_VALID_AD_REQUEST, payload });
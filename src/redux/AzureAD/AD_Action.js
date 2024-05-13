import { GET_USER_FROM_AD_REQUEST, ID_EMAIL_VALID_AD_REQUEST, RESET_BLOCK_AD } from './AD_Reducer';
export const getUserFromAD = (payload) => ({ type: GET_USER_FROM_AD_REQUEST, payload });
export const isEmailValidAD = (payload) => ({ type: ID_EMAIL_VALID_AD_REQUEST, payload });

export const resetBlockAD = (payload) => ({
  type: RESET_BLOCK_AD,
  payload,
});

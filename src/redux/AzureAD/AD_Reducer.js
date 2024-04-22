import { stopAsyncValidation } from 'redux-form';

export const GET_USER_FROM_AD_REQUEST = 'GET_USER_FROM_AD_REQUEST';
export const GET_USER_FROM_AD_SUCCESS = 'GET_USER_FROM_AD_SUCCESS';
export const GET_USER_FROM_AD_ERROR = 'GET_USER_FROM_AD_ERROR';

export const ID_EMAIL_VALID_AD_REQUEST = 'ID_EMAIL_VALID_AD_REQUEST';
export const ID_EMAIL_VALID_AD_SUCCESS = 'ID_EMAIL_VALID_AD_SUCCESS';
export const ID_EMAIL_VALID_AD_ERROR = 'ID_EMAIL_VALID_AD_ERROR';

export const RESET_BLOCK_AD = 'RESET_BLOCK_AD';
export const RESET_FLAGS_AD = 'RESET_FLAGS_AD';

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  userFromAD: { ...block, data: [], emailCheck: false },
  isEmailValidAD: { ...block, data: [] },
};

export const AD_Reducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    // Azure get user from AD data
    case GET_USER_FROM_AD_REQUEST:
      return {
        ...state,
        userFromAD: { ...state.userFromAD, loading: true, data: [], emailCheck: false },
      };
    case GET_USER_FROM_AD_SUCCESS:
      return {
        ...state,
        userFromAD: {
          ...state.userFromAD,
          data: payload.users,
          emailCheck: payload.emailCheck,
          loading: false,
        },
      };
    case GET_USER_FROM_AD_ERROR:
      return {
        ...state,
        userFromAD: { ...state.userFromAD, loading: false },
      };
    // Azure IS user email valid from AD
    case ID_EMAIL_VALID_AD_REQUEST:
      return {
        ...state,
        isEmailValidAD: { ...state.isEmailValidAD, loading: true, data: [] },
      };
    case ID_EMAIL_VALID_AD_SUCCESS:
      return {
        ...state,
        isEmailValidAD: { ...state.isEmailValidAD, data: payload, loading: false },
      };
    case ID_EMAIL_VALID_AD_ERROR:
      return {
        ...state,
        isEmailValidAD: { ...state.isEmailValidAD, loading: false },
      };

    //reset block with flag and data
    case RESET_BLOCK_AD:
      return {
        ...state,
        [payload.blockType]: {
          ...state[payload.blockType],
          ...initialState[payload.blockType],
        },
      };

    //reset only flags(block)
    case RESET_FLAGS_AD:
      return {
        ...state,
        [payload.blockType]: {
          ...state[payload.blockType],
          ...block,
        },
      };

    default:
      return state;
  }
};

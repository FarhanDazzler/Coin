import { stopAsyncValidation } from 'redux-form';

export const GET_USER_FROM_AD_REQUEST = 'GET_USER_FROM_AD_REQUEST';
export const GET_USER_FROM_AD_SUCCESS = 'GET_USER_FROM_AD_SUCCESS';
export const GET_USER_FROM_AD_ERROR = 'GET_USER_FROM_AD_ERROR';

export const RESET_BLOCK_ASSESSMENT = 'RESET_BLOCK_ASSESSMENT';
export const RESET_FLAGS_ASSESSMENT = 'RESET_FLAGS_ASSESSMENT';

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  userFromAD: { ...block, data: [] },
};

export const AD_Reducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    // Azure get user from AD data
    case GET_USER_FROM_AD_REQUEST:
      return {
        ...state,
        userFromAD: { ...state.userFromAD, loading: true, data: [] },
      };
    case GET_USER_FROM_AD_SUCCESS:
      return {
        ...state,
        userFromAD: { ...state.userFromAD, data: payload?.user, loading: false },
      };
    case GET_USER_FROM_AD_ERROR:
      return {
        ...state,
        userFromAD: { ...state.userFromAD, loading: false },
      };

    //reset block with flag and data
    case RESET_BLOCK_ASSESSMENT:
      return {
        ...state,
        [payload.blockType]: {
          ...state[payload.blockType],
          ...initialState[payload.blockType],
        },
      };

    //reset only flags(block)
    case RESET_FLAGS_ASSESSMENT:
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

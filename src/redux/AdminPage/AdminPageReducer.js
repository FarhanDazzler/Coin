import { stopAsyncValidation } from 'redux-form';

export const RESET_BLOCK_ASSESSMENT = 'RESET_BLOCK_ASSESSMENT';
export const RESET_FLAGS_ASSESSMENT = 'RESET_FLAGS_ASSESSMENT';

// =================== GET All ROLE Data ========================//

export const GET__ALL_ROLES_REQUEST = 'GET__ALL_ROLES_REQUEST';
export const GET__ALL_ROLES_SUCCESS = 'GET__ALL_ROLES_SUCCESS';
export const GET__ALL_ROLES_ERROR = 'GET__ALL_ROLES_ERROR';

// =================== GET All  ROLE Data ========================//

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  getAll_Roles: { ...block, data: [] },
};

export const AdminPageReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    // Roles data
    case GET__ALL_ROLES_REQUEST:
      return {
        ...state,
        getAll_Roles: { ...state.getAll_Roles, loading: true },
      };
    case GET__ALL_ROLES_SUCCESS:
      return {
        ...state,
        getAll_Roles: { ...state.getAll_Roles, data: payload, loading: false },
      };
    case GET__ALL_ROLES_ERROR:
      return {
        ...state,
        getAll_Roles: { ...state.getAll_Roles, loading: false },
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

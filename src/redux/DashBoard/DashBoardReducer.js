import { stopAsyncValidation } from 'redux-form';

export const GET_INTERNAL_CONTROL_TABLE_REQUEST = 'GET_INTERNAL_CONTROL_TABLE_REQUEST';
export const GET_INTERNAL_CONTROL_TABLE_SUCCESS = 'GET_INTERNAL_CONTROL_TABLE_SUCCESS';
export const GET_INTERNAL_CONTROL_TABLE_ERROR = 'GET_INTERNAL_CONTROL_TABLE_ERROR';

export const GET_CONTROL_OWNER_TABLE_REQUEST = 'GET_CONTROL_OWNER_TABLE_REQUEST';
export const GET_CONTROL_OWNER_TABLE_SUCCESS = 'GET_CONTROL_OWNER_TABLE_SUCCESS';
export const GET_CONTROL_OWNER_TABLE_ERROR = 'GET_CONTROL_OWNER_TABLE_ERROR';

export const RESET_BLOCK_DASHBOARD = 'RESET_BLOCK_DASHBOARD';
export const RESET_FLAGS_DASHBOARD = 'RESET_FLAGS_DASHBOARD';

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  sectionAns: null,
  internalControlData: { ...block, data: [] },
  controlOwnerData: { ...block, data: [] },
};

export const dashBoardReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case GET_INTERNAL_CONTROL_TABLE_REQUEST:
      return {
        ...state,
        internalControlData: { ...state.internalControlData, loading: true },
      };
    case GET_INTERNAL_CONTROL_TABLE_SUCCESS:
      return {
        ...state,
        internalControlData: {
          ...state.internalControlData,
          data: payload.data,
          loading: false,
        },
      };
    case GET_INTERNAL_CONTROL_TABLE_ERROR:
      return {
        ...state,
        internalControlData: { ...state.internalControlData, loading: true },
      };

    case GET_CONTROL_OWNER_TABLE_REQUEST:
      return {
        ...state,
        controlOwnerData: { ...state.controlOwnerData, loading: true },
      };
    case GET_CONTROL_OWNER_TABLE_SUCCESS:
      return {
        ...state,
        controlOwnerData: {
          ...state.controlOwnerData,
          data: payload.data,
          loading: false,
        },
      };
    case GET_CONTROL_OWNER_TABLE_ERROR:
      return {
        ...state,
        controlOwnerData: { ...state.controlOwnerData, loading: true },
      };

    //reset block with flag and data
    case RESET_BLOCK_DASHBOARD:
      return {
        ...state,
        [payload.blockType]: {
          ...state[payload.blockType],
          ...initialState[payload.blockType],
        },
      };

    //reset only flags(block)
    case RESET_FLAGS_DASHBOARD:
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

import { stopAsyncValidation } from 'redux-form';

export const GET_DASHBOARD_REQUEST = 'GET_DASHBOARD_REQUEST';
export const GET_DASHBOARD_SUCCESS = 'GET_DASHBOARD_SUCCESS';
export const GET_DASHBOARD_ERROR = 'GET_DASHBOARD_ERROR';

export const RESET_BLOCK_DASHBOARD = 'RESET_BLOCK_DASHBOARD';
export const RESET_FLAGS_DASHBOARD = 'RESET_FLAGS_DASHBOARD';

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  sectionAns: null,
  controlOwnerAndOverSightList: { ...block, data: { s1: null, s2: null, s3: null } },
};

export const dashBoardReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {

    case GET_DASHBOARD_REQUEST:
      return {
        ...state,
        controlOwnerAndOverSightList: { ...state.controlOwnerAndOverSightList, loading: true },
      };
    case GET_DASHBOARD_SUCCESS:
      if (typeof payload.data === 'string') {
        return {
          ...state,
          controlOwnerAndOverSightList: { ...state.controlOwnerAndOverSightList, loading: true },
        };
      }
      return {
        ...state,
        controlOwnerAndOverSightList: { ...state.controlOwnerAndOverSightList, data: payload.data, loading: true },
      };
    case GET_DASHBOARD_ERROR:
      return {
        ...state,
        controlOwnerAndOverSightList: { ...state.controlOwnerAndOverSightList, loading: true },
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

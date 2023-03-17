import { stopAsyncValidation } from 'redux-form';

export const GET_ORG_STRUCTURES_REQUEST = 'GET_ORG_STRUCTURES_REQUEST';
export const GET_ORG_STRUCTURES_SUCCESS = 'GET_ORG_STRUCTURES_SUCCESS';
export const GET_ORG_STRUCTURES_ERROR = 'GET_ORG_STRUCTURES_ERROR';

export const GET_ORG_HIERARCHY_REQUEST = 'GET_ORG_HIERARCHY_REQUEST';
export const GET_ORG_HIERARCHY_SUCCESS = 'GET_ORG_HIERARCHY_SUCCESS';
export const GET_ORG_HIERARCHY_ERROR = 'GET_ORG_STRUCTURES_ERROR';

export const GET_MICS_FRAMEWORK_REQUEST = 'GET_MICS_FRAMEWORK_REQUEST';
export const GET_MICS_FRAMEWORK_SUCCESS = 'GET_MICS_FRAMEWORK_SUCCESS';
export const GET_MICS_FRAMEWORK_ERROR = 'GET_MICS_FRAMEWORK_ERROR';

export const RESET_BLOCK_ASSESSMENT = 'RESET_BLOCK_ASSESSMENT';
export const RESET_FLAGS_ASSESSMENT = 'RESET_FLAGS_ASSESSMENT';

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  orgStructures: { ...block, data: [] },
  orgHierarchy: { ...block, data: [] },
  micsFramework: { ...block, data: [] },
};

export const MDMReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    // MDM Org Structures data
    case GET_ORG_STRUCTURES_REQUEST:
      return {
        ...state,
        orgStructures: { ...state.orgStructures, loading: true },
      };
    case GET_ORG_STRUCTURES_SUCCESS:
      return {
        ...state,
        orgStructures: { ...state.orgStructures, data: payload, loading: false },
      };
    case GET_ORG_STRUCTURES_ERROR:
      return {
        ...state,
        orgStructures: { ...state.orgStructures, loading: false },
      };

    // MDM Org Hierarchy data
    case GET_ORG_HIERARCHY_REQUEST:
      return {
        ...state,
        orgHierarchy: { ...state.orgHierarchy, loading: true },
      };
    case GET_ORG_HIERARCHY_SUCCESS:
      return {
        ...state,
        orgHierarchy: { ...state.orgHierarchy, data: payload, loading: false },
      };
    case GET_ORG_HIERARCHY_ERROR:
      return {
        ...state,
        orgHierarchy: { ...state.orgHierarchy, loading: false },
      };

    // MDM MICS Framework data
    case GET_MICS_FRAMEWORK_REQUEST:
      return {
        ...state,
        micsFramework: { ...state.micsFramework, loading: true },
      };
    case GET_MICS_FRAMEWORK_SUCCESS:
      return {
        ...state,
        micsFramework: { ...state.micsFramework, data: payload, loading: false },
      };
    case GET_MICS_FRAMEWORK_ERROR:
      return {
        ...state,
        micsFramework: { ...state.micsFramework, loading: false },
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

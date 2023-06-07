import { stopAsyncValidation } from 'redux-form';

export const RESET_BLOCK_ASSESSMENT = 'RESET_BLOCK_ASSESSMENT';
export const RESET_FLAGS_ASSESSMENT = 'RESET_FLAGS_ASSESSMENT';

// =================== GET All ROLE Data ========================//

export const GET__ALL_ROLES_REQUEST = 'GET__ALL_ROLES_REQUEST';
export const GET__ALL_ROLES_SUCCESS = 'GET__ALL_ROLES_SUCCESS';
export const GET__ALL_ROLES_ERROR = 'GET__ALL_ROLES_ERROR';

// =================== GET All  ROLE Data ========================//

// =================== ADD  ROLE Data ========================//

export const ADD_ADMIN_ROLE_REQUEST = 'ADD_ADMIN_ROLE_REQUEST';
export const ADD_ADMIN_ROLE_SUCCESS = 'ADD_ADMIN_ROLE_SUCCESS';
export const ADD_ADMIN_ROLE_ERROR = 'ADD_ADMIN_ROLE_ERROR';

// =================== ADD   ROLE Data ========================//

// =================== Modify ROLE Data ========================//

export const MODIFY_ADMIN_ROLE_REQUEST = 'MODIFY_ADMIN_ROLE_REQUEST';
export const MODIFY_ADMIN_ROLE_SUCCESS = 'MODIFY_ADMIN_ROLE_SUCCESS';
export const MODIFY_ADMIN_ROLE_ERROR = 'MODIFY_ADMIN_ROLE_ERROR';

// =================== Modify  ROLE Data ========================//

// =================== Delete ROLE Data ========================//

export const DELETE_ADMIN_ROLE_REQUEST = 'DELETE_ADMIN_ROLE_REQUEST';
export const DELETE_ADMIN_ROLE_SUCCESS = 'DELETE_ADMIN_ROLE_SUCCESS';
export const DELETE_ADMIN_ROLE_ERROR = 'DELETE_ADMIN_ROLE_ERROR';

// =================== Delete ROLE Data ========================//

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  getAll_Roles: { ...block, data: [] },
  addAdminRole: { ...block, data: [] },
  modifyAdminRole: { ...block, data: [] },
  deleteAdminRole: { ...block, data: [] },
};

export const AdminPageReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    // Get Roles data
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

    // Add Roles data
    case ADD_ADMIN_ROLE_REQUEST:
      return {
        ...state,
        addAdminRole: { ...state.addAdminRole, loading: true },
      };
    case ADD_ADMIN_ROLE_SUCCESS:
      return {
        ...state,
        addAdminRole: { ...state.addAdminRole, data: payload, loading: false },
      };
    case ADD_ADMIN_ROLE_ERROR:
      return {
        ...state,
        addAdminRole: { ...state.addAdminRole, loading: false },
      };

    // Modify Roles data
    case MODIFY_ADMIN_ROLE_REQUEST:
      return {
        ...state,
        modifyAdminRole: { ...state.modifyAdminRole, loading: true },
      };
    case MODIFY_ADMIN_ROLE_SUCCESS:
      return {
        ...state,
        modifyAdminRole: { ...state.modifyAdminRole, data: payload, loading: false },
      };
    case MODIFY_ADMIN_ROLE_ERROR:
      return {
        ...state,
        modifyAdminRole: { ...state.modifyAdminRole, loading: false },
      };

    //Delete Roles data
    case DELETE_ADMIN_ROLE_REQUEST:
      return {
        ...state,
        deleteAdminRole: { ...state.deleteAdminRole, loading: true },
      };
    case DELETE_ADMIN_ROLE_SUCCESS:
      return {
        ...state,
        deleteAdminRole: { ...state.deleteAdminRole, data: payload, loading: false },
      };
    case DELETE_ADMIN_ROLE_ERROR:
      return {
        ...state,
        deleteAdminRole: { ...state.deleteAdminRole, loading: false },
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

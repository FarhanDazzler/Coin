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

// =================== GET BU Zone ROLE Data ========================//

export const GET_BU_ZONE_ROLES_REQUEST = 'GET_BU_ZONE_ROLES_REQUEST';
export const GET_BU_ZONE_ROLES_SUCCESS = 'GET_BU_ALL_ROLES_SUCCESS';
export const GET_BU_ZONE_ROLES_ERROR = 'GET_BU_ZONE_ROLES_ERROR';

// =================== GET BU Zone  ROLE Data ========================//

// =================== ADD BU Zone ROLE Data ========================//

export const ADD_BU_ZONE_ADMIN_ROLE_REQUEST = 'ADD_BU_ZONE_ADMIN_ROLE_REQUEST';
export const ADD_BU_ZONE_ADMIN_ROLE_SUCCESS = 'ADD_BU_ZONE_ADMIN_ROLE_SUCCESS';
export const ADD_BU_ZONE_ADMIN_ROLE_ERROR = 'ADD_BU_ZONE_ADMIN_ROLE_ERROR';

// =================== ADD BU Zone ROLE Data ========================//

// =================== Modify BU Zone ROLE Data ========================//

export const MODIFY_BU_ZONE_ADMIN_ROLE_REQUEST = 'MODIFY_BU_ZONE_ADMIN_ROLE_REQUEST';
export const MODIFY_BU_ZONE_ADMIN_ROLE_SUCCESS = 'MODIFY_BU_ZONE_ADMIN_ROLE_SUCCESS';
export const MODIFY_BU_ZONE_ADMIN_ROLE_ERROR = 'MODIFY_BU_ZONE_ADMIN_ROLE_ERROR';

// =================== Modify BU Zone ROLE Data ========================//

// =================== Delete BU Zone ROLE Data ========================//

export const DELETE_BU_ZONE_ADMIN_ROLE_REQUEST = 'DELETE_BU_ZONE_ADMIN_ROLE_REQUEST';
export const DELETE_BU_ZONE_ADMIN_ROLE_SUCCESS = 'DELETE_BU_ZONE_ADMIN_ROLE_SUCCESS';
export const DELETE_BU_ZONE_ADMIN_ROLE_ERROR = 'DELETE_BU_ZONE_ADMIN_ROLE_ERROR';

// =================== Delete BU Zone ROLE Data ========================//

// =================== GET Function ZONE ROLE Data ========================//

export const GET_FUNCTION_ZONE_ROLES_REQUEST = 'GET_FUNCTION_ZONE_ROLES_REQUEST';
export const GET_FUNCTION_ZONE_ROLES_SUCCESS = 'GET_FUNCTION_ZONE_ROLES_SUCCESS';
export const GET_FUNCTION_ZONE_ROLES_ERROR = 'GET_FUNCTION_ZONE_ROLES_ERROR';

// =================== GET Function ZONE  ROLE Data ========================//

// =================== ADD Function Zone ROLE Data ========================//

export const ADD_FUNCTION_ZONE_ADMIN_ROLE_REQUEST = 'ADD_FUNCTION_ZONE_ADMIN_ROLE_REQUEST';
export const ADD_FUNCTION_ZONE_ADMIN_ROLE_SUCCESS = 'ADD_FUNCTION_ZONE_ADMIN_ROLE_SUCCESS';
export const ADD_FUNCTION_ZONE_ADMIN_ROLE_ERROR = 'ADD_FUNCTION_ZONE_ADMIN_ROLE_ERROR';

// =================== ADD Function Zone ROLE Data ========================//

// =================== Modify Function Zone ROLE Data ========================//

export const MODIFY_FUNCTION_ZONE_ADMIN_ROLE_REQUEST = 'MODIFY_FUNCTION_ZONE_ADMIN_ROLE_REQUEST';
export const MODIFY_FUNCTION_ZONE_ADMIN_ROLE_SUCCESS = 'MODIFY_FUNCTION_ZONE_ADMIN_ROLE_SUCCESS';
export const MODIFY_FUNCTION_ZONE_ADMIN_ROLE_ERROR = 'MODIFY_FUNCTION_ZONE_ADMIN_ROLE_ERROR';

// =================== Modify Function Zone ROLE Data ========================//

// =================== Delete Function Zone ROLE Data ========================//

export const DELETE_FUNCTION_ZONE_ADMIN_ROLE_REQUEST = 'DELETE_FUNCTION_ZONE_ADMIN_ROLE_REQUEST';
export const DELETE_FUNCTION_ZONE_ADMIN_ROLE_SUCCESS = 'DELETE_FUNCTION_ZONE_ADMIN_ROLE_SUCCESS';
export const DELETE_FUNCTION_ZONE_ADMIN_ROLE_ERROR = 'DELETE_FUNCTION_ZONE_ADMIN_ROLE_ERROR';

// =================== Delete Function Zone ROLE Data ========================//

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
  get_BU_Zone_Roles: { ...block, data: [] },
  add_BU_Zone_AdminRole: { ...block, data: [] },
  modify_BU_Zone_AdminRole: { ...block, data: [] },
  delete_BU_Zone_AdminRole: { ...block, data: [] },
  get_Function_Zone_Roles: { ...block, data: [] },
  add_Function_Zone_AdminRole: { ...block, data: [] },
  modify_Function_Zone_AdminRole: { ...block, data: [] },
  delete_Function_Zone_AdminRole: { ...block, data: [] },
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

    // Get BU Zone Roles data
    case GET_BU_ZONE_ROLES_REQUEST:
      return {
        ...state,
        get_BU_Zone_Roles: { ...state.get_BU_Zone_Roles, loading: true },
      };
    case GET_BU_ZONE_ROLES_SUCCESS:
      return {
        ...state,
        get_BU_Zone_Roles: { ...state.get_BU_Zone_Roles, data: payload, loading: false },
      };
    case GET_BU_ZONE_ROLES_ERROR:
      return {
        ...state,
        get_BU_Zone_Roles: { ...state.get_BU_Zone_Roles, loading: false },
      };

    // Add BU Zone Roles data
    case ADD_BU_ZONE_ADMIN_ROLE_REQUEST:
      return {
        ...state,
        add_BU_Zone_AdminRole: { ...state.add_BU_Zone_AdminRole, loading: true },
      };
    case ADD_BU_ZONE_ADMIN_ROLE_SUCCESS:
      return {
        ...state,
        add_BU_Zone_AdminRole: { ...state.add_BU_Zone_AdminRole, data: payload, loading: false },
      };
    case ADD_BU_ZONE_ADMIN_ROLE_ERROR:
      return {
        ...state,
        add_BU_Zone_AdminRole: { ...state.add_BU_Zone_AdminRole, loading: false },
      };

    // Modify BU Zone Roles data
    case MODIFY_BU_ZONE_ADMIN_ROLE_REQUEST:
      return {
        ...state,
        modify_BU_Zone_AdminRole: { ...state.modify_BU_Zone_AdminRole, loading: true },
      };
    case MODIFY_BU_ZONE_ADMIN_ROLE_SUCCESS:
      return {
        ...state,
        modify_BU_Zone_AdminRole: {
          ...state.modify_BU_Zone_AdminRole,
          data: payload,
          loading: false,
        },
      };
    case MODIFY_BU_ZONE_ADMIN_ROLE_ERROR:
      return {
        ...state,
        modify_BU_Zone_AdminRole: { ...state.modify_BU_Zone_AdminRole, loading: false },
      };

    //Delete BU Zone Roles data
    case DELETE_BU_ZONE_ADMIN_ROLE_REQUEST:
      return {
        ...state,
        delete_BU_Zone_AdminRole: { ...state.delete_BU_Zone_AdminRole, loading: true },
      };
    case DELETE_BU_ZONE_ADMIN_ROLE_SUCCESS:
      return {
        ...state,
        delete_BU_Zone_AdminRole: {
          ...state.delete_BU_Zone_AdminRole,
          data: payload,
          loading: false,
        },
      };
    case DELETE_BU_ZONE_ADMIN_ROLE_ERROR:
      return {
        ...state,
        delete_BU_Zone_AdminRole: { ...state.delete_BU_Zone_AdminRole, loading: false },
      };

    // Get Function Zone Roles data
    case GET_FUNCTION_ZONE_ROLES_REQUEST:
      return {
        ...state,
        get_Function_Zone_Roles: { ...state.get_Function_Zone_Roles, loading: true },
      };
    case GET_FUNCTION_ZONE_ROLES_SUCCESS:
      return {
        ...state,
        get_Function_Zone_Roles: {
          ...state.get_Function_Zone_Roles,
          data: payload,
          loading: false,
        },
      };
    case GET_FUNCTION_ZONE_ROLES_ERROR:
      return {
        ...state,
        get_Function_Zone_Roles: { ...state.get_Function_Zone_Roles, loading: false },
      };

    // Add Function Zone Roles data
    case ADD_FUNCTION_ZONE_ADMIN_ROLE_REQUEST:
      return {
        ...state,
        add_Function_Zone_AdminRole: {
          ...state.add_Function_Zone_AdminRole,
          loading: true,
        },
      };
    case ADD_FUNCTION_ZONE_ADMIN_ROLE_SUCCESS:
      return {
        ...state,
        add_Function_Zone_AdminRole: {
          ...state.add_Function_Zone_AdminRole,
          data: payload,
          loading: false,
        },
      };
    case ADD_FUNCTION_ZONE_ADMIN_ROLE_ERROR:
      return {
        ...state,
        add_Function_Zone_AdminRole: { ...state.add_Function_Zone_AdminRole, loading: false },
      };

    // Modify Function Zone Roles data
    case MODIFY_FUNCTION_ZONE_ADMIN_ROLE_REQUEST:
      return {
        ...state,
        modify_Function_Zone_AdminRole: {
          ...state.modify_Function_Zone_AdminRole,
          loading: true,
        },
      };
    case MODIFY_FUNCTION_ZONE_ADMIN_ROLE_SUCCESS:
      return {
        ...state,
        modify_Function_Zone_AdminRole: {
          ...state.modify_Function_Zone_AdminRole,
          data: payload,
          loading: false,
        },
      };
    case MODIFY_FUNCTION_ZONE_ADMIN_ROLE_ERROR:
      return {
        ...state,
        modify_Function_Zone_AdminRole: {
          ...state.modify_Function_Zone_AdminRole,
          loading: false,
        },
      };

    //Delete Function Zone Roles data
    case DELETE_FUNCTION_ZONE_ADMIN_ROLE_REQUEST:
      return {
        ...state,
        delete_Function_Zone_AdminRole: {
          ...state.delete_Function_Zone_AdminRole,
          loading: true,
        },
      };
    case DELETE_FUNCTION_ZONE_ADMIN_ROLE_SUCCESS:
      return {
        ...state,
        delete_Function_Zone_AdminRole: {
          ...state.delete_Function_Zone_AdminRole,
          data: payload,
          loading: false,
        },
      };
    case DELETE_FUNCTION_ZONE_ADMIN_ROLE_ERROR:
      return {
        ...state,
        delete_Function_Zone_AdminRole: {
          ...state.delete_Function_Zone_AdminRole,
          loading: false,
        },
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

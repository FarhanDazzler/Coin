export const GET_RL_ORG_HIERARCHY_REQUEST = 'GET_RL_ORG_HIERARCHY_REQUEST';
export const GET_RL_ORG_HIERARCHY_SUCCESS = 'GET_RL_ORG_HIERARCHY_SUCCESS';
export const GET_RL_ORG_HIERARCHY_ERROR = 'GET_RL_ORG_HIERARCHY_ERROR';

export const GET_RL_ORG_MD_REQUEST = 'GET_RL_ORG_MD_REQUEST';
export const GET_RL_ORG_MD_SUCCESS = 'GET_RL_ORG_MD_SUCCESS';
export const GET_RL_ORG_MD_ERROR = 'GET_RL_ORG_MD_ERROR';

export const GET_RL_BU_MASTERDATA_REQUEST = 'GET_RL_BU_MASTERDATA_REQUEST';
export const GET_RL_BU_MASTERDATA_SUCCESS = 'GET_RL_BU_MASTERDATA_SUCCESS';
export const GET_RL_BU_MASTERDATA_ERROR = 'GET_RL_BU_MASTERDATA_ERROR';

// =================== Assign Repp Letter BU Master DATA ========================//
export const ASSIGN_RL_BU_MASTERDATA_REQUEST = 'ASSIGN_RL_BU_MASTERDATA_REQUEST';
export const ASSIGN_RL_BU_MASTERDATA_SUCCESS = 'ASSIGN_RL_BU_MASTERDATA_SUCCESS';
export const ASSIGN_RL_BU_MASTERDATA_ERROR = 'ASSIGN_RL_BU_MASTERDATA_ERROR';
// =================== Assign Repp Letter BU Master DATA ========================//

export const GET_RL_FUNCTIONAL_MASTERDATA_REQUEST = 'GET_RL_FUNCTIONAL_MASTERDATA_REQUEST';
export const GET_RL_FUNCTIONAL_MASTERDATA_SUCCESS = 'GET_RL_FUNCTIONAL_MASTERDATA_SUCCESS';
export const GET_RL_FUNCTIONAL_MASTERDATA_ERROR = 'GET_RL_FUNCTIONAL_MASTERDATA_ERROR';

// =================== Get Parent ENtity Data ========================//

export const ACTION_GET_RL_PARENT_ENTITY_DATA = 'ACTION_GET_RL_PARENT_ENTITY_DATA';
export const ACTION_GET_RL_PARENT_ENTITY_DATA_SUCCESS = 'ACTION_GET_RL_PARENT_ENTITY_DATA_SUCCESS';
export const ACTION_GET_RL_PARENT_ENTITY_DATA_FAILED = 'ACTION_GET_RL_PARENT_ENTITY_DATA_FAILED';

// =================== Get Parent ENtity Data ========================//

// =================== ADD Organisational MD ========================//

export const ACTION_ADD_ORGANIZATIONAL_MD_DATA = 'ACTION_ADD_ORGANIZATIONAL_MD_DATA';
export const ACTION_ADD_ORGANIZATIONAL_MD_DATA_SUCCESS =
  'ACTION_ADD_ORGANIZATIONAL_MD_DATA_SUCCESS';
export const ACTION_ADD_ORGANIZATIONAL_MD_DATA_FAILED = 'ACTION_ADD_ORGANIZATIONAL_MD_DATA_FAILED';

// =================== ADD Organisational MD ========================//

// =================== UPDATE Organisational MD ========================//

export const ACTION_UPDATE_ORGANIZATIONAL_MD_DATA = 'ACTION_UPDATE_ORGANIZATIONAL_MD_DATA';
export const ACTION_UPDATE_ORGANIZATIONAL_MD_DATA_SUCCESS =
  'ACTION_UPDATE_ORGANIZATIONAL_MD_DATA_SUCCESS';
export const ACTION_UPDATE_ORGANIZATIONAL_MD_DATA_FAILED =
  'ACTION_UPDATE_ORGANIZATIONAL_MD_DATA_FAILED';

// =================== UPDATE Organisational MD ========================//
// =================== Assign Repp Letter Functional Master DATA ========================//
export const ASSIGN_RL_FUNCTIONAL_MASTERDATA_REQUEST = 'ASSIGN_RL_FUNCTIONAL_MASTERDATA_REQUEST';
export const ASSIGN_RL_FUNCTIONAL_MASTERDATA_SUCCESS = 'ASSIGN_RL_FUNCTIONAL_MASTERDATA_SUCCESS';
export const ASSIGN_RL_FUNCTIONAL_MASTERDATA_ERROR = 'ASSIGN_RL_FUNCTIONAL_MASTERDATA_ERROR';
// =================== Assign Repp Letter Functional Master DATA ========================//

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  rlOrgHierarchy: { ...block, data: [] },
  rlOrgMd: { ...block, data: [] },
  rlBuMasterdata: { ...block, data: [] },
  rlAssignBuMasterdata: { ...block, data: [] },
  rlFunctionalMasterdata: { ...block, data: [] },
  getRlParentEntityData: { ...block, data: [] },
  addOrganizationalMd: { ...block, data: [] },
  updateOrganizationalMd: { ...block, data: [] },
  rlAssignFunctionalMasterdata: { ...block, data: [] },
};

export const RLMDMReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    // MDM Org Hierarchy data
    case GET_RL_ORG_HIERARCHY_REQUEST:
      return {
        ...state,
        rlOrgHierarchy: { ...state.rlOrgHierarchy, loading: true },
      };
    case GET_RL_ORG_HIERARCHY_SUCCESS:
      return {
        ...state,
        rlOrgHierarchy: { ...state.rlOrgHierarchy, data: payload, loading: false },
      };
    case GET_RL_ORG_HIERARCHY_ERROR:
      return {
        ...state,
        rlOrgHierarchy: { ...state.rlOrgHierarchy, loading: false },
      };

    // MDM Org MD data
    case GET_RL_ORG_MD_REQUEST:
      return {
        ...state,
        rlOrgMd: { ...state.rlOrgMd, loading: true },
      };
    case GET_RL_ORG_MD_SUCCESS:
      return {
        ...state,
        rlOrgMd: { ...state.rlOrgMd, data: payload, loading: false },
      };
    case GET_RL_ORG_MD_ERROR:
      return {
        ...state,
        rlOrgMd: { ...state.rlOrgMd, loading: false },
      };

    // MDM BU MD data
    case GET_RL_BU_MASTERDATA_REQUEST:
      return {
        ...state,
        rlBuMasterdata: { ...state.rlBuMasterdata, loading: true },
      };
    case GET_RL_BU_MASTERDATA_SUCCESS:
      return {
        ...state,
        rlBuMasterdata: { ...state.rlBuMasterdata, data: payload, loading: false },
      };
    case GET_RL_BU_MASTERDATA_ERROR:
      return {
        ...state,
        rlBuMasterdata: { ...state.rlBuMasterdata, loading: false },
      };

    // MDM ASSIGN BU MD data
    case ASSIGN_RL_BU_MASTERDATA_REQUEST:
      return {
        ...state,
        rlAssignBuMasterdata: { ...state.rlAssignBuMasterdata, loading: true },
      };
    case ASSIGN_RL_BU_MASTERDATA_SUCCESS:
      return {
        ...state,
        rlAssignBuMasterdata: { ...state.rlAssignBuMasterdata, data: payload, loading: false },
      };
    case ASSIGN_RL_BU_MASTERDATA_ERROR:
      return {
        ...state,
        rlAssignBuMasterdata: { ...state.rlAssignBuMasterdata, loading: false },
      };

    // MDM FUNCTIONAL MD data
    case GET_RL_FUNCTIONAL_MASTERDATA_REQUEST:
      return {
        ...state,
        rlFunctionalMasterdata: { ...state.rlFunctionalMasterdata, loading: true },
      };
    case GET_RL_FUNCTIONAL_MASTERDATA_SUCCESS:
      return {
        ...state,
        rlFunctionalMasterdata: { ...state.rlFunctionalMasterdata, data: payload, loading: false },
      };
    case GET_RL_FUNCTIONAL_MASTERDATA_ERROR:
      return {
        ...state,
        rlFunctionalMasterdata: { ...state.rlFunctionalMasterdata, loading: false },
      };

    // Get Parent Entity
    case ACTION_GET_RL_PARENT_ENTITY_DATA:
      return {
        ...state,
        getRlParentEntityData: {
          ...state.getRlParentEntityData,
          loading: true,
        },
      };
    case ACTION_GET_RL_PARENT_ENTITY_DATA_SUCCESS:
      return {
        ...state,
        getRlParentEntityData: {
          ...state.getRlParentEntityData,
          data: payload,
          loading: false,
        },
      };
      case ACTION_GET_RL_PARENT_ENTITY_DATA_FAILED:
      return {
        ...state,
        getRlParentEntityData: {
          ...state.getRlParentEntityData,
          loading: false,
        },
      };
      
    // MDM ASSIGN Functional MD data
    case ASSIGN_RL_FUNCTIONAL_MASTERDATA_REQUEST:
      return {
        ...state,
        rlAssignFunctionalMasterdata: { ...state.rlAssignFunctionalMasterdata, loading: true },
      };
    case ASSIGN_RL_FUNCTIONAL_MASTERDATA_SUCCESS:
      return {
        ...state,
        rlAssignFunctionalMasterdata: {
          ...state.rlAssignFunctionalMasterdata,
          data: payload,
          loading: false,
        },
      };
      case ASSIGN_RL_FUNCTIONAL_MASTERDATA_ERROR:
      return {
        ...state,
        rlAssignFunctionalMasterdata: { ...state.rlAssignFunctionalMasterdata, loading: false },
      };
    

    // Add Organizational MD
    case ACTION_ADD_ORGANIZATIONAL_MD_DATA:
      return {
        ...state,
        addOrganizationalMd: {
          ...state.addOrganizationalMd,
          loading: true,
        },
      };
    case ACTION_ADD_ORGANIZATIONAL_MD_DATA_SUCCESS:
      return {
        ...state,
        addOrganizationalMd: {
          ...state.addOrganizationalMd,
          data: payload,
          loading: false,
        },
      };
    case ACTION_ADD_ORGANIZATIONAL_MD_DATA_FAILED:
      return {
        ...state,
        addOrganizationalMd: {
          ...state.addOrganizationalMd,
          loading: false,
        },
      };

    // Add Organizational MD
    case ACTION_UPDATE_ORGANIZATIONAL_MD_DATA:
      return {
        ...state,
        updateOrganizationalMd: {
          ...state.updateOrganizationalMd,
          loading: true,
        },
      };
    case ACTION_UPDATE_ORGANIZATIONAL_MD_DATA_SUCCESS:
      return {
        ...state,
        updateOrganizationalMd: {
          ...state.updateOrganizationalMd,
          data: payload,
          loading: false,
        },
      };
    case ACTION_UPDATE_ORGANIZATIONAL_MD_DATA_FAILED:
      return {
        ...state,
        updateOrganizationalMd: {
          ...state.updateOrganizationalMd,
          loading: false,
        },
    }
    

    default:
      return state;
  }
};

export const GET_RL_ORG_HIERARCHY_REQUEST = 'GET_RL_ORG_HIERARCHY_REQUEST';
export const GET_RL_ORG_HIERARCHY_SUCCESS = 'GET_RL_ORG_HIERARCHY_SUCCESS';
export const GET_RL_ORG_HIERARCHY_ERROR = 'GET_RL_ORG_HIERARCHY_ERROR';

export const GET_RL_ORG_MD_REQUEST = 'GET_RL_ORG_MD_REQUEST';
export const GET_RL_ORG_MD_SUCCESS = 'GET_RL_ORG_MD_SUCCESS';
export const GET_RL_ORG_MD_ERROR = 'GET_RL_ORG_MD_ERROR';

export const GET_RL_BU_MASTERDATA_REQUEST = 'GET_RL_BU_MASTERDATA_REQUEST';
export const GET_RL_BU_MASTERDATA_SUCCESS = 'GET_RL_BU_MASTERDATA_SUCCESS';
export const GET_RL_BU_MASTERDATA_ERROR = 'GET_RL_BU_MASTERDATA_ERROR';

export const GET_RL_FUNCTIONAL_MASTERDATA_REQUEST = 'GET_RL_FUNCTIONAL_MASTERDATA_REQUEST';
export const GET_RL_FUNCTIONAL_MASTERDATA_SUCCESS = 'GET_RL_FUNCTIONAL_MASTERDATA_SUCCESS';
export const GET_RL_FUNCTIONAL_MASTERDATA_ERROR = 'GET_RL_FUNCTIONAL_MASTERDATA_ERROR';

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  rlOrgHierarchy: { ...block, data: [] },
  rlOrgMd: { ...block, data: [] },
  rlBuMasterdata: { ...block, data: [] },
  rlFunctionalMasterdata: { ...block, data: [] },
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

    default:
      return state;
  }
};

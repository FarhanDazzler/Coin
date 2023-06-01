export const GET_RL_ORG_HIERARCHY_REQUEST = 'GET_RL_ORG_HIERARCHY_REQUEST';
export const GET_RL_ORG_HIERARCHY_SUCCESS = 'GET_RL_ORG_HIERARCHY_SUCCESS';
export const GET_RL_ORG_HIERARCHY_ERROR = 'GET_RL_ORG_STRUCTURES_ERROR';

const block = {
    loading: false,
    error: '',
    success: false,
};

const initialState = {
    rlOrgHierarchy: { ...block, data: [] },

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

        default:
            return state;
    }
};
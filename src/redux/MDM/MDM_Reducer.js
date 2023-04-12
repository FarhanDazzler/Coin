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

export const GET_MEGA_AND_SUBPROCESS_VIEW_REQUEST = 'GET_MEGA_AND_SUBPROCESS_VIEW_REQUEST';
export const GET_MEGA_AND_SUBPROCESS_VIEW_SUCCESS = 'GET_MEGA_AND_SUBPROCESS_VIEW_SUCCESS';
export const GET_MEGA_AND_SUBPROCESS_VIEW_ERROR = 'GET_MEGA_AND_SUBPROCESS_VIEW_ERROR';

export const GET_MEGA_AND_SUBPROCESS_REQUEST = 'GET_MEGA_AND_SUBPROCESS_REQUEST';
export const GET_MEGA_AND_SUBPROCESS_SUCCESS = 'GET_MEGA_AND_SUBPROCESS_SUCCESS';
export const GET_MEGA_AND_SUBPROCESS_ERROR = 'GET_MICS_FRAMEWORK_ERROR';

export const GET_CONTROL_OWNER_AND_OVERSIGHT_REQUEST = 'GET_CONTROL_OWNER_AND_OVERSIGHT_REQUEST';
export const GET_CONTROL_OWNER_AND_OVERSIGHT_SUCCESS = 'GET_CONTROL_OWNER_AND_OVERSIGHT_SUCCESS';
export const GET_CONTROL_OWNER_AND_OVERSIGHT_ERROR = 'GET_CONTROL_OWNER_AND_OVERSIGHT_ERROR';

export const GET_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_REQUEST =
  'GET_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_REQUEST';
export const GET_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_SUCCESS =
  'GET_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_SUCCESS';
export const GET_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_ERROR =
  'GET_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_ERROR';

export const ORG_OPEN_TABLE_REQUEST = 'ORG_OPEN_TABLE_REQUEST';
export const MEGA_AND_SUBPROCESS_OPEN_TABLE_REQUEST = 'MEGA_AND_SUBPROCESS_OPEN_TABLE_REQUEST';

export const RESET_BLOCK_ASSESSMENT = 'RESET_BLOCK_ASSESSMENT';
export const RESET_FLAGS_ASSESSMENT = 'RESET_FLAGS_ASSESSMENT';

// =================== Add Org Structure Data ========================//

export const ACTION_ADD_ORG_STRUCTURE_DATA = 'ACTION_ADD_ORG_STRUCTURE_DATA';
export const ACTION_ADD_ORG_STRUCTURE_DATA_SUCCESS = 'ACTION_ADD_ORG_STRUCTURE_DATA_SUCCESS';
export const ACTION_ADD_ORG_STRUCTURE_DATA_FAILED = 'ACTION_ADD_ORG_STRUCTURE_DATA_FAILED';

// =================== Add Org Structure Data ========================//

// =================== UPDATE Org Structure Data ========================//

export const ACTION_UPDATE_ORG_STRUCTURE_DATA = 'ACTION_UPDATE_ORG_STRUCTURE_DATA';
export const ACTION_UPDATE_ORG_STRUCTURE_DATA_SUCCESS = 'ACTION_UPDATE_ORG_STRUCTURE_DATA_SUCCESS';
export const ACTION_UPDATE_ORG_STRUCTURE_DATA_FAILED = 'ACTION_UPDATE_ORG_STRUCTURE_DATA_FAILED';

// =================== UPDATE Org Structure Data ========================//

// =================== Get Parent ENtity Data ========================//

export const ACTION_GET_PARENT_ENTITY_DATA = 'ACTION_GET_PARENT_ENTITY_DATA';
export const ACTION_GET_PARENT_ENTITY_DATA_SUCCESS = 'ACTION_GET_PARENT_ENTITY_DATA_SUCCESS';
export const ACTION_GET_PARENT_ENTITY_DATA_FAILED = 'ACTION_GET_PARENT_ENTITY_DATA_FAILED';

// =================== Get Parent ENtity Data ========================//

// =================== Add MICS Framework Data ========================//

export const ADD_MICS_FRAMEWORK_REQUEST = 'ADD_MICS_FRAMEWORK_REQUEST';
export const ADD_MICS_FRAMEWORK_SUCCESS = 'ADD_MICS_FRAMEWORK_SUCCESS';
export const ADD_MICS_FRAMEWORK_ERROR = 'ADD_MICS_FRAMEWORK_ERROR';

// =================== Add MICS Framework Data ========================//

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  orgStructures: { ...block, data: [] },
  addOrgStructureData: { ...block, data: [] },
  updateOrgStructureData: { ...block, data: [] },
  getParentEntityData: { ...block, data: [] },
  orgHierarchy: { ...block, data: [] },
  micsFramework: { ...block, data: [] },
  addMicsFramework: { ...block, data: [] },
  megaAndSubprocessView: { ...block, data: [] },
  megaAndSubprocess: { ...block, data: [] },
  controlOwnerAndOversight: { ...block, data: [] },
  applicabilityAndAssignmentOfProviderOrganization: { ...block, data: [] },
  orgManageButtonValue: false,
  megaAndSubprocessManageButtonValue: false,
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

    // MDM ADD MICS Framework data
    case ADD_MICS_FRAMEWORK_REQUEST:
      return {
        ...state,
        addMicsFramework: { ...state.addMicsFramework, loading: true },
      };
    case ADD_MICS_FRAMEWORK_SUCCESS:
      return {
        ...state,
        addMicsFramework: { ...state.addMicsFramework, data: payload, loading: false },
      };
    case ADD_MICS_FRAMEWORK_ERROR:
      return {
        ...state,
        addMicsFramework: { ...state.addMicsFramework, loading: false },
      };

    // MEGA AND Subprocess view data
    case GET_MEGA_AND_SUBPROCESS_VIEW_REQUEST:
      return {
        ...state,
        megaAndSubprocessView: { ...state.megaAndSubprocessView, loading: true },
      };
    case GET_MEGA_AND_SUBPROCESS_VIEW_SUCCESS:
      return {
        ...state,
        megaAndSubprocessView: { ...state.megaAndSubprocessView, data: payload, loading: false },
      };
    case GET_MEGA_AND_SUBPROCESS_VIEW_ERROR:
      return {
        ...state,
        megaAndSubprocessView: { ...state.megaAndSubprocessView, loading: false },
      };

    // MEGA AND Subprocess data
    case GET_MEGA_AND_SUBPROCESS_REQUEST:
      return {
        ...state,
        megaAndSubprocess: { ...state.megaAndSubprocess, loading: true },
      };
    case GET_MEGA_AND_SUBPROCESS_SUCCESS:
      return {
        ...state,
        megaAndSubprocess: { ...state.megaAndSubprocess, data: payload, loading: false },
      };
    case GET_MEGA_AND_SUBPROCESS_ERROR:
      return {
        ...state,
        megaAndSubprocess: { ...state.megaAndSubprocess, loading: false },
      };

    // Control Owner & Oversight data
    case GET_CONTROL_OWNER_AND_OVERSIGHT_REQUEST:
      return {
        ...state,
        controlOwnerAndOversight: { ...state.controlOwnerAndOversight, loading: true },
      };
    case GET_CONTROL_OWNER_AND_OVERSIGHT_SUCCESS:
      return {
        ...state,
        controlOwnerAndOversight: {
          ...state.controlOwnerAndOversight,
          data: payload,
          loading: false,
        },
      };
    case GET_CONTROL_OWNER_AND_OVERSIGHT_ERROR:
      return {
        ...state,
        controlOwnerAndOversight: { ...state.controlOwnerAndOversight, loading: false },
      };

    // Applicability & Assignment of Provider Organization
    case GET_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_REQUEST:
      return {
        ...state,
        applicabilityAndAssignmentOfProviderOrganization: {
          ...state.applicabilityAndAssignmentOfProviderOrganization,
          loading: true,
        },
      };
    case GET_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_SUCCESS:
      return {
        ...state,
        applicabilityAndAssignmentOfProviderOrganization: {
          ...state.applicabilityAndAssignmentOfProviderOrganization,
          data: payload,
          loading: false,
        },
      };
    case GET_APPLICABILITY_AND_ASSIGNMENT_OF_PROVIDER_ORGANIZATION_ERROR:
      return {
        ...state,
        applicabilityAndAssignmentOfProviderOrganization: {
          ...state.applicabilityAndAssignmentOfProviderOrganization,
          loading: false,
        },
      };

    // state for hiding and unhiding tabe
    case ORG_OPEN_TABLE_REQUEST:
      return {
        ...state,
        orgManageButtonValue: payload,
      };

    // state for hiding and unhiding tabe
    case MEGA_AND_SUBPROCESS_OPEN_TABLE_REQUEST:
      return {
        ...state,
        megaAndSubprocessManageButtonValue: payload,
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

    // Add Org Structure
    case ACTION_ADD_ORG_STRUCTURE_DATA:
      return {
        ...state,
        addOrgStructureData: {
          loading: true,
        },
      };
    case ACTION_ADD_ORG_STRUCTURE_DATA_SUCCESS:
      return {
        ...state,
        addOrgStructureData: {
          data: payload,
          loading: false,
        },
      };
    case ACTION_ADD_ORG_STRUCTURE_DATA_FAILED:
      return {
        ...state,
        addOrgStructureData: {
          loading: false,
        },
      };

         // UPDATE Org Structure
    case ACTION_UPDATE_ORG_STRUCTURE_DATA:
      return {
        ...state,
        updateOrgStructureData: {
          loading: true,
        },
      };
    case ACTION_UPDATE_ORG_STRUCTURE_DATA_SUCCESS:
      return {
        ...state,
        updateOrgStructureData: {
          data: payload,
          loading: false,
        },
      };
    case ACTION_UPDATE_ORG_STRUCTURE_DATA_FAILED:
      return {
        ...state,
        updateOrgStructureData: {
          loading: false,
        },
      };
          // Get Parent Entity
    case ACTION_GET_PARENT_ENTITY_DATA:
      return {
        ...state,
        getParentEntityData: {
          loading: true,
        },
      };
    case ACTION_GET_PARENT_ENTITY_DATA_SUCCESS:
      return {
        ...state,
        getParentEntityData: {
          data: payload,
          loading: false,
        },
      };
    case ACTION_GET_PARENT_ENTITY_DATA_FAILED:
      return {
        ...state,
        getParentEntityData: {
          loading: false,
        },
      };

    default:
      return state;
  }
};

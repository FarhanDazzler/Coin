import { stopAsyncValidation } from 'redux-form';

export const RESET_BLOCK_ASSESSMENT = 'RESET_BLOCK_ASSESSMENT';
export const RESET_FLAGS_ASSESSMENT = 'RESET_FLAGS_ASSESSMENT';

// =================== Add Schedule Survey Page 1,2, & 3 Data ========================//

export const SCHEDULE_SURVEY_PAGE_1_REQUEST = 'SCHEDULE_SURVEY_PAGE_1_REQUEST';
export const SCHEDULE_SURVEY_PAGE_2_REQUEST = 'SCHEDULE_SURVEY_PAGE_2_REQUEST';
export const SCHEDULE_SURVEY_PAGE_3_REQUEST = 'SCHEDULE_SURVEY_PAGE_3_REQUEST';

// =================== Add Schedule Survey Page 1,2, & 3 Data ========================//

// =================== Get Page 2 drop down Data ========================//

export const GET_ALL_ZONE_REQUEST = 'GET_ALL_ZONE_REQUEST';
export const GET_ALL_ZONE_SUCCESS = 'GET_ALL_ZONE_SUCCESS';
export const GET_ALL_ZONE_ERROR = 'GET_ALL_ZONE_ERROR';

export const GET_ALL_BU_FROM_ZONE_REQUEST = 'GET_ALL_BU_FROM_ZONE_REQUEST';
export const GET_ALL_BU_FROM_ZONE_SUCCESS = 'GET_ALL_BU_FROM_ZONE_SUCCESS';
export const GET_ALL_BU_FROM_ZONE_ERROR = 'GET_ALL_BU_FROM_ZONE_ERROR';

export const GET_ALL_ENTITY_FROM_BU_REQUEST = 'GET_ALL_ENTITY_FROM_BU_REQUEST';
export const GET_ALL_ENTITY_FROM_BU_SUCCESS = 'GET_ALL_ENTITY_FROM_BU_SUCCESS';
export const GET_ALL_ENTITY_FROM_BU_ERROR = 'GET_ALL_ENTITY_FROM_BU_ERROR';

export const GET_ALL_PROVIDER_FROM_ENTITY_REQUEST = 'GET_ALL_PROVIDER_FROM_ENTITY_REQUEST';
export const GET_ALL_PROVIDER_FROM_ENTITY_SUCCESS = 'GET_ALL_PROVIDER_FROM_ENTITY_SUCCESS';
export const GET_ALL_PROVIDER_FROM_ENTITY_ERROR = 'GET_ALL_PROVIDER_FROM_ENTITY_ERROR';

// =================== Get Page 2 drop down Data ========================//

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  scheduleSurveyPage_1: {},
  scheduleSurveyPage_2: {},
  scheduleSurveyPage_3: {},
  getAllZone: { ...block, data: [] },
  getAll_BU_FromZone: { ...block, data: [] },
  getAllEntityFromBU: { ...block, data: [] },
  getAllProviderFromEntity: { ...block, data: [] },
};

export const AssessmentBankReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    // state for storing Schedule Survey Page 1 data
    case SCHEDULE_SURVEY_PAGE_1_REQUEST:
      return {
        ...state,
        scheduleSurveyPage_1: payload,
      };

    // state for storing Schedule Survey Page 2 data
    case SCHEDULE_SURVEY_PAGE_2_REQUEST:
      return {
        ...state,
        scheduleSurveyPage_2: payload,
      };

    // state for storing Schedule Survey Page 3 data
    case SCHEDULE_SURVEY_PAGE_3_REQUEST:
      return {
        ...state,
        scheduleSurveyPage_3: payload,
      };

    // get All Zone data
    case GET_ALL_ZONE_REQUEST:
      return {
        ...state,
        getAllZone: { ...state.getAllZone, loading: true },
      };
    case GET_ALL_ZONE_SUCCESS:
      return {
        ...state,
        getAllZone: { ...state.getAllZone, data: payload, loading: false },
      };
    case GET_ALL_ZONE_ERROR:
      return {
        ...state,
        getAllZone: { ...state.getAllZone, loading: false },
      };

    // get All BU From Zone data
    case GET_ALL_BU_FROM_ZONE_REQUEST:
      return {
        ...state,
        getAll_BU_FromZone: { ...state.getAll_BU_FromZone, loading: true },
      };
    case GET_ALL_BU_FROM_ZONE_SUCCESS:
      return {
        ...state,
        getAll_BU_FromZone: { ...state.getAll_BU_FromZone, data: payload, loading: false },
      };
    case GET_ALL_BU_FROM_ZONE_ERROR:
      return {
        ...state,
        getAll_BU_FromZone: { ...state.getAll_BU_FromZone, loading: false },
      };

    // get All Entity From BU data
    case GET_ALL_ENTITY_FROM_BU_REQUEST:
      return {
        ...state,
        getAllEntityFromBU: { ...state.getAllEntityFromBU, loading: true },
      };
    case GET_ALL_ENTITY_FROM_BU_SUCCESS:
      return {
        ...state,
        getAllEntityFromBU: { ...state.getAllEntityFromBU, data: payload, loading: false },
      };
    case GET_ALL_ENTITY_FROM_BU_ERROR:
      return {
        ...state,
        getAllEntityFromBU: { ...state.getAllEntityFromBU, loading: false },
      };

    // get All Provider From Entity data
    case GET_ALL_PROVIDER_FROM_ENTITY_REQUEST:
      return {
        ...state,
        getAllProviderFromEntity: { ...state.getAllProviderFromEntity, loading: true },
      };
    case GET_ALL_PROVIDER_FROM_ENTITY_SUCCESS:
      return {
        ...state,
        getAllProviderFromEntity: {
          ...state.getAllProviderFromEntity,
          data: payload,
          loading: false,
        },
      };
    case GET_ALL_PROVIDER_FROM_ENTITY_ERROR:
      return {
        ...state,
        getAllProviderFromEntity: { ...state.getAllProviderFromEntity, loading: false },
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

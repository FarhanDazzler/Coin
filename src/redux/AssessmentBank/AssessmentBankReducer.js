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

// =================== Get Schedule Survey Page 2 table Data ========================//

export const GET_SCHEDULE_SURVEY_PAGE_2_TABLE_REQUEST = 'GET_SCHEDULE_SURVEY_PAGE_2_TABLE_REQUEST';
export const GET_SCHEDULE_SURVEY_PAGE_2_TABLE_SUCCESS = 'GET_SCHEDULE_SURVEY_PAGE_2_TABLE_SUCCESS';
export const GET_SCHEDULE_SURVEY_PAGE_2_TABLE_ERROR = 'GET_SCHEDULE_SURVEY_PAGE_2_TABLE_ERROR';

// =================== Get Schedule Survey Page 2 table Data ========================//

// =================== Get Schedule Survey Page 3 table Data ========================//

export const GET_SCHEDULE_SURVEY_PAGE_3_TABLE_REQUEST = 'GET_SCHEDULE_SURVEY_PAGE_3_TABLE_REQUEST';
export const GET_SCHEDULE_SURVEY_PAGE_3_TABLE_SUCCESS = 'GET_SCHEDULE_SURVEY_PAGE_3_TABLE_SUCCESS';
export const GET_SCHEDULE_SURVEY_PAGE_3_TABLE_ERROR = 'GET_SCHEDULE_SURVEY_PAGE_3_TABLE_ERROR';

// =================== Get Schedule Survey Page 3 table Data ========================//

// =================== ADD ASSESSMENT SCHEDULING AND TRIGGERING Data ========================//

export const ADD_ASSESSMENT_SCHEDULING_AND_TRIGGERING_REQUEST =
  'ADD_ASSESSMENT_SCHEDULING_AND_TRIGGERING_REQUEST';
export const ADD_ASSESSMENT_SCHEDULING_AND_TRIGGERING_SUCCESS =
  'ADD_ASSESSMENT_SCHEDULING_AND_TRIGGERING_SUCCESS';
export const ADD_ASSESSMENT_SCHEDULING_AND_TRIGGERING_ERROR =
  'ADD_ASSESSMENT_SCHEDULING_AND_TRIGGERING_ERROR';

// =================== ADD ASSESSMENT SCHEDULING AND TRIGGERING Data ========================//

// =================== Get Assessments Summary Table (Assessment bank Landing Page Table) ========================//

export const GET_ASSESSMENTS_SUMMARY_TABLE_REQUEST = 'GET_ASSESSMENTS_SUMMARY_TABLE_REQUEST';
export const GET_ASSESSMENTS_SUMMARY_TABLE_SUCCESS = 'GET_ASSESSMENTS_SUMMARY_TABLE_SUCCESS';
export const GET_ASSESSMENTS_SUMMARY_TABLE_ERROR = 'GET_ASSESSMENTS_SUMMARY_TABLE_ERROR';

// =================== Get Assessments Summary Table (Assessment bank Landing Page Table) ========================//

// =================== Get Assessment Details Table Data ========================//

export const GET_ASSESSMENT_DETAILS_TABLE_REQUEST = 'GET_ASSESSMENT_DETAILS_TABLE_REQUEST';
export const GET_ASSESSMENT_DETAILS_TABLE_SUCCESS = 'GET_ASSESSMENT_DETAILS_TABLE_SUCCESS';
export const GET_ASSESSMENT_DETAILS_TABLE_ERROR = 'GET_ASSESSMENT_DETAILS_TABLE_ERROR';

// =================== Get Assessment Details Table Data ========================//

// =================== Get Assessment CYCLE Data ========================//

export const GET_ASSESSMENT_CYCLE_REQUEST = 'GET_ASSESSMENT_CYCLE_REQUEST';
export const GET_ASSESSMENT_CYCLE_SUCCESS = 'GET_ASSESSMENT_CYCLE_SUCCESS';
export const GET_ASSESSMENT_CYCLE_ERROR = 'GET_ASSESSMENT_CYCLE_ERROR';

// =================== Get Assessment CYCLE Data ========================//

// =================== Recall Assessment ========================//

export const RECALL_ASSESSMENT_REQUEST = 'RECALL_ASSESSMENT_REQUEST';
export const RECALL_ASSESSMENT_SUCCESS = 'RECALL_ASSESSMENT_SUCCESS';
export const RECALL_ASSESSMENT_ERROR = 'RECALL_ASSESSMENT_ERROR';

// =================== Recall Assessment ========================//

// =================== Re-Trigger Assessment ========================//

export const RE_TRIGGER_ASSESSMENT_REQUEST = 'RE_TRIGGER_ASSESSMENT_REQUEST';
export const RE_TRIGGER_ASSESSMENT_SUCCESS = 'RE_TRIGGER_ASSESSMENT_SUCCESS';
export const RE_TRIGGER_ASSESSMENT_ERROR = 'RE_TRIGGER_ASSESSMENT_ERROR';

// =================== Re-Trigger Assessment ========================//

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
  getScheduleSurveyPage_2_table: { ...block, data: [] },
  getScheduleSurveyPage_3_table: { ...block, data: [] },
  addAssessmentSchedulingAndTriggering: { ...block, data: [] },
  getAssessmentsSummaryTable: { ...block, data: [] },
  getAssessmentDetailsTableData: { ...block, data: [] },
  getAssessmentCycleData: { ...block, data: [] },
  recallAssessment: { ...block, data: [] },
  reTriggerAssessment: { ...block, data: [] },
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
        getScheduleSurveyPage_2_table: { ...state.getScheduleSurveyPage_2_table, loading: false },
      };

    // Get Schedule Survey Page 2 table Data
    case GET_SCHEDULE_SURVEY_PAGE_2_TABLE_REQUEST:
      return {
        ...state,
        getScheduleSurveyPage_2_table: { ...state.getScheduleSurveyPage_2_table, loading: true },
      };
    case GET_SCHEDULE_SURVEY_PAGE_2_TABLE_SUCCESS:
      return {
        ...state,
        getScheduleSurveyPage_2_table: {
          ...state.getScheduleSurveyPage_2_table,
          data: payload,
          loading: false,
        },
      };
    case GET_SCHEDULE_SURVEY_PAGE_2_TABLE_ERROR:
      return {
        ...state,
        getScheduleSurveyPage_2_table: { ...state.getScheduleSurveyPage_2_table, loading: false },
      };

    // Get Schedule Survey Page 3 table Data
    case GET_SCHEDULE_SURVEY_PAGE_3_TABLE_REQUEST:
      return {
        ...state,
        getScheduleSurveyPage_3_table: { ...state.getScheduleSurveyPage_3_table, loading: true },
      };
    case GET_SCHEDULE_SURVEY_PAGE_3_TABLE_SUCCESS:
      return {
        ...state,
        getScheduleSurveyPage_3_table: {
          ...state.getScheduleSurveyPage_3_table,
          data: payload,
          loading: false,
        },
      };
    case GET_SCHEDULE_SURVEY_PAGE_3_TABLE_ERROR:
      return {
        ...state,
        getScheduleSurveyPage_3_table: { ...state.getScheduleSurveyPage_3_table, loading: false },
      };

    // ADD ASSESSMENT SCHEDULING AND TRIGGERING Data
    case ADD_ASSESSMENT_SCHEDULING_AND_TRIGGERING_REQUEST:
      return {
        ...state,
        addAssessmentSchedulingAndTriggering: {
          ...state.addAssessmentSchedulingAndTriggering,
          loading: true,
        },
      };
    case ADD_ASSESSMENT_SCHEDULING_AND_TRIGGERING_SUCCESS:
      return {
        ...state,
        addAssessmentSchedulingAndTriggering: {
          ...state.addAssessmentSchedulingAndTriggering,
          data: payload,
          loading: false,
          success: true,
        },
      };
    case ADD_ASSESSMENT_SCHEDULING_AND_TRIGGERING_ERROR:
      return {
        ...state,
        addAssessmentSchedulingAndTriggering: {
          ...state.addAssessmentSchedulingAndTriggering,
          loading: false,
        },
      };

    //Get Assessments Summary Table (Assessment bank Landing Page Table)
    case GET_ASSESSMENTS_SUMMARY_TABLE_REQUEST:
      return {
        ...state,
        getAssessmentsSummaryTable: {
          ...state.getAssessmentsSummaryTable,
          loading: true,
        },
      };
    case GET_ASSESSMENTS_SUMMARY_TABLE_SUCCESS:
      return {
        ...state,
        getAssessmentsSummaryTable: {
          ...state.getAssessmentsSummaryTable,
          data: payload,
          loading: false,
          success: true,
        },
      };
    case GET_ASSESSMENTS_SUMMARY_TABLE_ERROR:
      return {
        ...state,
        getAssessmentsSummaryTable: {
          ...state.getAssessmentsSummaryTable,
          loading: false,
        },
      };

    //Get Assessment Details Table Data
    case GET_ASSESSMENT_DETAILS_TABLE_REQUEST:
      return {
        ...state,
        getAssessmentDetailsTableData: {
          ...state.getAssessmentDetailsTableData,
          loading: true,
        },
      };
    case GET_ASSESSMENT_DETAILS_TABLE_SUCCESS:
      return {
        ...state,
        getAssessmentDetailsTableData: {
          ...state.getAssessmentDetailsTableData,
          data: payload,
          loading: false,
        },
      };
    case GET_ASSESSMENT_DETAILS_TABLE_ERROR:
      return {
        ...state,
        getAssessmentDetailsTableData: {
          ...state.getAssessmentDetailsTableData,
          loading: false,
        },
      };

    //Get Assessment Cycle Data
    case GET_ASSESSMENT_CYCLE_REQUEST:
      return {
        ...state,
        getAssessmentCycleData: {
          ...state.getAssessmentCycleData,
          loading: true,
        },
      };
    case GET_ASSESSMENT_CYCLE_SUCCESS:
      return {
        ...state,
        getAssessmentCycleData: {
          ...state.getAssessmentCycleData,
          data: payload,
          loading: false,
        },
      };
    case GET_ASSESSMENT_CYCLE_ERROR:
      return {
        ...state,
        getAssessmentCycleData: {
          ...state.getAssessmentCycleData,
          loading: false,
        },
      };

    //Recall Assessment
    case RECALL_ASSESSMENT_REQUEST:
      return {
        ...state,
        recallAssessment: {
          ...state.recallAssessment,
          loading: true,
        },
      };
    case RECALL_ASSESSMENT_SUCCESS:
      return {
        ...state,
        recallAssessment: {
          ...state.recallAssessment,
          data: payload,
          loading: false,
        },
      };
    case RECALL_ASSESSMENT_ERROR:
      return {
        ...state,
        recallAssessment: {
          ...state.recallAssessment,
          loading: false,
        },
      };

    //Re-Trigger Assessment
    case RE_TRIGGER_ASSESSMENT_REQUEST:
      return {
        ...state,
        reTriggerAssessment: {
          ...state.reTriggerAssessment,
          loading: true,
        },
      };
    case RE_TRIGGER_ASSESSMENT_SUCCESS:
      return {
        ...state,
        reTriggerAssessment: {
          ...state.reTriggerAssessment,
          data: payload,
          loading: false,
        },
      };
    case RE_TRIGGER_ASSESSMENT_ERROR:
      return {
        ...state,
        reTriggerAssessment: {
          ...state.reTriggerAssessment,
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

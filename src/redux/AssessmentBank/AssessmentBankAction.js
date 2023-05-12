import {
  SCHEDULE_SURVEY_PAGE_1_REQUEST,
  SCHEDULE_SURVEY_PAGE_2_REQUEST,
  SCHEDULE_SURVEY_PAGE_3_REQUEST,
  GET_ALL_ZONE_REQUEST,
  GET_ALL_BU_FROM_ZONE_REQUEST,
  GET_ALL_ENTITY_FROM_BU_REQUEST,
  GET_ALL_PROVIDER_FROM_ENTITY_REQUEST,
  GET_SCHEDULE_SURVEY_PAGE_2_TABLE_REQUEST,
  GET_SCHEDULE_SURVEY_PAGE_3_TABLE_REQUEST,
  ADD_ASSESSMENT_SCHEDULING_AND_TRIGGERING_REQUEST,
  GET_ASSESSMENTS_SUMMARY_TABLE_REQUEST,
  GET_ASSESSMENT_DETAILS_TABLE_REQUEST,
  RECALL_ASSESSMENT_REQUEST,
  RE_TRIGGER_ASSESSMENT_REQUEST,
  GET_ASSESSMENT_CYCLE_REQUEST
} from './AssessmentBankReducer';

export const ScheduleSurveyPage_1 = (payload) => ({
  type: SCHEDULE_SURVEY_PAGE_1_REQUEST,
  payload,
});

export const ScheduleSurveyPage_2 = (payload) => ({
  type: SCHEDULE_SURVEY_PAGE_2_REQUEST,
  payload,
});

export const ScheduleSurveyPage_3 = (payload) => ({
  type: SCHEDULE_SURVEY_PAGE_3_REQUEST,
  payload,
});

export const getAllZone = (payload) => ({
  type: GET_ALL_ZONE_REQUEST,
  payload,
});

export const getAll_BU_FromZone = (payload) => ({
  type: GET_ALL_BU_FROM_ZONE_REQUEST,
  payload,
});

export const getAllEntityFromBU = (payload) => ({
  type: GET_ALL_ENTITY_FROM_BU_REQUEST,
  payload,
});

export const getAllProviderFromEntity = (payload) => ({
  type: GET_ALL_PROVIDER_FROM_ENTITY_REQUEST,
  payload,
});

export const getScheduleSurveyPage_2_table = (payload) => ({
  type: GET_SCHEDULE_SURVEY_PAGE_2_TABLE_REQUEST,
  payload,
});

export const getScheduleSurveyPage_3_table = (payload) => ({
  type: GET_SCHEDULE_SURVEY_PAGE_3_TABLE_REQUEST,
  payload,
});

export const addAssessmentSchedulingAndTriggering = (payload) => ({
  type: ADD_ASSESSMENT_SCHEDULING_AND_TRIGGERING_REQUEST,
  payload,
});

export const getAssessmentsSummaryTable = (payload) => ({
  type: GET_ASSESSMENTS_SUMMARY_TABLE_REQUEST,
  payload,
});

export const getAssessmentDetailsTableData = (payload) => ({
  type: GET_ASSESSMENT_DETAILS_TABLE_REQUEST,
  payload,
});

export const getAssessmentCycleAction = (payload) => ({
  type: GET_ASSESSMENT_CYCLE_REQUEST,
  payload,
});

export const recallAssessment = (payload) => ({
  type: RECALL_ASSESSMENT_REQUEST,
  payload,
});

export const reTriggerAssessment = (payload) => ({
  type: RE_TRIGGER_ASSESSMENT_REQUEST,
  payload,
});

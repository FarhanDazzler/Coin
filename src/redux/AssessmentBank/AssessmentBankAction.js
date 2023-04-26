import {
  SCHEDULE_SURVEY_PAGE_1_REQUEST,
  SCHEDULE_SURVEY_PAGE_2_REQUEST,
  SCHEDULE_SURVEY_PAGE_3_REQUEST,
  GET_ALL_ZONE_REQUEST,
  GET_ALL_BU_FROM_ZONE_REQUEST,
  GET_ALL_ENTITY_FROM_BU_REQUEST,
  GET_ALL_PROVIDER_FROM_ENTITY_REQUEST,
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

import { all, call, put, takeLatest } from 'redux-saga/effects';

import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';

import {
  GET_ALL_ZONE_REQUEST,
  GET_ALL_ZONE_SUCCESS,
  GET_ALL_ZONE_ERROR,
  GET_ALL_BU_FROM_ZONE_REQUEST,
  GET_ALL_BU_FROM_ZONE_SUCCESS,
  GET_ALL_BU_FROM_ZONE_ERROR,
  GET_ALL_ENTITY_FROM_BU_REQUEST,
  GET_ALL_ENTITY_FROM_BU_SUCCESS,
  GET_ALL_ENTITY_FROM_BU_ERROR,
  GET_ALL_PROVIDER_FROM_ENTITY_REQUEST,
  GET_ALL_PROVIDER_FROM_ENTITY_SUCCESS,
  GET_ALL_PROVIDER_FROM_ENTITY_ERROR,
  GET_SCHEDULE_SURVEY_PAGE_2_TABLE_REQUEST,
  GET_SCHEDULE_SURVEY_PAGE_2_TABLE_SUCCESS,
  GET_SCHEDULE_SURVEY_PAGE_2_TABLE_ERROR,
  GET_SCHEDULE_SURVEY_PAGE_3_TABLE_REQUEST,
  GET_SCHEDULE_SURVEY_PAGE_3_TABLE_SUCCESS,
  GET_SCHEDULE_SURVEY_PAGE_3_TABLE_ERROR,
  ADD_ASSESSMENT_SCHEDULING_AND_TRIGGERING_REQUEST,
  ADD_ASSESSMENT_SCHEDULING_AND_TRIGGERING_SUCCESS,
  ADD_ASSESSMENT_SCHEDULING_AND_TRIGGERING_ERROR,
  GET_ASSESSMENTS_SUMMARY_TABLE_REQUEST,
  GET_ASSESSMENTS_SUMMARY_TABLE_SUCCESS,
  GET_ASSESSMENTS_SUMMARY_TABLE_ERROR,
  GET_ASSESSMENT_DETAILS_TABLE_REQUEST,
  GET_ASSESSMENT_DETAILS_TABLE_SUCCESS,
  GET_ASSESSMENT_DETAILS_TABLE_ERROR,
  RE_TRIGGER_ASSESSMENT_REQUEST,
  RE_TRIGGER_ASSESSMENT_SUCCESS,
  RE_TRIGGER_ASSESSMENT_ERROR,
  RECALL_ASSESSMENT_REQUEST,
  RECALL_ASSESSMENT_SUCCESS,
  RECALL_ASSESSMENT_ERROR,
} from './AssessmentBankReducer';
import Swal from 'sweetalert2';

// get All Zone Api
async function getAllZoneApi(params) {
  return await Axios.get('/get_all_zones', { params });
}
function* handleGet_AllZone({ payload }) {
  try {
    const response = yield call(getAllZoneApi, payload);
    if (response.success) {
      yield put({
        type: GET_ALL_ZONE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_ALL_ZONE_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

// get All BU From Zone
async function getAll_BU_FromZoneApi(params) {
  return await Axios.post('/get_all_bu', params);
}
function* getAll_BU_FromZoneData({ payload }) {
  try {
    const response = yield call(getAll_BU_FromZoneApi, payload);
    if (response.success) {
      yield put({
        type: GET_ALL_BU_FROM_ZONE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_ALL_BU_FROM_ZONE_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

// get All Entity From BU
async function getAllEntityFromBUApi(params) {
  return await Axios.post('/get_all_entities', params);
}
function* getAllEntityFromBUData({ payload }) {
  try {
    const response = yield call(getAllEntityFromBUApi, payload);
    if (response.success) {
      yield put({
        type: GET_ALL_ENTITY_FROM_BU_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_ALL_ENTITY_FROM_BU_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

// get All Provider From Entity
async function getAllProviderFromEntityApi(params) {
  return await Axios.post('/get_all_providers', params);
}
function* getAllProviderFromEntityData({ payload }) {
  try {
    const response = yield call(getAllProviderFromEntityApi, payload);
    if (response.success) {
      yield put({
        type: GET_ALL_PROVIDER_FROM_ENTITY_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_ALL_PROVIDER_FROM_ENTITY_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

// Get Schedule Survey Page 2 table Data
async function getScheduleSurveyPage_2_tableApi(params) {
  return await Axios.post('/get_all_control_instances', params);
}
function* getScheduleSurveyPage_2_tableData({ payload }) {
  try {
    const response = yield call(getScheduleSurveyPage_2_tableApi, payload);
    if (response.success) {
      yield put({
        type: GET_SCHEDULE_SURVEY_PAGE_2_TABLE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_SCHEDULE_SURVEY_PAGE_2_TABLE_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

// Get Schedule Survey Page 3 table Data
async function getScheduleSurveyPage_3_tableApi(params) {
  return await Axios.post('/get_all_controls_filter', params);
}
function* getScheduleSurveyPage_3_tableData({ payload }) {
  try {
    const response = yield call(getScheduleSurveyPage_3_tableApi, payload);
    if (response.success) {
      yield put({
        type: GET_SCHEDULE_SURVEY_PAGE_3_TABLE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_SCHEDULE_SURVEY_PAGE_3_TABLE_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

// ADD ASSESSMENT SCHEDULING AND TRIGGERING Data
async function addAssessmentSchedulingAndTriggeringApi(payload) {
  return await Axios.post('/add_assessment_data', payload);
}
function* addAssessmentSchedulingAndTriggeringData({ payload }) {
  try {
    const response = yield call(addAssessmentSchedulingAndTriggeringApi, payload);
    if (response.success) {
      yield put({
        type: ADD_ASSESSMENT_SCHEDULING_AND_TRIGGERING_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Assessment Scheduled and Triggered Successfully!', 'success');
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: ADD_ASSESSMENT_SCHEDULING_AND_TRIGGERING_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

//Get Assessments Summary Table (Assessment bank Landing Page Table)
async function getAssessmentsSummaryTableApi(params) {
  return await Axios.get('/get_all_assessments_data', { params });
}
function* handleGet_AssessmentsSummaryTable({ payload }) {
  try {
    const response = yield call(getAssessmentsSummaryTableApi, payload);
    if (response.success) {
      yield put({
        type: GET_ASSESSMENTS_SUMMARY_TABLE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_ASSESSMENTS_SUMMARY_TABLE_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

//Get Assessment Details Table Data
async function getAssessmentDetailsTableDataApi(params) {
  return await Axios.get('/get_assessment_master_data', { params });
}
function* handleGet_AssessmentDetailsTableData({ payload }) {
  try {
    const response = yield call(getAssessmentDetailsTableDataApi, payload);
    if (response.success) {
      yield put({
        type: GET_ASSESSMENT_DETAILS_TABLE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_ASSESSMENT_DETAILS_TABLE_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

// Recall Assessment
async function recallAssessmentApi(payload) {
  return await Axios.post('/recall_assessment', payload);
}
function* recallAssessmentData({ payload }) {
  try {
    const params=payload.body
    const response = yield call(recallAssessmentApi, payload.params);
    if (response.success) {
      yield put({
        type: RECALL_ASSESSMENT_SUCCESS,
        payload: response.data,
      });
      yield put({
        type: GET_ASSESSMENT_DETAILS_TABLE_REQUEST,
        payload: params,
      });
      Swal.fire('Done!', 'Assessment Recalled Successfully!', 'success');
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: RECALL_ASSESSMENT_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

// Re-Trigger Assessment
async function reTriggerAssessmentApi(payload) {
  return await Axios.post('/retrigger_assessment', payload);
}
function* reTriggerAssessmentData({ payload }) {
  try {
    const params=payload.body
    const response = yield call(reTriggerAssessmentApi, payload.params);
    if (response.success) {
      yield put({
        type: RE_TRIGGER_ASSESSMENT_SUCCESS,
        payload: response.data,
      });
      yield put({
        type: GET_ASSESSMENT_DETAILS_TABLE_REQUEST,
        payload: params,
      });
      Swal.fire('Done!', 'Assessment Re-Triggered Successfully!', 'success');
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: RE_TRIGGER_ASSESSMENT_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

export default all([
  takeLatest(GET_ALL_ZONE_REQUEST, handleGet_AllZone),
  takeLatest(GET_ALL_BU_FROM_ZONE_REQUEST, getAll_BU_FromZoneData),
  takeLatest(GET_ALL_ENTITY_FROM_BU_REQUEST, getAllEntityFromBUData),
  takeLatest(GET_ALL_PROVIDER_FROM_ENTITY_REQUEST, getAllProviderFromEntityData),
  takeLatest(GET_SCHEDULE_SURVEY_PAGE_2_TABLE_REQUEST, getScheduleSurveyPage_2_tableData),
  takeLatest(GET_SCHEDULE_SURVEY_PAGE_3_TABLE_REQUEST, getScheduleSurveyPage_3_tableData),
  takeLatest(
    ADD_ASSESSMENT_SCHEDULING_AND_TRIGGERING_REQUEST,
    addAssessmentSchedulingAndTriggeringData,
  ),
  takeLatest(GET_ASSESSMENTS_SUMMARY_TABLE_REQUEST, handleGet_AssessmentsSummaryTable),
  takeLatest(GET_ASSESSMENT_DETAILS_TABLE_REQUEST, handleGet_AssessmentDetailsTableData),
  takeLatest(RECALL_ASSESSMENT_REQUEST, recallAssessmentData),
  takeLatest(RE_TRIGGER_ASSESSMENT_REQUEST, reTriggerAssessmentData),
]);

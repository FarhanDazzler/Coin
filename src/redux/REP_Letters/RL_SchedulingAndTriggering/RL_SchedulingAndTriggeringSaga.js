import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Axios } from '../../../api/axios';
import { getSimplifiedError } from '../../../utils/error';
import {
  GET_RL_FUNCTION_DATA_REQUEST,
  GET_RL_FUNCTION_DATA_ERROR,
  GET_RL_FUNCTION_DATA_SUCCESS,
  GET_RL_FUNCTIONAL_PAGE1_DATA_ERROR,
  GET_RL_FUNCTIONAL_PAGE1_DATA_REQUEST,
  GET_RL_FUNCTIONAL_PAGE1_DATA_SUCCESS,
  ACTION_ADD_RL_FUNCTIONAL_ASSESSMENT_DATA,
  ACTION_ADD_RL_FUNCTIONAL_ASSESSMENT_DATA_FAILED,
  ACTION_ADD_RL_FUNCTIONAL_ASSESSMENT_DATA_SUCCESS,
  GET_RL_ALL_FUNCTIONAL_ASSESSMENT_DATA,
  GET_RL_ALL_FUNCTIONAL_ASSESSMENT_DATA_FAILED,
  GET_RL_ALL_FUNCTIONAL_ASSESSMENT_DATA_SUCCESS,
  GET_RL_FUNCTION_ASSESSMENT_DATA_ERROR,
  GET_RL_FUNCTION_ASSESSMENT_DATA_REQUEST,
  GET_RL_FUNCTION_ASSESSMENT_DATA_SUCCESS,
  RECALL_FUNCTION_ASSESSMENT_ERROR,
  RECALL_FUNCTION_ASSESSMENT_REQUEST,
  RECALL_FUNCTION_ASSESSMENT_SUCCESS,
  RE_TRIGGER_FUNCTION_ASSESSMENT_ERROR,
  RE_TRIGGER_FUNCTION_ASSESSMENT_REQUEST,
  RE_TRIGGER_FUNCTION_ASSESSMENT_SUCCESS,
  GET_RL_BU_PAGE1_DATA_ERROR,
  GET_RL_BU_PAGE1_DATA_REQUEST,
  GET_RL_BU_PAGE1_DATA_SUCCESS,
  GET_RL_BU_BU_ERROR,
  GET_RL_BU_BU_REQUEST,
  GET_RL_BU_BU_SUCCESS,
  GET_RL_BU_ZONE_ERROR,
  GET_RL_BU_ZONE_REQUEST,
  GET_RL_BU_ZONE_SUCCESS,
  ACTION_ADD_RL_BU_LETTER_DATA,
  ACTION_ADD_RL_BU_LETTER_DATA_FAILED,
  ACTION_ADD_RL_BU_LETTER_DATA_SUCCESS,
  GET_RL_ALL_BU_LETTER_DATA,
  GET_RL_ALL_BU_LETTER_DATA_FAILED,
  GET_RL_ALL_BU_LETTER_DATA_SUCCESS,
  GET_RL_BU_LETTER_DATA_ERROR,
  GET_RL_BU_LETTER_DATA_REQUEST,
  GET_RL_BU_LETTER_DATA_SUCCESS,
  RECALL_BU_LETTER_ERROR,
  RECALL_BU_LETTER_REQUEST,
  RECALL_BU_LETTER_SUCCESS,
  RE_TRIGGER_BU_LETTER_ERROR,
  RE_TRIGGER_BU_LETTER_REQUEST,
  RE_TRIGGER_BU_LETTER_SUCCESS,
  GET_RL_ALL_BU_MDM_DATA,
  GET_RL_ALL_BU_MDM_DATA_FAILED,
  GET_RL_ALL_BU_MDM_DATA_SUCCESS
} from './RL_SchedulingAndTriggeringReducer';

import Swal from 'sweetalert2';

async function getRlFunctionDataApi(params) {
    return await Axios.get('/get_rep_functions', { params });
  }
  function* handleGet_Rl_functiona_data({ payload }) {
    try {
      const response = yield call(getRlFunctionDataApi, payload);
      if (response.success) {
        yield put({
          type: GET_RL_FUNCTION_DATA_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      yield put({
        type: GET_RL_FUNCTION_DATA_ERROR,
        // error: getSimplifiedError(error),
      });
    }
  }

  async function getRlFunctionalPage1DataApi(params) {
    return await Axios.get('/get_functional_page1_data', { params });
  }
  function* handleGet_Rl_functional_page1_data({ payload }) {
    try {
      const response = yield call(getRlFunctionalPage1DataApi, payload);
      if (response.success) {
        yield put({
          type: GET_RL_FUNCTIONAL_PAGE1_DATA_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      yield put({
        type: GET_RL_FUNCTIONAL_PAGE1_DATA_ERROR,
        // error: getSimplifiedError(error),
      });
    }
  }

//Add Functional Assessment Data
async function addRlFunctionalAssessmentdataApi(payload) {
  return await Axios.post('/add_functional_assessment_data', payload);
}
function* handle_addRlFunctionalAssessment_data({ payload }) {
  try {
    const response = yield call(addRlFunctionalAssessmentdataApi, payload);

    if (response.success) {
      yield put({
        type: ACTION_ADD_RL_FUNCTIONAL_ASSESSMENT_DATA_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Function Letter Scheduled Successfully!', 'success');
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: ACTION_ADD_RL_FUNCTIONAL_ASSESSMENT_DATA_FAILED,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

//get All Functional Assessment Data
async function getRlAllFunctionalAssessmentdataApi(params) {
  return await Axios.get('/get_all_function_assessment_data', { params });
}
function* handle_getRlAllFunctionalAssessment_data({ payload }) {
  try {
    const response = yield call(getRlAllFunctionalAssessmentdataApi, payload);

    if (response.success) {
      yield put({
        type: GET_RL_ALL_FUNCTIONAL_ASSESSMENT_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_RL_ALL_FUNCTIONAL_ASSESSMENT_DATA_FAILED,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

//get Functional Assessment Data
async function getRlFunctionAssessmentdataApi(payload) {
  return await Axios.post('/get_function_assessment_data', payload);
}
function* handle_getRlFunctionAssessment_data({ payload }) {
  try {
    const response = yield call(getRlFunctionAssessmentdataApi, payload);

    if (response.success) {
      yield put({
        type: GET_RL_FUNCTION_ASSESSMENT_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_RL_FUNCTION_ASSESSMENT_DATA_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

// Recall Function Assessment
async function recallFunctionAssessmentApi(payload) {
  return await Axios.post('/recall_function_assessment', payload);
}
function* recallFunctionAssessmentData({ payload }) {
  try {
    const params = payload.body;
    const response = yield call(recallFunctionAssessmentApi, payload.params);
    if (response.success) {
      yield put({
        type: RECALL_FUNCTION_ASSESSMENT_SUCCESS,
        payload: response.data,
      });
      yield put({
        type: GET_RL_FUNCTION_ASSESSMENT_DATA_REQUEST,
        payload: params,
      });
      Swal.fire('Done!', 'Function Letter Recalled Successfully!', 'success');
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: RECALL_FUNCTION_ASSESSMENT_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

// Re-Trigger Assessment
async function reTriggerFunctionAssessmentApi(payload) {
  return await Axios.post('/retrigger_function_assessment', payload);
}
function* reTriggerFunctionAssessmentData({ payload }) {
  try {
    const params = payload.body;
    const response = yield call(reTriggerFunctionAssessmentApi, payload.params);
    if (response.success) {
      yield put({
        type: RE_TRIGGER_FUNCTION_ASSESSMENT_SUCCESS,
        payload: response.data,
      });
      yield put({
        type: GET_RL_FUNCTION_ASSESSMENT_DATA_REQUEST,
        payload: params,
      });
      Swal.fire('Done!', 'Function Letter Re-Triggered Successfully!', 'success');
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: RE_TRIGGER_FUNCTION_ASSESSMENT_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

// *********** BU ************//

async function getRlBUPage1DataApi(params) {
  return await Axios.get('/get_bu_page1_data', { params });
}
function* handleGet_Rl_bu_page1_data({ payload }) {
  try {
    const response = yield call(getRlBUPage1DataApi, payload);
    if (response.success) {
      yield put({
        type: GET_RL_BU_PAGE1_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_RL_BU_PAGE1_DATA_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

// Bu Zones

async function getRlBUZoneDataApi(params) {
  return await Axios.get('/get_all_bu_zones', { params });
}
function* handleGet_Rl_bu_zone_data({ payload }) {
  try {
    const response = yield call(getRlBUZoneDataApi, payload);
    if (response.success) {
      yield put({
        type: GET_RL_BU_ZONE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_RL_BU_ZONE_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}

// Bu Bu List

async function getRlBUBUListDataApi(params) {
  return await Axios.post('/get_all_bu_bus',  params );
}
function* handleGet_Rl_bu_bu_data({ payload }) {
  try {
    const response = yield call(getRlBUBUListDataApi, payload);
    if (response.success) {
      yield put({
        type: GET_RL_BU_BU_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_RL_BU_BU_ERROR,
      // error: getSimplifiedError(error),
    });
  }
}
//get All BU MDM Data
async function getRlAllBuMdmdataApi(params) {
  return await Axios.post('/get_all_bu_mdm_data',  params);
}
function* handle_getRlAllBuMdm_data({ payload }) {
  try {
    const response = yield call(getRlAllBuMdmdataApi, payload);

    if (response.success) {
      yield put({
        type: GET_RL_ALL_BU_MDM_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_RL_ALL_BU_MDM_DATA_FAILED,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

//Add BU Letter Data
async function addRlBuLetterdataApi(payload) {
  return await Axios.post('/add_bu_assessment_data', payload);
}
function* handle_addRlBuLetter_data({ payload }) {
  try {
    const response = yield call(addRlBuLetterdataApi, payload);

    if (response.success) {
      yield put({
        type: ACTION_ADD_RL_BU_LETTER_DATA_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'BU Letter Scheduled Successfully!', 'success');
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: ACTION_ADD_RL_BU_LETTER_DATA_FAILED,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

//get All Functional Assessment Data
async function getRlAllBuLetterdataApi(params) {
  return await Axios.get('/get_all_bu_assessment_data', { params });
}
function* handle_getRlAllBuLetter_data({ payload }) {
  try {
    const response = yield call(getRlAllBuLetterdataApi, payload);

    if (response.success) {
      yield put({
        type: GET_RL_ALL_BU_LETTER_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_RL_ALL_BU_LETTER_DATA_FAILED,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

//get Functional Assessment Data
async function getRlBuLetterdataApi(payload) {
  return await Axios.post('/get_bu_assessment_data', payload);
}
function* handle_getRlBuLetter_data({ payload }) {
  try {
    const response = yield call(getRlBuLetterdataApi, payload);

    if (response.success) {
      yield put({
        type: GET_RL_BU_LETTER_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_RL_BU_LETTER_DATA_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

// Recall Function Assessment
async function recallBuLetterApi(payload) {
  return await Axios.post('/recall_bu_assessment', payload);
}
function* recallBuLetterData({ payload }) {
  try {
    const params = payload.body;
    const response = yield call(recallBuLetterApi, payload.params);
    if (response.success) {
      yield put({
        type: RECALL_BU_LETTER_SUCCESS,
        payload: response.data,
      });
      yield put({
        type: GET_RL_BU_LETTER_DATA_REQUEST,
        payload: params,
      });
      Swal.fire('Done!', 'BU Letter Recalled Successfully!', 'success');
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: RECALL_BU_LETTER_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

// Re-Trigger Assessment
async function reTriggerBuLetterApi(payload) {
  return await Axios.post('/retrigger_bu_assessment', payload);
}
function* reTriggerBuLetterData({ payload }) {
  try {
    const params = payload.body;
    const response = yield call(reTriggerBuLetterApi, payload.params);
    if (response.success) {
      yield put({
        type: RE_TRIGGER_BU_LETTER_SUCCESS,
        payload: response.data,
      });
      yield put({
        type: GET_RL_BU_LETTER_DATA_REQUEST,
        payload: params,
      });
      Swal.fire('Done!', 'BU Letter Re-Triggered Successfully!', 'success');
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: RE_TRIGGER_BU_LETTER_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}
  export default all([
    takeLatest(GET_RL_FUNCTION_DATA_REQUEST, handleGet_Rl_functiona_data),
    takeLatest(GET_RL_FUNCTIONAL_PAGE1_DATA_REQUEST, handleGet_Rl_functional_page1_data),
    takeLatest(ACTION_ADD_RL_FUNCTIONAL_ASSESSMENT_DATA, handle_addRlFunctionalAssessment_data),
    takeLatest(GET_RL_ALL_FUNCTIONAL_ASSESSMENT_DATA, handle_getRlAllFunctionalAssessment_data),
    takeLatest(GET_RL_FUNCTION_ASSESSMENT_DATA_REQUEST, handle_getRlFunctionAssessment_data),
    takeLatest(RECALL_FUNCTION_ASSESSMENT_REQUEST, recallFunctionAssessmentData),
    takeLatest(RE_TRIGGER_FUNCTION_ASSESSMENT_REQUEST, reTriggerFunctionAssessmentData),
    takeLatest(GET_RL_BU_PAGE1_DATA_REQUEST, handleGet_Rl_bu_page1_data),
    takeLatest(GET_RL_BU_ZONE_REQUEST , handleGet_Rl_bu_zone_data),
    takeLatest(GET_RL_BU_BU_REQUEST , handleGet_Rl_bu_bu_data),
    takeLatest(GET_RL_ALL_BU_MDM_DATA , handle_getRlAllBuMdm_data),
    takeLatest(GET_RL_ALL_BU_LETTER_DATA, handle_getRlAllBuLetter_data),
    takeLatest(ACTION_ADD_RL_BU_LETTER_DATA, handle_addRlBuLetter_data),
    takeLatest(RECALL_BU_LETTER_REQUEST, recallBuLetterData),
    takeLatest(RE_TRIGGER_BU_LETTER_REQUEST, reTriggerBuLetterData),
    takeLatest(GET_RL_BU_LETTER_DATA_REQUEST, handle_getRlBuLetter_data)
  
  ]);
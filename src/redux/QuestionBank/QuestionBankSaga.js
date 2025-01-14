import { put, takeEvery } from 'redux-saga/effects';
import {
  ACTION_GET_SECTION1_QUESTIONS_DATA,
  ACTION_GET_SECTION1_QUESTIONS_DATA_SUCCESS,
  ACTION_GET_SECTION1_QUESTIONS_DATA_FAILED,
  ACTION_GET_SECTION1_OPTIONS_DATA,
  ACTION_GET_SECTION1_OPTIONS_DATA_SUCCESS,
  ACTION_GET_SECTION1_OPTIONS_DATA_FAILED,
  ACTION_ADD_SECTION1_OPTIONS_DATA,
  ACTION_ADD_SECTION1_OPTIONS_DATA_FAILED,
  ACTION_ADD_SECTION1_OPTIONS_DATA_SUCCESS,
  ACTION_ADD_SECTION1_QUESTIONS_DATA,
  ACTION_ADD_SECTION1_QUESTIONS_DATA_FAILED,
  ACTION_ADD_SECTION1_QUESTIONS_DATA_SUCCESS,
  ACTION_EDIT_SECTION1_QUESTIONS_DATA,
  ACTION_EDIT_SECTION1_QUESTIONS_DATA_SUCCESS,
  ACTION_EDIT_SECTION1_QUESTIONS_DATA_FAILED,
  ACTION_EDIT_SECTION1_OPTIONS_DATA,
  ACTION_EDIT_SECTION1_OPTIONS_DATA_SUCCESS,
  ACTION_EDIT_SECTION1_OPTIONS_DATA_FAILED,
  ACTION_DELETE_SECTION1_QUESTIONS_DATA,
  ACTION_DELETE_SECTION1_QUESTIONS_DATA_SUCCESS,
  ACTION_DELETE_SECTION1_QUESTIONS_DATA_FAILED,
  ACTION_DELETE_SECTION1_OPTIONS_DATA,
  ACTION_DELETE_SECTION1_OPTIONS_DATA_SUCCESS,
  ACTION_DELETE_SECTION1_OPTIONS_DATA_FAILED,
  ATTEMPT_GET_SECTION1_QUESTIONS_TRANSLATION,
  GET_SECTION1_QUESTIONS_TRANSLATION_SUCCESS,
  GET_SECTION1_QUESTIONS_TRANSLATION_FAILED,
  ATTEMPT_EDIT_SECTION1_QUESTIONS_TRANSLATION,
  EDIT_SECTION1_QUESTIONS_TRANSLATION_SUCCESS,
  EDIT_SECTION1_QUESTIONS_TRANSLATION_FAILED,
} from '../types';
import { ACTION_ADD_ERROR_NOTIFICATION_DATA } from '../ErrorNotification/ErrorNotificationReducer';
import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';
import Swal from 'sweetalert2';

function getSection1QuestionDataApiCall(data) {
  console.log('saga', data.payload.data);
  let params = data.payload.data;
  return Axios.get('/get_Section1_Question?Control_ID=' + params.controlId);
}

function* getSection1QuestionData(payload) {
  try {
    const response = yield getSection1QuestionDataApiCall(payload);
    if (response?.success === true) {
      yield put({
        type: ACTION_GET_SECTION1_QUESTIONS_DATA_SUCCESS,
        data: response?.data,
      });
    } else {
      yield put({
        type: ACTION_GET_SECTION1_QUESTIONS_DATA_FAILED,
        message: 'Somthing went wrong',
      });
    }
  } catch (e) {
    yield put({ type: ACTION_GET_SECTION1_QUESTIONS_DATA_FAILED, error: getSimplifiedError(e) });
  }
}

function getSection1QuestionDataTranslationApiCall(data) {
  return Axios.post('/get_section1_questions_translation', data?.payload?.data);
}
function* getSection1QuestionTranslationData(payload) {
  try {
    const response = yield getSection1QuestionDataTranslationApiCall(payload);
    if (response?.success === true) {
      yield put({
        type: GET_SECTION1_QUESTIONS_TRANSLATION_SUCCESS,
        data: response?.data,
      });
    } else {
      yield put({
        type: GET_SECTION1_QUESTIONS_TRANSLATION_FAILED,
        message: 'Somthing went wrong',
      });
    }
  } catch (e) {
    yield put({ type: GET_SECTION1_QUESTIONS_TRANSLATION_FAILED, error: getSimplifiedError(e) });
  }
}

function editSection1QuestionDataTranslationApiCall(data) {
  return Axios.post('/add_Section1_Question_Translation', data?.payload?.data);
}
function* editSection1QuestionTranslationData(payload) {
  try {
    const response = yield editSection1QuestionDataTranslationApiCall(payload);
    if (response?.success === true) {
      yield put({
        type: EDIT_SECTION1_QUESTIONS_TRANSLATION_SUCCESS,
        data: response?.data,
      });
    } else {
      yield put({
        type: EDIT_SECTION1_QUESTIONS_TRANSLATION_FAILED,
        message: 'Somthing went wrong',
      });
    }
  } catch (e) {
    yield put({ type: ATTEMPT_GET_SECTION1_QUESTIONS_TRANSLATION, error: getSimplifiedError(e) });
  }
}

// get option Api call

function getSection1OptionDataApiCall(data) {
  let params = data.payload.data;
  return Axios.get('/get_Section1_Question?Control_ID=' + params.controlId);
}

function* getSection1OptionData(payload) {
  try {
    const response = yield getSection1OptionDataApiCall(payload);
    if (response?.success === true) {
      yield put({
        type: ACTION_GET_SECTION1_OPTIONS_DATA_SUCCESS,
        data: response?.data,
      });
    } else {
      yield put({
        type: ACTION_GET_SECTION1_OPTIONS_DATA_FAILED,
        message: 'Somthing went wrong',
      });
    }
  } catch (e) {
    yield put({ type: ACTION_GET_SECTION1_OPTIONS_DATA_FAILED, error: getSimplifiedError(e) });
  }
}

// section1 Add Api call

function addSection1QuestionDataApiCall(payload) {
  return Axios.post('/add_Section1_Question', payload?.payload?.data);
}

function* addSection1QuestionData(payload) {
  try {
    const response = yield addSection1QuestionDataApiCall(payload);
    if (response?.success === true) {
      yield put({
        type: ACTION_ADD_SECTION1_QUESTIONS_DATA_SUCCESS,
        data: response?.data,
      });
      Swal.fire('Done!', 'Question Addedd Successfully!', 'success');
    } else {
      yield put({
        type: ACTION_ADD_SECTION1_QUESTIONS_DATA_FAILED,
        message: 'Somthing went wrong',
      });
    }
  } catch (e) {
    if (e?.response?.status === 400) {
      yield put({
        type: ACTION_ADD_ERROR_NOTIFICATION_DATA,
        payload: {
          data: { text: e?.response?.data?.data, type: 'danger' },
        },
      });
      yield put({ type: ACTION_ADD_SECTION1_QUESTIONS_DATA_FAILED, error: getSimplifiedError(e) });
    } else {
      yield put({ type: ACTION_ADD_SECTION1_QUESTIONS_DATA_FAILED, error: getSimplifiedError(e) });
    }
  }
}

// Add option Api call

function addSection1OptionDataApiCall(payload) {
  return Axios.post('/add_Section1_Options', payload);
}

function* addSection1OptionData(payload) {
  try {
    const response = yield addSection1OptionDataApiCall(payload?.payload?.data?.addArray);
    if (response?.success === true) {
      yield put({
        type: ACTION_ADD_SECTION1_OPTIONS_DATA_SUCCESS,
        data: response?.data,
      });
      Swal.fire('Done!', 'Added Successfully', 'success');
    } else {
      yield put({
        type: ACTION_ADD_SECTION1_OPTIONS_DATA_FAILED,
        message: 'Somthing went wrong',
      });
    }
  } catch (e) {
    if (e?.response?.status === 400) {
      yield put({
        type: ACTION_ADD_ERROR_NOTIFICATION_DATA,
        payload: {
          data: { text: e?.response?.data?.data, type: 'danger' },
        },
      });
      yield put({ type: ACTION_ADD_SECTION1_OPTIONS_DATA_FAILED, error: getSimplifiedError(e) });
    } else {
      yield put({ type: ACTION_ADD_SECTION1_OPTIONS_DATA_FAILED, error: getSimplifiedError(e) });
    }
  }
}

// section1 Edit Api call

function editSection1QuestionDataApiCall(payload) {
  return Axios.post('/update_Section1_Question', payload?.payload?.data);
}

function* editSection1QuestionData(payload) {
  try {
    const response = yield editSection1QuestionDataApiCall(payload);
    if (response?.success === true) {
      yield put({
        type: ACTION_EDIT_SECTION1_QUESTIONS_DATA_SUCCESS,
        data: response?.data,
      });
      Swal.fire('Done!', 'Updated Successfully!', 'success');
    } else {
      yield put({
        type: ACTION_EDIT_SECTION1_QUESTIONS_DATA_FAILED,
        message: 'Somthing went wrong',
      });
    }
  } catch (e) {
    if (e?.response?.status === 400) {
      yield put({
        type: ACTION_ADD_ERROR_NOTIFICATION_DATA,
        payload: {
          data: { text: e?.response?.data?.data, type: 'danger' },
        },
      });
      yield put({ type: ACTION_EDIT_SECTION1_QUESTIONS_DATA_FAILED, error: getSimplifiedError(e) });
    } else {
      yield put({ type: ACTION_EDIT_SECTION1_QUESTIONS_DATA_FAILED, error: getSimplifiedError(e) });
    }
  }
}

// section1 Edit Options Api call

function editSection1OptionsDataApiCall(payload) {
  return Axios.post('/update_Section1_Options', payload?.payload?.data?.editArray);
}

function* editSection1OptionsData(payload) {
  try {
    const response = yield editSection1OptionsDataApiCall(payload);
    if (response?.success === true) {
      yield put({
        type: ACTION_EDIT_SECTION1_OPTIONS_DATA_SUCCESS,
        data: response?.data,
      });
      Swal.fire('Done!', 'Updated Successfully!', 'success');
    } else {
      yield put({
        type: ACTION_EDIT_SECTION1_OPTIONS_DATA_FAILED,
        message: 'Somthing went wrong',
      });
    }
  } catch (e) {
    if (e?.response?.status === 400) {
      yield put({
        type: ACTION_ADD_ERROR_NOTIFICATION_DATA,
        payload: {
          data: { text: e?.response?.data?.data, type: 'danger' },
        },
      });
      yield put({ type: ACTION_EDIT_SECTION1_OPTIONS_DATA_FAILED, error: getSimplifiedError(e) });
    } else {
      yield put({ type: ACTION_EDIT_SECTION1_OPTIONS_DATA_FAILED, error: getSimplifiedError(e) });
    }
  }
}

// section1 Delete Api call

function deleteSection1QuestionDataApiCall(payload) {
  return Axios.post('/delete_Section1_Question', payload?.payload?.data);
}

function* deleteSection1QuestionData(payload) {
  try {
    const response = yield deleteSection1QuestionDataApiCall(payload);
    if (response?.success === true) {
      yield put({
        type: ACTION_DELETE_SECTION1_QUESTIONS_DATA_SUCCESS,
        data: response?.data,
      });
      Swal.fire('Done!', 'Deleted Successfully!', 'success');
    } else {
      yield put({
        type: ACTION_DELETE_SECTION1_QUESTIONS_DATA_FAILED,
        message: 'Somthing went wrong',
      });
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (e) {
    yield put({ type: ACTION_DELETE_SECTION1_QUESTIONS_DATA_FAILED, error: getSimplifiedError(e) });
  }
}

// Delete option Api call

function deleteSection1OptionDataApiCall(payload) {
  return Axios.post('/delete_Section1_Options', payload);
}

function* deleteSection1OptionData(payload) {
  try {
    const response = yield deleteSection1OptionDataApiCall(payload?.payload?.data);
    if (response?.success === true) {
      yield put({
        type: ACTION_DELETE_SECTION1_OPTIONS_DATA_SUCCESS,
        data: response?.data,
      });
      Swal.fire('Done!', 'Delete Successfully', 'success');
    } else {
      yield put({
        type: ACTION_DELETE_SECTION1_OPTIONS_DATA_FAILED,
        message: 'Somthing went wrong',
      });
    }
  } catch (e) {
    if (e?.response?.status === 400) {
      yield put({
        type: ACTION_ADD_ERROR_NOTIFICATION_DATA,
        payload: {
          data: { text: e?.response?.data?.data, type: 'danger' },
        },
      });
      yield put({ type: ACTION_DELETE_SECTION1_OPTIONS_DATA_FAILED, error: getSimplifiedError(e) });
    } else {
      yield put({ type: ACTION_DELETE_SECTION1_OPTIONS_DATA_FAILED, error: getSimplifiedError(e) });
    }
  }
}

function* questionBankData() {
  yield takeEvery(ACTION_GET_SECTION1_QUESTIONS_DATA, getSection1QuestionData);
  yield takeEvery(ACTION_GET_SECTION1_OPTIONS_DATA, getSection1OptionData);
  yield takeEvery(ACTION_ADD_SECTION1_QUESTIONS_DATA, addSection1QuestionData);
  yield takeEvery(ACTION_ADD_SECTION1_OPTIONS_DATA, addSection1OptionData);
  yield takeEvery(ACTION_DELETE_SECTION1_QUESTIONS_DATA, deleteSection1QuestionData);
  yield takeEvery(ACTION_DELETE_SECTION1_OPTIONS_DATA, deleteSection1OptionData);
  yield takeEvery(ACTION_EDIT_SECTION1_QUESTIONS_DATA, editSection1QuestionData);
  yield takeEvery(ACTION_EDIT_SECTION1_OPTIONS_DATA, editSection1OptionsData);
  yield takeEvery(ATTEMPT_GET_SECTION1_QUESTIONS_TRANSLATION, getSection1QuestionTranslationData);
  yield takeEvery(ATTEMPT_EDIT_SECTION1_QUESTIONS_TRANSLATION, editSection1QuestionTranslationData);
}

export default questionBankData;

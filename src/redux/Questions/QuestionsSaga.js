import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Axios } from '../../api/axios';
import { getSimplifiedError } from '../../utils/error';
import {
  GET_SECTION_3_MICS_REQUEST,
  GET_SECTION_3_MICS_SUCCESS,
  GET_SECTION_3_MICS_ERROR,
  GET_SECTION_3_MICS_ADD_REQUEST,
  GET_SECTION_3_MICS_UPDATE_REQUEST,
  GET_SECTION_3_MICS_DELETE_REQUEST,
  GET_SECTION_3_MICS_ADD_SUCCESS,
  GET_SECTION_3_MICS_ADD_ERROR,
  GET_SECTION_3_MICS_UPDATE_SUCCESS,
  GET_SECTION_3_MICS_UPDATE_ERROR,
  GET_SECTION_3_MICS_DELETE_SUCCESS,
  GET_SECTION_1_MICS_REQUEST,
  GET_SECTION_1_MICS_SUCCESS,
  GET_SECTION_1_MICS_ERROR,
  UPDATE_SECTION_1_MICS_REQUEST,
  UPDATE_SECTION_1_MICS_SUCCESS,
  UPDATE_SECTION_1_MICS_ERROR,
  DELETE_SECTION_1_MICS_REQUEST,
  DELETE_SECTION_1_MICS_SUCCESS,
  DELETE_SECTION_1_MICS_ERROR,
} from './QuestionsReducer';
import Swal from 'sweetalert2';

async function getSection1Api(params) {
  return await Axios.get('/get_Section1_Question', { params });
}
function* handleGetSection1({ payload }) {
  try {
    const response = yield call(getSection1Api, payload);
    if (response.success) {
      yield put({
        type: GET_SECTION_1_MICS_SUCCESS,
        payload: { data: response.data, Level: { [payload.Level]: response.data } },
      });
    }
  } catch (error) {
    yield put({
      type: GET_SECTION_1_MICS_ERROR,
      payload: getSimplifiedError(error),
    });
  }
}

async function updateSection1Api(payload) {
  return await Axios.post('/updateSection1Api', payload);
}
function* handleUpdateSection1({ payload }) {
  try {
    const response = yield call(updateSection1Api, payload);
    if (response.success) {
      yield put({
        type: UPDATE_SECTION_1_MICS_SUCCESS,
        payload: {},
      });
    }
  } catch (error) {
    yield put({
      type: UPDATE_SECTION_1_MICS_ERROR,
      payload: getSimplifiedError(error),
    });
  }
}

async function deleteSection1Api(payload) {
  return await Axios.post('/delete_Section1_Question', payload);
}
function* handleDeleteSection1({ payload }) {
  try {
    const response = yield call(deleteSection1Api, payload);
    if (response.success) {
      yield put({
        type: DELETE_SECTION_1_MICS_SUCCESS,
        payload: {},
      });
    }
  } catch (error) {
    yield put({
      type: DELETE_SECTION_1_MICS_ERROR,
      payload: getSimplifiedError(error),
    });
  }
}

async function getSection3Api(params) {
  return await Axios.get('/get_Section3_MICS_Specific_Question', { params });
}
function* handleGetSection3({ payload }) {
  try {
    const response = yield call(getSection3Api, payload);
    if (response.success) {
      yield put({
        type: GET_SECTION_3_MICS_SUCCESS,
        payload: { data: response.data, Level: { [payload.Level]: response.data } },
      });
    }
  } catch (error) {
    yield put({
      type: GET_SECTION_3_MICS_ERROR,
      payload: getSimplifiedError(error),
    });
  }
}

async function addSection3Api(payload) {
  return await Axios.post('/add_Section3_MICS_Specific_Question', payload);
}
function* handleAddSection3({ payload }) {
  try {
    const response = yield call(addSection3Api, payload);
    if (response.success) {
      yield put({
        type: GET_SECTION_3_MICS_ADD_SUCCESS,
        payload: { data: response.data },
      });
    }
  } catch (error) {
    yield put({
      type: GET_SECTION_3_MICS_ADD_ERROR,
      payload: getSimplifiedError(error),
    });
  }
}

async function updateSection3Api(payload) {
  return await Axios.post('/update_Section3_MICS_Specific_Question', payload);
}
function* handleUpdateSection3({ payload }) {
  try {
    const response = yield call(updateSection3Api, payload);
    if (response.success) {
      yield put({
        type: GET_SECTION_3_MICS_UPDATE_SUCCESS,
        payload: { data: response.data },
      });
      Swal.fire('Saved', '', 'success');
    }
  } catch (error) {
    yield put({
      type: GET_SECTION_3_MICS_UPDATE_ERROR,
      payload: getSimplifiedError(error),
    });
    Swal.fire('Error!', 'Internal Server Error: Please refresh page', 'error');
  }
}

async function deleteSection3Api(payload) {
  return await Axios.post('/delete_Section3_MICS_Specific_Question', payload);
}
function* handleDeleteSection3({ payload }) {
  try {
    const response = yield call(deleteSection3Api, payload);
    if (response.success) {
      yield put({
        type: GET_SECTION_3_MICS_DELETE_SUCCESS,
        payload: { data: response.data },
      });
    }
  } catch (error) {
    yield put({
      type: GET_SECTION_3_MICS_UPDATE_ERROR,
      payload: getSimplifiedError(error),
    });
  }
}

export default all([
  takeLatest(GET_SECTION_1_MICS_REQUEST, handleGetSection1),
  takeLatest(UPDATE_SECTION_1_MICS_REQUEST, handleUpdateSection1),
  takeLatest(DELETE_SECTION_1_MICS_REQUEST, handleDeleteSection1),
  takeLatest(GET_SECTION_3_MICS_REQUEST, handleGetSection3),
  takeLatest(GET_SECTION_3_MICS_ADD_REQUEST, handleAddSection3),
  takeLatest(GET_SECTION_3_MICS_UPDATE_REQUEST, handleUpdateSection3),
  takeLatest(GET_SECTION_3_MICS_DELETE_REQUEST, handleDeleteSection3),
]);

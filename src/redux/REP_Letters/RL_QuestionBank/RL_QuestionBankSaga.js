import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Axios } from '../../../api/axios';
import { getSimplifiedError } from '../../../utils/error';
import {
  GET_BU_QUESTIONS_REQUEST,
  GET_BU_QUESTIONS_ERROR,
  GET_BU_QUESTIONS_SUCCESS,
  ADD_BU_QUESTIONS_REQUEST,
  ADD_BU_QUESTIONS_ERROR,
  ADD_BU_QUESTIONS_SUCCESS,
  EDIT_BU_QUESTIONS_REQUEST,
  EDIT_BU_QUESTIONS_ERROR,
  EDIT_BU_QUESTIONS_SUCCESS,
  DELETE_BU_QUESTIONS_REQUEST,
  DELETE_BU_QUESTIONS_ERROR,
  DELETE_BU_QUESTIONS_SUCCESS,
  GET_BU_QUESTIONS_WITH_COMMENT_REQUEST,
  GET_BU_QUESTIONS_WITH_COMMENT_SUCCESS,
  GET_BU_QUESTIONS_WITH_COMMENT_ERROR,
  GET_FUNCTION_QUESTIONS_REQUEST,
  GET_FUNCTION_QUESTIONS_ERROR,
  GET_FUNCTION_QUESTIONS_SUCCESS,
  ADD_FUNCTION_QUESTIONS_REQUEST,
  ADD_FUNCTION_QUESTIONS_ERROR,
  ADD_FUNCTION_QUESTIONS_SUCCESS,
  EDIT_FUNCTION_QUESTIONS_REQUEST,
  EDIT_FUNCTION_QUESTIONS_ERROR,
  EDIT_FUNCTION_QUESTIONS_SUCCESS,
  DELETE_FUNCTION_QUESTIONS_REQUEST,
  DELETE_FUNCTION_QUESTIONS_ERROR,
  DELETE_FUNCTION_QUESTIONS_SUCCESS,
  CREATE_NEW_FUNCTION_LETTER_REQUEST,
  CREATE_NEW_FUNCTION_LETTER_SUCCESS,
  CREATE_NEW_FUNCTION_LETTER_ERROR,
  GET_LETTER_NAME_FROM_FUNCTION_REQUEST,
  GET_LETTER_NAME_FROM_FUNCTION_SUCCESS,
  GET_LETTER_NAME_FROM_FUNCTION_ERROR,
  GET_INSTRUCTIONS_REQUEST,
  GET_INSTRUCTIONS_SUCCESS,
  GET_INSTRUCTIONS_ERROR,
  MODIFY_INSTRUCTIONS_REQUEST,
  MODIFY_INSTRUCTIONS_SUCCESS,
  MODIFY_INSTRUCTIONS_ERROR,
  GET_FUNCTIONAL_INSTRUCTIONS_REQUEST,
  GET_FUNCTIONAL_INSTRUCTIONS_SUCCESS,
  GET_FUNCTIONAL_INSTRUCTIONS_ERROR,
  MODIFY_FUNCTIONAL_INSTRUCTIONS_REQUEST,
  MODIFY_FUNCTIONAL_INSTRUCTIONS_SUCCESS,
  MODIFY_FUNCTIONAL_INSTRUCTIONS_ERROR,
} from './RL_QuestionBankReducer';
import Swal from 'sweetalert2';

// get BU Questions
async function get_BU_QuestionsApi(params) {
  return await Axios.get('/get_bu_questions', { params });
}
function* handleGet_BU_Questions({ payload }) {
  try {
    const response = yield call(get_BU_QuestionsApi, payload);
    if (response.success) {
      yield put({
        type: GET_BU_QUESTIONS_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_BU_QUESTIONS_ERROR,
    });
  }
}

// Add BU Questions
async function add_BU_QuestionsApi(payload) {
  return await Axios.post('/add_bu_questions', payload);
}
function* add_BU_Questions_Data({ payload }) {
  try {
    const response = yield call(add_BU_QuestionsApi, payload);

    if (response.success) {
      yield put({
        type: ADD_BU_QUESTIONS_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Question added Successfully!', 'success');
      yield call(get_BU_QuestionsApi);
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: ADD_BU_QUESTIONS_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

async function edit_BU_QuestionsApi(payload) {
  return await Axios.post('/update_bu_questions', payload);
}
function* edit_BU_Questions_Data({ payload }) {
  try {
    const response = yield call(edit_BU_QuestionsApi, payload);

    if (response.success) {
      yield put({
        type: EDIT_BU_QUESTIONS_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Question Edited Successfully!', 'success');
      yield call(get_BU_QuestionsApi);
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: EDIT_BU_QUESTIONS_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

async function delete_BU_QuestionsApi(payload) {
  return await Axios.post('/delete_bu_questions', payload);
}
function* delete_BU_Questions_Data({ payload }) {
  try {
    const response = yield call(delete_BU_QuestionsApi, payload);

    if (response.success) {
      yield put({
        type: DELETE_BU_QUESTIONS_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Question deleted Successfully!', 'success');
      yield call(get_BU_QuestionsApi);
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: DELETE_BU_QUESTIONS_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

// get BU Questions with comments
async function get_BU_Questions_With_CommentsApi(params) {
  return await Axios.get('/get_bu_questions_with_comments', { params });
}
function* handleGet_BU_Questions_With_Comments({ payload }) {
  try {
    const response = yield call(get_BU_Questions_With_CommentsApi, payload);
    if (response.success) {
      yield put({
        type: GET_BU_QUESTIONS_WITH_COMMENT_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_BU_QUESTIONS_WITH_COMMENT_ERROR,
    });
  }
}

// CREATE NEW FUNCTION LETTER
async function createNewFunctionRequestApi(payload) {
  return await Axios.post('/add_new_functional_letter', payload);
}
function* createNewFunctionRequest_Data({ payload }) {
  try {
    const response = yield call(createNewFunctionRequestApi, payload);

    if (response.success) {
      yield put({
        type: CREATE_NEW_FUNCTION_LETTER_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Letter Created Successfully!', 'success');
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: CREATE_NEW_FUNCTION_LETTER_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

// GET LETTER NAME FROM FUNCTION
async function getLetterNameFromFunctionApi(params) {
  return await Axios.get('/get_letter_name_from_function', { params });
}
function* handle_GetLetterNameFromFunction({ payload }) {
  try {
    const response = yield call(getLetterNameFromFunctionApi, payload);
    if (response.success) {
      yield put({
        type: GET_LETTER_NAME_FROM_FUNCTION_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_LETTER_NAME_FROM_FUNCTION_ERROR,
    });
  }
}

// get FUNCTION Questions
async function get_Function_QuestionsApi(params) {
  return await Axios.post('/get_functional_questions', params);
}
function* handleGet_Function_Questions({ payload }) {
  try {
    const response = yield call(get_Function_QuestionsApi, payload);
    if (response.success) {
      yield put({
        type: GET_FUNCTION_QUESTIONS_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_FUNCTION_QUESTIONS_ERROR,
    });
  }
}

// Add FUNCTION Questions
async function add_Function_QuestionsApi(payload) {
  return await Axios.post('/add_functional_questions', payload);
}
function* add_Function_Questions_Data({ payload }) {
  try {
    const response = yield call(add_Function_QuestionsApi, payload);

    if (response.success) {
      yield put({
        type: ADD_FUNCTION_QUESTIONS_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Question added Successfully!', 'success');
      //yield call(get_Function_QuestionsApi);
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: ADD_FUNCTION_QUESTIONS_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

async function edit_Function_QuestionsApi(payload) {
  return await Axios.post('/update_functional_questions', payload);
}
function* edit_Function_Questions_Data({ payload }) {
  try {
    const response = yield call(edit_Function_QuestionsApi, payload);

    if (response.success) {
      yield put({
        type: EDIT_FUNCTION_QUESTIONS_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Question Edited Successfully!', 'success');
      //yield call(get_Function_QuestionsApi);
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: EDIT_FUNCTION_QUESTIONS_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

async function delete_Function_QuestionsApi(payload) {
  return await Axios.post('/delete_functional_questions', payload);
}
function* delete_Function_Questions_Data({ payload }) {
  try {
    const response = yield call(delete_Function_QuestionsApi, payload);

    if (response.success) {
      yield put({
        type: DELETE_FUNCTION_QUESTIONS_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Question deleted Successfully!', 'success');
      //yield call(get_Function_QuestionsApi);
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: DELETE_FUNCTION_QUESTIONS_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

// GET INSTRUCTIONS
async function getInstructionsApi(params) {
  return await Axios.get('/get_rep_instructions', { params });
}
function* handleGet_Instructions({ payload }) {
  try {
    const response = yield call(getInstructionsApi, payload);
    if (response.success) {
      yield put({
        type: GET_INSTRUCTIONS_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_INSTRUCTIONS_ERROR,
    });
  }
}

// MODIFY INSTRUCTIONS
async function modifyInstructionsApi(payload) {
  return await Axios.post('/update_rep_instructions', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
function* modifyInstructions_Data({ payload }) {
  try {
    const { formdata, event } = payload;
    const response = yield call(modifyInstructionsApi, formdata);

    if (response.success) {
      yield put({
        type: MODIFY_INSTRUCTIONS_SUCCESS,
        payload: response.data,
      });
      if (event && event.onSuccess) {
        event.onSuccess(response.data);
      }
      Swal.fire('Done!', 'Instructions Modified Successfully!', 'success');
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: MODIFY_INSTRUCTIONS_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

// GET FUNCTIONAL INSTRUCTIONS
async function getFunctionalInstructionsApi(params) {
  return await Axios.get('/get_function_instructions', { params });
}
function* handleGet_Functional_Instructions({ payload }) {
  try {
    const response = yield call(getFunctionalInstructionsApi, payload);
    if (response.success) {
      yield put({
        type: GET_FUNCTIONAL_INSTRUCTIONS_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_FUNCTIONAL_INSTRUCTIONS_ERROR,
    });
  }
}

// MODIFY FUNCTIONAL INSTRUCTIONS
async function modifyFunctionalInstructionsApi(payload) {
  return await Axios.post('/update_function_instructions', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
function* modifyFunctionalInstructions_Data({ payload }) {
  try {
    const { formdata, event } = payload;
    const response = yield call(modifyFunctionalInstructionsApi, formdata);

    if (response.success) {
      yield put({
        type: MODIFY_FUNCTIONAL_INSTRUCTIONS_SUCCESS,
        payload: response.data,
      });
      if (event && event.onSuccess) {
        event.onSuccess(response.data);
      }
      Swal.fire('Done!', 'Instructions Modified Successfully!', 'success');
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: MODIFY_FUNCTIONAL_INSTRUCTIONS_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

export default all([
  takeLatest(GET_BU_QUESTIONS_REQUEST, handleGet_BU_Questions),
  takeLatest(ADD_BU_QUESTIONS_REQUEST, add_BU_Questions_Data),
  takeLatest(EDIT_BU_QUESTIONS_REQUEST, edit_BU_Questions_Data),
  takeLatest(DELETE_BU_QUESTIONS_REQUEST, delete_BU_Questions_Data),
  takeLatest(GET_BU_QUESTIONS_WITH_COMMENT_REQUEST, handleGet_BU_Questions_With_Comments),
  takeLatest(GET_LETTER_NAME_FROM_FUNCTION_REQUEST, handle_GetLetterNameFromFunction),
  takeLatest(CREATE_NEW_FUNCTION_LETTER_REQUEST, createNewFunctionRequest_Data),
  takeLatest(GET_FUNCTION_QUESTIONS_REQUEST, handleGet_Function_Questions),
  takeLatest(ADD_FUNCTION_QUESTIONS_REQUEST, add_Function_Questions_Data),
  takeLatest(EDIT_FUNCTION_QUESTIONS_REQUEST, edit_Function_Questions_Data),
  takeLatest(DELETE_FUNCTION_QUESTIONS_REQUEST, delete_Function_Questions_Data),
  takeLatest(GET_INSTRUCTIONS_REQUEST, handleGet_Instructions),
  takeLatest(MODIFY_INSTRUCTIONS_REQUEST, modifyInstructions_Data),
  takeLatest(GET_FUNCTIONAL_INSTRUCTIONS_REQUEST, handleGet_Functional_Instructions),
  takeLatest(MODIFY_FUNCTIONAL_INSTRUCTIONS_REQUEST, modifyFunctionalInstructions_Data),
]);

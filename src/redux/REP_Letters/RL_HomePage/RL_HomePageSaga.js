import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Axios } from '../../../api/axios';
import { getSimplifiedError } from '../../../utils/error';
import { push } from 'connected-react-router';
import {
  GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_SUCCESS,
  GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_ERROR,
  GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_SUCCESS,
  GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_ERROR,
  GET_BU_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_SUCCESS,
  GET_BU_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_ERROR,
  GET_BU_BU_HEAD_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_BU_HEAD_HOME_PAGE_TABLE_DATA_SUCCESS,
  GET_BU_BU_HEAD_HOME_PAGE_TABLE_DATA_ERROR,
  GET_BU_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_SUCCESS,
  GET_BU_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_ERROR,
  GET_BU_FINANCE_DIRECTOR_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_FINANCE_DIRECTOR_HOME_PAGE_TABLE_DATA_SUCCESS,
  GET_BU_FINANCE_DIRECTOR_HOME_PAGE_TABLE_DATA_ERROR,
  GET_BU_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_SUCCESS,
  GET_BU_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_ERROR,
  GET_BU_ZONE_VP_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BU_ZONE_VP_HOME_PAGE_TABLE_DATA_SUCCESS,
  GET_BU_ZONE_VP_HOME_PAGE_TABLE_DATA_ERROR,
  GET_BUZONE_EXCOM_MEMBER_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BUZONE_EXCOM_MEMBER_HOME_PAGE_TABLE_DATA_SUCCESS,
  GET_BUZONE_EXCOM_MEMBER_HOME_PAGE_TABLE_DATA_ERROR,
  GET_BUZONE_ZONE_LEGAL_REPRESENTATIVE_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BUZONE_ZONE_LEGAL_REPRESENTATIVE_HOME_PAGE_TABLE_DATA_SUCCESS,
  GET_BUZONE_ZONE_LEGAL_REPRESENTATIVE_HOME_PAGE_TABLE_DATA_ERROR,
  GET_BUZONE_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BUZONE_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_SUCCESS,
  GET_BUZONE_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_ERROR,
  GET_BUZONE_ZONE_VP_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BUZONE_ZONE_VP_HOME_PAGE_TABLE_DATA_SUCCESS,
  GET_BUZONE_ZONE_VP_HOME_PAGE_TABLE_DATA_ERROR,
  GET_BUZONE_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
  GET_BUZONE_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_SUCCESS,
  GET_BUZONE_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_ERROR,
  ADD_OR_UPDATE_FUNCTION_DRAFT_RESPONSE_REQUEST,
  ADD_OR_UPDATE_FUNCTION_DRAFT_RESPONSE_SUCCESS,
  ADD_OR_UPDATE_FUNCTION_DRAFT_RESPONSE_ERROR,
  GET_LATEST_FUNCTION_DRAFT_RESPONSE_REQUEST,
  GET_LATEST_FUNCTION_DRAFT_RESPONSE_SUCCESS,
  GET_LATEST_FUNCTION_DRAFT_RESPONSE_ERROR,
  GET_FUNCTION_SUBMIT_RESPONSE_REQUEST,
  GET_FUNCTION_SUBMIT_RESPONSE_SUCCESS,
  GET_FUNCTION_SUBMIT_RESPONSE_ERROR,
  ADD_FUNCTION_SUBMIT_RESPONSE_REQUEST,
  ADD_FUNCTION_SUBMIT_RESPONSE_SUCCESS,
  ADD_FUNCTION_SUBMIT_RESPONSE_ERROR,
  ADD_OR_UPDATE_BU_DRAFT_RESPONSE_REQUEST,
  ADD_OR_UPDATE_BU_DRAFT_RESPONSE_SUCCESS,
  ADD_OR_UPDATE_BU_DRAFT_RESPONSE_ERROR,
  GET_LATEST_BU_DRAFT_RESPONSE_REQUEST,
  GET_LATEST_BU_DRAFT_RESPONSE_SUCCESS,
  GET_LATEST_BU_DRAFT_RESPONSE_ERROR,
  GET_BU_SUBMIT_RESPONSE_REQUEST,
  GET_BU_SUBMIT_RESPONSE_SUCCESS,
  GET_BU_SUBMIT_RESPONSE_ERROR,
  ADD_BU_SUBMIT_RESPONSE_REQUEST,
  ADD_BU_SUBMIT_RESPONSE_SUCCESS,
  ADD_BU_SUBMIT_RESPONSE_ERROR,
  GET_BU_SECTION2_SIGNATURE_RESPONSE_ERROR,
  GET_BU_SECTION2_SIGNATURE_RESPONSE_REQUEST,
  GET_BU_SECTION2_SIGNATURE_RESPONSE_SUCCESS,
  ADD_BU_SECTION2_CHECKBOX_ERROR,
  ADD_BU_SECTION2_CHECKBOX_REQUEST,
  ADD_BU_SECTION2_CHECKBOX_SUCCESS,
  ADD_BU_SECTION2_UPLOAD_MAIL_APPROVAL_ERROR,
  ADD_BU_SECTION2_UPLOAD_MAIL_APPROVAL_REQUEST,
  ADD_BU_SECTION2_UPLOAD_MAIL_APPROVAL_SUCCESS,
  GET_BU_SECTION_3_RESPONSE_REQUEST,
  GET_BU_SECTION_3_RESPONSE_SUCCESS,
  GET_BU_SECTION_3_RESPONSE_ERROR,
  ADD_BU_SECTION_3_RESPONSE_REQUEST,
  ADD_BU_SECTION_3_RESPONSE_SUCCESS,
  ADD_BU_SECTION_3_RESPONSE_ERROR,
  APPROVE_BU_SECTION_3_RESPONSE_REQUEST,
  APPROVE_BU_SECTION_3_RESPONSE_SUCCESS,
  APPROVE_BU_SECTION_3_RESPONSE_ERROR,
} from './RL_HomePageReducer';
import Swal from 'sweetalert2';

// GET Functional Recipient home page table data
async function getFunctionRecipientHomePageDataApi(params) {
  return await Axios.get('/get_function_home_page_data_for_recipient', { params });
}
function* handle_GetFunctionRecipientHomePageData({ payload }) {
  try {
    const response = yield call(getFunctionRecipientHomePageDataApi, payload);
    if (response.success) {
      yield put({
        type: GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_ERROR,
    });
  }
}

// GET Functional Global PErsona home page table data
async function getFunctionGlobalPersonaHomePageDataApi(params) {
  return await Axios.get('/get_function_home_page_data_for_global', { params });
}
function* handle_GetFunctionGlobalPersonaHomePageData({ payload }) {
  try {
    const response = yield call(getFunctionGlobalPersonaHomePageDataApi, payload);
    if (response.success) {
      yield put({
        type: GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_ERROR,
    });
  }
}

// GET BU Global PErsona home page table data
async function get_BU_GlobalPersonaHomePageDataApi(params) {
  return await Axios.get('/get_bu_home_page_data_for_global', { params });
}
function* handle_Get_BU_GlobalPersonaHomePageData({ payload }) {
  try {
    const response = yield call(get_BU_GlobalPersonaHomePageDataApi, payload);
    if (response.success) {
      yield put({
        type: GET_BU_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_BU_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_ERROR,
    });
  }
}

// GET BU BU HEAD home page table data
async function get_BU_BU_HeadHomePageDataApi(params) {
  return await Axios.get('/get_bu_home_page_data_for_bu_head', { params });
}
function* handle_Get_BU_BU_HeadHomePageData({ payload }) {
  try {
    const response = yield call(get_BU_BU_HeadHomePageDataApi, payload);
    if (response.success) {
      yield put({
        type: GET_BU_BU_HEAD_HOME_PAGE_TABLE_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_BU_BU_HEAD_HOME_PAGE_TABLE_DATA_ERROR,
    });
  }
}

// GET BU Disclosure Processor home page table data
async function get_BU_Disclosure_ProcessorHomePageDataApi(params) {
  return await Axios.get('/get_bu_home_page_data_for_disclosure_processor', { params });
}
function* handle_Get_BU_Disclosure_ProcessorHomePageData({ payload }) {
  try {
    const response = yield call(get_BU_Disclosure_ProcessorHomePageDataApi, payload);
    if (response.success) {
      yield put({
        type: GET_BU_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_BU_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_ERROR,
    });
  }
}

// GET BU Finance Director home page table data
async function get_BU_Finance_DirectorHomePageDataApi(params) {
  return await Axios.get('/get_bu_home_page_data_for_finance_director', { params });
}
function* handle_Get_BU_Finance_DirectorHomePageData({ payload }) {
  try {
    const response = yield call(get_BU_Finance_DirectorHomePageDataApi, payload);
    if (response.success) {
      yield put({
        type: GET_BU_FINANCE_DIRECTOR_HOME_PAGE_TABLE_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_BU_FINANCE_DIRECTOR_HOME_PAGE_TABLE_DATA_ERROR,
    });
  }
}

// GET BU ZONE CONTROL home page table data
async function get_BU_Zone_ControlHomePageDataApi(params) {
  return await Axios.get('/get_bu_home_page_data_for_zone_control', { params });
}
function* handle_Get_BU_Zone_ControlHomePageData({ payload }) {
  try {
    const response = yield call(get_BU_Zone_ControlHomePageDataApi, payload);
    if (response.success) {
      yield put({
        type: GET_BU_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_BU_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_ERROR,
    });
  }
}

// GET BU Zone VP home page table data
async function get_BU_Zone_VPHomePageDataApi(params) {
  return await Axios.get('/get_bu_home_page_data_for_zone_vp', { params });
}
function* handle_Get_BU_Zone_VPHomePageData({ payload }) {
  try {
    const response = yield call(get_BU_Zone_VPHomePageDataApi, payload);
    if (response.success) {
      yield put({
        type: GET_BU_ZONE_VP_HOME_PAGE_TABLE_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_BU_ZONE_VP_HOME_PAGE_TABLE_DATA_ERROR,
    });
  }
}

// Get BU-Zone Excom Member Home Page Data
async function get_BUZone_ExcomMemberHomePageDataApi(params) {
  return await Axios.get('/get_zone_home_page_data_for_excom_member', { params });
}
function* handle_Get_BUZone_ExcomMemberHomePageData({ payload }) {
  try {
    const response = yield call(get_BUZone_ExcomMemberHomePageDataApi, payload);
    if (response.success) {
      yield put({
        type: GET_BUZONE_EXCOM_MEMBER_HOME_PAGE_TABLE_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_BUZONE_EXCOM_MEMBER_HOME_PAGE_TABLE_DATA_ERROR,
    });
  }
}

//  GET BU-Zone Zone Legal Representative Home Page Data
async function get_BUZone_ZoneLegalRepresentativeHomePageDataApi(params) {
  return await Axios.get('/get_zone_home_page_data_for_zone_legal_rep', { params });
}
function* handle_Get_BUZone_ZoneLegalRepresentativeHomePageData({ payload }) {
  try {
    const response = yield call(get_BUZone_ZoneLegalRepresentativeHomePageDataApi, payload);
    if (response.success) {
      yield put({
        type: GET_BUZONE_ZONE_LEGAL_REPRESENTATIVE_HOME_PAGE_TABLE_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_BUZONE_ZONE_LEGAL_REPRESENTATIVE_HOME_PAGE_TABLE_DATA_ERROR,
    });
  }
}

//  GET BU-Zone Zone VP Home Page Data
async function get_BUZone_Zone_VPHomePageDataApi(params) {
  return await Axios.get('/get_zone_home_page_data_for_zone_vp', { params });
}
function* handle_Get_BUZone_Zone_VPHomePageData({ payload }) {
  try {
    const response = yield call(get_BUZone_Zone_VPHomePageDataApi, payload);
    if (response.success) {
      yield put({
        type: GET_BUZONE_ZONE_VP_HOME_PAGE_TABLE_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_BUZONE_ZONE_VP_HOME_PAGE_TABLE_DATA_ERROR,
    });
  }
}

//  GET BU-Zone Zone Control Home Page Data
async function get_BUZone_Zone_ControlHomePageDataApi(params) {
  return await Axios.get('/get_zone_home_page_data_for_zone_control', { params });
}
function* handle_Get_BUZone_Zone_ControlHomePageData({ payload }) {
  try {
    const response = yield call(get_BUZone_Zone_ControlHomePageDataApi, payload);
    if (response.success) {
      yield put({
        type: GET_BUZONE_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_BUZONE_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_ERROR,
    });
  }
}

//  GET BU-Zone Global Persona Home Page Data
async function get_BUZone_GlobalPersonaHomePageDataApi(params) {
  return await Axios.get('/get_zone_home_page_data_for_global', { params });
}
function* handle_Get_BUZone_GlobalPersonaHomePageData({ payload }) {
  try {
    const response = yield call(get_BUZone_GlobalPersonaHomePageDataApi, payload);
    if (response.success) {
      yield put({
        type: GET_BUZONE_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_BUZONE_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_ERROR,
    });
  }
}

// get Latest Function Draft Response
async function getLatestFunctionDraftResponseApi(params) {
  return await Axios.get('/get_functional_assessment_draft', { params });
}
function* handle_GetLatestFunctionDraftResponse({ payload }) {
  try {
    const response = yield call(getLatestFunctionDraftResponseApi, payload);
    if (response.success) {
      yield put({
        type: GET_LATEST_FUNCTION_DRAFT_RESPONSE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_LATEST_FUNCTION_DRAFT_RESPONSE_ERROR,
    });
  }
}

// add Or Update Function Draft Response
async function addOrUpdateFunctionDraftResponseApi(payload) {
  return await Axios.post('/save_functional_assessment_draft', payload);
}
function* updateAddOrUpdateFunctionDraftResponse({ payload }) {
  try {
    const response = yield call(addOrUpdateFunctionDraftResponseApi, payload);
    if (response.success) {
      yield put({
        type: ADD_OR_UPDATE_FUNCTION_DRAFT_RESPONSE_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Response Drafted Successfully!', 'success');

      // Clear the getLatestFunctionDraftResponse state
      yield put({ type: GET_LATEST_FUNCTION_DRAFT_RESPONSE_SUCCESS, payload: null });

      // Redirect the user to '/'
      yield put(push('/'));
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: ADD_OR_UPDATE_FUNCTION_DRAFT_RESPONSE_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

// get Function Submit Response
async function getFunctionSubmitResponseApi(params) {
  return await Axios.get('/get_functional_assessment_response', { params });
}
function* handle_GetFunctionSubmitResponse({ payload }) {
  try {
    const response = yield call(getFunctionSubmitResponseApi, payload);
    if (response.success) {
      yield put({
        type: GET_FUNCTION_SUBMIT_RESPONSE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_FUNCTION_SUBMIT_RESPONSE_ERROR,
    });
  }
}

// add Function Submit Response
async function addFunctionSubmitResponseApi(payload) {
  return await Axios.post('/save_functional_assessment_response', payload);
}
function* updateAddFunctionSubmitResponse({ payload }) {
  try {
    const response = yield call(addFunctionSubmitResponseApi, payload);
    if (response.success) {
      yield put({
        type: ADD_FUNCTION_SUBMIT_RESPONSE_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Response Submitted Successfully!', 'success');

      // Clear the get Latest Function Submitted Response state
      yield put({ type: GET_FUNCTION_SUBMIT_RESPONSE_SUCCESS, payload: null });
      // Redirect the user to '/'
      yield put(push('/'));
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: ADD_FUNCTION_SUBMIT_RESPONSE_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

// get Latest BU Draft Response
async function getLatestBUDraftResponseApi(params) {
  return await Axios.get('/get_bu_assessment_draft', { params });
}
function* handle_GetLatestBUDraftResponse({ payload }) {
  try {
    const response = yield call(getLatestBUDraftResponseApi, payload);
    if (response.success) {
      yield put({
        type: GET_LATEST_BU_DRAFT_RESPONSE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_LATEST_BU_DRAFT_RESPONSE_ERROR,
    });
  }
}

// add Or Update BU Draft Response
async function addOrUpdateBUDraftResponseApi(payload) {
  return await Axios.post('/save_bu_assessment_draft', payload);
}
function* updateAddOrUpdateBUDraftResponse({ payload }) {
  try {
    const response = yield call(addOrUpdateBUDraftResponseApi, payload);
    if (response.success) {
      yield put({
        type: ADD_OR_UPDATE_BU_DRAFT_RESPONSE_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Response Drafted Successfully!', 'success');

      // Clear the getLatestFunctionDraftResponse state
      yield put({ type: GET_LATEST_BU_DRAFT_RESPONSE_SUCCESS, payload: null });

      // Redirect the user to '/'
      yield put(push('/'));
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: ADD_OR_UPDATE_BU_DRAFT_RESPONSE_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

// get BU Submit Response
async function getBUSubmitResponseApi(params) {
  return await Axios.get('/get_bu_assessment_response', { params });
}
function* handle_GetBUSubmitResponse({ payload }) {
  try {
    const response = yield call(getBUSubmitResponseApi, payload);
    if (response.success) {
      yield put({
        type: GET_BU_SUBMIT_RESPONSE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_BU_SUBMIT_RESPONSE_ERROR,
    });
  }
}

// add BU Submit Response
async function addBUSubmitResponseApi(payload) {
  return await Axios.post('/save_bu_assessment_response', payload);
}
function* updateAddBUSubmitResponse({ payload }) {
  try {
    const response = yield call(addBUSubmitResponseApi, payload);
    if (response.success) {
      yield put({
        type: ADD_BU_SUBMIT_RESPONSE_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Response Submitted Successfully!', 'success');

      // Clear the get Latest Function Submitted Response state
      yield put({ type: GET_BU_SUBMIT_RESPONSE_SUCCESS, payload: null });
      // Redirect the user to '/'
      yield put(push('/'));
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: ADD_BU_SUBMIT_RESPONSE_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

// GET BU Section2 Signature Response data
async function getBUSection2SignatureResponseApi(params) {
  return await Axios.get('/get_bu_section2', { params });
}
function* handle_GetBUSection2SignatureResponseData({ payload }) {
  try {
    const response = yield call(getBUSection2SignatureResponseApi, payload);
    if (response.success) {
      yield put({
        type: GET_BU_SECTION2_SIGNATURE_RESPONSE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_BU_SECTION2_SIGNATURE_RESPONSE_ERROR,
    });
  }
}

// ADD BU Section2 Upload Mail Approval
async function addBUSection2UploadMailApprovalApi(payload) {
  return await Axios.post('/submit_bu_section2', payload);
}
function* handle_AddBUSection2UploadMailApprovalData({ payload }) {
  try {
    const { formData, event } = payload;
    const response = yield call(addBUSection2UploadMailApprovalApi, formData);
    if (response.success) {
      yield put({
        type: ADD_BU_SECTION2_UPLOAD_MAIL_APPROVAL_SUCCESS,
        payload: response.data,
      });
      if (event && event.onSuccess) {
        event.onSuccess(response.data);
      }
      Swal.fire('Done!', 'Email Attachment Uploded Successfully!', 'success');
    }
  } catch (error) {
    yield put({
      type: ADD_BU_SECTION2_UPLOAD_MAIL_APPROVAL_ERROR,
    });
    if (error?.response?.status === 400) {
      Swal.fire('Oops...', error?.response?.data?.data, 'error');
    } else if (error?.response?.status === 500) {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  }
}

// ADD BU Section2 Checkbox
async function addBUSection2CheckboxApi(payload) {
  return await Axios.post('/submit_bu_section2', payload);
}
function* handle_AddBUSection2CheckboxData({ payload }) {
  const { formData, event } = payload;
  try {
    const response = yield call(addBUSection2CheckboxApi, formData);
    console.log('there', response);
    if (response.success) {
      yield put({
        type: ADD_BU_SECTION2_CHECKBOX_SUCCESS,
        payload: response.data,
      });

      Swal.fire('Done!', 'Auto Authentication Successfully!', 'success');
    }
  } catch (error) {
    yield put({
      type: ADD_BU_SECTION2_CHECKBOX_ERROR,
    });
    if (error?.response?.status === 400) {
      Swal.fire('Oops...', error?.response?.data?.data, 'error');
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  }
}

// get BU Section 3 Response
async function getBUSection3ResponseApi(params) {
  return await Axios.get('/get_bu_section3_rba', { params });
}
function* handle_GetBUSection3Response({ payload }) {
  try {
    const response = yield call(getBUSection3ResponseApi, payload);
    if (response.success) {
      yield put({
        type: GET_BU_SECTION_3_RESPONSE_SUCCESS,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({
      type: GET_BU_SECTION_3_RESPONSE_ERROR,
    });
  }
}

// add BU Section 3 Response
async function addBUSection3ResponseApi(payload) {
  return await Axios.post('/add_bu_section3_rba', payload);
}
function* updateAddBUSection3Response({ payload }) {
  try {
    const response = yield call(addBUSection3ResponseApi, payload);
    if (response.success) {
      yield put({
        type: ADD_BU_SECTION_3_RESPONSE_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Response Submitted Successfully!', 'success');

      // Clear the get BU Section 3 Response state
      yield put({ type: GET_BU_SECTION_3_RESPONSE_SUCCESS, payload: null });
      // Redirect the user to '/'
      yield put(push('/'));
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: ADD_BU_SECTION_3_RESPONSE_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

// Approve BU Section 3 Response
async function approveBUSection3ResponseApi(payload) {
  return await Axios.post('/approve_bu_section3_rba', payload);
}
function* updateApproveBUSection3Response({ payload }) {
  try {
    const response = yield call(approveBUSection3ResponseApi, payload);
    if (response.success) {
      yield put({
        type: APPROVE_BU_SECTION_3_RESPONSE_SUCCESS,
        payload: response.data,
      });
      Swal.fire('Done!', 'Response Submitted Successfully!', 'success');

      // Clear the get BU Section 3 Response state
      yield put({ type: GET_BU_SECTION_3_RESPONSE_SUCCESS, payload: null });
      // Redirect the user to '/'
      yield put(push('/'));
    } else {
      Swal.fire('Oops...', 'Something Went Wrong', 'error');
    }
  } catch (error) {
    yield put({
      type: APPROVE_BU_SECTION_3_RESPONSE_ERROR,
      // error: getSimplifiedError(error),
    });
    Swal.fire('Oops...', 'Something Went Wrong', 'error');
  }
}

export default all([
  takeLatest(
    GET_FUNCTION_RECIPIENT_HOME_PAGE_TABLE_DATA_REQUEST,
    handle_GetFunctionRecipientHomePageData,
  ),
  takeLatest(
    GET_FUNCTION_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
    handle_GetFunctionGlobalPersonaHomePageData,
  ),
  takeLatest(
    GET_BU_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
    handle_Get_BU_GlobalPersonaHomePageData,
  ),
  takeLatest(GET_BU_BU_HEAD_HOME_PAGE_TABLE_DATA_REQUEST, handle_Get_BU_BU_HeadHomePageData),
  takeLatest(
    GET_BU_DISCLOSURE_PROCESSOR_HOME_PAGE_TABLE_DATA_REQUEST,
    handle_Get_BU_Disclosure_ProcessorHomePageData,
  ),
  takeLatest(
    GET_BU_FINANCE_DIRECTOR_HOME_PAGE_TABLE_DATA_REQUEST,
    handle_Get_BU_Finance_DirectorHomePageData,
  ),
  takeLatest(
    GET_BU_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_REQUEST,
    handle_Get_BU_Zone_ControlHomePageData,
  ),
  takeLatest(GET_BU_ZONE_VP_HOME_PAGE_TABLE_DATA_REQUEST, handle_Get_BU_Zone_VPHomePageData),
  takeLatest(
    GET_BUZONE_ZONE_LEGAL_REPRESENTATIVE_HOME_PAGE_TABLE_DATA_REQUEST,
    handle_Get_BUZone_ZoneLegalRepresentativeHomePageData,
  ),
  takeLatest(
    GET_BUZONE_EXCOM_MEMBER_HOME_PAGE_TABLE_DATA_REQUEST,
    handle_Get_BUZone_ExcomMemberHomePageData,
  ),
  takeLatest(
    GET_BUZONE_ZONE_CONTROL_HOME_PAGE_TABLE_DATA_REQUEST,
    handle_Get_BUZone_Zone_ControlHomePageData,
  ),
  takeLatest(
    GET_BUZONE_ZONE_VP_HOME_PAGE_TABLE_DATA_REQUEST,
    handle_Get_BUZone_Zone_VPHomePageData,
  ),
  takeLatest(
    GET_BUZONE_GLOBAL_PERSONA_HOME_PAGE_TABLE_DATA_REQUEST,
    handle_Get_BUZone_GlobalPersonaHomePageData,
  ),
  takeLatest(ADD_FUNCTION_SUBMIT_RESPONSE_REQUEST, updateAddFunctionSubmitResponse),
  takeLatest(GET_FUNCTION_SUBMIT_RESPONSE_REQUEST, handle_GetFunctionSubmitResponse),
  takeLatest(ADD_OR_UPDATE_FUNCTION_DRAFT_RESPONSE_REQUEST, updateAddOrUpdateFunctionDraftResponse),
  takeLatest(GET_LATEST_FUNCTION_DRAFT_RESPONSE_REQUEST, handle_GetLatestFunctionDraftResponse),
  takeLatest(ADD_BU_SUBMIT_RESPONSE_REQUEST, updateAddBUSubmitResponse),
  takeLatest(GET_BU_SUBMIT_RESPONSE_REQUEST, handle_GetBUSubmitResponse),
  takeLatest(ADD_OR_UPDATE_BU_DRAFT_RESPONSE_REQUEST, updateAddOrUpdateBUDraftResponse),
  takeLatest(GET_LATEST_BU_DRAFT_RESPONSE_REQUEST, handle_GetLatestBUDraftResponse),
  takeLatest(GET_BU_SECTION2_SIGNATURE_RESPONSE_REQUEST, handle_GetBUSection2SignatureResponseData),
  takeLatest(ADD_BU_SECTION2_CHECKBOX_REQUEST, handle_AddBUSection2CheckboxData),
  takeLatest(
    ADD_BU_SECTION2_UPLOAD_MAIL_APPROVAL_REQUEST,
    handle_AddBUSection2UploadMailApprovalData,
  ),
  takeLatest(GET_BU_SECTION_3_RESPONSE_REQUEST, handle_GetBUSection3Response),
  takeLatest(ADD_BU_SECTION_3_RESPONSE_REQUEST, updateAddBUSection3Response),
  takeLatest(APPROVE_BU_SECTION_3_RESPONSE_REQUEST, updateApproveBUSection3Response),
]);

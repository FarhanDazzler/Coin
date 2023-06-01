export const SAVE_ANS = 'RESET_BLOCK_ASSESSMENT';
export const SAVE_ANS_SUCCESS = 'SAVE_ANS_SUCCESS';
export const SAVE_ANS_ERROR = 'SAVE_ANS_ERROR';

export const GET_ASSESSMENT_RESPONSE_REQUEST = 'GET_ASSESSMENT_RESPONSE_REQUEST';
export const GET_ASSESSMENT_RESPONSE_SUCCESS = 'GET_ASSESSMENT_RESPONSE_SUCCESS';
export const GET_ASSESSMENT_RESPONSE_ERROR = 'GET_ASSESSMENT_RESPONSE_ERROR';

export const GET_CONTROL_RESPONSE_REQUEST = 'GET_CONTROL_RESPONSE_REQUEST';
export const GET_CONTROL_RESPONSE_SUCCESS = 'GET_CONTROL_RESPONSE_SUCCESS';
export const GET_CONTROL_RESPONSE_ERROR = 'GET_CONTROL_RESPONSE_ERROR';

export const GET_QUESTIONS_REQUEST = 'GET_QUESTIONS_REQUEST';
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS';
export const GET_QUESTIONS_ERROR = 'GET_QUESTIONS_ERROR';

export const UPDATE_ASSESSMENT_RESPONSE_REQUEST = 'UPDATE_ASSESSMENT_RESPONSE_REQUEST';
export const UPDATE_ASSESSMENT_RESPONSE_SUCCESS = 'UPDATE_ASSESSMENT_RESPONSE_SUCCESS';
export const UPDATE_ASSESSMENT_RESPONSE_ERROR = 'UPDATE_ASSESSMENT_RESPONSE_ERROR';

export const ADD_ASSESSMENT_RESPONSE_REQUEST = 'ADD_ASSESSMENT_RESPONSE_REQUEST';
export const ADD_ASSESSMENT_RESPONSE_SUCCESS = 'ADD_ASSESSMENT_RESPONSE_SUCCESS';
export const ADD_ASSESSMENT_RESPONSE_ERROR = 'ADD_ASSESSMENT_RESPONSE_ERROR';

export const ADD_ASSESSMENT_SECTION_2_REQUEST = 'ADD_ASSESSMENT_SECTION_2_REQUEST';
export const ADD_ASSESSMENT_SECTION_2_SUCCESS = 'ADD_ASSESSMENT_SECTION_2_SUCCESS';
export const ADD_ASSESSMENT_SECTION_2_ERROR = 'ADD_ASSESSMENT_SECTION_2_ERROR';

export const GET_ASSESSMENT_SECTION_2_REQUEST = 'GET_ASSESSMENT_SECTION_2_REQUEST';
export const GET_ASSESSMENT_SECTION_2_SUCCESS = 'GET_ASSESSMENT_SECTION_2_SUCCESS';
export const GET_ASSESSMENT_SECTION_2_ERROR = 'GET_ASSESSMENT_SECTION_2_ERROR';

export const GET_KPI_RESULT_REQUEST = 'GET_KPI_RESULT_REQUEST';
export const GET_KPI_RESULT_SUCCESS = 'GET_KPI_RESULT_SUCCESS';
export const GET_KPI_RESULT_ERROR = 'GET_KPI_RESULT_ERROR';

export const GET_DRAFT_RESPONSE_REQUEST = 'GET_DRAFT_RESPONSE_REQUEST';
export const GET_DRAFT_RESPONSE_SUCCESS = 'GET_DRAFT_RESPONSE_SUCCESS';
export const GET_DRAFT_RESPONSE_ERROR = 'GET_DRAFT_RESPONSE_ERROR';

export const ADD_UPDATE_DRAFT_RESPONSE_REQUEST = 'ADD_UPDATE_DRAFT_RESPONSE_REQUEST';
export const ADD_UPDATE_DRAFT_RESPONSE_SUCCESS = 'ADD_UPDATE_DRAFT_RESPONSE_SUCCESS';
export const ADD_UPDATE_DRAFT_RESPONSE_ERROR = 'ADD_UPDATE_DRAFT_RESPONSE_ERROR';

export const GET_FINAL_SUBMIT_RESPONSE_REQUEST = 'GET_FINAL_SUBMIT_RESPONSE_REQUEST';
export const GET_FINAL_SUBMIT_RESPONSE_SUCCESS = 'GET_FINAL_SUBMIT_RESPONSE_SUCCESS';
export const GET_FINAL_SUBMIT_RESPONSE_ERROR = 'GET_FINAL_SUBMIT_RESPONSE_ERROR';

export const ADD_UPDATE_FINAL_SUBMIT_RESPONSE_REQUEST = 'ADD_UPDATE_FINAL_SUBMIT_RESPONSE_REQUEST';
export const ADD_UPDATE_FINAL_SUBMIT_RESPONSE_SUCCESS = 'ADD_UPDATE_FINAL_SUBMIT_RESPONSE_SUCCESS';
export const ADD_UPDATE_FINAL_SUBMIT_RESPONSE_ERROR = 'ADD_UPDATE_FINAL_SUBMIT_RESPONSE_ERROR';

export const ADD_OR_UPDATE_DRAFT_REQUEST = 'ADD_OR_UPDATE_DRAFT_REQUEST';
export const ADD_OR_UPDATE_DRAFT_SUCCESS = 'ADD_OR_UPDATE_DRAFT_SUCCESS';
export const ADD_OR_UPDATE_DRAFT_ERROR = 'ADD_OR_UPDATE_DRAFT_ERROR';

export const GET_LATEST_DRAFT_REQUEST = 'GET_LATEST_DRAFT_REQUEST';
export const GET_LATEST_DRAFT_SUCCESS = 'GET_LATEST_DRAFT_SUCCESS';
export const GET_LATEST_DRAFT_ERROR = 'GET_LATEST_DRAFT_ERROR';

export const RESET_BLOCK_ASSESSMENT = 'RESET_BLOCK_ASSESSMENT';
export const RESET_FLAGS_ASSESSMENT = 'RESET_FLAGS_ASSESSMENT';

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  sectionAns: null,
  questions: { ...block, data: [] },
  getResponse: { ...block, data: null },
  addResponse: { ...block },
  getResponseSection2: { ...block, data: [] },
  addResponseSection2: { ...block },
  updateResponse: { ...block },
  kpiResult: { ...block, data: [] },
  controlData: {},
  getDraftResponse: { ...block, data: [] },
  addUpdateDraftResponse: { ...block, data: [] },
  getFinalSubmitResponse: { ...block, data: [] },
  addUpdateFinalSubmitResponse: { ...block, data: [] },
  addOrEditUpdateDraft: { ...block },
  getLatestDraft: { ...block, data: { s1: null, s2: null, s3: null } },
};

export const AssessmentReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case SAVE_ANS:
      return {
        ...state,
        sectionAns: {
          ...state.sectionAns,
          ...payload,
        },
      };

    case GET_LATEST_DRAFT_REQUEST:
      return {
        ...state,
        getLatestDraft: { ...state.getLatestDraft, loading: true },
      };
    case GET_LATEST_DRAFT_SUCCESS:
      if (typeof payload.data === 'string') {
        return {
          ...state,
          getLatestDraft: { ...state.getLatestDraft, loading: true },
        };
      }
      return {
        ...state,
        getLatestDraft: { ...state.getLatestDraft, data: payload.data, loading: true },
      };
    case GET_LATEST_DRAFT_ERROR:
      return {
        ...state,
        getLatestDraft: { ...state.getLatestDraft, loading: true },
      };

    case ADD_OR_UPDATE_DRAFT_REQUEST:
      return {
        ...state,
        addOrEditUpdateDraft: { ...state.addOrEditUpdateDraft, loading: true },
      };
    case ADD_OR_UPDATE_DRAFT_SUCCESS:
      return {
        ...state,
        addOrEditUpdateDraft: { ...state.addOrEditUpdateDraft, loading: false },
      };
    case ADD_OR_UPDATE_DRAFT_ERROR:
      return {
        ...state,
        addOrEditUpdateDraft: { ...state.addOrEditUpdateDraft, loading: false },
      };

    case GET_ASSESSMENT_RESPONSE_REQUEST:
      return {
        ...state,
        getResponse: { ...state.getResponse, loading: true },
      };
    case GET_ASSESSMENT_RESPONSE_SUCCESS:
      // const currentResp = payload?.data?.find((d) => d.Control_ID === payload.Control_ID);
      return {
        ...state,
        getResponse: {
          ...state.getResponse,
          loading: false,
          data: {
            ...payload.data,
            Latest_response: payload.data.latest_response,
            latest_response: {},
          },
        },
      };
    // const dataStr = JSON.parse(currentResp?.Response_Data);
    // const s1Data = new Map(Object.entries(dataStr.s1));
    // const s2Data = JSON.parse(dataStr.s2);
    // const s3Data = new Map(Object.entries(dataStr.s3));
    // return {
    //   ...state,
    //   getResponse: {
    //     ...state.getResponse,
    //     loading: false,
    //     data: {
    //       ...state.getResponse.data,
    //       s1: s1Data,
    //       s2: s2Data,
    //       s3: s3Data,
    //     },
    //   },
    // };
    case GET_ASSESSMENT_RESPONSE_ERROR:
      return {
        ...state,
        getResponse: { ...state.getResponse, loading: false },
      };
    case GET_CONTROL_RESPONSE_REQUEST:
      return {
        ...state,
        controlData: { ...payload, loading: false },
      };

    case UPDATE_ASSESSMENT_RESPONSE_REQUEST:
      return {
        ...state,
        updateResponse: { ...state.updateResponse, loading: true },
      };
    case UPDATE_ASSESSMENT_RESPONSE_SUCCESS:
      return {
        ...state,
        updateResponse: { ...state.updateResponse, loading: false },
      };
    case UPDATE_ASSESSMENT_RESPONSE_ERROR:
      return {
        ...state,
        updateResponse: { ...state.updateResponse, loading: false },
      };

    case GET_ASSESSMENT_SECTION_2_REQUEST:
      return {
        ...state,
        getResponseSection2: { ...state.getResponseSection2, loading: true },
      };
    case GET_ASSESSMENT_SECTION_2_SUCCESS:
      return {
        ...state,
        getResponseSection2: { ...state.getResponseSection2, data: payload.data, loading: false },
      };
    case GET_ASSESSMENT_SECTION_2_ERROR:
      return {
        ...state,
        getResponseSection2: { ...state.getResponseSection2, loading: false },
      };

    case ADD_ASSESSMENT_SECTION_2_REQUEST:
      return {
        ...state,
        addResponseSection2: { ...state.addResponseSection2, loading: true },
      };
    case ADD_ASSESSMENT_SECTION_2_SUCCESS:
      return {
        ...state,
        addResponseSection2: { ...state.addResponseSection2, loading: false },
      };
    case ADD_ASSESSMENT_SECTION_2_ERROR:
      return {
        ...state,
        addResponseSection2: { ...state.addResponseSection2, loading: false },
      };

    case ADD_ASSESSMENT_RESPONSE_REQUEST:
      return {
        ...state,
        addResponse: { ...state.addResponse, loading: true },
      };
    case ADD_ASSESSMENT_RESPONSE_SUCCESS:
      return {
        ...state,
        addResponse: { ...state.addResponse, loading: false },
      };
    case ADD_ASSESSMENT_RESPONSE_ERROR:
      return {
        ...state,
        addResponse: { ...state.addResponse, loading: false },
      };

    case GET_QUESTIONS_REQUEST:
      return {
        ...state,
        questions: { ...state.questions, loading: true },
      };
    case GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        questions: { ...state.questions, data: payload, loading: false },
      };
    case GET_QUESTIONS_ERROR:
      return {
        ...state,
        questions: { ...state.questions, loading: false },
      };

    case GET_KPI_RESULT_REQUEST:
      return {
        ...state,
        kpiResult: { ...state.kpiResult, loading: true },
      };
    case GET_KPI_RESULT_SUCCESS:
      return {
        ...state,
        kpiResult: { ...state.kpiResult, data: payload, loading: false },
      };
    case GET_KPI_RESULT_ERROR:
      return {
        ...state,
        kpiResult: { ...state.kpiResult, loading: false },
      };

    // Get Draft response data
    case GET_DRAFT_RESPONSE_REQUEST:
      return {
        ...state,
        getDraftResponse: { ...state.getDraftResponse, loading: true },
      };
    case GET_DRAFT_RESPONSE_SUCCESS:
      return {
        ...state,
        getDraftResponse: { ...state.getDraftResponse, data: payload, loading: false },
      };
    case GET_DRAFT_RESPONSE_ERROR:
      return {
        ...state,
        getDraftResponse: { ...state.getDraftResponse, loading: false },
      };

    // Add and Update Draft response data
    case ADD_UPDATE_DRAFT_RESPONSE_REQUEST:
      return {
        ...state,
        addUpdateDraftResponse: { ...state.addUpdateDraftResponse, loading: true },
      };
    case ADD_UPDATE_DRAFT_RESPONSE_SUCCESS:
      return {
        ...state,
        addUpdateDraftResponse: { ...state.addUpdateDraftResponse, data: payload, loading: false },
      };
    case ADD_UPDATE_DRAFT_RESPONSE_ERROR:
      return {
        ...state,
        addUpdateDraftResponse: { ...state.addUpdateDraftResponse, loading: false },
      };

    // Get Final Submit response data
    case GET_FINAL_SUBMIT_RESPONSE_REQUEST:
      return {
        ...state,
        getFinalSubmitResponse: { ...state.getFinalSubmitResponse, loading: true },
      };
    case GET_FINAL_SUBMIT_RESPONSE_SUCCESS:
      return {
        ...state,
        getFinalSubmitResponse: { ...state.getFinalSubmitResponse, data: payload, loading: false },
      };
    case GET_FINAL_SUBMIT_RESPONSE_ERROR:
      return {
        ...state,
        getFinalSubmitResponse: { ...state.getFinalSubmitResponse, loading: false },
      };

    // Add and Update Final Submit response data
    case ADD_UPDATE_FINAL_SUBMIT_RESPONSE_REQUEST:
      return {
        ...state,
        addUpdateFinalSubmitResponse: { ...state.addUpdateFinalSubmitResponse, loading: true },
      };
    case ADD_UPDATE_FINAL_SUBMIT_RESPONSE_SUCCESS:
      return {
        ...state,
        addUpdateFinalSubmitResponse: {
          ...state.addUpdateFinalSubmitResponse,
          data: payload,
          loading: false,
        },
      };
    case ADD_UPDATE_FINAL_SUBMIT_RESPONSE_ERROR:
      return {
        ...state,
        addUpdateFinalSubmitResponse: { ...state.addUpdateFinalSubmitResponse, loading: false },
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

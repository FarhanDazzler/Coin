export const GET_SECTION_3_MICS_REQUEST = 'GET_SECTION_3_MICS_REQUEST';
export const GET_SECTION_3_MICS_SUCCESS = 'GET_SECTION_3_MICS_SUCCESS';
export const GET_SECTION_3_MICS_ERROR = 'GET_SECTION_3_MICS_ERROR';

export const GET_SECTION_3_MICS_ADD_REQUEST = 'GET_SECTION_3_MICS_ADD_REQUEST';
export const GET_SECTION_3_MICS_ADD_SUCCESS = 'GET_SECTION_3_MICS_ADD_SUCCESS';
export const GET_SECTION_3_MICS_ADD_ERROR = 'GET_SECTION_3_MICS_ADD_ERROR';

export const GET_SECTION_3_MICS_UPDATE_REQUEST = 'GET_SECTION_3_MICS_UPDATE_REQUEST';
export const GET_SECTION_3_MICS_UPDATE_SUCCESS = 'GET_SECTION_3_MICS_UPDATE_SUCCESS';
export const GET_SECTION_3_MICS_UPDATE_ERROR = 'GET_SECTION_3_MICS_UPDATE_ERROR';

export const GET_SECTION_3_MICS_DELETE_REQUEST = 'GET_SECTION_3_MICS_DELETE_REQUEST';
export const GET_SECTION_3_MICS_DELETE_SUCCESS = 'GET_SECTION_3_MICS_DELETE_SUCCESS';
export const GET_SECTION_3_MICS_DELETE_ERROR = 'GET_SECTION_3_MICS_DELETE_ERROR';

export const RESET_BLOCK_QUESTIONS = 'RESET_BLOCK_QUESTIONS';
export const RESET_FLAGS_QUESTIONS = 'RESET_FLAGS_QUESTIONS';

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  question: { ...block, data: [], Level: {} },
  questionAdd: { ...block },
  questionUpdate: { ...block },
  questionDelete: { ...block },
};

export const QuestionsReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case GET_SECTION_3_MICS_REQUEST:
      return {
        ...state,
        question: { ...state.question, loading: true },
      };
    case GET_SECTION_3_MICS_SUCCESS:
      return {
        ...state,
        question: {
          ...state.question,
          data: payload.data,
          Level: { ...state.question.Level, ...payload.Level },
          loading: false,
        },
      };
    case GET_SECTION_3_MICS_ERROR:
      return {
        ...state,
        question: { ...state.question, loading: false },
      };

    case GET_SECTION_3_MICS_ADD_REQUEST:
      return {
        ...state,
        questionAdd: { ...state.questionAdd, loading: true },
      };
    case GET_SECTION_3_MICS_ADD_SUCCESS:
      return {
        ...state,
        questionAdd: { ...state.questionAdd, loading: false },
      };
    case GET_SECTION_3_MICS_ADD_ERROR:
      return {
        ...state,
        questionAdd: { ...state.questionAdd, loading: false },
      };

    case GET_SECTION_3_MICS_UPDATE_REQUEST:
      return {
        ...state,
        questionUpdate: { ...state.questionUpdate, loading: true },
      };
    case GET_SECTION_3_MICS_UPDATE_SUCCESS:
      return {
        ...state,
        questionUpdate: { ...state.questionUpdate, loading: false },
      };
    case GET_SECTION_3_MICS_UPDATE_ERROR:
      return {
        ...state,
        questionUpdate: { ...state.questionUpdate, loading: false },
      };

    case GET_SECTION_3_MICS_DELETE_REQUEST:
      return {
        ...state,
        questionDelete: { ...state.questionDelete, loading: true },
      };
    case GET_SECTION_3_MICS_DELETE_SUCCESS:
      return {
        ...state,
        questionDelete: { ...state.questionDelete, loading: false },
      };
    case GET_SECTION_3_MICS_DELETE_ERROR:
      return {
        ...state,
        questionDelete: { ...state.questionDelete, loading: false },
      };

    //reset block with flag and data
    case RESET_BLOCK_QUESTIONS:
      return {
        ...state,
        [payload.blockType]: {
          ...state[payload.blockType],
          ...initialState[payload.blockType],
        },
      };

    //reset only flags(block)
    case RESET_FLAGS_QUESTIONS:
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

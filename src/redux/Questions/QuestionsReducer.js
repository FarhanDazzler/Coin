export const GET_SECTION_1_MICS_REQUEST = 'GET_SECTION_1_MICS_REQUEST';
export const GET_SECTION_1_MICS_SUCCESS = 'GET_SECTION_1_MICS_SUCCESS';
export const GET_SECTION_1_MICS_ERROR = 'GET_SECTION_1_MICS_ERROR';

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
  question1: { ...block, data: [] },
  question3: { ...block, data: [], Level: {} },
  question3Add: { ...block },
  question3Update: { ...block },
  question3Delete: { ...block },
};

export const QuestionsReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case GET_SECTION_1_MICS_REQUEST:
      if (state.question1.data.length > 0) {
        return { ...state };
      }
      return {
        ...state,
        question1: { ...state.question1, loading: true },
      };
    case GET_SECTION_1_MICS_SUCCESS:
      return {
        ...state,
        question1: {
          ...state.question1,
          data: payload.data,
          loading: false,
        },
      };
    case GET_SECTION_1_MICS_ERROR:
      return {
        ...state,
        question3: { ...state.question1, loading: false },
      };

    case GET_SECTION_3_MICS_REQUEST:
      return {
        ...state,
        question3: { ...state.question3, loading: true },
      };
    case GET_SECTION_3_MICS_SUCCESS:
      return {
        ...state,
        question3: {
          ...state.question3,
          data: payload.data,
          Level: { ...state.question3.Level, ...payload.Level },
          loading: false,
        },
      };
    case GET_SECTION_3_MICS_ERROR:
      return {
        ...state,
        question3: { ...state.question3, loading: false },
      };

    case GET_SECTION_3_MICS_ADD_REQUEST:
      return {
        ...state,
        question3Add: { ...state.question3Add, loading: true },
      };
    case GET_SECTION_3_MICS_ADD_SUCCESS:
      return {
        ...state,
        question3Add: { ...state.question3Add, loading: false },
      };
    case GET_SECTION_3_MICS_ADD_ERROR:
      return {
        ...state,
        question3Add: { ...state.question3Add, loading: false },
      };

    case GET_SECTION_3_MICS_UPDATE_REQUEST:
      return {
        ...state,
        question3Update: { ...state.question3Update, loading: true },
      };
    case GET_SECTION_3_MICS_UPDATE_SUCCESS:
      return {
        ...state,
        question3Update: { ...state.question3Update, loading: false },
      };
    case GET_SECTION_3_MICS_UPDATE_ERROR:
      return {
        ...state,
        question3Update: { ...state.question3Update, loading: false },
      };

    case GET_SECTION_3_MICS_DELETE_REQUEST:
      return {
        ...state,
        question3Delete: { ...state.question3Delete, loading: true },
      };
    case GET_SECTION_3_MICS_DELETE_SUCCESS:
      return {
        ...state,
        question3Delete: { ...state.question3Delete, loading: false },
      };
    case GET_SECTION_3_MICS_DELETE_ERROR:
      return {
        ...state,
        question3Delete: { ...state.question3Delete, loading: false },
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

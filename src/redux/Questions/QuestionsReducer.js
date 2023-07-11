export const GET_SECTION_1_MICS_REQUEST = 'GET_SECTION_1_MICS_REQUEST';
export const GET_SECTION_1_MICS_SUCCESS = 'GET_SECTION_1_MICS_SUCCESS';
export const GET_SECTION_1_MICS_ERROR = 'GET_SECTION_1_MICS_ERROR';

export const ADD_SECTION_1_MICS_REQUEST = 'ADD_SECTION_1_MICS_REQUEST';
export const ADD_SECTION_1_MICS_SUCCESS = 'ADD_SECTION_1_MICS_SUCCESS';
export const ADD_SECTION_1_MICS_ERROR = 'ADD_SECTION_1_MICS_ERROR';

export const UPDATE_SECTION_1_MICS_REQUEST = 'UPDATE_SECTION_1_MICS_REQUEST';
export const UPDATE_SECTION_1_MICS_SUCCESS = 'UPDATE_SECTION_1_MICS_SUCCESS';
export const UPDATE_SECTION_1_MICS_ERROR = 'UPDATE_SECTION_1_MICS_ERROR';

export const DELETE_SECTION_1_MICS_REQUEST = 'DELETE_SECTION_1_MICS_REQUEST';
export const DELETE_SECTION_1_MICS_SUCCESS = 'DELETE_SECTION_1_MICS_SUCCESS';
export const DELETE_SECTION_1_MICS_ERROR = 'DELETE_SECTION_1_MICS_ERROR';

export const ADD_SECTION_1_OPTION_MICS_REQUEST = 'ADD_SECTION_OPTION_1_MICS_REQUEST';
export const ADD_SECTION_1_OPTION_MICS_SUCCESS = 'ADD_SECTION_OPTION_1_MICS_SUCCESS';
export const ADD_SECTION_1_OPTION_MICS_ERROR = 'ADD_SECTION_1_OPTION_MICS_ERROR';

export const UPDATE_SECTION_1_MICS_OPTION_REQUEST = 'UPDATE_SECTION_1_MICS_OPTION_REQUEST';
export const UPDATE_SECTION_1_MICS_OPTION_SUCCESS = 'UPDATE_SECTION_1_MICS_OPTION_SUCCESS';
export const UPDATE_SECTION_1_MICS_OPTION_ERROR = 'UPDATE_SECTION_1_MICS_OPTION_ERROR';

export const DELETE_OPTION_SECTION_1_MICS_REQUEST = 'DELETE_OPTION_SECTION_1_MICS_REQUEST';
export const DELETE_OPTION_SECTION_1_MICS_SUCCESS = 'DELETE_OPTION_SECTION_1_MICS_SUCCESS';
export const DELETE_OPTION_SECTION_1_MICS_ERROR = 'DELETE_OPTION_SECTION_1_MICS_ERROR';

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

export const GET_REPOSITORY_OF_CONTROL_ID_DATA_REQUEST =
  'GET_REPOSITORY_OF_CONTROL_ID_DATA_REQUEST';
export const GET_REPOSITORY_OF_CONTROL_ID_DATA_SUCCESS =
  'GET_REPOSITORY_OF_CONTROL_ID_DATA_SUCCESS';
export const GET_REPOSITORY_OF_CONTROL_ID_DATA_ERROR = 'GET_REPOSITORY_OF_CONTROL_ID_DATA_ERROR';

export const RESET_BLOCK_QUESTIONS = 'RESET_BLOCK_QUESTIONS';
export const RESET_FLAGS_QUESTIONS = 'RESET_FLAGS_QUESTIONS';
export const RESET_SECTION_3_REQUEST = 'RESET_SECTION_3_REQUEST';

export const GET_CONTROL_NAME_FROM_CONTROL_ID_REQUEST = 'GET_CONTROL_NAME_FROM_CONTROL_ID_REQUEST';
export const GET_CONTROL_NAME_FROM_CONTROL_ID_SUCCESS = 'GET_CONTROL_NAME_FROM_CONTROL_ID_SUCCESS';
export const GET_CONTROL_NAME_FROM_CONTROL_ID_ERROR = 'GET_CONTROL_NAME_FROM_CONTROL_ID_ERROR';

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  question1: { ...block, data: [] },
  question1Add: { ...block },
  question1Update: { ...block },
  question1Delete: { ...block },
  question1OptionDelete: { ...block },
  question1Option: { ...block },
  question1OptionUpdate: { ...block },
  question1EditLoadingList: [],
  question3: { ...block, data: [], Level: {} },
  question3Add: { ...block },
  question3Update: { ...block },
  question3Delete: { ...block },
  getRepositoryOfControlID: { ...block, data: [] },
  controlNameFromControlId: { ...block, data: [] },
};

export const QuestionsReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    case GET_SECTION_1_MICS_REQUEST:
      if (state.question1.data.length > 0 && !payload.disabledLoading) {
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

    case ADD_SECTION_1_MICS_REQUEST:
      return {
        ...state,
        question1Add: { ...state.question1Add, loading: true },
        question1: { ...state.question1, loading: true },
      };
    case ADD_SECTION_1_MICS_SUCCESS:
      return {
        ...state,
        question1Add: {
          ...state.question1Add,
          loading: false,
        },
      };
    case ADD_SECTION_1_MICS_ERROR:
      return {
        ...state,
        question1Add: { ...state.question1Add, loading: false },
      };

    case UPDATE_SECTION_1_MICS_REQUEST:
      return {
        ...state,
        question1Update: { ...state.question1Update, loading: true },
        question1EditLoadingList: [...state.question1EditLoadingList, payload.loadingId],
      };
    case UPDATE_SECTION_1_MICS_SUCCESS:
      const filterUpdateSectionList = state.question1EditLoadingList.filter(
        (d) => d !== payload.loadingId,
      );
      return {
        ...state,
        question1Update: {
          ...state.question1Update,
          loading: false,
        },
        question1EditLoadingList: filterUpdateSectionList,
      };
    case UPDATE_SECTION_1_MICS_ERROR:
      const filterUpdateSectionListError = state.question1EditLoadingList.filter(
        (d) => d !== payload.loadingId,
      );
      return {
        ...state,
        question1Update: { ...state.question1Update, loading: false },
        question1EditLoadingList: filterUpdateSectionListError,
      };

    case ADD_SECTION_1_OPTION_MICS_REQUEST:
      return {
        ...state,
        question1Option: { ...state.question1Option, loading: true },
        question1EditLoadingList: [...state.question1EditLoadingList, payload.loadingId],
      };
    case ADD_SECTION_1_OPTION_MICS_SUCCESS:
      const filterList = state.question1EditLoadingList.filter((d) => d !== payload.loadingId);
      return {
        ...state,
        question1Option: {
          ...state.question1Option,
          loading: false,
        },
        question1EditLoadingList: filterList,
      };
    case ADD_SECTION_1_OPTION_MICS_ERROR:
      const filterErrorList = state.question1EditLoadingList.filter((d) => d !== payload.loadingId);
      return {
        ...state,
        question1Option: { ...state.question1Option, loading: false },
        question1EditLoadingList: filterErrorList,
      };

    case UPDATE_SECTION_1_MICS_OPTION_REQUEST:
      return {
        ...state,
        question1OptionUpdate: { ...state.question1OptionUpdate, loading: true },
        question1EditLoadingList: [...state.question1EditLoadingList, payload.loadingId],
      };
    case UPDATE_SECTION_1_MICS_OPTION_SUCCESS:
      const filterUpdateList = state.question1EditLoadingList.filter(
        (d) => d !== payload.loadingId,
      );
      return {
        ...state,
        question1OptionUpdate: {
          ...state.question1OptionUpdate,
          loading: false,
        },
        question1EditLoadingList: filterUpdateList,
      };
    case UPDATE_SECTION_1_MICS_OPTION_ERROR:
      const filterUpdateErrorList = state.question1EditLoadingList.filter(
        (d) => d !== payload.loadingId,
      );
      return {
        ...state,
        question1EditLoadingList: filterUpdateErrorList,
        question1OptionUpdate: { ...state.question1OptionUpdate, loading: false },
      };

    case DELETE_OPTION_SECTION_1_MICS_REQUEST:
      return {
        ...state,
        question1OptionDelete: { ...state.question1OptionDelete, loading: true },
        // question1EditLoadingList: [...state.question1EditLoadingList, payload.loadingId],
      };
    case DELETE_OPTION_SECTION_1_MICS_SUCCESS:
      const filterDeleteList = state.question1EditLoadingList.filter(
        (d) => d !== payload.loadingId,
      );
      return {
        ...state,
        question1EditLoadingList: filterDeleteList,
        question1OptionDelete: {
          ...state.question1OptionDelete,
          loading: false,
        },
      };
    case DELETE_OPTION_SECTION_1_MICS_ERROR:
      const filterDeleteErrorList = state.question1EditLoadingList.filter(
        (d) => d !== payload.loadingId,
      );
      return {
        ...state,
        question1OptionDelete: { ...state.question1OptionDelete, loading: false },
        question1EditLoadingList: filterDeleteErrorList,
      };

    case DELETE_SECTION_1_MICS_REQUEST:
      const deleteUpdateArray = state.question1.data.filter((val) => val.q_id !== payload.q_id);
      return {
        ...state,
        question1Delete: { ...state.question1Delete, loading: true },
        question1: { ...state.question1, data: deleteUpdateArray },
      };
    case DELETE_SECTION_1_MICS_SUCCESS:
      return {
        ...state,
        question1Delete: {
          ...state.question1Delete,
          loading: false,
        },
      };
    case DELETE_SECTION_1_MICS_ERROR:
      return {
        ...state,
        question1Delete: { ...state.question1Delete, loading: false },
      };

    case GET_SECTION_3_MICS_REQUEST:
      return {
        ...state,
        question3: { ...state.question3, loading: true },
      };
    case GET_SECTION_3_MICS_SUCCESS:
      if (payload.Level.L1 && payload.Level.L1.length === 0) {
        return {
          ...state,
          question3: {
            ...state.question3,
            data: [],
            Level: {},
            loading: false,
          },
        };
      }
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

    case RESET_SECTION_3_REQUEST:
      return {
        ...state,
        question3: { ...block, data: [], Level: {} },
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

    // // GET Repository of Control IDs
    // case GET_REPOSITORY_OF_CONTROL_ID_DATA_REQUEST:
    //   return {
    //     ...state,
    //     getRepositoryOfControlID: { ...state.getRepositoryOfControlID, loading: true },
    //   };
    // case GET_REPOSITORY_OF_CONTROL_ID_DATA_SUCCESS:
    //   return {
    //     ...state,
    //     getRepositoryOfControlID: { ...state.getRepositoryOfControlID, loading: false },
    //   };
    // case GET_REPOSITORY_OF_CONTROL_ID_DATA_ERROR:
    //   return {
    //     ...state,
    //     getRepositoryOfControlID: { ...state.getRepositoryOfControlID, loading: false },
    //   };

    case GET_REPOSITORY_OF_CONTROL_ID_DATA_REQUEST:
      return {
        ...state,
        getRepositoryOfControlID: { ...state.getRepositoryOfControlID, loading: true },
      };
    case GET_REPOSITORY_OF_CONTROL_ID_DATA_SUCCESS:
      return {
        ...state,
        getRepositoryOfControlID: {
          ...state.getRepositoryOfControlID,
          data: payload,
          loading: false,
        },
      };
    case GET_REPOSITORY_OF_CONTROL_ID_DATA_ERROR:
      return {
        ...state,
        getRepositoryOfControlID: { ...state.getRepositoryOfControlID, loading: false },
      };

    case GET_CONTROL_NAME_FROM_CONTROL_ID_REQUEST:
      return {
        ...state,
        controlNameFromControlId: { ...state.controlNameFromControlId, loading: true },
      };
    case GET_CONTROL_NAME_FROM_CONTROL_ID_SUCCESS:
      return {
        ...state,
        controlNameFromControlId: {
          ...state.controlNameFromControlId,
          data: payload,
          loading: false,
        },
      };
    case GET_CONTROL_NAME_FROM_CONTROL_ID_ERROR:
      return {
        ...state,
        controlNameFromControlId: { ...state.controlNameFromControlId, loading: false },
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

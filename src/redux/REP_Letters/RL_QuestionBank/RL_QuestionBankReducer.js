// =================== GET BU QUESTIONS ========================//
export const GET_BU_QUESTIONS_REQUEST = 'GET_BU_QUESTIONS_REQUEST';
export const GET_BU_QUESTIONS_ERROR = 'GET_BU_QUESTIONS_ERROR';
export const GET_BU_QUESTIONS_SUCCESS = 'GET_BU_QUESTIONS_SUCCESS';
// =================== GET BU QUESTIONS ========================//

// =================== ADD BU QUESTIONS ========================//
export const ADD_BU_QUESTIONS_REQUEST = 'ADD_BU_QUESTIONS_REQUEST';
export const ADD_BU_QUESTIONS_ERROR = 'ADD_BU_QUESTIONS_ERROR';
export const ADD_BU_QUESTIONS_SUCCESS = 'ADD_BU_QUESTIONS_SUCCESS';

// =================== ADD BU QUESTIONS ========================//

// =================== EDIT BU QUESTIONS ========================//
export const EDIT_BU_QUESTIONS_REQUEST = 'EDIT_BU_QUESTIONS_REQUEST';
export const EDIT_BU_QUESTIONS_ERROR = 'EDIT_BU_QUESTIONS_ERROR';
export const EDIT_BU_QUESTIONS_SUCCESS = 'EDIT_BU_QUESTIONS_SUCCESS';
// =================== EDIT BU QUESTIONS ========================//

// =================== DELETE BU QUESTIONS ========================//

export const DELETE_BU_QUESTIONS_REQUEST = 'DELETE_BU_QUESTIONS_REQUEST';
export const DELETE_BU_QUESTIONS_ERROR = 'DELETE_BU_QUESTIONS_ERROR';
export const DELETE_BU_QUESTIONS_SUCCESS = 'DELETE_BU_QUESTIONS_SUCCESS';

// =================== DELETE BU QUESTIONS ========================//

const block = {
  loading: false,
  error: '',
  success: false,
};

const initialState = {
  get_BU_Questions: { ...block, data: [] },
  add_BU_Questions: { ...block, data: [] },
  edit_BU_Questions: { ...block, data: [] },
  delete_BU_Questions: { ...block, data: [] },
};

export const RL_QuestionBankReducer = (state = initialState, { type, payload = {} }) => {
  switch (type) {
    // Get BU Questions
    case GET_BU_QUESTIONS_REQUEST:
      return {
        ...state,
        get_BU_Questions: { ...state.get_BU_Questions, loading: true },
      };
    case GET_BU_QUESTIONS_SUCCESS:
      return {
        ...state,
        get_BU_Questions: { ...state.get_BU_Questions, data: payload, loading: false },
      };
    case GET_BU_QUESTIONS_ERROR:
      return {
        ...state,
        get_BU_Questions: { ...state.get_BU_Questions, loading: false },
      };

    // Add BU Questions
    case ADD_BU_QUESTIONS_REQUEST:
      return {
        ...state,
        add_BU_Questions: { ...state.add_BU_Questions, loading: true },
      };
    case ADD_BU_QUESTIONS_SUCCESS:
      return {
        ...state,
        add_BU_Questions: { ...state.add_BU_Questions, data: payload, loading: false },
      };
    case ADD_BU_QUESTIONS_ERROR:
      return {
        ...state,
        add_BU_Questions: { ...state.add_BU_Questions, loading: false },
      };

    // Edit BU Questions
    case EDIT_BU_QUESTIONS_REQUEST:
      return {
        ...state,
        edit_BU_Questions: { ...state.edit_BU_Questions, loading: true },
      };
    case EDIT_BU_QUESTIONS_SUCCESS:
      return {
        ...state,
        edit_BU_Questions: { ...state.edit_BU_Questions, data: payload, loading: false },
      };
    case EDIT_BU_QUESTIONS_ERROR:
      return {
        ...state,
        edit_BU_Questions: { ...state.edit_BU_Questions, loading: false },
      };

    // Delete BU Questions
    case DELETE_BU_QUESTIONS_REQUEST:
      return {
        ...state,
        delete_BU_Questions: { ...state.delete_BU_Questions, loading: true },
      };
    case DELETE_BU_QUESTIONS_SUCCESS:
      return {
        ...state,
        delete_BU_Questions: { ...state.delete_BU_Questions, data: payload, loading: false },
      };
    case DELETE_BU_QUESTIONS_ERROR:
      return {
        ...state,
        delete_BU_Questions: { ...state.delete_BU_Questions, loading: false },
      };

    default:
      return state;
  }
};

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

// =================== GET FUNCTION QUESTIONS ========================//
export const GET_FUNCTION_QUESTIONS_REQUEST = 'GET_FUNCTION_QUESTIONS_REQUEST';
export const GET_FUNCTION_QUESTIONS_ERROR = 'GET_FUNCTION_QUESTIONS_ERROR';
export const GET_FUNCTION_QUESTIONS_SUCCESS = 'GET_FUNCTION_QUESTIONS_SUCCESS';
// =================== GET FUNCTION QUESTIONS ========================//

// =================== ADD FUNCTION QUESTIONS ========================//
export const ADD_FUNCTION_QUESTIONS_REQUEST = 'ADD_FUNCTION_QUESTIONS_REQUEST';
export const ADD_FUNCTION_QUESTIONS_ERROR = 'ADD_FUNCTION_QUESTIONS_ERROR';
export const ADD_FUNCTION_QUESTIONS_SUCCESS = 'ADD_FUNCTION_QUESTIONS_SUCCESS';

// =================== ADD FUNCTION QUESTIONS ========================//

// =================== EDIT FUNCTION QUESTIONS ========================//
export const EDIT_FUNCTION_QUESTIONS_REQUEST = 'EDIT_FUNCTION_QUESTIONS_REQUEST';
export const EDIT_FUNCTION_QUESTIONS_ERROR = 'EDIT_FUNCTION_QUESTIONS_ERROR';
export const EDIT_FUNCTION_QUESTIONS_SUCCESS = 'EDIT_FUNCTION_QUESTIONS_SUCCESS';
// =================== EDIT FUNCTION QUESTIONS ========================//

// =================== DELETE FUNCTION QUESTIONS ========================//

export const DELETE_FUNCTION_QUESTIONS_REQUEST = 'DELETE_FUNCTION_QUESTIONS_REQUEST';
export const DELETE_FUNCTION_QUESTIONS_ERROR = 'DELETE_FUNCTION_QUESTIONS_ERROR';
export const DELETE_FUNCTION_QUESTIONS_SUCCESS = 'DELETE_FUNCTION_QUESTIONS_SUCCESS';

// =================== DELETE FUNCTION QUESTIONS ========================//

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
  get_Function_Questions: { ...block, data: [] },
  add_Function_Questions: { ...block, data: [] },
  edit_Function_Questions: { ...block, data: [] },
  delete_Function_Questions: { ...block, data: [] },
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

    // Get FUNCTION Questions
    case GET_FUNCTION_QUESTIONS_REQUEST:
      return {
        ...state,
        get_Function_Questions: { ...state.get_Function_Questions, loading: true },
      };
    case GET_FUNCTION_QUESTIONS_SUCCESS:
      return {
        ...state,
        get_Function_Questions: { ...state.get_Function_Questions, data: payload, loading: false },
      };
    case GET_FUNCTION_QUESTIONS_ERROR:
      return {
        ...state,
        get_Function_Questions: { ...state.get_Function_Questions, loading: false },
      };

    // Add FUNCTION Questions
    case ADD_FUNCTION_QUESTIONS_REQUEST:
      return {
        ...state,
        add_Function_Questions: { ...state.add_Function_Questions, loading: true },
      };
    case ADD_FUNCTION_QUESTIONS_SUCCESS:
      return {
        ...state,
        add_Function_Questions: { ...state.add_Function_Questions, data: payload, loading: false },
      };
    case ADD_FUNCTION_QUESTIONS_ERROR:
      return {
        ...state,
        add_Function_Questions: { ...state.add_Function_Questions, loading: false },
      };

    // Edit FUNCTION Questions
    case EDIT_FUNCTION_QUESTIONS_REQUEST:
      return {
        ...state,
        edit_Function_Questions: { ...state.edit_Function_Questions, loading: true },
      };
    case EDIT_FUNCTION_QUESTIONS_SUCCESS:
      return {
        ...state,
        edit_Function_Questions: {
          ...state.edit_Function_Questions,
          data: payload,
          loading: false,
        },
      };
    case EDIT_FUNCTION_QUESTIONS_ERROR:
      return {
        ...state,
        edit_Function_Questions: { ...state.edit_Function_Questions, loading: false },
      };

    // Delete FUNCTION Questions
    case DELETE_FUNCTION_QUESTIONS_REQUEST:
      return {
        ...state,
        delete_Function_Questions: { ...state.delete_Function_Questions, loading: true },
      };
    case DELETE_FUNCTION_QUESTIONS_SUCCESS:
      return {
        ...state,
        delete_Function_Questions: {
          ...state.delete_Function_Questions,
          data: payload,
          loading: false,
        },
      };
    case DELETE_FUNCTION_QUESTIONS_ERROR:
      return {
        ...state,
        delete_Function_Questions: { ...state.delete_Function_Questions, loading: false },
      };

    default:
      return state;
  }
};

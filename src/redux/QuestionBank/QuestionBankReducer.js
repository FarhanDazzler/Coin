import {
    ACTION_GET_SECTION1_QUESTIONS_DATA,
    ACTION_GET_SECTION1_QUESTIONS_DATA_SUCCESS,
    ACTION_GET_SECTION1_QUESTIONS_DATA_FAILED,
} from '../types';

const initialState = {
    data: [],
    loading: false,
    error: null,
    success: null,
};

function getInitialState() {
    return initialState;
}

export default function section1QuestionDataReducer(state = getInitialState(), action) {
    switch (action.type) {
        case ACTION_GET_SECTION1_QUESTIONS_DATA:
            return {
                ...state,
                data: {},
                loading: true,
                error: '',
                success: '',
            };
        case ACTION_GET_SECTION1_QUESTIONS_DATA_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false,
                error: '',
                success: 'Section1 Question Data successfully',

            };
        case ACTION_GET_SECTION1_QUESTIONS_DATA_FAILED:
            return {
                ...state,
                data: {},
                loading: false,
                error: 'Failed',
                success: '',


            };

        default:
            return state;
    }
}

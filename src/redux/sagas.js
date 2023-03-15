import { all } from 'redux-saga/effects';
import AssessmentSaga from './Assessments/AssessmentSaga';
import AuthSaga from './Auth/AuthSaga';
import controlData from './ControlData/ControlDataSaga';
import QuestionsSaga from './Questions/QuestionsSaga';
import csvTampredData from './CsvTampred/CsvTampredSaga';
import questionBankData from './QuestionBank/QuestionBankSaga';

export function* sagas() {
  yield all([AuthSaga, AssessmentSaga, QuestionsSaga, controlData(), csvTampredData(), questionBankData()]);
}

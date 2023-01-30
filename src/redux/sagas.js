import { all } from 'redux-saga/effects';
import AssessmentSaga from './Assessments/AssessmentSaga';
import AuthSaga from './Auth/AuthSaga';

export function* sagas() {
  yield all([AuthSaga, AssessmentSaga]);
}

import { all } from 'redux-saga/effects';
import AssessmentSaga from './Assessments/AssessmentSaga';
import AuthSaga from './Auth/AuthSaga';
import controlData from './ControlData/ControlDataSaga';
import QuestionsSaga from './Questions/QuestionsSaga';
import csvTampredData from './CsvTampred/CsvTampredSaga';
import questionBankData from './QuestionBank/QuestionBankSaga';
import MDM_Saga from './MDM/MDM_Saga';
import AD_Saga from './AzureAD/AD_Saga';
import AssessmentBankSaga from './AssessmentBank/AssessmentBankSaga';
import DashBoardSaga from './DashBoard/DashBoardSaga';

export function* sagas() {
  yield all([
    AuthSaga,
    AssessmentSaga,
    QuestionsSaga,
    controlData(),
    csvTampredData(),
    questionBankData(),
    MDM_Saga,
    AD_Saga,
    AssessmentBankSaga,
    DashBoardSaga
  ]);
}

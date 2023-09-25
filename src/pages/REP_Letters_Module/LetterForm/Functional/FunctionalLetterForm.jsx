import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DotSpinner } from '@uiball/loaders';
import * as XLSX from 'xlsx';
import { compile, convert } from 'html-to-text';
import PageWrapper from '../../../../components/wrappers/PageWrapper';
import Section0 from './FormComponents/Section0';
import Section1 from './FormComponents/Section1';
import ReviewResponsePage from './FormComponents/ReviewResponsePage';
import { getFunctionalInstructions } from '../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
import { get_Function_Questions } from '../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
import {
  get_Function_QuestionsSelector,
  getFunctionalInstructionsSelector,
} from '../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankSelector';
import {
  getLatestFunctionDraftResponse,
  getFunctionSubmitResponse,
} from '../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
import {
  addOrUpdateFunctionDraftResponseSelector,
  getLatestFunctionDraftResponseSelector,
  getFunctionSubmitResponseSelector,
} from '../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';
import '../LetterFormStyle.scss';

const FunctionalLetterForm = (props) => {
  const dispatch = useDispatch();
  const scopeData = props.location.state?.data?.scopeData;
  const modalType = props.location.state?.data?.modalType;

  const questionState = useSelector(get_Function_QuestionsSelector);
  const instructionState = useSelector(getFunctionalInstructionsSelector);
  const getLatestFunctionDraftResponseState = useSelector(getLatestFunctionDraftResponseSelector);
  const getFunctionSubmitResponseState = useSelector(getFunctionSubmitResponseSelector);

  useEffect(() => {
    dispatch(getFunctionalInstructions());

    if (modalType === 'attempt') {
      let payload = {
        function: scopeData?.Function,
      };

      dispatch(get_Function_Questions(payload));
      let payloadForGettingDraftResp = {
        assessment_id: scopeData?.id,
      };
      dispatch(getLatestFunctionDraftResponse(payloadForGettingDraftResp));
    } else {
      let payloadForGettingSubmittedResp = {
        assessment_id: scopeData?.id,
      };
      dispatch(getFunctionSubmitResponse(payloadForGettingSubmittedResp));
    }
  }, []);

  const exportResponseToExcel = (info, responses, Last_Saved_At) => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Create a worksheet for the info data
    const infoSheet = XLSX.utils.json_to_sheet([
      { Key: 'Title', Value: info.Title },
      { Key: 'Assessment Cycle', Value: info.Assessment_Cycle },
      { Key: 'Year', Value: info.Year },
      { Key: 'Zone', Value: info.Zone },
      { Key: 'BU', Value: info.BU },
      { Key: 'Function', Value: info.Function },
      { Key: 'Recipient', Value: info.Recipient },
      { Key: 'Zone Control', Value: info.Zone_Control },
      { Key: 'Submitted on', Value: Last_Saved_At },
    ]);
    XLSX.utils.book_append_sheet(wb, infoSheet, 'Information');

    // Create a worksheet for the responses data with questionText converted to plain text
    const responsesSheet = XLSX.utils.json_to_sheet(
      responses.map((response) => ({
        questionNumber: response.questionNumber,
        questionText: convert(response.questionText),
        response: response.response,
        comment: response.comment,
      })),
    );
    XLSX.utils.book_append_sheet(wb, responsesSheet, 'Responses');

    // Save the workbook to an Excel file
    const fileName = `${scopeData?.Function} - ${scopeData?.Recipient} - Submitted-Responses - ${scopeData?.Title} - ${scopeData?.Assessment_Cycle} - ${scopeData?.Year}`;
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <div>
      <PageWrapper>
        {modalType === 'attempt' ? (
          <div className="container-fluid">
            {instructionState.loading ||
            questionState.loading ||
            getLatestFunctionDraftResponseState.loading ? (
              <div className="loader-animation">
                <DotSpinner size={100} speed={0.9} color="#e3af32" />
                <p className="loader-Desc ml-3">Please wait while we are Loading letter for you</p>
              </div>
            ) : (
              <div className="col-lg-12">
                <Section0 scopeData={scopeData} />
                <Section1 questions={questionState.data} scopeData={scopeData} />
              </div>
            )}
          </div>
        ) : (
          <div className="container-fluid">
            {instructionState.loading || getFunctionSubmitResponseState.loading ? (
              <div className="loader-animation">
                <DotSpinner size={100} speed={0.9} color="#e3af32" />
                <p className="loader-Desc ml-3">
                  Please wait while we are Loading responses for you
                </p>
              </div>
            ) : (
              <div className="col-lg-12">
                <div>
                  <div className="d-flex align-items-center" style={{ paddingTop: '14px' }}>
                    <span className="review-response-page-title">Review Responses</span>
                    <button
                      className="export_excel_button"
                      onClick={() => {
                        const info = {
                          Title: scopeData?.Title,
                          Assessment_Cycle: scopeData?.Assessment_Cycle,
                          Year: scopeData?.Year,
                          Zone: scopeData?.Zone,
                          BU: scopeData?.BU,
                          Function: scopeData?.Function,
                          Recipient: scopeData?.Recipient,
                          Zone_Control: scopeData?.Zone_Control,
                        };
                        exportResponseToExcel(
                          info,
                          getFunctionSubmitResponseState?.data?.Latest_Response,
                          getFunctionSubmitResponseState?.data?.Last_Saved_At,
                        );
                      }}
                    >
                      <strong>Export</strong>
                    </button>
                  </div>
                </div>
                <Section0 scopeData={scopeData} />
                <ReviewResponsePage
                  submittedResponses={getFunctionSubmitResponseState?.data?.Latest_Response}
                />
              </div>
            )}
          </div>
        )}
      </PageWrapper>
    </div>
  );
};

export default FunctionalLetterForm;

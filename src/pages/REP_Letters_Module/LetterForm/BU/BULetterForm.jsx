import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DotSpinner } from '@uiball/loaders';
import * as XLSX from 'xlsx';
import { compile, convert } from 'html-to-text';
import PageWrapper from '../../../../components/wrappers/PageWrapper';
import Section0 from './FormComponents/Section0';
import Section1 from './FormComponents/Section1';
import Section2 from './FormComponents/Section2';
// import ReviewResponsePage from './FormComponents/ReviewResponsePage';
import { getInstructions } from '../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
import { get_BU_Questions } from '../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
import {
  get_BU_QuestionsSelector,
  getInstructionsSelector,
} from '../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankSelector';
import {
  getLatestBUDraftResponse,
  getBUSubmitResponse,
} from '../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
import {
  addOrUpdateBUDraftResponseSelector,
  getLatestBUDraftResponseSelector,
  getBUSubmitResponseSelector,
} from '../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';
import '../LetterFormStyle.scss';

const BULetterForm = (props) => {
  const dispatch = useDispatch();
  const scopeData = props.location.state?.data?.scopeData;
  const modalType = props.location.state?.data?.modalType;
  const letterType = props.location.state?.data?.letterType;

  const questionState = useSelector(get_BU_QuestionsSelector);
  const instructionState = useSelector(getInstructionsSelector);
  const getLatestBUDraftResponseState = useSelector(getLatestBUDraftResponseSelector);
  const getBUSubmitResponseState = useSelector(getBUSubmitResponseSelector);

  useEffect(() => {
    const payload = {
      module: letterType,
    };

    dispatch(getInstructions(payload));

    if (modalType === 'attempt') {
      let payload = {
        type: letterType,
      };
      dispatch(get_BU_Questions(payload));

      let payloadForGettingDraftResp = {
        assessment_id: scopeData?.id,
      };
      dispatch(getLatestBUDraftResponse(payloadForGettingDraftResp));
    } else {
      let payloadForGettingSubmittedResp = {
        assessment_id: scopeData?.id,
      };
      dispatch(getBUSubmitResponse(payloadForGettingSubmittedResp));
    }
  }, []);

  const exportResponseToExcel = (info, responses) => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Create a worksheet for the info data
    const infoSheet = XLSX.utils.json_to_sheet([
      { Key: 'Title', Value: info.Title },
      { Key: 'Assessment_Cycle', Value: info.Assessment_Cycle },
      { Key: 'Year', Value: info.Year },
      { Key: 'Zone', Value: info.Zone },
      { Key: 'BU', Value: info.BU },
      { Key: 'Function', Value: info.Function },
      { Key: 'Recipient', Value: info.Recipient },
      { Key: 'Zone_Control', Value: info.Zone_Control },
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
            getLatestBUDraftResponseState.loading ? (
              <div className="loader-animation">
                <DotSpinner size={100} speed={0.9} color="#e3af32" />
                <p className="loader-Desc ml-3">Please wait while we are Loading letter for you</p>
              </div>
            ) : (
              <div className="col-lg-12">
                <Section0 scopeData={scopeData} letterType={letterType} />
                <Section1 questions={questionState.data} scopeData={scopeData} />
                <Section2 />
              </div>
            )}
          </div>
        ) : (
          <div className="container-fluid">
            {instructionState.loading || getBUSubmitResponseState.loading ? (
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
                          getBUSubmitResponseState?.data?.Latest_Response,
                        );
                      }}
                    >
                      <strong>Export</strong>
                    </button>
                  </div>
                </div>
                <Section0 scopeData={scopeData} letterType={letterType} />
                {/* <ReviewResponsePage
                  submittedResponses={getBUSubmitResponseState?.data?.Latest_Response}
                /> */}
              </div>
            )}
          </div>
        )}
      </PageWrapper>
    </div>
  );
};

export default BULetterForm;

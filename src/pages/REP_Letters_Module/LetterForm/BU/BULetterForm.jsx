import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DotSpinner } from '@uiball/loaders';
import * as XLSX from 'xlsx';
import { compile, convert } from 'html-to-text';
import Button from '../../../../components/UI/Button';
import PageWrapper from '../../../../components/wrappers/PageWrapper';
import Section0 from './FormComponents/Section0';
import Section1 from './FormComponents/Section1';
import Section2 from './FormComponents/Section2';
import ReviewSection1 from './FormComponents/ReviewResponseComponents/ReviewSection1';
import ReviewSection3 from './FormComponents/ReviewResponseComponents/ReviewSection3';
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
  getBUSection3Response,
} from '../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
import {
  addOrUpdateBUDraftResponseSelector,
  getLatestBUDraftResponseSelector,
  getBUSubmitResponseSelector,
  getBUSection3ResponseSelector,
} from '../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';
import '../LetterFormStyle.scss';
import AttemptSection3 from './FormComponents/Section3/AttemptSection3';
import ApprovalPageSection3 from './FormComponents/Section3/ApprovalPageSection3';

const ReviewSubmittedResponses = ({ scopeData, letterType, getBUSubmitResponseState }) => {
  const history = useHistory();
  const exportResponseToExcel = (info, responses, Last_Saved_At) => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Create a worksheet for the info data
    const infoSheet = XLSX.utils.json_to_sheet([
      { Key: 'Title', Value: info.Title },
      { Key: 'Letter Type', Value: info.Letter_Type },
      { Key: 'Assessment Cycle', Value: info.Assessment_Cycle },
      { Key: 'Year', Value: info.Year },
      { Key: 'Zone', Value: info.Zone },
      { Key: 'BU', Value: info.BU },
      { Key: 'Entity', Value: info.Entity },
      { Key: 'Disclosure Processor', Value: info.Disclosure_Processor },
      { Key: 'Finance Director', Value: info.Finance_Director },
      { Key: 'BU Head', Value: info.BU_Head },
      { Key: 'Zone Control', Value: info.Zone_Control },
      { Key: 'Zone VP', Value: info.Zone_VP },
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
        month: response.month,
        year: response.year,
      })),
    );
    XLSX.utils.book_append_sheet(wb, responsesSheet, 'Responses');

    // Save the workbook to an Excel file
    const fileName = `${scopeData?.Letter_Type} - ${scopeData?.Disclosure_Processor} - Submitted-Responses - ${scopeData?.Title} - ${scopeData?.Assessment_Cycle} - ${scopeData?.Year}`;
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <div className="col-lg-12">
      <div>
        <div className="d-flex align-items-center" style={{ paddingTop: '14px' }}>
          <span className="review-response-page-title">Review Responses</span>
          <button
            className="export_excel_button"
            onClick={() => {
              const info = {
                Title: scopeData?.Title,
                Letter_Type: scopeData?.Letter_Type,
                Assessment_Cycle: scopeData?.Assessment_Cycle,
                Year: scopeData?.Year,
                Zone: scopeData?.Zone,
                BU: scopeData?.BU,
                Entity: scopeData?.Entity,
                Disclosure_Processor: scopeData?.Disclosure_Processor,
                Finance_Director: scopeData?.Finance_Director,
                BU_Head: scopeData?.BU_Head,
                Zone_Control: scopeData?.Zone_Control,
                Zone_VP: scopeData?.Zone_VP,
              };
              exportResponseToExcel(
                info,
                getBUSubmitResponseState?.data?.Latest_Response,
                getBUSubmitResponseState?.data?.Last_Saved_At,
              );
            }}
          >
            <strong>Export</strong>
          </button>
        </div>
      </div>
      <Section0 scopeData={scopeData} letterType={letterType} />
      <ReviewSection1 submittedResponses={getBUSubmitResponseState?.data?.Latest_Response} />
      <ReviewSection3 />
      <div className="d-flex align-items-center justify-content-end">
        <Button
          //color="secondary"
          color="neutral"
          className="w-100"
          onClick={() => history.push('/')}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

const BULetterForm = (props) => {
  const dispatch = useDispatch();
  const scopeData = props.location.state?.data?.scopeData;
  const modalType = props.location.state?.data?.modalType;
  const letterType = props.location.state?.data?.letterType;

  const questionState = useSelector(get_BU_QuestionsSelector);
  const instructionState = useSelector(getInstructionsSelector);
  const getLatestBUDraftResponseState = useSelector(getLatestBUDraftResponseSelector);
  const getBUSubmitResponseState = useSelector(getBUSubmitResponseSelector);
  const getBUSection3ResponseState = useSelector(getBUSection3ResponseSelector);

  useEffect(() => {
    const payload = {
      module: letterType,
    };

    dispatch(getInstructions(payload));

    if (modalType === 'attemptSection1') {
      let payload = {
        type: letterType,
      };
      dispatch(get_BU_Questions(payload));

      let payloadForGettingDraftResp = {
        assessment_id: scopeData?.id,
      };
      dispatch(getLatestBUDraftResponse(payloadForGettingDraftResp));
    } else if (modalType === 'attemptSection3') {
      let payloadForGettingSubmittedResp = {
        assessment_id: scopeData?.id,
      };

      dispatch(getBUSubmitResponse(payloadForGettingSubmittedResp));
      const payloadForGettingSection3Response = {
        assessment_id: scopeData?.id,
      };

      dispatch(getBUSection3Response(payloadForGettingSection3Response));
    } else {
      let payloadForGettingSubmittedResp = {
        assessment_id: scopeData?.id,
      };

      dispatch(getBUSubmitResponse(payloadForGettingSubmittedResp));
      const payloadForGettingSection3Response = {
        assessment_id: scopeData?.id,
      };

      dispatch(getBUSection3Response(payloadForGettingSection3Response));
    }
  }, []);

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
              </div>
            )}
          </div>
        ) : (
          <div className="container-fluid">
            {instructionState.loading ||
            getBUSubmitResponseState.loading ||
            getBUSection3ResponseState.loading ? (
              <div className="loader-animation">
                <DotSpinner size={100} speed={0.9} color="#e3af32" />
                <p className="loader-Desc ml-3">
                  Please wait while we are Loading responses for you
                </p>
              </div>
            ) : (
              <ReviewSubmittedResponses
                scopeData={scopeData}
                letterType={letterType}
                getBUSubmitResponseState={getBUSubmitResponseState}
              />
            )}
          </div>
        )}
      </PageWrapper>
    </div>
  );
};

export default BULetterForm;

import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DotSpinner } from '@uiball/loaders';
import * as XLSX from 'xlsx';
import { compile, convert } from 'html-to-text';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import Button from '../../../../components/UI/Button';
import PageWrapper from '../../../../components/wrappers/PageWrapper';
import Section0 from './FormComponents/Section0';
import Section1 from './FormComponents/Section1';
import Section2 from './FormComponents/Section2';
import ReviewSection1 from './FormComponents/ReviewResponseComponents/ReviewSection1';
import ReviewSection2 from './FormComponents/ReviewResponseComponents/ReviewSection2';
import { getInstructions } from '../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
import { get_BU_Questions } from '../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
import {
  get_BU_QuestionsSelector,
  getInstructionsSelector,
} from '../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankSelector';
import {
  getLatestBUZoneDraftResponse,
  getBUZoneSubmitResponse,
  getBUZoneSection2SignatureResponseAction,
  getBUZoneScopeData,
  clearBUZoneScopeData,
} from '../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
import {
  addOrUpdateBUZoneDraftResponseSelector,
  getLatestBUZoneDraftResponseSelector,
  getBUZoneSubmitResponseSelector,
  getBUZoneSection2SignatureResponseSelector,
  getBUZoneScopeDataSelector,
} from '../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';
import '../LetterFormStyle.scss';

const ReviewSubmittedResponses = ({
  scopeData,
  letterType,
  getBUZoneSubmitResponseState,
  getBUZoneSection2SignatureResponseState,
  modalType,
}) => {
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
      // { Key: 'BU', Value: info.BU },
      // { Key: 'Entity', Value: info.Entity },
      { Key: 'Local Internal Control', Value: info.Disclosure_Processor },
      { Key: 'Excom Member', Value: info.Excom_Member },
      { Key: 'Zone Legal Representative', Value: info.Zone_Legal_Representative },
      { Key: 'Zone Control', Value: info.Zone_Control },
      { Key: 'Zone VP', Value: info.Zone_VP },
      { Key: 'Submitted on', Value: Last_Saved_At },
    ]);
    XLSX.utils.book_append_sheet(wb, infoSheet, 'Information');

    // Create a worksheet for the responses data with questionText converted to plain text
    const responsesSheet = XLSX.utils.json_to_sheet(
      responses.map((response) => ({
        'Question Number': response.questionNumber,
        'Question Text': convert(response.questionText),
        Response: response.response,
        Comment: response.comment,
        'Action plan due date - Month': response.month,
        'Action plan due date - Year': response.year,
      })),
    );
    XLSX.utils.book_append_sheet(wb, responsesSheet, 'Responses');

    // Save the workbook to an Excel file
    const fileName = `${scopeData?.Letter_Type} - ${scopeData?.Disclosure_Processor} - Submitted-Responses - ${scopeData?.Title} - ${scopeData?.Assessment_Cycle} - ${scopeData?.Year}`;
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <>
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
                // BU: scopeData?.BU,
                // Entity: scopeData?.Entity,
                Disclosure_Processor: scopeData?.Disclosure_Processor,
                Excom_Member: scopeData?.Excom_Member,
                Zone_Legal_Representative: scopeData?.Zone_Legal_Representative,
                Zone_Control: scopeData?.Zone_Control,
                Zone_VP: scopeData?.Zone_VP,
              };
              exportResponseToExcel(
                info,
                getBUZoneSubmitResponseState?.data?.Latest_Response,
                getBUZoneSubmitResponseState?.data?.Last_Saved_At,
              );
            }}
          >
            <strong>Export</strong>
          </button>
        </div>
      </div>
      <Section0 scopeData={scopeData} letterType={letterType} isReview={true} />
      {scopeData?.s1_submitted && (
        <ReviewSection1 submittedResponses={getBUZoneSubmitResponseState?.data?.Latest_Response} />
      )}
      {scopeData?.s2_submitted && (
        <ReviewSection2
          getBUSection2SignatureResponseState={getBUZoneSection2SignatureResponseState}
        />
      )}

      {modalType === 'Review' && (
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
      )}
    </>
  );
};

const ReviewResponsesAtAllTime = ({
  scopeData,
  letterType,
  getBUZoneSubmitResponseState,
  getBUZoneSection2SignatureResponseState,
  modalType,
}) => {
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
      // { Key: 'BU', Value: info.BU },
      // { Key: 'Entity', Value: info.Entity },
      { Key: 'Local Internal Control', Value: info.Disclosure_Processor },
      { Key: 'Excom Member', Value: info.Excom_Member },
      { Key: 'Zone Legal Representative', Value: info.Zone_Legal_Representative },
      { Key: 'Zone Control', Value: info.Zone_Control },
      { Key: 'Zone VP', Value: info.Zone_VP },
      { Key: 'Submitted on', Value: Last_Saved_At },
    ]);
    XLSX.utils.book_append_sheet(wb, infoSheet, 'Information');

    // Create a worksheet for the responses data with questionText converted to plain text
    const responsesSheet = XLSX.utils.json_to_sheet(
      responses.map((response) => ({
        'Question Number': response.questionNumber,
        'Question Text': convert(response.questionText),
        Response: response.response,
        Comment: response.comment,
        'Action plan due date - Month': response.month,
        'Action plan due date - Year': response.year,
      })),
    );
    XLSX.utils.book_append_sheet(wb, responsesSheet, 'Responses');

    // Save the workbook to an Excel file
    const fileName = `${scopeData?.Letter_Type} - ${scopeData?.Disclosure_Processor} - Submitted-Responses - ${scopeData?.Title} - ${scopeData?.Assessment_Cycle} - ${scopeData?.Year}`;
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  /**
   * Takes a screenshot of the specified element and downloads it as an image.
   */
  const takeScreenshot = () => {
    const element = document.getElementById('screenshot-body');
    const scale = 2;
    const pdf = new jsPDF('p', 'mm', 'a4');

    setTimeout(() => {
      html2canvas(element, {
        scale: scale,
        backgroundColor: '#000000',
        allowTaint: true,
        useCORS: true,
        logging: true,
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 0.8); // Compressing the image to reduce size
        const pdf = new jsPDF('p', 'mm', 'a4'); // Creating PDF with A4 size

        // Calculating the number of pages
        const pdfWidth = 210; // A4 width in mm
        const pdfHeight = 297; // A4 height in mm
        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        // Adding the image to PDF and handle long content
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
        }

        pdf.save('screenshot.pdf');
      });
    }, 1000);
  };

  return (
    <div id="screenshot-body">
      <div>
        <Button onClick={takeScreenshot}>Take Screenshot</Button>
      </div>
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
                // BU: scopeData?.BU,
                // Entity: scopeData?.Entity,
                Disclosure_Processor: scopeData?.Disclosure_Processor,
                Excom_Member: scopeData?.Excom_Member,
                Zone_Legal_Representative: scopeData?.Zone_Legal_Representative,
                Zone_Control: scopeData?.Zone_Control,
                Zone_VP: scopeData?.Zone_VP,
              };
              exportResponseToExcel(
                info,
                getBUZoneSubmitResponseState?.data?.Latest_Response,
                getBUZoneSubmitResponseState?.data?.Last_Saved_At,
              );
            }}
          >
            <strong>Export</strong>
          </button>
        </div>
      </div>
      <Section0 scopeData={scopeData} letterType={letterType} isReview={true} />

      <ReviewSection1 submittedResponses={getBUZoneSubmitResponseState?.data?.Latest_Response} />

      <ReviewSection2
        getBUSection2SignatureResponseState={getBUZoneSection2SignatureResponseState}
      />

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

const ZoneForm = (props) => {
  const dispatch = useDispatch();

  const { modalType, id } = useParams();

  const letterType = 'Zone';

  console.log('modalType', modalType);
  const questionState = useSelector(get_BU_QuestionsSelector);
  const instructionState = useSelector(getInstructionsSelector);
  const getLatestBUZoneDraftResponseState = useSelector(getLatestBUZoneDraftResponseSelector);
  const getBUZoneSubmitResponseState = useSelector(getBUZoneSubmitResponseSelector);
  const getBUZoneSection2SignatureResponseState = useSelector(
    getBUZoneSection2SignatureResponseSelector,
  );
  const getBUZoneScopeDataState = useSelector(getBUZoneScopeDataSelector);

  useEffect(() => {
    const payloadForGettingInstructions = {
      module: letterType,
    };

    dispatch(getInstructions(payloadForGettingInstructions));

    const payloadForGettingScopeData = {
      id: id,
    };

    dispatch(getBUZoneScopeData(payloadForGettingScopeData));
    if (modalType === 'attemptSection1') {
      let payload = {
        type: letterType,
      };
      dispatch(get_BU_Questions(payload));

      let payloadForGettingDraftResp = {
        assessment_id: id,
      };
      dispatch(getLatestBUZoneDraftResponse(payloadForGettingDraftResp));
    } else if (modalType === 'attemptSection2') {
      let payloadForGettingSubmittedResp = {
        assessment_id: id,
      };

      dispatch(getBUZoneSubmitResponse(payloadForGettingSubmittedResp));
      let payloadForBuSection2Response = {
        id: id,
      };
      dispatch(getBUZoneSection2SignatureResponseAction(payloadForBuSection2Response));
    } else {
      let payloadForGettingSubmittedResp = {
        assessment_id: id,
      };

      dispatch(getBUZoneSubmitResponse(payloadForGettingSubmittedResp));
      let payloadForBuSection2Response = {
        id: id,
      };
      dispatch(getBUZoneSection2SignatureResponseAction(payloadForBuSection2Response));
    }
  }, [id]);

  // clear all the states on page leave or refresh page or change url path or change module or change role
  useEffect(() => {
    return () => {
      dispatch(clearBUZoneScopeData());
    };
  }, []);

  return (
    <div>
      <PageWrapper>
        {modalType === 'attemptSection1' && (
          <div className="container-fluid custom-scroll-page">
            {instructionState.loading ||
            getBUZoneScopeDataState.loading ||
            questionState.loading ||
            getLatestBUZoneDraftResponseState.loading ? (
              <div className="loader-animation">
                <DotSpinner size={100} speed={0.9} color="#e3af32" />
                <p className="loader-Desc ml-3">Please wait while we are Loading letter for you</p>
              </div>
            ) : (
              <div className="col-lg-12">
                <Section0 scopeData={getBUZoneScopeDataState?.data} letterType={letterType} />
                <Section1
                  questions={questionState.data}
                  scopeData={getBUZoneScopeDataState?.data}
                />
              </div>
            )}
          </div>
        )}
        {modalType === 'attemptSection2' && (
          <div className="container-fluid custom-scroll-page">
            {instructionState.loading ||
            getBUZoneScopeDataState.loading ||
            getBUZoneSubmitResponseState.loading ||
            getBUZoneSection2SignatureResponseState?.loading ? (
              <div className="loader-animation">
                <DotSpinner size={100} speed={0.9} color="#e3af32" />
                <p className="loader-Desc ml-3">
                  Please wait while we are Loading responses for you
                </p>
              </div>
            ) : (
              <div className="col-lg-12">
                <ReviewSubmittedResponses
                  scopeData={getBUZoneScopeDataState?.data}
                  letterType={letterType}
                  getBUZoneSubmitResponseState={getBUZoneSubmitResponseState}
                  getBUZoneSection2SignatureResponseState={getBUZoneSection2SignatureResponseState}
                  modalType={modalType}
                />
                <Section2 scopeData={getBUZoneScopeDataState?.data} />
              </div>
            )}
          </div>
        )}
        {modalType === 'Review' && (
          <div className="container-fluid custom-scroll-page">
            {instructionState.loading ||
            getBUZoneScopeDataState.loading ||
            getBUZoneSubmitResponseState.loading ||
            getBUZoneSection2SignatureResponseState.loading ? (
              <div className="loader-animation">
                <DotSpinner size={100} speed={0.9} color="#e3af32" />
                <p className="loader-Desc ml-3">
                  Please wait while we are Loading responses for you
                </p>
              </div>
            ) : (
              <div className="col-lg-12">
                <ReviewResponsesAtAllTime
                  scopeData={getBUZoneScopeDataState?.data}
                  letterType={letterType}
                  getBUZoneSubmitResponseState={getBUZoneSubmitResponseState}
                  getBUZoneSection2SignatureResponseState={getBUZoneSection2SignatureResponseState}
                  modalType={modalType}
                />
              </div>
            )}
          </div>
        )}
      </PageWrapper>
    </div>
  );
};

export default ZoneForm;

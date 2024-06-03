import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { DotSpinner } from '@uiball/loaders';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
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
  clearGetFunctionalScopeData,
  getFunctionalScopeData,
} from '../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
import {
  addOrUpdateFunctionDraftResponseSelector,
  getLatestFunctionDraftResponseSelector,
  getFunctionSubmitResponseSelector,
  getFunctionalScopeDataSelector,
} from '../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';
import '../LetterFormStyle.scss';
import { Button } from '@mui/material';

const FunctionalLetterForm = (props) => {
  const dispatch = useDispatch();
  const token = Cookies.get('token');
  const { modalType, id } = useParams();

  //const scopeData = props.location.state?.data?.scopeData;
  const getFunctionScopeDataState = useSelector(getFunctionalScopeDataSelector);

  const questionState = useSelector(get_Function_QuestionsSelector);
  const instructionState = useSelector(getFunctionalInstructionsSelector);
  const getLatestFunctionDraftResponseState = useSelector(getLatestFunctionDraftResponseSelector);
  const getFunctionSubmitResponseState = useSelector(getFunctionSubmitResponseSelector);

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
  useEffect(() => {
    if (token) {
      dispatch(getFunctionalInstructions());

      const payloadForGettingScopeData = {
        assessment_id: id,
      };

      dispatch(getFunctionalScopeData(payloadForGettingScopeData));

      if (modalType === 'attempt') {
        if (getFunctionScopeDataState?.data?.Function) {
          let payload = {
            function: getFunctionScopeDataState?.data?.Function,
          };

          dispatch(get_Function_Questions(payload));
        }

        let payloadForGettingDraftResp = {
          assessment_id: id,
        };
        dispatch(getLatestFunctionDraftResponse(payloadForGettingDraftResp));
      } else {
        let payloadForGettingSubmittedResp = {
          assessment_id: id,
        };
        dispatch(getFunctionSubmitResponse(payloadForGettingSubmittedResp));
      }
    }
  }, [token, getFunctionScopeDataState?.data?.Function]);

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
    const fileName = `${getFunctionScopeDataState?.data?.Function} - ${getFunctionScopeDataState?.data?.Recipient} - Submitted-Responses - ${getFunctionScopeDataState?.data?.Title} - ${getFunctionScopeDataState?.data?.Assessment_Cycle} - ${getFunctionScopeDataState?.data?.Year}`;
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  // clear all the states on page leave or refresh page or change url path or change module or change role
  useEffect(() => {
    return () => {
      dispatch(clearGetFunctionalScopeData());
    };
  }, []);

  return (
    <div id="screenshot-body">
      <PageWrapper>
        {modalType === 'attempt' ? (
          <div className="container-fluid">
            {instructionState.loading ||
            getFunctionScopeDataState.loading ||
            questionState.loading ||
            getLatestFunctionDraftResponseState.loading ? (
              <div className="loader-animation">
                <DotSpinner size={100} speed={0.9} color="#e3af32" />
                <p className="loader-Desc ml-3">Please wait while we are Loading letter for you</p>
              </div>
            ) : (
              <div className="col-lg-12">
                <Section0 scopeData={getFunctionScopeDataState?.data} />
                <Section1 questions={questionState.data} assessment_id={id} />
              </div>
            )}
          </div>
        ) : (
          <div className="container-fluid">
            {instructionState.loading ||
            getFunctionScopeDataState.loading ||
            getFunctionSubmitResponseState.loading ? (
              <div className="loader-animation">
                <DotSpinner size={100} speed={0.9} color="#e3af32" />
                <p className="loader-Desc ml-3">
                  Please wait while we are Loading responses for you
                </p>
              </div>
            ) : (
              <div className="col-lg-12">
                <div>
                  <Button onClick={takeScreenshot} variant="contained">
                    Take Screenshot
                  </Button>
                </div>
                <div>
                  <div className="d-flex align-items-center" style={{ paddingTop: '14px' }}>
                    <span className="review-response-page-title">Review Responses</span>
                    <button
                      className="export_excel_button"
                      onClick={() => {
                        const info = {
                          Title: getFunctionScopeDataState?.data?.Title,
                          Assessment_Cycle: getFunctionScopeDataState?.data?.Assessment_Cycle,
                          Year: getFunctionScopeDataState?.data?.Year,
                          Zone: getFunctionScopeDataState?.data?.Zone,
                          BU: getFunctionScopeDataState?.data?.BU,
                          Function: getFunctionScopeDataState?.data?.Function,
                          Recipient: getFunctionScopeDataState?.data?.Recipient,
                          Zone_Control: getFunctionScopeDataState?.data?.Zone_Control,
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
                <Section0 scopeData={getFunctionScopeDataState?.data} />
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

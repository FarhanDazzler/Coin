import React, { useEffect } from 'react';
import ControlActions from './ControlActions';
import { Loader } from '@mantine/core';
import ControlSection1 from './ControlSection1';
import ControlSection2 from './ControlSection2';
import ControlSection3 from './ControlSection3';
import Button from '../../../../../components/UI/Button';
import { useDispatch } from 'react-redux';
import { resetSection3 } from '../../../../../redux/Questions/QuestionsAction';

const RenderHomeModalTable = ({
  questionsInfo,
  setShowMoreSection,
  ansSection1,
  setAnsSection1,
  showMoreSection,
  tableData,
  setTableData,
  setTerminating,
  ansSection3 = {},
  setAnsSection3,
  showNoQuestionAns,
  setShowNoQuestionAns,
  terminating,
  handleSubmit,
  controlId,
  setStartEdit,
  handleSaveDraft,
  handleSaveDraftProps = {},
  loadingSubmit,
  isModal = false,
  activeData={}
}) => {
  const dispatch = useDispatch();
  const [section1TerminatingLogicValue, setSection1TerminatingLogicValue] = React.useState(false);
  React.useEffect(() => {
    let sectionTerminating = false;
    if (Object.keys(ansSection3).length !== 0) {
      ansSection1.forEach((data) => {
        if (data.q_id == '6') {
          data.options.forEach((option) => {
            if (data.value === option.value) {
              if (option.label == 'No') {
                sectionTerminating = true;
                // setSection1TerminatingLogicValue(true);
              }
            }
          });
        }

        if (data.q_id == '5') {
          data.options.forEach((option) => {
            if (data.value === option.value) {
              if (
                option.label == 'Yes - In e-mail box / on my personal laptop' ||
                option.label == 'No - Evidence of Control Execution is not Stored'
              ) {
                sectionTerminating = true;
                // setSection1TerminatingLogicValue(true);
              }
            }
          });
        }
      });
    }
    setSection1TerminatingLogicValue(sectionTerminating);
  }, [ansSection3]);

  useEffect(() => {
    dispatch(resetSection3());
  }, []);

  return (
    <div className="modal-form-body">
      <ControlActions activeData={activeData}/>

      {questionsInfo.loading ? (
        <div className="d-flex w-100 align-items-center justify-content-center py-5 my-5">
          <Loader color="#d3a306" />
        </div>
      ) : (
        <div className="p-5">
          <ControlSection1
            setTerminating={setTerminating}
            setShowMoreSection={setShowMoreSection}
            ans={ansSection1}
            setAns={setAnsSection1}
            setStartEdit={setStartEdit}
            isModal={!isModal}
          />
          {showMoreSection && (
            <>
              <ControlSection2
                tableData={tableData}
                setTableData={setTableData}
                controlId={controlId}
                setStartEdit={setStartEdit}
                isModal={isModal}
              />
              <ControlSection3
                setTerminating={setTerminating}
                ans={ansSection3}
                setAns={setAnsSection3}
                showNoQuestionAns={showNoQuestionAns}
                setShowNoQuestionAns={setShowNoQuestionAns}
                setStartEdit={setStartEdit}
                isModal={!isModal}
                showMoreSection={showMoreSection}
              />
            </>
          )}

          {!isModal && terminating ? (
            <>
              {section1TerminatingLogicValue ||
              (Object.keys(ansSection3).length !== 0 && Object.keys(ansSection3).length !== 3) ? (
                <div style={{ color: 'red', marginBottom: '10px' }}>
                  Based on above response, the control is assessed as failed because of{' '}
                  {Object.keys(ansSection3).length == 1
                    ? 'L1'
                    : Object.keys(ansSection3).length == 2
                    ? 'L2'
                    : ''}{' '}
                  {'  '}
                  {section1TerminatingLogicValue &&
                    Object.keys(ansSection3).length !== 0 &&
                    Object.keys(ansSection3).length !== 3 &&
                    '/'}
                  {section1TerminatingLogicValue &&
                    ' inadequate Documentation or inadequate frequency'}
                </div>
              ) : null}

              <Button
                color="neutral"
                className="w-100"
                id="submit-button"
                loading={loadingSubmit}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </>
          ) : handleSaveDraft && !isModal ? (
            <div className="save-draft-btn-wrapper">
              <Button onClick={handleSaveDraft} {...handleSaveDraftProps}>
                Save draft!
              </Button>
            </div>
          ) : (
            <div />
          )}
        </div>
      )}
    </div>
  );
};

export default RenderHomeModalTable;

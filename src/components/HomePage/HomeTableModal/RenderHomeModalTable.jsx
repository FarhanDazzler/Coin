import React from 'react';
import ControlActions from './ControlActions';
import { Loader } from '@mantine/core';
import ControlSection1 from './ControlSection1';
import ControlSection2 from './ControlSection2';
import ControlSection3 from './ControlSection3';
import Button from '../../UI/Button';

const RenderHomeModalTable = ({
  questionsInfo,
  setShowMoreSection,
  ansSection1,
  setAnsSection1,
  showMoreSection,
  tableData,
  setTableData,
  setTerminating,
  ansSection3,
  setAnsSection3,
  showNoQuestionAns,
  setShowNoQuestionAns,
  terminating,
  handleSubmit,
  controlId,
  setStartEdit,
  handleSaveDraft,
  handleSaveDraftProps = {},
}) => {
  const [section1TerminatingLogicValue, setSection1TerminatingLogicValue] = React.useState(false);
  React.useEffect(() => {
    if (Object.keys(ansSection3).length !== 0) {
      ansSection1.find((data) => {
        if (data.q_id == '3') {
          data.options.find((option) => {
            if (data.value === option.value) {
              if (option.label == 'Yes') {
                console.log('q-3 failed with yes');
                setSection1TerminatingLogicValue(true);
              }
            }
          });
        }
        if (data.q_id == '6') {
          data.options.find((option) => {
            if (data.value === option.value) {
              if (option.label == 'No') {
                console.log('q-6 failed with no');
                setSection1TerminatingLogicValue(true);
              }
            }
          });
        }

        if (data.q_id == '5') {
          data.options.find((option) => {
            if (data.value === option.value) {
              if (
                option.label == 'Yes - In e-mail box / on my personal laptop' ||
                option.label == 'No - Evidence of Control Execution is not Stored'
              ) {
                console.log('q-5 failed with', option.label);
                setSection1TerminatingLogicValue(true);
              }
            }
          });
        }
        if (data.q_id == '8') {
          console.log('q-8 failed');
          setSection1TerminatingLogicValue(true);
        }
        if (data.q_id == '9') {
          data.options.find((option) => {
            if (data.value === option.value) {
              if (option.label == 'Not up to date') {
                console.log('q-9 failed with', option.label);
                setSection1TerminatingLogicValue(true);
              }
            }
          });
        }
      });
    }
  }, [ansSection3]);

  return (
    <div className="modal-form-body">
      <ControlActions />

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
          />
          {showMoreSection && (
            <>
              <ControlSection2
                tableData={tableData}
                setTableData={setTableData}
                controlId={controlId}
                setStartEdit={setStartEdit}
              />
              <ControlSection3
                setTerminating={setTerminating}
                ans={ansSection3}
                setAns={setAnsSection3}
                showNoQuestionAns={showNoQuestionAns}
                setShowNoQuestionAns={setShowNoQuestionAns}
                setStartEdit={setStartEdit}
              />
            </>
          )}

          {terminating ? (
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

              <Button color="neutral" className="w-100" id="submit-button" onClick={handleSubmit}>
                Submit
              </Button>
            </>
          ) : handleSaveDraft ? (
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

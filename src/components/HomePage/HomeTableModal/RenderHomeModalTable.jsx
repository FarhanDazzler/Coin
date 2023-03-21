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
}) => {
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
          />
          {showMoreSection && (
            <>
              <ControlSection2 tableData={tableData} setTableData={setTableData} />
              <ControlSection3
                setTerminating={setTerminating}
                ans={ansSection3}
                setAns={setAnsSection3}
                showNoQuestionAns={showNoQuestionAns}
                setShowNoQuestionAns={setShowNoQuestionAns}
              />
            </>
          )}

          {terminating && (
            <Button color="neutral" className="w-100" id="submit-button" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default RenderHomeModalTable;

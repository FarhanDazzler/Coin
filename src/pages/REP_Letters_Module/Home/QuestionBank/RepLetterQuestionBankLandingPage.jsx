import React, { useState, useEffect } from 'react';
import PageWrapper from '../../../../components/wrappers/PageWrapper';
import './RepLetterQuestionBank.scss';
import Button from '../../../../components/UI/Button';
import CustomModal from '../../../../components/UI/CustomModal';
import { ArrowNarrowRight } from 'tabler-icons-react';
import Select from 'react-select';
import { Form } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import Instructions from './Instructions/Instructions';

const RLQuestionBank = () => {
  const history = useHistory();

  // logic for closing pop up
  useEffect(() => {
    setInstructionsShowModal(false);
  }, []);

  const [instructionsShowModal, setInstructionsShowModal] = useState(false);

  useEffect(() => {}, []);
  // Code for Instructions
  const handleInstructions = () => {
    setInstructionsShowModal(true);
  };

  const handleBuModify = () => {
    history.push('/REP-Letters/questionbank/BU-modify-questions');
  };
  const handleFunctionalModify = () => {
    history.push('/REP-Letters/questionbank/Function-modify');
  };
  const handleFunctionalCreate = () => {
    history.push('/REP-Letters/questionbank/Function-add');
  };
  return (
    <>
      <PageWrapper>
        <div className="container py-5">
          <div className="RlQuestionBankHeader">
            <h3>Create or Modify Letters</h3>
            <p>
              Enhanced Panel for Creating and Modifying Instructions and Questions for{' '}
              {localStorage.getItem('selected_module_Role') == 'BU'
                ? 'Business Unit '
                : 'Functions '}
              Representation Letter
            </p>
          </div>
          <div className="col-lg-12 py-4 RlQuestionBankBoxWrapper">
            <div id="admin-panel" className="content">
              {localStorage.getItem('selected_module_Role') == 'BU' ? (
                <>
                  <div className="wrapper">
                    <div className="RlQuestionBankHeader">
                      <h3>BU</h3>
                      <p>Choose a sub-category to proceed with the necessary action.</p>
                    </div>
                    <Button
                      variant="outlined"
                      size="large"
                      endIcon={<ArrowNarrowRight />}
                      onClick={handleInstructions}
                    >
                      <span className="text-white">Instructions</span>
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      endIcon={<ArrowNarrowRight />}
                      onClick={handleBuModify}
                    >
                      <span className="text-white">Modify Existing</span>
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="wrapper">
                    <div className="RlQuestionBankHeader">
                      <h3>Functional</h3>
                      <p>Choose a sub-category to proceed with the necessary action.</p>
                    </div>
                    {/* <Form.Group className="input-group mb-3">
                      <div style={{ width: '100%' }}>
                        <Select
                          maxMenuHeight={200}
                          placeholder="Select Function"
                          //   value={controlIDOption}
                          //   defaultValue={controlIDOption}
                          //   onChange={(e) => handleChangeControlId(e)}
                          className="l-input functional-select"
                          //MenuProps={MenuProps}
                          //inputProps={{ 'aria-label': 'Without label' }}
                          options={[]}
                        />
                      </div>
                    </Form.Group> */}

                    <Button
                      variant="outlined"
                      size="large"
                      endIcon={<ArrowNarrowRight />}
                      onClick={handleInstructions}
                    >
                      <span className="text-white">Instructions</span>
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      endIcon={<ArrowNarrowRight />}
                      onClick={handleFunctionalModify}
                    >
                      <span className="text-white">Modify Existing</span>
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      endIcon={<ArrowNarrowRight />}
                      onClick={handleFunctionalCreate}
                    >
                      <span className="text-white">Create New</span>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </PageWrapper>
      <CustomModal
        className="add-org"
        open={instructionsShowModal}
        onClose={() => setInstructionsShowModal(false)}
        width={900}
        title={
          localStorage.getItem('selected_module_Role') == 'BU'
            ? 'Instructions for BU Representation Letter'
            : 'Instructions for Functions Representation Letter'
        }
        bodyClassName="p-0"
      >
        <Instructions
          setShowModal={setInstructionsShowModal}
          ediatbleData={null}
          modalType={localStorage.getItem('selected_module_Role') == 'BU' ? 'BU' : 'Functions'}
        />
      </CustomModal>
    </>
  );
};

export default RLQuestionBank;

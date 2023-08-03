import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageWrapper from '../../../../components/wrappers/PageWrapper';
import './RepLetterQuestionBank.scss';
import Button from '../../../../components/UI/Button';
import CustomModal from '../../../../components/UI/CustomModal';
import { ArrowNarrowRight } from 'tabler-icons-react';
import { useHistory, useLocation } from 'react-router-dom';
import Instructions from './Instructions/Instructions';
import { getInstructions } from '../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
import { modifyInstructionsSelector } from '../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankSelector';

const RLQuestionBank = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [instructionsShowModal, setInstructionsShowModal] = useState(false);
  const modifyInstructionsState = useSelector(modifyInstructionsSelector);

  // logic for closing pop up
  useEffect(() => {
    const payload = {
      module: localStorage.getItem('selected_module_Role') == 'BU' ? 'BU' : 'Functional',
    };
    dispatch(getInstructions(payload));
    setInstructionsShowModal(false);
  }, [modifyInstructionsState?.data]);

  useEffect(() => {}, []);
  // Code for Instructions
  const handleInstructions = () => {
    const payload = {
      module: localStorage.getItem('selected_module_Role') == 'BU' ? 'BU' : 'Functional',
    };
    setInstructionsShowModal(true);
    dispatch(getInstructions(payload));
  };

  const handleBuModify = (module) => {
    const data = { title: `Modify Questions for ${module} Letter`, modalType: module };
    history.push('/REP-Letters/questionbank/BU-modify-questions', { data });
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

          {localStorage.getItem('selected_module_Role') == 'BU' ? (
            <div className="row">
              <div className="col-lg-5 py-4 mr-2 RlQuestionBankBoxWrapper">
                <div id="admin-panel" className="content">
                  <div className="wrapper">
                    <div className="RlQuestionBankHeader">
                      <h3>Zone</h3>
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
                      onClick={() => handleBuModify('Zone')}
                    >
                      <span className="text-white">Modify Existing Questions</span>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="col-lg-5 py-4 RlQuestionBankBoxWrapper">
                <div id="admin-panel" className="content">
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
                      onClick={() => handleBuModify('BU')}
                    >
                      <span className="text-white">Modify Existing Questions</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="col-lg-12 py-4 RlQuestionBankBoxWrapper">
                <div id="admin-panel" className="content">
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
                      onClick={handleFunctionalCreate}
                    >
                      <span className="text-white">Create New</span>
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      endIcon={<ArrowNarrowRight />}
                      onClick={handleFunctionalModify}
                    >
                      <span className="text-white">Modify Existing</span>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </PageWrapper>
      <CustomModal
        className="add-org"
        open={instructionsShowModal}
        onClose={() => setInstructionsShowModal(false)}
        width={1100}
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
          modalType={localStorage.getItem('selected_module_Role') == 'BU' ? 'BU' : 'Functional'}
        />
      </CustomModal>
    </>
  );
};

export default RLQuestionBank;

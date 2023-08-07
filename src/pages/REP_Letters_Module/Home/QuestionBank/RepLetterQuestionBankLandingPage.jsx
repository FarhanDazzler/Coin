import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import PageWrapper from '../../../../components/wrappers/PageWrapper';
import './RepLetterQuestionBank.scss';
import Button from '../../../../components/UI/Button';
import CustomModal from '../../../../components/UI/CustomModal';
import { ArrowNarrowRight } from 'tabler-icons-react';
import { useHistory, useLocation } from 'react-router-dom';
import Instructions from './Instructions/Instructions';
import { getInstructions } from '../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
import { modifyInstructionsSelector } from '../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankSelector';
import { get_rep_functions } from '../../../../redux/REP_Letters/RLMDM/RLMDMAction';
import { get_rep_functionsSelector } from '../../../../redux/REP_Letters/RLMDM/RLMDMSelectors';

const RLQuestionBank = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_rep_functions());
  }, []);

  const [selectedModule, setSelectedModule] = useState();
  const [functionList, setFunctionList] = useState([]);
  const [selectedFunction, setSelectedFunction] = useState();
  const [instructionsShowModal, setInstructionsShowModal] = useState(false);
  const modifyInstructionsState = useSelector(modifyInstructionsSelector);
  const get_rep_functionsState = useSelector(get_rep_functionsSelector);

  useEffect(() => {
    if (get_rep_functionsState?.data.length !== 0) {
      let functionArray = [];
      get_rep_functionsState?.data.map((data) => {
        functionArray.push({ label: data.functions, value: data.functions });
      });
      setFunctionList(functionArray);
    }
  }, [get_rep_functionsState]);

  // logic for closing pop up
  useEffect(() => {
    setInstructionsShowModal(false);
  }, [modifyInstructionsState?.data]);

  useEffect(() => {}, []);
  // Code for Instructions
  const handleInstructions = (modalType) => {
    setSelectedModule(modalType);
    const payload = {
      module: modalType,
    };
    dispatch(getInstructions(payload));
    setInstructionsShowModal(true);
  };

  const handleBuModify = (module) => {
    const data = { title: `Modify Questions for ${module} Letter`, modalType: module };
    history.push('/REP-Letters/questionbank/BU-modify-questions', { data });
  };
  const handleFunctionalModify = () => {
    const data = {
      function: selectedFunction.value,
    };
    console.log(data, '@@@@@@@@');
    history.push('/REP-Letters/questionbank/Function-modify', { data });
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
                      onClick={() => handleInstructions('Zone')}
                    >
                      <span className="text-white">Instructions</span>
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      endIcon={<ArrowNarrowRight />}
                      onClick={() => handleBuModify('Zone')}
                    >
                      <span className="text-white">Modify Questions</span>
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
                      onClick={() => handleInstructions('BU')}
                    >
                      <span className="text-white">Instructions</span>
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      endIcon={<ArrowNarrowRight />}
                      onClick={() => handleBuModify('BU')}
                    >
                      <span className="text-white">Modify Questions</span>
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
                    <Form.Group className="input-group mb-3">
                      <div style={{ width: '100%' }}>
                        <Select
                          theme={(theme) => ({
                            ...theme,
                            borderRadius: 10,
                            colors: {
                              ...theme.colors,
                              neutral0: 'black',
                              neutral90: 'white',
                              neutral80: 'white',
                              //neutral70: 'white',
                              primary25: 'grey',
                              primary: 'white',
                              neutral20: 'grey',
                              primary50: 'grey',
                              primary75: 'grey',
                            },
                          })}
                          maxMenuHeight={200}
                          placeholder="Select Function"
                          value={selectedFunction}
                          defaultValue={selectedFunction}
                          onChange={(e) => setSelectedFunction(e)}
                          className="l-input functional-select"
                          //MenuProps={MenuProps}
                          //inputProps={{ 'aria-label': 'Without label' }}
                          options={functionList}
                        />
                      </div>
                    </Form.Group>

                    {/* <Button
                      variant="outlined"
                      size="large"
                      endIcon={<ArrowNarrowRight />}
                      onClick={handleInstructions}
                    >
                      <span className="text-white">Instructions</span>
                    </Button> */}
                    {selectedFunction && (
                      <Button
                        variant="outlined"
                        size="large"
                        endIcon={<ArrowNarrowRight />}
                        onClick={handleFunctionalModify}
                      >
                        <span className="text-white">Modify Questions</span>
                      </Button>
                    )}
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
        title={`Instructions for ${selectedModule} Representation Letter`}
        bodyClassName="p-0"
      >
        <Instructions setShowModal={setInstructionsShowModal} modalType={selectedModule} />
      </CustomModal>
    </>
  );
};

export default RLQuestionBank;

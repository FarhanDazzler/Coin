import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider, Box, Group } from '@mantine/core';
import { Radio } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Select from 'react-select';
import * as Yup from 'yup';
import { useFormikContext, Formik } from 'formik';
import { Form } from 'react-bootstrap';
import PageWrapper from '../../../../../components/wrappers/PageWrapper';
import '../RepLetterQuestionBank.scss';
import Button from '../../../../../components/UI/Button';
import CustomModal from '../../../../../components/UI/CustomModal';
import AddNewQuestionModal from '../AddNewQuestion/AddNewQuestionModal';
import { get_rep_functions } from '../../../../../redux/REP_Letters/RLMDM/RLMDMAction';
import { get_rep_functionsSelector } from '../../../../../redux/REP_Letters/RLMDM/RLMDMSelectors';
import {
  get_Function_Questions,
  delete_Function_Questions,
  getLetterNameFromFunction,
  clear_get_Function_Questions,
} from '../../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
import {
  get_Function_QuestionsSelector,
  add_Function_QuestionsSelector,
  edit_Function_QuestionsSelector,
  delete_Function_QuestionsSelector,
  getLetterNameFromFunctionSelector,
} from '../../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankSelector';
import RemoveWarningModal from '../../../../../components/UI/AttributesRemoveModal';

const Options = ({
  setEditableData,
  setIsEdit,
  setShowBUModifyModal,
  questionIndex,
  questionText,
  questionID,
}) => {
  const dispatch = useDispatch();

  const handleOnclickEdit = () => {
    setEditableData({ questionID: questionID, questionText: questionText });
    setIsEdit(true);
    setShowBUModifyModal(true);
  };
  const handleOnclickDelete = () => {
    Swal.fire({
      title: 'Are you sure you want to remove?',
      text: 'This cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'gold',
      cancelButtonColor: 'Cancel',
      confirmButtonText: 'Delete',
    }).then((res) => {
      if (res.isConfirmed) {
        let payload = {
          id: questionID,
        };

        dispatch(delete_Function_Questions(payload));
      }
    });
  };

  return (
    <>
      <Divider size="md" my="sm" />
      <div className="options mt-5" style={{ justifyContent: 'space-between' }}>
        <div>
          <Button
            size="large"
            startIcon={<EditIcon color="black" />}
            className="add-button"
            onClick={handleOnclickEdit}
            style={{ marginRight: '12px' }}
          >
            Edit
          </Button>
          <Button
            size="large"
            startIcon={<DeleteIcon color="black" />}
            className="add-button"
            onClick={handleOnclickDelete}
          >
            Delete
          </Button>
        </div>

        <div>
          <Group position="right" spacing="sm">
            <Radio disabled label="Yes" value="Yes" size="md" />
            <Radio disabled label="No" value="No" size="md" />
            <Radio disabled label="NA (Not Applicable)" value="NA" size="md" />
          </Group>
        </div>
      </div>
    </>
  );
};

const Questions = ({ questionIndex, questionText, questionID }) => {
  return (
    <div className="question-text-section">
      <div className="question-number"> {questionIndex}</div>
      <div className="question-text">{questionText}</div>
    </div>
  );
};

const ModifyFunctionLetter = ({
  setFunctionLetterName,
  functionType,
  setFunctionType,
  setIsLetterSelected,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClickSelectFunction = (event) => {
    setFunctionType(event.target.value);
    let payload = {
      function: event.target.value,
    };
    dispatch(getLetterNameFromFunction(payload));
  };

  const handleClickSelectLetterName = (event) => {
    setFunctionLetterName(event.target.value);
    let payload = {
      function: functionType,
      letter: event.target.value,
    };
    dispatch(get_Function_Questions(payload));
    setIsLetterSelected(true);
  };

  const get_rep_functionsState = useSelector(get_rep_functionsSelector);
  const getLetterNameFromFunctionState = useSelector(getLetterNameFromFunctionSelector);

  return (
    <>
      <div id="repp-letter-questionBank-inputPage" className="p-5">
        <div className="row">
          <div className="col-lg-4">
            <h5>Select Function:</h5>
            <Form.Group className="input-group mb-3">
              <Form.Control
                as="select"
                name="Function"
                placeholder=""
                //value={values.Function}
                onChange={handleClickSelectFunction}
                disabled={false}
                className="form-select"
              >
                <option value="">Select Function</option>
                {get_rep_functionsState?.data.map((data, i) => (
                  <option key={i} value={data.functions}>
                    {data.functions}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-lg-4">
            <h5>Select Letter:</h5>
            <Form.Group className="input-group mb-3">
              <Form.Control
                as="select"
                name="FunctionLetterName"
                placeholder=""
                //value={values.FunctionLetterName}
                onChange={handleClickSelectLetterName}
                disabled={false}
                className="form-select"
              >
                <option value="">Select Letter</option>
                {getLetterNameFromFunctionState?.data.map((data, i) => (
                  <option key={i} value={data.Name}>
                    {data.Name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
        </div>
      </div>
    </>
  );
};

const FunctionModifyQuestions = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [functionLetterName, setFunctionLetterName] = useState('');
  const [functionType, setFunctionType] = useState('');
  const [ShowBUModifyModal, setShowBUModifyModal] = useState(false);
  const [editableData, setEditableData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isLetterSelected, setIsLetterSelected] = useState(false);

  useEffect(() => {
    dispatch(get_rep_functions());
  }, []);

  const delete_Function_QuestionsState = useSelector(delete_Function_QuestionsSelector);
  const edit_Function_QuestionsState = useSelector(edit_Function_QuestionsSelector);
  const add_Function_QuestionsState = useSelector(add_Function_QuestionsSelector);
  const get_Function_QuestionState = useSelector(get_Function_QuestionsSelector);

  // logic for closing pop up
  useEffect(() => {
    if (isLetterSelected) {
      let payload = {
        function: functionType,
        letter: functionLetterName,
      };
      dispatch(get_Function_Questions(payload));
      setShowBUModifyModal(false);
    }
  }, [
    delete_Function_QuestionsState?.data,
    edit_Function_QuestionsState?.data,
    add_Function_QuestionsState?.data,
  ]);

  const handleOnclickAdd = () => {
    // Add code
    setIsEdit(false);
    setShowBUModifyModal(true);
  };

  // clear all the states on page leave or refresh page or change url path or change module or change role
  useEffect(() => {
    return () => {
      dispatch(clear_get_Function_Questions());
      //alert('clear');
    };
  }, []);

  return (
    <>
      <PageWrapper>
        <div className="container">
          <div className="row pt-5">
            <div className="rl-question-bank-TitleSectionTab">
              <ModifyFunctionLetter
                setFunctionLetterName={setFunctionLetterName}
                functionType={functionType}
                setFunctionType={setFunctionType}
                setIsLetterSelected={setIsLetterSelected}
              />

              <div className="section-title" style={{ justifyContent: 'space-between' }}>
                <div>
                  <span style={{ paddingLeft: '16px' }}>
                    Add Questions for Function Letter : {functionLetterName}
                  </span>
                </div>
                <div>
                  <Button
                    //color="silver"
                    size="large"
                    startIcon={<ControlPointRoundedIcon color="black" />}
                    className="add-button"
                    onClick={handleOnclickAdd}
                  >
                    Add New
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {get_Function_QuestionState?.data?.map((data, index) => (
            <div className="row pt-5">
              <div className="rl-question-bank-view-questions">
                <div className="row pt-2">
                  <div className="question-text-section">
                    <Questions
                      questionIndex={index + 1}
                      questionText={data.text}
                      questionID={data.id}
                    />
                  </div>
                </div>
                <div className="row pt-2">
                  <div className="question-options-section">
                    <Options
                      setEditableData={setEditableData}
                      setIsEdit={setIsEdit}
                      setShowBUModifyModal={setShowBUModifyModal}
                      questionIndex={index + 1}
                      questionText={data.text}
                      questionID={data.id}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PageWrapper>
      <CustomModal
        className="add-org"
        open={ShowBUModifyModal}
        onClose={() => {
          setShowBUModifyModal(false);
          setEditableData({});
        }}
        width={900}
        title={'Add New Question'}
        bodyClassName="p-0"
      >
        <AddNewQuestionModal
          isEdit={isEdit}
          editableData={editableData}
          setEditableData={setEditableData}
          setShowModal={setShowBUModifyModal}
          modalType={localStorage.getItem('selected_module_Role') == 'BU' ? 'BU' : 'Functions'}
          functionType={functionType}
          functionName={functionLetterName}
        />
      </CustomModal>
    </>
  );
};

export default FunctionModifyQuestions;

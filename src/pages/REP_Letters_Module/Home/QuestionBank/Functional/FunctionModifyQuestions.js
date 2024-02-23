import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Divider, Box, Group } from '@mantine/core';
import { Radio } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import PageWrapper from '../../../../../components/wrappers/PageWrapper';
import '../RepLetterQuestionBank.scss';
import Button from '../../../../../components/UI/Button';
import CustomModal from '../../../../../components/UI/CustomModal';
import AddNewQuestionModal from '../AddNewQuestion/AddNewQuestionModal';
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
            <Radio disabled label="I have nothing to disclose" value="Yes" size="md" />
            <Radio disabled label="I want to disclose" value="No" size="md" />
            {/* <Radio disabled label="NA (Not Applicable)" value="NA" size="md" /> */}
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
      <div className="question-text">
        <p
          dangerouslySetInnerHTML={{
            __html: questionText,
          }}
        />
      </div>
    </div>
  );
};

const FunctionModifyQuestions = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const selectedFunction = props.location.state.data?.function;
  const [ShowBUModifyModal, setShowBUModifyModal] = useState(false);
  const [editableData, setEditableData] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const delete_Function_QuestionsState = useSelector(delete_Function_QuestionsSelector);
  const edit_Function_QuestionsState = useSelector(edit_Function_QuestionsSelector);
  const add_Function_QuestionsState = useSelector(add_Function_QuestionsSelector);
  const get_Function_QuestionState = useSelector(get_Function_QuestionsSelector);

  // logic for closing pop up
  useEffect(() => {
    let payload = {
      function: selectedFunction,
    };
    dispatch(get_Function_Questions(payload));
    setShowBUModifyModal(false);
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
              <div className="section-title" style={{ justifyContent: 'space-between' }}>
                <div>
                  <span style={{ paddingLeft: '16px' }}>
                    Modify Questions for Function Letter :{' '}
                    <span className="golden-text">{selectedFunction}</span>
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
        title={isEdit ? 'Edit Question' : 'Add New Question'}
        bodyClassName="p-0"
      >
        <AddNewQuestionModal
          isEdit={isEdit}
          editableData={editableData}
          setEditableData={setEditableData}
          setShowModal={setShowBUModifyModal}
          modalType={'Functions'}
          functionType={selectedFunction}
        />
      </CustomModal>
    </>
  );
};

export default FunctionModifyQuestions;

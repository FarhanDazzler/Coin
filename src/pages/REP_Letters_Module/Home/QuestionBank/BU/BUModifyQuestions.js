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
  get_BU_Questions,
  delete_BU_Questions,
} from '../../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
import {
  get_BU_QuestionsSelector,
  add_BU_QuestionsSelector,
  edit_BU_QuestionsSelector,
  delete_BU_QuestionsSelector,
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
        console.log(payload, 'payload');
        dispatch(delete_BU_Questions(payload));
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

const BUModifyQuestions = () => {
  const dispatch = useDispatch();

  const delete_BU_QuestionsState = useSelector(delete_BU_QuestionsSelector);
  const edit_BU_QuestionsState = useSelector(edit_BU_QuestionsSelector);
  const add_BU_QuestionsState = useSelector(add_BU_QuestionsSelector);

  // logic for closing pop up
  useEffect(() => {
    dispatch(get_BU_Questions());
    setShowBUModifyModal(false);
  }, [delete_BU_QuestionsState?.data, edit_BU_QuestionsState?.data, add_BU_QuestionsState?.data]);

  const [ShowBUModifyModal, setShowBUModifyModal] = useState(false);
  const [editableData, setEditableData] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const get_BU_QuestionState = useSelector(get_BU_QuestionsSelector);

  console.log(get_BU_QuestionState.data, 'get_BU_Questions');

  const handleOnclickAdd = () => {
    // Add code
    setIsEdit(false);
    setShowBUModifyModal(true);
  };

  return (
    <>
      <PageWrapper>
        <div className="container">
          <div className="row pt-5">
            <div className="rl-question-bank-TitleSectionTab">
              <div className="section-title" style={{ justifyContent: 'space-between' }}>
                <div>
                  <span style={{ paddingLeft: '16px' }}>Modify Questions for BU Letter</span>
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

          {get_BU_QuestionState?.data?.map((data, index) => (
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
        />
      </CustomModal>
    </>
  );
};

export default BUModifyQuestions;

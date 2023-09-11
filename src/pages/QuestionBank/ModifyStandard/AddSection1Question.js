import React, { useState, useEffect } from 'react';
import CustomModal from '../../../components/UI/CustomModal';
import { Checkbox, Text } from '@mantine/core';
import { Form } from 'react-bootstrap';
import './ModifyStandard.scss';
import { addSection1QuestionDataAction } from '../../../redux/QuestionBank/QuestionBankAction';
import { useDispatch } from 'react-redux';
import Button from '../../../components/UI/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export const QuestionType = [
  { label: 'Radio', value: 'Radio' },
  { label: 'Text', value: 'Free Text' },
  { label: 'Dropdown', value: 'Dropdown' },
  { label: 'Is AD', value: 'Is AD' },
];

export const TranslateType = [
  { label: 'French', value: 'French' },
  { label: 'Mandarin', value: 'Mandarin' },
  { label: 'Spanish', value: 'Spanish' },
  { label: 'Korean', value: 'Korean' },
  { label: 'Portuguese', value: 'Portuguese' },
];

const AddSection1Questions = ({ open, handleClose, type, controlId }) => {
  const dispatch = useDispatch();
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState();
  const [isFailed, setIsFailed] = useState(false);
  const [createOptions, setCreateOptions] = useState([
    {
      q_id: '',
      option_value: '',
      child_question: '',
      is_Terminating: null,
    },
  ]);
  const maxLength = 2500;
  useEffect(() => {
    setQuestionText('');
    setQuestionType();
  }, [open]);

  const handleAddSubmit = () => {
    let payload = {
      Control_ID: controlId,
      question_text: questionText,
      question_type: questionType,
      parent_qid: 0,
    };
    dispatch(addSection1QuestionDataAction(payload));
  };
  const handleEditSubmitQuestion = () => {};

  return (
    <div>
      <CustomModal
        className="modify-standard create-question"
        title={<div className="d-flex align-items-center ">Add Question</div>}
        open={open}
        onClose={handleClose}
        width={900}
      >
        <div className="row modal-min-height">
          <div className="col-md-9">
            <FormControl className="input-wrapper">
              <FormLabel>Question Text</FormLabel>
            </FormControl>
            <Form.Group className="input-group mb-3">
              <Form.Control
                type="text"
                name=""
                placeholder="Question Text"
                className="form-control"
                value={questionText}
                maxLength={maxLength}
                isInvalid={Boolean(questionText?.length == maxLength)}
                onChange={(e) => setQuestionText(e.target.value)}
              />
              {questionText?.length == maxLength && (
                <Form.Control.Feedback type="invalid">
                  Only {maxLength} character allow
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </div>
          <div className="col-md-3">
            <label>&nbsp;</label>
            <Form.Group className="input-group mb-3">
              <Form.Control
                as="select"
                name=""
                placeholder=""
                className="form-select"
                onChange={(e) => setQuestionType(e.target.value)}
              >
                <option value="">Select Question Type</option>
                {QuestionType.map((data, i) => (
                  <option value={data?.value} key={i}>
                    {data?.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
        </div>

        <div>
          <div className="d-flex align-items-center justify-content-end">
            <div>
              <Button variant="outlined" color="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                color="neutral"
                className="ml-4"
                disabled={!questionText || !questionType}
                onClick={() => handleAddSubmit()}
              >
                Add
              </Button>
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default AddSection1Questions;

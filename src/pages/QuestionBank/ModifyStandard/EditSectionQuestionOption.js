import React, { useEffect, useState } from 'react';
import CustomModal from './../../../components/UI/CustomModal';
import Input from './../../../components/UI/Input';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from './../../../components/UI/Button';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import Select from './../../../components/UI/Select/Select';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import RemoveWarningModal from './../../../components/UI/AttributesRemoveModal';
import blockType from './../../../components/RenderBlock/constant';
import { Checkbox, Loader, Text } from '@mantine/core';
import {
  addSection1OptionDataAction,
  deleteSection1OptionDataAction,
  editSection1OptionDataAction,
  editSection1QuestionDataAction,
} from '../../../redux/QuestionBank/QuestionBankAction';
import { Form } from 'react-bootstrap';
import { QuestionType } from './AddSection1Question';

const EditSection1QuestionOption = ({
  showEditModal,
  block: apiBlock = {},
  setShowEditModal,
  allQuestions,
}) => {
  const dispatch = useDispatch();
  const [block, setBlock] = useState(apiBlock);
  const [question, setQuestion] = useState();
  const [questionOptions, setQuestionOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [freeTextChildQId, setFreeTextChildQId] = useState('');
  const [isFailedFreeText, setIsFailedFreeText] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const maxLength = 1000;
  useEffect(() => {
    if (questionOptions.length > 0) setFreeTextChildQId(questionOptions[0].child_question);
  }, [questionOptions]);

  const handleSelect = (data) => {
    setBlock({ ...block, question_type: data });
  };
  const handleChangeQuestion = (value) => {
    setQuestion(value.target.value);
  };

  useEffect(() => {
    if (
      [blockType.TEXT, blockType.IS_AD].includes(apiBlock.question_type) &&
      apiBlock.options?.length > 0
    ) {
      setIsFailedFreeText(!!apiBlock.options[0]?.is_Failing);
    }
  }, [apiBlock.options]);

  useEffect(() => {
    if (block.hasOwnProperty('options')) {
      setQuestionOptions(block.options);
    }
  }, [block.options]);

  useEffect(() => {
    if (block.hasOwnProperty('question_text')) {
      setQuestion(block.question_text);
    }
  }, [block.question_text]);

  const handleChangeOption = (val, opBlock) => {
    const updateOp = questionOptions.map((qOp) => {
      if (qOp.option_id === opBlock.option_id) {
        return { ...qOp, option_value: val, isEdit: true };
      }
      return { ...qOp };
    });

    setQuestionOptions(updateOp);
  };

  const handleSelectOptions = (value, op) => {
    const updateQ = questionOptions.map((upOp) => {
      if (upOp.option_id === op.option_id) {
        return { ...upOp, ...value, isEdit: true };
      }
      return { ...upOp };
    });
    setQuestionOptions(updateQ);
  };

  const handleDeleteOption = (op) => () => {
    setShowRemoveModal(op);
  };

  const handleDelete = () => {
    const updateQ = questionOptions.filter((upOp) => upOp.option_id !== showRemoveModal.option_id);
    if (!showRemoveModal.isNew)
      dispatch(deleteSection1OptionDataAction({ option_id: showRemoveModal.option_id }));
    setQuestionOptions(updateQ);
  };

  const handleAddOptions = () => {
    setQuestionOptions([
      ...questionOptions,
      {
        child_question: '',
        is_Terminating: 0,
        option_id: Date.now(),
        option_value: '',
        q_id: block.q_id,
        isNew: true,
        is_Failing: false,
      },
    ]);
  };
  const handleSaveQuestion = () => {
    let isApiCall = false;
    if (apiBlock.question_text !== question || apiBlock.question_type !== block.question_type) {
      isApiCall = true;
      const is_AD = block.question_type === 'Is AD';
      dispatch(
        editSection1QuestionDataAction({
          q_id: apiBlock.q_id,
          Control_ID: apiBlock.Control_ID,
          question_text: question,
          question_type: block.question_type,
          is_AD: is_AD ? 1 : 0,
          is_Failing: isFailedFreeText,
        }),
      );
    }

    if ([blockType.TEXT, blockType.IS_AD].includes(block.question_type)) {
      const payload = {
        q_id: apiBlock.q_id,
        child_question: freeTextChildQId,
        is_Terminating: 0,
        option_value: '',
        is_Failing: isFailedFreeText,
      };
      if (freeTextChildQId === 'is_Terminating') {
        payload.child_question = 0;
        payload.is_Terminating = 1;
      }
      if (block.options.length > 0 && !block.options[0].isNew) {
        payload.option_id = block.options[0].option_id;
        if (block.options[0].child_question !== freeTextChildQId) {
          isApiCall = true;
          dispatch(
            editSection1OptionDataAction({
              editArray: [{ ...payload }],
            }),
          );
        }
      } else {
        isApiCall = true;
        dispatch(
          addSection1OptionDataAction({
            addArray: [{ ...payload }],
          }),
        );
      }
    }

    if (block.question_type !== apiBlock.question_type) {
      if (block.question_type === blockType.TEXT) {
        block.options.shift();
        block.options.forEach(({ option_id }, i) => {
          isApiCall = true;
          dispatch(
            deleteSection1OptionDataAction({
              option_id,
            }),
          );
        });
      }
    }

    const editArray = questionOptions
      .filter((q) => q.isEdit && !q.isNew)
      ?.map((b_val) => {
        const payload = {
          q_id: apiBlock.q_id,
          option_id: b_val.option_id,
          option_value: b_val.option_value,
          child_question: b_val.child_question,
          is_Terminating: 0,
          is_Failing: b_val.is_Failing,
        };
        if (b_val.child_question === 'is_Terminating') {
          payload.child_question = 0;
          payload.is_Terminating = 1;
        }
        return payload;
      });
    if (editArray.length > 0) {
      isApiCall = true;
      dispatch(
        editSection1OptionDataAction({
          editArray,
        }),
      );
    }

    const addArray = questionOptions
      .filter((q) => q.isNew)
      ?.map((b_val) => {
        const payload = {
          q_id: apiBlock.q_id,
          option_value: b_val.option_value,
          child_question: b_val.child_question,
          is_Terminating: 0,
          is_Failing: b_val.is_Failing,
        };
        if (b_val.child_question === 'is_Terminating') {
          payload.child_question = 0;
          payload.is_Terminating = 1;
        }

        return payload;
      });
    if (addArray.length > 0) {
      isApiCall = true;
      dispatch(
        addSection1OptionDataAction({
          addArray,
        }),
      );
    }
    isApiCall = false;
    if (isApiCall) {
      setSaveLoading(true);
    } else {
      setShowEditModal(false);
    }
  };

  useEffect(() => {
    if (allQuestions.length > 0) {
      const op = allQuestions
        ?.map((allQ, i) => {
          return { label: `${i + 1}. ${allQ.question_text}`, value: allQ.q_id };
        })
        ?.filter((q) => q.value !== block.q_id);
      setOptions([
        ...op,
        { label: 'End of survey', value: 'is_Terminating' },
        { label: 'End of section', value: 0 },
      ]);
    }
  }, [allQuestions]);

  return (
    <CustomModal
      className="modify-standard create-question"
      open={showEditModal === block.q_id}
      onClose={() => setShowEditModal(false)}
      width={900}
      title="Edit Question"
      bodyClassName="p-0"
    >
      <div className="d-flex h-100 flex-column justify-content-between">
        <div className="p-5">
          <div className="row">
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
                  block={block}
                  value={question}
                  maxLength={maxLength}
                  isInvalid={Boolean(question?.length == maxLength)}
                  onChange={handleChangeQuestion}
                />
                {question?.length == maxLength && (
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
                  value={block.question_type}
                  onChange={(e) => handleSelect(e.target.value)}
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

          {['Free Text', 'Is AD'].includes(block.question_type) ? (
            <div className="my-2 pt-2">
              <FormControl className="input-wrapper">
                <FormLabel>Child question</FormLabel>
              </FormControl>

              <div className="d-flex align-items-center">
                <Form.Group className="input-group mb-3">
                  <Form.Control
                    as="select"
                    name=""
                    placeholder="Select Child question"
                    className="form-select"
                    value={freeTextChildQId}
                    onChange={(e) => setFreeTextChildQId(e.target.value)}
                  >
                    <option value="">Select Child Question</option>
                    {options.map((data, i) => (
                      <option value={data?.value} key={i}>
                        {data?.label}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <div style={{ minWidth: 200 }} className="pl-3 mb-3 d-flex justify-content-end">
                  <Checkbox
                    color={'yellow'}
                    onChange={({ target: { checked } }) => setIsFailedFreeText(checked)}
                    label={<Text align="left">Failed questions</Text>}
                    checked={isFailedFreeText}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-2">
              <FormControl className="input-wrapper">
                <FormLabel>Question options</FormLabel>
              </FormControl>
              {questionOptions.map((op) => {
                if (op.isRemove) return;
                return (
                  <div className="my-2 d-flex align-items-center" key={op.option_id}>
                    <Input
                      value={op.option_value}
                      block={op}
                      placeholder="Enter question options"
                      handleChange={handleChangeOption}
                    />
                    <FormControl sx={{ m: 1, width: '30%', color: '#000' }} size="small">
                      <Select
                        placeholder="Select sub question"
                        value={op.child_question}
                        onChange={({ target: { value } }) =>
                          handleSelectOptions({ child_question: value }, op)
                        }
                        options={options}
                        inputLook
                      />
                    </FormControl>
                    <div
                      style={{ minWidth: 164 }}
                      className="pl-3 d-flex justify-content-end radio-label"
                    >
                      <Checkbox
                        color={'yellow'}
                        checked={op.is_Failing === 1}
                        onChange={({ target: { checked } }) =>
                          handleSelectOptions({ is_Failing: checked ? 1 : 0 }, op)
                        }
                        label={<Text align="left">Failed questions</Text>}
                      />
                    </div>
                    <Tooltip title="Delete" placement="top">
                      <IconButton onClick={handleDeleteOption(op)}>
                        <DeleteOutlineIcon className="cursor-pointer" />
                      </IconButton>
                    </Tooltip>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {showRemoveModal && (
          <RemoveWarningModal
            onClose={() => setShowRemoveModal(null)}
            onConfirm={() => {
              setShowRemoveModal(null);
              handleDelete(block);
            }}
          />
        )}

        <div className="footer-action">
          <div className="d-flex align-items-center justify-content-between">
            <Button
              color="silver"
              disabled={['Free Text', 'Is AD'].includes(block.question_type)}
              startIcon={<LibraryAddOutlinedIcon />}
              onClick={handleAddOptions}
            >
              Add options
            </Button>

            <div>
              <Button variant="outlined" color="secondary" onClick={() => setShowEditModal(null)}>
                Cancel
              </Button>
              <Button
                disabled={saveLoading}
                color="neutral"
                className="ml-4"
                onClick={handleSaveQuestion}
              >
                {saveLoading ? <Loader size={22} /> : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default EditSection1QuestionOption;

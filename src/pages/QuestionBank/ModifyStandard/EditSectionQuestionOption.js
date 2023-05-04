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
import DropdownMenu from './../../../components/UI/DropdownMenu';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import RemoveWarningModal from './../../../components/UI/AttributesRemoveModal';
import blockType from './../../../components/RenderBlock/constant';
import { Loader } from '@mantine/core';
import {
  addSection1OptionDataAction,
  deleteSection1OptionDataAction,
  getSection1QuestionDataAction,
  editSection1OptionDataAction,
  editSection1QuestionDataAction,
} from '../../../redux/QuestionBank/QuestionBankAction';
import { Form } from 'react-bootstrap';

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
  // 'Dropdown'
  const QuestionType = [
    { label: 'Radio', value: 'Radio' },
    { label: 'Text', value: 'Free Text' },
    { label: 'Dropdown', value: 'Dropdown' },
  ];
  const [showRemoveModal, setShowRemoveModal] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);
  useEffect(() => {
    if (questionOptions.length > 0) setFreeTextChildQId(questionOptions[0].child_question);
  }, [questionOptions]);

  const handleSelect = (data) => {
    setBlock({ ...block, question_type: data });
  };
  const handleChangeQuestion = (value) => {
    setQuestion(value.target.value);
  };

  // useEffect(() => {
  //   setBlock(apiBlock);
  // }, [apiBlock]);

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

  const handleSelectOptions = ({ target: { value } }, op) => {
    const updateQ = questionOptions.map((upOp) => {
      if (upOp.option_id === op.option_id) {
        return { ...upOp, child_question: value, isEdit: true };
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
      },
    ]);
  };

  const handleSaveQuestion = () => {
    let isApiCall = false;
    if (apiBlock.question_text !== question || apiBlock.question_type !== block.question_type) {
      isApiCall = true;
      dispatch(
        editSection1QuestionDataAction({
          q_id: apiBlock.q_id,
          Control_ID: apiBlock.Control_ID,
          question_text: question,
          question_type: block.question_type,
        }),
      );
    }

    if (block.question_type === blockType.TEXT) {
      const payload = {
        q_id: apiBlock.q_id,
        child_question: freeTextChildQId,
        is_Terminating: 0,
        option_value: '',
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

    console.log('api call===>', isApiCall);
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
      <div>
        <div className="p-5">
          {/* <Input
                        label={'Question text'}
                        value={question}
                        block={block}
                        handleChange={handleChangeQuestion}
                        formControlProps={{ className: 'input-wrapper full-input' }}
                    /> */}

          <div className="row">
            <div className="col-md-9">
              <label>Question</label>
              <Form.Group className="input-group mb-3">
                <Form.Control
                  type="text"
                  name=""
                  placeholder="Question Text"
                  className="form-control"
                  block={block}
                  value={question}
                  onChange={handleChangeQuestion}
                />
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
              {/* <DropdownMenu
                                    options={questionTypeOptions}
                                    openMenu={openMenu}
                                    handleClick={handleClick}
                                    handleClose={handleClose}
                                    selected={block.question_type}
                                    handleSelect={handleSelect}
                                /> */}
            </div>
          </div>

          {block.question_type === 'Free Text' ? (
            <div className="my-2 pt-2">
              <FormControl className="input-wrapper">
                <FormLabel>Child question</FormLabel>
              </FormControl>

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
                        onChange={(e) => handleSelectOptions(e, op)}
                        options={options}
                        inputLook
                      />
                    </FormControl>
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
              disabled={block.question_type === 'Free Text'}
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

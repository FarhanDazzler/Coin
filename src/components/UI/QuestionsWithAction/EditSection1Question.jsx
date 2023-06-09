import React, { useEffect, useState } from 'react';
import CustomModal from '../CustomModal';
import Input from '../Input';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '../Button';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import Select from '../Select/Select';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DropdownMenu from '../DropdownMenu';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSection1OptionQuestions,
  deleteSection1QuestionsOption,
  getSection1Questions,
  updateOptionSection1Questions,
  updateSection1Questions,
} from '../../../redux/Questions/QuestionsAction';
import RemoveWarningModal from '../AttributesRemoveModal';
import blockType from '../../RenderBlock/constant';
import { Checkbox, Loader, Text } from '@mantine/core';
import { question1EditLoadingListSelector } from '../../../redux/Questions/QuestionsSelectors';
import { QuestionType } from '../../../pages/QuestionBank/ModifyStandard/AddSection1Question';
import { Form } from 'react-bootstrap';

const EditSection1Question = ({
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
  const question1EditLoadingList = useSelector(question1EditLoadingListSelector);
  const [isFailedFreeText, setIsFailedFreeText] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (questionOptions.length > 0) setFreeTextChildQId(questionOptions[0].child_question);
  }, [questionOptions]);

  useEffect(() => {
    if (saveLoading && question1EditLoadingList.length === 0) {
      dispatch(getSection1Questions({ Control_ID: 'Standard', disabledLoading: true }));
      setSaveLoading(false);
      setShowEditModal(false);
    }
  }, [question1EditLoadingList]);

  const handleChangeQuestion = (value) => {
    setQuestion(value);
  };

  useEffect(() => {
    setBlock(apiBlock);
  }, [apiBlock]);

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
      dispatch(deleteSection1QuestionsOption({ option_id: showRemoveModal.option_id }));
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
        is_Failing: 0,
      },
    ]);
  };

  const handleSaveQuestion = () => {
    let isApiCall = false;
    if (apiBlock.question_text !== question || apiBlock.question_type !== block.question_type) {
      isApiCall = true;
      const is_AD = block.question_type === 'Is AD';
      dispatch(
        updateSection1Questions({
          q_id: apiBlock.q_id,
          Control_ID: apiBlock.Control_ID,
          question_text: question,
          question_type: block.question_type,
          is_AD: is_AD ? 1 : 0,
          loadingId: `${uuidv4()}-updateSection1Questions`,
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
            updateOptionSection1Questions({
              editArray: [{ ...payload }],
              loadingId: `${uuidv4()}-updateOptionSection1Questions`,
            }),
          );
        }
      } else {
        isApiCall = true;
        dispatch(
          addSection1OptionQuestions({
            addArray: [{ ...payload }],
            loadingId: `${uuidv4()}-addSection1OptionQuestions`,
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
            deleteSection1QuestionsOption({
              option_id,
              loadingId: `${uuidv4()}-deleteSection1QuestionsOption--${i}`,
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
        updateOptionSection1Questions({
          editArray,
          loadingId: `${uuidv4()}-updateOptionSection1Questions`,
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
        addSection1OptionQuestions({
          addArray,
          loadingId: `${uuidv4()}-addSection1OptionQuestions`,
        }),
      );
    }
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
      open={showEditModal === block.q_id}
      onClose={() => setShowEditModal(false)}
      width={900}
      title="Edit Question"
      bodyClassName="p-0"
    >
      <div>
        <div className="p-5">
          <Input
            label={'Question text'}
            value={question}
            block={block}
            handleChange={handleChangeQuestion}
            formControlProps={{ className: 'input-wrapper full-input' }}
          />
          <div className="d-flex justify-content-end pt-5">
            <Form.Group className="input-group mb-3" style={{ maxWidth: 193 }}>
              <Form.Control
                as="select"
                name=""
                placeholder=""
                className="form-select"
                onChange={(e) => {
                  setBlock({ ...block, question_type: e.target.value });
                }}
                value={block.question_type}
              >
                <option value="" disabled>
                  Select Question Type
                </option>
                {QuestionType.map((data, i) => (
                  <option value={data?.value} key={i}>
                    {data?.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>

          {['Free Text', 'Is AD'].includes(block.question_type) ? (
            <div className="d-flex align-items-end justify-content-between">
              <div className="my-2 pt-2 w-full">
                <FormControl className="input-wrapper">
                  <FormLabel>Sub question</FormLabel>
                </FormControl>
                <FormControl sx={{ width: '100%', color: '#000' }} size="small">
                  <Select
                    placeholder="Select sub question"
                    value={freeTextChildQId}
                    onChange={({ target: { value } }) => setFreeTextChildQId(value)}
                    options={options}
                    inputProps={{ 'aria-label': 'Without label' }}
                    inputLook
                  />
                </FormControl>
              </div>
              <div style={{ minWidth: 200 }} className="pl-3 mb-3 d-flex justify-content-end">
                <Checkbox
                  color={'yellow'}
                  onChange={({ target: { checked } }) => setIsFailedFreeText(checked)}
                  label={<Text align="left">Failed questions</Text>}
                  checked={isFailedFreeText}
                />
              </div>
            </div>
          ) : (
            <div className="mt-2 w-full">
              <FormControl className="input-wrapper">
                <FormLabel>Question options</FormLabel>
              </FormControl>
              {questionOptions.map((op) => {
                if (op.isRemove) return;
                const selectedData = op?.is_Terminating ? 'is_Terminating' : op?.child_question;
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
                        value={selectedData}
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

export default EditSection1Question;

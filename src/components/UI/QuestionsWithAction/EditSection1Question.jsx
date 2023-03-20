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

const EditSection1Question = ({
  showEditModal,
  block = {},
  setShowEditModal,
  allQuestions,
  handleSave,
}) => {
  const [question, setQuestion] = useState();
  const [questionOptions, setQuestionOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [freeTextChildQId, setFreeTextChildQId] = useState('');
  const handleChangeQuestion = (value) => {
    setQuestion(value);
  };

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
        return { ...qOp, option_value: val };
      }
      return { ...qOp };
    });

    setQuestionOptions(updateOp);
  };

  const handleSelectOptions = ({ target: { value } }, op) => {
    const updateQ = questionOptions.map((upOp) => {
      if (upOp.option_id === op.option_id) {
        return { ...upOp, child_question: value };
      }
      return { ...upOp };
    });
    setQuestionOptions(updateQ);
  };

  const handleDeleteOption = (op) => () => {
    const updateQ = questionOptions.map((upOp) => {
      if (upOp.option_id === op.option_id) {
        return { ...upOp, isRemove: true };
      }
      return { ...upOp };
    });
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
    setShowEditModal(null);
    handleSave({ question, questionOptions, freeTextChildQId });
  };

  useEffect(() => {
    if (allQuestions.length > 0) {
      const op = allQuestions
        .map((allQ, i) => {
          return { label: `${i + 1}. ${allQ.question_text}`, value: allQ.q_id };
        })
        ?.filter((q) => q.value !== block.q_id);
      setOptions(op);
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

          {block.question_type === 'Free Text' ? (
            <div className="my-2 pt-4">
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
          ) : (
            <div className="mt-6">
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
              <Button color="neutral" className="ml-4" onClick={handleSaveQuestion}>
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default EditSection1Question;

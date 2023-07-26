import React from 'react';
import Input from '../Input';
import { Form } from 'react-bootstrap';
import { QuestionType } from '../../../pages/QuestionBank/ModifyStandard/AddSection1Question';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '../Select/Select';

const EditSection1QuestionChangeLangDesign = ({
  question,
  block,
  handleChangeQuestion,
  setBlock,
  freeTextChildQId,
  setFreeTextChildQId,
  questionOptions,
  handleChangeOption,
  options,
  questionText = 'Question text',
  questionOptionText = 'Question options',
}) => {
  const handleChangeQuestionInput = (e) => {
    if (handleChangeQuestion) handleChangeQuestion(e);
  };

  const handleChangeOptionVal = (data, op) => {
    if (handleChangeOption) handleChangeOption(data, op);
  };

  return (
    <div>
      <Input
        label={questionText}
        value={question}
        block={block}
        disabled={!handleChangeQuestion}
        handleChange={handleChangeQuestionInput}
        placeholder=" Enter question text"
        formControlProps={{ className: 'input-wrapper full-input mb-4' }}
      />

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
                onChange={({ target: { value } }) => {
                  setFreeTextChildQId && setFreeTextChildQId(value);
                }}
                disabled={!setFreeTextChildQId}
                options={options}
                inputProps={{ 'aria-label': 'Without label' }}
                inputLook
              />
            </FormControl>
          </div>
        </div>
      ) : (
        <div className="mt-2 w-full">
          <FormControl className="input-wrapper">
            <FormLabel>{questionOptionText}</FormLabel>
          </FormControl>
          {questionOptions.map((op) => {
            if (op.isRemove) return;
            const selectedData = op?.is_Terminating ? 'is_Terminating' : op?.child_question;
            return (
              <div className="my-2 d-flex align-items-center" key={op.option_id}>
                <Input
                  value={op.option_value}
                  block={op}
                  disabled={!handleChangeOption}
                  placeholder="Enter question options"
                  handleChange={handleChangeOptionVal}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default EditSection1QuestionChangeLangDesign;

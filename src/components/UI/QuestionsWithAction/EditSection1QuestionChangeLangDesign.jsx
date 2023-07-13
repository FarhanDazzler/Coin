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
}) => {
  const handleChangeQuestionInput = (e) => {
    if (handleChangeQuestion) handleChangeQuestion(e);
  };

  const handleChangeOptionVal = (data) => {
    if (handleChangeOption) handleChangeOption(data);
  };

  return (
    <div>
      <Input
        label={'Question text'}
        value={question}
        block={block}
        disabled={!handleChangeQuestion}
        handleChange={handleChangeQuestionInput}
        formControlProps={{ className: 'input-wrapper full-input' }}
      />
      <div className="d-flex justify-content-end pt-5">
        <Form.Group className="input-group mb-3" style={{ maxWidth: 193 }}>
          <Form.Control
            as="select"
            name=""
            placeholder=""
            className="form-select"
            disabled={!setBlock}
            onChange={(e) => {
              setBlock && setBlock({ ...block, question_type: e.target.value });
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

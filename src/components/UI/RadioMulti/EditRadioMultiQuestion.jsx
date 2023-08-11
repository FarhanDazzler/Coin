import React, { useEffect, useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { Checkbox, Text } from '@mantine/core';
import cs from 'classnames';
import './stylex.scss';
import { Form } from 'react-bootstrap';
import { TranslateType } from '../../../pages/QuestionBank/ModifyStandard/AddSection1Question';
import { languageToTextKey } from '../../../utils/helper';

const EditRadioMultiQuestion = ({ block, onClose, onSave, isChangeLang }) => {
  const [localBlock, setLocalBlock] = useState(block);
  const [language, setLanguage] = useState('');
  const [localLangBlock, setLocalLangBlock] = useState({ question_text: '', innerOptions: [] });

  useEffect(() => {
    if (!language || !block) return;
    const keyQuestion = languageToTextKey(language) + 'Header_Question';
    const keyOption = languageToTextKey(language) + 'innerOptions';
    setLocalLangBlock({
      ...block,
      question_text: block[keyQuestion] || '',
      innerOptions: block[keyOption] || [],
      language,
    });
  }, [block, language]);
  const handleChangeQuestion = (value, block) => {
    if (isChangeLang) {
      const keyQuestion = languageToTextKey(language) + 'Header_Question';
      setLocalLangBlock({ ...localLangBlock, question_text: value, [keyQuestion]: value });
      return;
    }
    setLocalBlock({ ...localBlock, question_text: value, label: value });
  };

  const handleChangeQuestionFail = (value) => {
    setLocalBlock({ ...localBlock, is_Failing: value });
  };
  const handleChangeLabel = (value, block) => {
    if (isChangeLang) {
      const updateOptions = localLangBlock.innerOptions.map((val) => {
        if (val.q_id === block.q_id) {
          return { ...val, question_text: value };
        }
        return { ...val };
      });
      setLocalLangBlock({ ...localLangBlock, innerOptions: updateOptions });
      return;
    }

    const updateOptions = localBlock.innerOptions.map((val) => {
      if (val.q_id === block.q_id) {
        return { ...val, question_text: value };
      }
      return { ...val };
    });
    setLocalBlock({ ...localBlock, innerOptions: updateOptions });
  };
  const handleAddQuestion = () => {
    const updateOptions = [
      ...localBlock.innerOptions,
      {
        is_Terminating: 0,
        options: [
          {
            option_id: Date.now() + '_option_id_yes',
            option_value: 'Yes',
            q_id: Date.now() + 'option_q_yes',
          },
          {
            option_id: Date.now() + '_option_id_no',
            option_value: 'No',
            q_id: Date.now() + 'option_q_no',
          },
        ],
        q_id: Date.now(),
        question_text: '',
        question_type: 'Radio',
      },
    ];
    setLocalBlock({ ...localBlock, innerOptions: updateOptions });
    setTimeout(() => {
      const div = document.getElementById('show-display');
      div.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
  };

  const handleDelete = (block) => () => {
    const filterOptions = localBlock.innerOptions.filter((val) => val.q_id !== block.q_id);
    setLocalBlock({ ...localBlock, innerOptions: filterOptions });
  };
  const handleSave = () => {
    if (isChangeLang) {
      if (onSave) onSave({ ...localLangBlock, language });
      return;
    }
    if (onSave) onSave(localBlock);
  };

  return (
    <div>
      <div className={cs({ ['isChangeLang']: isChangeLang })}>
        <div className="p-5 border-right">
          <h3 className="text-str">{block?.Level ? block?.Level : ''} in English</h3>
          <div className="mb-4 d-flex align-items-center">
            <Input
              block={block}
              label="Question header"
              value={localBlock.question_text}
              handleChange={handleChangeQuestion}
              formControlProps={{ className: 'input-wrapper full-input' }}
              disabled={isChangeLang}
            />
            {!isChangeLang && (
              <div
                style={{ minWidth: 164, marginTop: 25 }}
                className="pl-3 d-flex justify-content-end radio-label"
              >
                <Checkbox
                  color={'yellow'}
                  disabled={isChangeLang}
                  checked={localBlock.is_Failing === 1}
                  onChange={({ target: { checked } }) => handleChangeQuestionFail(checked ? 1 : 0)}
                  label={<Text align="left">Failed questions</Text>}
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <label>Question text</label>
            {localBlock.innerOptions.map((op, i) => {
              return (
                <div className="d-flex align-items-center mb-2" key={op.q_id}>
                  <span className="typography-18-medium mr-2">{i + 1}</span>
                  <Input
                    block={op}
                    value={op.question_text}
                    handleChange={handleChangeLabel}
                    formControlProps={{ className: 'input-wrapper full-input' }}
                    disabled={isChangeLang}
                  />
                  {!isChangeLang && (
                    <Tooltip title="Delete" placement="right">
                      <IconButton aria-label="delete" onClick={handleDelete(op)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </div>
              );
            })}
            <div id="show-display" />
          </div>
        </div>

        <div className="p-5">
          <div className="d-flex justify-content-end">
            <Form.Group className="input-group mb-3" style={{ maxWidth: 193 }}>
              <Form.Control
                as="select"
                name=""
                placeholder=""
                className="form-select"
                onChange={({ target: { value } }) => {
                  setLanguage(value);
                }}
                value={language}
              >
                <option value="" disabled>
                  Select Language
                </option>
                {TranslateType.map((data, i) => (
                  <option value={data?.value} key={i}>
                    {data?.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
          {language ? (
            <>
              <div className="mb-4 d-flex align-items-center">
                <Input
                  block={block}
                  label="Question header"
                  value={localLangBlock.question_text}
                  handleChange={handleChangeQuestion}
                  formControlProps={{ className: 'input-wrapper full-input' }}
                />
              </div>
              <div className="mb-4">
                <label>Question text</label>
                {localLangBlock.innerOptions.map((op, i) => {
                  return (
                    <div className="d-flex align-items-center mb-2" key={op.q_id}>
                      <span className="typography-18-medium mr-2">{i + 1}</span>
                      <Input
                        block={op}
                        value={op.question_text}
                        handleChange={handleChangeLabel}
                        formControlProps={{ className: 'input-wrapper full-input' }}
                      />
                    </div>
                  );
                })}
                <div id="show-display" />
              </div>
            </>
          ) : (
            <div className="no-data-placeholder">
              <p>Select Language</p>
            </div>
          )}
        </div>
      </div>
      <div className="footer-action">
        <div className="d-flex align-items-center justify-content-between">
          {!isChangeLang ? (
            <Button
              color="silver"
              startIcon={<LibraryAddOutlinedIcon />}
              onClick={handleAddQuestion}
            >
              Add question
            </Button>
          ) : (
            <div />
          )}

          <div>
            <Button variant="outlined" color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button color="neutral" className="ml-4" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRadioMultiQuestion;

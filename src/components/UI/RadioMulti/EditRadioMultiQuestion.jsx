import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

const EditRadioMultiQuestion = ({ block, onClose, onSave }) => {
  const [localBlock, setLocalBlock] = useState(block);

  const handleChangeQuestion = (value, block) => {
    setLocalBlock({ ...localBlock, question_text: value, label: value });
  };
  const handleChangeLabel = (value, block) => {
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
    if (onSave) onSave(localBlock);
  };

  return (
    <div>
      <div className="p-5">
        <div className="mb-4">
          <Input
            block={block}
            label="Question header"
            value={localBlock.question_text}
            handleChange={handleChangeQuestion}
            formControlProps={{ className: 'input-wrapper full-input' }}
          />
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
                />

                <Tooltip title="Delete" placement="right">
                  <IconButton aria-label="delete" onClick={handleDelete(op)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            );
          })}
          <div id="show-display" />
        </div>
      </div>
      <div className="footer-action">
        <div className="d-flex align-items-center justify-content-between">
          <Button color="silver" startIcon={<LibraryAddOutlinedIcon />} onClick={handleAddQuestion}>
            Add question
          </Button>

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

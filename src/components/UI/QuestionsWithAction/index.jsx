import React from 'react';
import './questionsWithActionStyles.scss';
import Button from '../Button';
import { ReactComponent as EditIcon } from '../../../assets/images/Edit.svg';
import { ReactComponent as Delete } from '../../../assets/images/Trash.svg';

const QuestionsWithAction = ({ number, text, withAction }) => {
  return (
    <div className="questions-with-action-wrapper">
      <div className="d-flex align-items-center w-100">
        <div className="questions-number">{number}</div>
        <p className="mb-0 question-text">{text}</p>
      </div>
      {withAction && (
        <div className="d-flex align-items-center">
          <Button color="secondary" size="large" startIcon={<EditIcon />} variant="text">
            Edit
          </Button>
          <Button
            color="secondary"
            size="large"
            startIcon={<Delete />}
            className="ml-2"
            variant="text"
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuestionsWithAction;

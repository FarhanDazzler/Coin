import React, { useState } from 'react';
import './questionsWithActionStyles.scss';
import Button from '../Button';
import { ReactComponent as EditIcon } from '../../../assets/images/Edit.svg';
import { ReactComponent as Delete } from '../../../assets/images/Trash.svg';
import RemoveWarningModal from '../AttributesRemoveModal';
import EditSection1Question from './EditSection1Question';

const QuestionsWithAction = ({
  number,
  block,
  text,
  withAction,
  active,
  handleDelete = () => {},
  allQuestions = [],
}) => {
  const [showEditModal, setShowEditModal] = useState(null);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  return (
    <div className="questions-with-action-wrapper" style={{ opacity: active ? 1 : 0.5 }}>
      <div className="d-flex align-items-center w-100">
        <div className="questions-number">{number}</div>
        <p className="mb-0 question-text">{text}</p>
      </div>
      {withAction && (
        <div className="d-flex align-items-center">
          <Button
            color="secondary"
            size="large"
            startIcon={<EditIcon />}
            variant="text"
            onClick={() => setShowEditModal(block.q_id)}
          >
            Edit
          </Button>
          <Button
            color="secondary"
            size="large"
            startIcon={<Delete />}
            className="ml-2"
            variant="text"
            onClick={() => {
              setShowRemoveModal(true);
            }}
          >
            Delete
          </Button>
        </div>
      )}
      {showRemoveModal && (
        <RemoveWarningModal
          onClose={() => setShowRemoveModal(false)}
          onConfirm={() => {
            setShowRemoveModal(false);
            handleDelete(block);
          }}
        />
      )}

      <EditSection1Question
        block={block}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        allQuestions={allQuestions}
        // handleSave={handleSave}
      />
    </div>
  );
};

export default QuestionsWithAction;

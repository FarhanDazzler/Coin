import React, { useState } from 'react';
import './questionsWithActionStyles.scss';
import Button from '../Button';
import { ReactComponent as EditIcon } from '../../../assets/images/Edit.svg';
import { ReactComponent as Delete } from '../../../assets/images/Trash.svg';
import RemoveWarningModal from '../AttributesRemoveModal';
import EditSection1Question from './EditSection1Question';
import EditSection1QuestionOption from '../../../pages/QuestionBank/ModifyStandard/EditSectionQuestionOption';
import EditSection1QuestionChangeLang from './EditSection1QuestionChangeLang';

const QuestionsWithAction = ({
  number,
  block,
  text,
  withAction,
  active,
  handleDelete = () => {},
  allQuestions = [],
  handleSave = () => {},
  templateType,
  isChangeLang,
}) => {
  const [showEditModal, setShowEditModal] = useState(null);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [changeLangModal, setChangeLangModal] = useState(null);
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
            className="w-max"
            size="large"
            startIcon={<EditIcon />}
            variant="text"
            onClick={() => {
              if (isChangeLang) {
                setChangeLangModal(block.q_id);
              } else {
                setShowEditModal(block.q_id);
              }
            }}
          >
            {isChangeLang ? 'Select language' : 'Edit'}
          </Button>
          {!isChangeLang && (
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
          )}
        </div>
      )}
      {showRemoveModal && (
        <RemoveWarningModal
          onClose={() => setShowRemoveModal(false)}
          block={block}
          onConfirm={() => {
            setShowRemoveModal(false);
            handleDelete(block);
          }}
        />
      )}
      {templateType === 'Standard' ? (
        <EditSection1Question
          block={block}
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          allQuestions={allQuestions}
          handleSave={handleSave}
        />
      ) : (
        <EditSection1QuestionOption
          block={block}
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
          allQuestions={allQuestions}
          handleSave={handleSave}
        />
      )}

      {changeLangModal && (
        <EditSection1QuestionChangeLang
          block={block}
          showEditModal={changeLangModal}
          setShowEditModal={setChangeLangModal}
          allQuestions={allQuestions}
          handleSave={handleSave}
        />
      )}
    </div>
  );
};

export default QuestionsWithAction;

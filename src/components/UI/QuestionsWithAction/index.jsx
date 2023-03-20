import React, { useState, useEffect } from 'react';
import './questionsWithActionStyles.scss';
import Button from '../Button';
import { ReactComponent as EditIcon } from '../../../assets/images/Edit.svg';
import { ReactComponent as Delete } from '../../../assets/images/Trash.svg';
import RemoveWarningModal from '../AttributesRemoveModal';

const QuestionsWithAction = ({ number, text, withAction, active, data, handleChange }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectData, setSelectData] = useState();
  const [isEdit, setIsEdit] = useState(true)
  const handleDeleteQuestion = (i) => {
    console.log(i);
    setShowRemoveModal(true);
    setSelectData(i);
  }
  const handleEditQuestion = (data) => {
    console.log(data?.options?.length);
    if(data?.options?.length === 0){
      setIsEdit(false)
    }
  
  }
  return (
    <div className="questions-with-action-wrapper" style={{ opacity: active ? 1 : 0.5 }}>
      <div className="d-flex align-items-center w-100">
        <div className="questions-number">{number}</div>
        <p className="mb-0 question-text">{text}</p>
      </div>
      {withAction && (
        <div className="d-flex align-items-center">
          <Button color="secondary" size="large" startIcon={<EditIcon />} variant="text" onClick={() => handleEditQuestion(data)}>
            Edit
          </Button>
          <Button
            color="secondary"
            size="large"
            startIcon={<Delete />}
            className="ml-2"
            variant="text"
            onClick={() => handleDeleteQuestion(data)}
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
              handleChange('delete', selectData);
            }}
          />
        )}
    </div>
  );
};

export default QuestionsWithAction;

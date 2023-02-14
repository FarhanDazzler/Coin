import React from 'react';
import AssessmentForm from '../../Sections/AssessmentForm';

const ControlFormModal = ({ Control_ID }) => {
  return (
    <div className="modal-form-wrapper">
      <div>
        <AssessmentForm control_id={Control_ID} />
      </div>
    </div>
  );
};

export default ControlFormModal;

import React, { useState } from 'react';
import FormLabel from '@mui/material/FormLabel';
import Radio from '../Radio';
import MultiActionMenu from '../MultiActionMenu';
import RemoveWarningModal from '../AttributesRemoveModal';
import CustomModal from '../CustomModal';
import EditRadioMultiQuestion from './EditRadioMultiQuestion';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const RadioMulti = ({ block, label, renderOption, handleChange, index }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const handleEditLabel = () => {
    setShowEditModal(true);
  };

  const saveQuestion = (updateBlock) => {
    handleChange(updateBlock, {}, block);
    setShowEditModal(false);
  };

  return (
    <div className="radio-multi-wrapper">
      <div className="radio-wrapper">
        <div className="d-flex align-items-center w-100 justify-content-between">
          <FormLabel>{label}</FormLabel>
          {block?.isQuestionLabelEdit && (
            <MultiActionMenu
              handleEdit={handleEditLabel}
              handleDelete={() => {
                setShowRemoveModal(true);
              }}
            />
          )}
        </div>
      </div>
      <div className="first-three-options mt-3">
        {renderOption.map((firstOption, i) => {
          return (
            <div className="mb-2" key={`${i}--${index}`}>
              <Radio
                block={firstOption}
                formControlProps={{ className: 'radio-wrapper side-by-side-radio-wrapper' }}
                radioGroupProps={{
                  className: 'side-by-side-radio',
                }}
                formLabelProps={{ className: 'side-by-side-radio-label' }}
                label={firstOption.label}
                options={firstOption.options}
                value={firstOption.value}
                handleChange={(value, innerBlock) => {
                  if (block?.isQuestionLabelEdit) return;
                  handleChange(value, innerBlock, block);
                }}
              />
            </div>
          );
        })}
        <CustomModal
          bodyClassName="p-0"
          title={
            <div className="d-flex align-items-center ">
              Edit Question
              <EditOutlinedIcon fontSize="small" className="ml-2" />
            </div>
          }
          open={showEditModal}
          onClose={() => setShowEditModal(false)}
          width={900}
        >
          <EditRadioMultiQuestion
            block={block}
            onClose={() => setShowEditModal(false)}
            onSave={saveQuestion}
          />
        </CustomModal>
        {showRemoveModal && (
          <RemoveWarningModal
            onClose={() => setShowRemoveModal(false)}
            onConfirm={() => {
              setShowRemoveModal(false);
              handleChange('delete', {}, block);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default RadioMulti;

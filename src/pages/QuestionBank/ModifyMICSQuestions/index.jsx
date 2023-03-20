import React, { useEffect, useState } from 'react';
import './ModifyMICSQuestionsStyles.scss';
import CustomModal from '../../../components/UI/CustomModal';
import Button from '../../../components/UI/Button';
import MICSSpecific from './MICSSpecific';
import ModifyStandard from './ModifyStandard';

const ModifyMICSQuestions = ({ open, handleClose, type = '' }) => {
  const [activeType, setActiveType] = useState(type);

  const handleSetType = (selectType) => {
    setActiveType(selectType);
  };
  useEffect(() => {
    setActiveType(type);
  }, [type]);

  return (
    <div>
      <CustomModal
        open={open}
        title={<span>Modify Survey for Existing MICS</span>}
        width={1080}
        onClose={handleClose}
        bodyClassName="p-0"
      >
        <div className="p-5">
          <div className="d-flex justify-content-center">
            <Button className="mx-3" color="silver">
              Template 1
            </Button>
            <Button
              className="mx-3"
              color={activeType === 'Standard' ? 'neutral' : 'silver'}
              onClick={() => handleSetType('Standard')}
            >
              Standard
            </Button>
            <Button
              className="mx-3"
              color={activeType === 'MICS-Specific' ? 'neutral' : 'silver'}
              onClick={() => handleSetType('MICS-Specific')}
            >
              MICS-Specific
            </Button>
          </div>

          {activeType === 'Standard' && <ModifyStandard />}
          {activeType === 'MICS-Specific' && <MICSSpecific handleClose={handleClose} />}
        </div>
      </CustomModal>
    </div>
  );
};

export default ModifyMICSQuestions;

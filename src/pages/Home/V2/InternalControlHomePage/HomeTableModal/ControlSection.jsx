import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CollapseFrame from '../../../../../components/UI/CollapseFrame';
import { useTranslation } from 'react-i18next';
import CustomTextarea from '../../../../../components/UI/CustomTextarea';
import DatePickers from '../../../../../components/UI/DatePickers';
import Button from '../../../../../components/UI/Button';

const ControlSection = ({ setShowControlSection }) => {
  const { t } = useTranslation();

  const handleSave = () => {
    setShowControlSection(true);
  };

  return (
    <div>
      <CollapseFrame title={t('selfAssessment.assessmentForm.section0_Standard')} active>
        <div className="mt-5">
          <div className="renderBlockWrapper">
            <CustomTextarea label="Issue Description: " name="IssueDescription" />
            <CustomTextarea
              formControlProps={{ style: { paddingTop: 20 } }}
              label="Resolution/Action Plan:: "
              name="actkonPlan"
            />

            <div className="pt-4 d-flex align-items-center">
              <DatePickers label="Original Due Date" />
              <div className="pl-5">
                <DatePickers label="Revised Due Date" />
              </div>
            </div>

            <div className="pt-8">
              <div className="d-flex justify-content-between">
                <Button color="neutral" onClick={handleSave}>
                  ISSUE RESOLVED?
                </Button>
                <div className="d-flex">
                  <Button color="neutral" onClick={handleSave}>
                    Yes
                  </Button>
                  <div className="pl-5">
                    <Button color="neutral" onClick={handleSave}>
                      No
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CollapseFrame>
    </div>
  );
};

export default ControlSection;

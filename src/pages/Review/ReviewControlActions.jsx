import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Button from '../../components/UI/Button';

const ReviewControlActions = ({ activeData }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('Scope');
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const stateControlData = useSelector((state) => state?.controlData?.controlData?.data);
  const stateGcdData = useSelector((state) => state?.controlData?.gcd?.data);
  const renderPeriodOfAssessment = () => {
    const year = activeData?.Year;
    switch (activeData?.Assessment_Cycle) {
      case 'Assessment Cycle 1':
        return 'As on March / ' + year;

      case 'Assessment Cycle 2':
        return 'As on June / ' + year;

      case 'Assessment Cycle 3':
        return 'As on September / ' + year;

      case 'Assessment Cycle 4':
        return 'As on December / ' + year;

      default:
        return year || '';
    }
  };

  const isClear = (text) => activeTab === text;
  return (
    <div className="control-actions-wrapper">
      <div className="pb-5 pt-4">
        <Button
          // disabled={activeTab && activeTab !== 'Scope'}
          className={activeTab === 'Scope' ? 'mr-4 active' : 'mr-4'}
          onClick={() => setActiveTab(isClear('Scope') ? '' : 'Scope')}
        >
          {t('selfAssessment.assessmentForm.scopeBtn')}
        </Button>
        <Button
          // disabled={activeTab && activeTab !== 'GCD'}
          className={activeTab === 'GCD' ? 'mr-4 active' : 'mr-4'}
          onClick={() => setActiveTab(isClear('GCD') ? '' : 'GCD')}
        >
          {t('selfAssessment.assessmentForm.globalControlDescriptionBtn')}
        </Button>
        <Button
          // disabled={activeTab && activeTab !== 'LCD'}
          className={activeTab === 'LCD' ? 'mr-4 active' : 'mr-4'}
          onClick={() => setActiveTab(isClear('LCD') ? '' : 'LCD')}
        >
          {t('selfAssessment.assessmentForm.localControlDescriptionBtn')}
        </Button>
      </div>
      <div className="control-actions-collapse">
        {activeTab === 'GCD' && (
          <div>
            {isReadMore ? (
              <>
                <h4>L1:-</h4>{' '}
                {stateGcdData[0]?.mics_L1desc ? (
                  <p
                    dangerouslySetInnerHTML={{ __html: stateGcdData[0]?.mics_L1desc.slice(0, 600) }}
                  />
                ) : (
                  ''
                )}
              </>
            ) : (
              <>
                <h4>L1:-</h4>{' '}
                {stateGcdData[0]?.mics_L1desc ? (
                  <p dangerouslySetInnerHTML={{ __html: stateGcdData[0]?.mics_L1desc }} />
                ) : (
                  'None'
                )}
                <h4>L2:-</h4>{' '}
                {stateGcdData[0]?.mics_L2desc ? (
                  <p dangerouslySetInnerHTML={{ __html: stateGcdData[0]?.mics_L2desc }} />
                ) : (
                  'None'
                )}
                <h4>L3:-</h4>{' '}
                {stateGcdData[0]?.mics_L3desc ? (
                  <p dangerouslySetInnerHTML={{ __html: stateGcdData[0]?.mics_L3desc }} />
                ) : (
                  'None'
                )}
              </>
            )}

            <strong>
              <span onClick={toggleReadMore} className="golden-text read-or-hide">
                {isReadMore
                  ? `...${t('selfAssessment.assessmentForm.showMoreBtn')}`
                  : t('selfAssessment.assessmentForm.showLessBtn')}
              </span>
            </strong>
          </div>
        )}
        {activeTab === 'LCD' && (
          <div>
            <p className="mb-2" dangerouslySetInnerHTML={{ __html: stateControlData.lcd }} />
          </div>
        )}
        {activeTab === 'Scope' && (
          <div>
            <p className="mb-2">
              <span className="font-weight-bold">Receiving entity: </span>
              <span>{stateControlData?.Receiver || activeData?.Receiver}</span>
            </p>
            <p className="mb-2">
              <span className="font-weight-bold">Provider organization: </span>
              <span>{stateControlData?.Provider || activeData?.Provider}</span>
            </p>
            <p className="mb-2">
              <span className="font-weight-bold">Period of assessment: </span>
              <span>{renderPeriodOfAssessment()}</span>
            </p>
            <p className="mb-2">
              <span className="font-weight-bold">Assessment Cycle: </span>
              <span>{stateControlData?.Assessment_Cycle || activeData?.Assessment_Cycle}</span>
            </p>
            <p className="mb-2">
              <span className="font-weight-bold">Frequency of control: </span>
              <span>{stateControlData?.frequency}</span>
            </p>
            <p className="mb-2">
              <span className="font-weight-bold">Mega Process: </span>
              <span>{stateControlData?.mega_process}</span>
            </p>
            <p className="mb-2">
              <span className="font-weight-bold">Control owner: </span>
              <span>{stateControlData?.Control_Owner || activeData?.Control_Owner}</span>
            </p>
            <p className="mb-2">
              <span className="font-weight-bold">Control Oversight: </span>
              <span>{stateControlData?.Control_Oversight || activeData?.Control_Oversight}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewControlActions;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../../components/UI/Button';
import { useTranslation } from 'react-i18next';
import PreviousResultsOnCoin from './PreviousResultsOnCoin';

const ControlActions = ({
  activeData,
  setIsModal,
  isModal,
  isReview,
  isOverride,
  setIsOverride,
}) => {
  const { t } = useTranslation();
  const params = new URL(document.location).searchParams;
  const Year = decodeURIComponent(params.get('Year'));

  const [activeTab, setActiveTab] = useState('Scope');
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const stateControlData = useSelector((state) => state?.controlData?.controlData?.data);
  const stateGcdData = useSelector((state) => state?.controlData?.gcd?.data);

  const selected_Role = localStorage.getItem('selected_Role');
  const loginRole = useSelector((state) => state?.auth?.loginRole);
  const role = loginRole || selected_Role;
  const isHideOverride = [
    'Control Owner',
    'Control owner',
    'control_owner',
    'Control Oversight',
    'Control oversight',
    'control_oversight',
  ].includes(role);

  // Render Assessment Cycle message with year
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
        return Year || '';
    }
  };

  const transformText = (text) => {
    const regex = /\[KPI_[\s\S]*/; // Regex to match text starting from the first "[KPI_" to the end
    const matchedText = text.match(regex);

    if (matchedText) {
      const beforeText = text.split(matchedText)[0];
      const highlightedText = `<strong><span class='golden-text'>${matchedText[0]}</span></strong>`;
      return beforeText + highlightedText;
    }

    return text;
  };

  const isClear = (text) => activeTab === text;

  return (
    <div className="control-actions-wrapper">
      <div className="pb-5 pt-4 d-flex justify-content-between">
        <div>
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
          {/*// check user role not -> 'Control owner', 'control_owner', 'Control oversight', 'control_oversight' then show edit button*/}
          {isReview && !isHideOverride && (
            <Button
              // disabled={activeTab && activeTab !== 'LCD'}
              className={!isModal ? 'mr-4 active' : 'mr-4'}
              onClick={() => {
                setIsOverride(!isOverride);
                setIsModal(!isModal);
              }}
            >
              {t('selfAssessment.assessmentForm.edit')}
            </Button>
          )}

          <Button
            // disabled={activeTab && activeTab !== 'LCD'}
            className={activeTab === 'previous_results_on_coin' ? 'mr-4 active' : 'mr-4'}
            onClick={() =>
              setActiveTab(isClear('previous_results_on_coin') ? '' : 'previous_results_on_coin')
            }
          >
            {t('selfAssessment.assessmentForm.previous_results_on_coin')}
          </Button>
        </div>
      </div>
      <div className="control-actions-collapse">
        {activeTab === 'GCD' && (
          <div>
            {isReadMore ? (
              <div className="bg-light-black">
                <Button className={'active mb-2 cursor-auto'}>L1:-</Button>{' '}
                {stateGcdData[0]?.mics_L1desc ? (
                  <p
                    className="m-0"
                    dangerouslySetInnerHTML={{
                      __html: transformText(stateGcdData[0]?.mics_L1desc.slice(0, 600) || ''),
                    }}
                  />
                ) : (
                  ''
                )}
              </div>
            ) : (
              <>
                <div className="bg-light-black">
                  <Button className={'active mb-2 cursor-auto'}>L1:-</Button>{' '}
                  {stateGcdData[0]?.mics_L1desc ? (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: transformText(stateGcdData[0]?.mics_L1desc || ''),
                      }}
                    />
                  ) : (
                    'None'
                  )}
                </div>
                <div className="bg-light-black">
                  <Button className={'active mb-2 cursor-auto'}>L2:-</Button>{' '}
                  {stateGcdData[0]?.mics_L2desc ? (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: transformText(stateGcdData[0]?.mics_L2desc || ''),
                      }}
                    />
                  ) : (
                    'None'
                  )}
                </div>
                <div className="bg-light-black">
                  <Button className={'active mb-2 cursor-auto'}>L3:-</Button>{' '}
                  {stateGcdData[0]?.mics_L3desc ? (
                    <p
                      dangerouslySetInnerHTML={{
                        __html: transformText(stateGcdData[0]?.mics_L3desc || ''),
                      }}
                    />
                  ) : (
                    'None'
                  )}
                </div>
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
        {activeTab === 'previous_results_on_coin' && <PreviousResultsOnCoin />}
      </div>
    </div>
  );
};

export default ControlActions;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../../../../../components/UI/Button';

const ControlActions = () => {
  const [activeTab, setActiveTab] = useState('');
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const stateControlData = useSelector((state) => state?.controlData?.controlData?.data);
  const stateGcdData = useSelector((state) => state?.controlData?.gcd?.data);
  const isClear = (text) => activeTab === text;
  return (
    <div className="control-actions-wrapper">
      <div className="pb-5 pt-4">
        <Button
          // disabled={activeTab && activeTab !== 'GCD'}
          className={activeTab === 'GCD' ? 'mr-4 active' : 'mr-4'}
          onClick={() => setActiveTab(isClear('GCD') ? '' : 'GCD')}
        >
          Global Control Description (GCD)
        </Button>
        <Button
          // disabled={activeTab && activeTab !== 'LCD'}
          className={activeTab === 'LCD' ? 'mr-4 active' : 'mr-4'}
          onClick={() => setActiveTab(isClear('LCD') ? '' : 'LCD')}
        >
          Local Control Description (LCD)
        </Button>
        <Button
          // disabled={activeTab && activeTab !== 'Scope'}
          className={activeTab === 'Scope' ? 'mr-4 active' : 'mr-4'}
          onClick={() => setActiveTab(isClear('Scope') ? '' : 'Scope')}
        >
          Scope
        </Button>
      </div>
      <div className="control-actions-collapse">
        {activeTab === 'GCD' && (
          <div>
            {isReadMore ? (
              <p dangerouslySetInnerHTML={{__html:stateGcdData[0].mics_L1desc.slice(0, 600)}}/>
            ) : (
              <>
               <p dangerouslySetInnerHTML={{__html:stateGcdData[0]?.mics_L1desc}}/>
               <p dangerouslySetInnerHTML={{__html:stateGcdData[0]?.mics_L2desc}}/>
               <p dangerouslySetInnerHTML={{__html:stateGcdData[0]?.mics_L3desc}}/>
              </>
            )}

            <strong>
              <span onClick={toggleReadMore} className="golden-text read-or-hide">
                {isReadMore ? '...Show more' : ' Show less'}
              </span>
            </strong>
          </div>
        )}
        {activeTab === 'LCD' && (
          <div>
            <p className="mb-2" dangerouslySetInnerHTML={{__html:stateControlData.lcd}}/>
          </div>
        )}
        {activeTab === 'Scope' && (
          <div>
            <p className="mb-2">
              <span className="font-weight-bold">Receiving entity: </span>
              <span>{stateControlData.receiving_entity}</span>
            </p>
            <p className="mb-2">
              <span className="font-weight-bold">Provider organization: </span>
              <span>{stateControlData.provider_org}</span>
            </p>
            <p className="mb-2">
              <span className="font-weight-bold">Period of assessment: </span>
              <span>{stateControlData.priod_of_assessment}</span>
            </p>
            <p className="mb-2">
              <span className="font-weight-bold">Assessment Cycle: </span>
              <span>{1}</span>
            </p>
            <p className="mb-2">
              <span className="font-weight-bold">Frequency of control: </span>
              <span>{stateControlData.frequency}</span>
            </p>
            <p className="mb-2">
              <span className="font-weight-bold">Mega Process: </span>
              <span>{stateControlData.mega_process}</span>
            </p>
            <p className="mb-2">
              <span className="font-weight-bold">Control owner: </span>
              <span>{stateControlData.cowner}</span>
            </p>
            <p className="mb-2">
              <span className="font-weight-bold">Control Oversight: </span>
              <span>{stateControlData.coversight}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlActions;

import React, { useState } from 'react';
import Button from '../../UI/Button';
import { useDispatch, useSelector } from 'react-redux';

const ControlActions = () => {
  const [activeTab, setActiveTab] = useState('');
  const stateControlData = useSelector((state) => state?.controlData?.data);
  console.log("sate", stateControlData);
  return (
    <div className="control-actions-wrapper">
      <div className="pb-5 pt-4">
        <Button
          disabled={activeTab && activeTab !== 'GCD'}
          className="mr-4"
          onClick={() => setActiveTab(activeTab ? '' : 'GCD')}
        >
          Global Control Description (GCD)
        </Button>
        <Button
          disabled={activeTab && activeTab !== 'LCD'}
          className="mr-4"
          onClick={() => setActiveTab(activeTab ? '' : 'LCD')}
        >
          Local Control Description (LCD)
        </Button>
        <Button
          disabled={activeTab && activeTab !== 'Scope'}
          onClick={() => setActiveTab(activeTab ? '' : 'Scope')}
        >
          Scope
        </Button>
      </div>
      <div className="control-actions-collapse">
        {activeTab === 'GCD' && (
          <div>
            <p className="font-weight-bold mb-2">
              MICS L1 - Minimal Requirements To Protect Financial Statement From Material Mistakes
              (External Compliance)
            </p>
            <p className="mb-2">Not tested for external compliance. Minimum compliance is L2. </p>
            <p className="text-yellow-dark">Show More</p>
          </div>
        )}
        {activeTab === 'LCD' && (
          <div>
            <p className="font-weight-bold mb-2">
              {stateControlData.lcd}
            </p>
          </div>
        )}
        {activeTab === 'Scope' && (
          <div>
            <p className="mb-2">
              <span className='font-weight-bold'>Receiving entity: </span><span>{stateControlData.receiving_entity}</span>
            </p>
            <p className="mb-2">
              <span className='font-weight-bold'>Provider org: </span><span>{stateControlData.provider_org}</span>
            </p>
            <p className="mb-2">
              <span className='font-weight-bold'>Period of assessment: </span><span>{stateControlData.priod_of_assessment}</span>
            </p>
            <p className="mb-2">
              <span className='font-weight-bold'>Frequency of control: </span><span>{stateControlData.frequency}</span>
            </p>
            <p className="mb-2">
              <span className='font-weight-bold'>Mega Process: </span><span>{stateControlData.mega_process}</span>
            </p>
          </div>
        )}
      </div>
      <hr />
      <div>
        <p className="mb-2">
          <span className='font-weight-bold'>Control Name: </span><span>{stateControlData.control_name}</span>
        </p>
        <p className="mb-2">
             <span className='font-weight-bold'>Control Oversight: </span><span>{stateControlData.coversight}</span>
            </p>
      </div>
    </div>
  );
};

export default ControlActions;

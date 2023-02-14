import React, { useState } from 'react';
import Button from '../../UI/Button';

const ControlActions = () => {
  const [activeTab, setActiveTab] = useState('');
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
      </div>
    </div>
  );
};

export default ControlActions;

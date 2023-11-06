import React, { useEffect, useMemo, useState } from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Tooltip from '@mui/material/Tooltip';
import Button from '../../../../MDM/MDM_Tab_Buttons/Button';
import BUZone_ZoneVPHomePage from './BUZone_ZoneVPHomePage';
import ZoneVPHomePage from './ZoneVPHomePage';

const ZoneVPHomePageContainer = () => {
  const [activeTab, setActiveTab] = useState('BU');

  const ActiveTool = ({ currentTab, text }) => (
    <Tooltip title={text} placement="bottom-start">
      <ErrorOutlineIcon color={activeTab === currentTab ? 'black' : '#ffc800'} />
    </Tooltip>
  );

  return (
    <>
      <div className="text-center pt-3">
        <Button
          variant="outlined"
          size="small"
          startIcon={<ActiveTool currentTab="BU" text="Home page for BU Rep Letter" />}
          className={activeTab === 'BU' ? 'active-tab-button' : 'mr-4 tabButton'}
          onClick={() => {
            setActiveTab('BU');
          }}
        >
          BU
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<ActiveTool currentTab="Zone" text="Home page for Zone Rep Letter" />}
          className={activeTab === 'Zone' ? 'active-tab-button' : 'mr-4 tabButton'}
          onClick={() => {
            setActiveTab('Zone');
          }}
        >
          Zone
        </Button>
      </div>
      {activeTab === 'BU' ? <ZoneVPHomePage /> : <BUZone_ZoneVPHomePage />}
    </>
  );
};

export default ZoneVPHomePageContainer;

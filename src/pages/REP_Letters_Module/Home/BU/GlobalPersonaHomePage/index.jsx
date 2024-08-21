import React, { useEffect, useMemo, useState } from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Tooltip from '@mui/material/Tooltip';
import Button from '../../../../MDM/MDM_Tab_Buttons/Button';
import GlobalPersonaHomePage from './GlobalPersonaHomePage';
import ZoneGlobalPersonaHomePage from './ZoneGlobalPersonaHomePage';
import { useHistory } from 'react-router-dom';
import { useQuery } from '../../../../../hooks/useQuery';

const GlobalPersonaHomePageContainer = () => {
  const history = useHistory();
  const params = useQuery();
  const [activeTab, setActiveTab] = useState(params?.filterTab ? params?.filterTab : 'BU');

  const ActiveTool = ({ currentTab, text }) => (
    <Tooltip title={text} placement="bottom-start">
      <ErrorOutlineIcon color={activeTab === currentTab ? 'black' : '#ffc800'} />
    </Tooltip>
  );

  const handleChangeTab = (value) => {
    const params = new URLSearchParams(window.location.search);
    params.set('filterTab', value.toString());
    history.replace({
      pathname: window.location.pathname,
      search: params.toString(),
    });
    setActiveTab(value);
  };

  return (
    <>
      <div className="text-center pt-3">
        <Button
          variant="outlined"
          size="small"
          startIcon={<ActiveTool currentTab="BU" text="Home page for BU Rep Letter" />}
          className={activeTab === 'BU' ? 'active-tab-button' : 'mr-4 tabButton'}
          onClick={() => {
            handleChangeTab('BU');
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
            handleChangeTab('Zone');
          }}
        >
          Zone
        </Button>
      </div>
      {activeTab === 'BU' ? <GlobalPersonaHomePage /> : <ZoneGlobalPersonaHomePage />}
    </>
  );
};

export default GlobalPersonaHomePageContainer;

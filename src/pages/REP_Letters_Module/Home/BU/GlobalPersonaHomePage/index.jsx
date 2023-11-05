import React, { useEffect, useMemo, useState } from 'react';
import { Tabs } from '@mantine/core';
import GlobalPersonaHomePage from './GlobalPersonaHomePage';
import ZoneGlobalPersonaHomePage from './ZoneGlobalPersonaHomePage';

const GlobalPersonaHomePageContainer = () => {
  return (
    <>
      <Tabs
        grow
        position="center"
        color="yellow"
        styles={{
          tabActive: { color: '#e3af32' },
          tabLabel: {
            color: 'white',
            '&:active': {
              color: '#e3af32 !important',
            },
          },
          // tabsListWrapper: { borderRadius: '10px' },
        }}
      >
        <Tabs.Tab label="BU">
          <div className="dashboard-width">
            <GlobalPersonaHomePage />
          </div>
        </Tabs.Tab>
        <Tabs.Tab label="Zone">
          <div className="dashboard-width">
            <ZoneGlobalPersonaHomePage />
          </div>
        </Tabs.Tab>
      </Tabs>
    </>
  );
};

export default GlobalPersonaHomePageContainer;

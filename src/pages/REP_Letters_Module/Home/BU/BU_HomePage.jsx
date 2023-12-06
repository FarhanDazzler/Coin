import React, { useEffect, useMemo, useState } from 'react';
import GlobalPersonaHomePage from './GlobalPersonaHomePage/GlobalPersonaHomePage';
import GlobalPersonaHomePageContainer from './GlobalPersonaHomePage';
import DisclosureProcessorHomePage from './DisclosureProcessorHomePage/DisclosureProcessorHomePage';
import BUHeadHomePage from './BUHeadHomePage/BUHeadHomePage';
import FinanceDirectorHomePage from './FinanceDirectorHomePage/FinanceDirectorHomePage';
import ZoneControlHomePage from './ZoneControlHomePage/ZoneControlHomePage';
import ZoneVPHomePage from './ZoneVP/ZoneVPHomePage';
import ExcomMemberHomePage from './ExcomMemberHomePage/ExcomMemberHomePage';
import ZoneLegalRepresentativeHomePage from './ZoneLegalRepresentativeHomePage/ZoneLegalRepresentativeHomePage';
import ZoneControlHomePageContainer from './ZoneControlHomePage';
import ZoneVPHomePageContainer from './ZoneVP';
import ZoneICHomePage from './ZoneIC/ZoneICHomePage';
import '../styles.scss';
import { useSelector } from 'react-redux';
import DisclosureProcessorHomePageContainer from './DisclosureProcessorHomePage';

const BU_HomePage = () => {
  const selected_Role = localStorage.getItem('selected_Role');
  const loginRole = useSelector((state) => state?.auth?.loginRole);

  // console.log('@@@@@@@', localStorage.getItem('selected_Role'));
  return (
    <div>
      {(loginRole || selected_Role) === 'Disclosure Processor' ? (
        <DisclosureProcessorHomePageContainer />
      ) : (loginRole || selected_Role) === 'BU Head' ? (
        <BUHeadHomePage />
      ) : (loginRole || selected_Role) === 'Finance Director' ? (
        <FinanceDirectorHomePage />
      ) : (loginRole || selected_Role) === 'Zone Control' ? (
        <ZoneControlHomePageContainer />
      ) : (loginRole || selected_Role) === 'Zone VP' ? (
        <ZoneVPHomePageContainer />
      ) : (loginRole || selected_Role) === 'Excom Member' ? (
        <ExcomMemberHomePage />
      ) : (loginRole || selected_Role) === 'Zone Legal Representative' ? (
        <ZoneLegalRepresentativeHomePage />
      ) : (loginRole || selected_Role) === 'BU Zone Internal Control' ? (
        <ZoneICHomePage />
      ) : (
        <GlobalPersonaHomePageContainer />
      )}
    </div>
  );
};

export default BU_HomePage;

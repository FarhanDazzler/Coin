import React, { useEffect, useMemo, useState } from 'react';
import GlobalPersonaHomePage from './GlobalPersonaHomePage/GlobalPersonaHomePage';
import DisclosureProcessorHomePage from './DisclosureProcessorHomePage/DisclosureProcessorHomePage';
import BUHeadHomePage from './BUHeadHomePage/BUHeadHomePage';
import FinanceDirectorHomePage from './FinanceDirectorHomePage/FinanceDirectorHomePage';
import ZoneControlHomePage from './ZoneControlHomePage/ZoneControlHomePage';
import ZoneVPHomePage from './ZoneVP/ZoneVPHomePage';
import '../styles.scss';
import { useSelector } from 'react-redux';

const BU_HomePage = () => {
  const selected_Role = localStorage.getItem('selected_Role');
  const loginRole = useSelector((state) => state?.auth?.loginRole);

  console.log('@@@@@@@', localStorage.getItem('selected_Role'));
  return (
    <div>
      {(loginRole || selected_Role) === 'Disclosure Processor' ? (
        <DisclosureProcessorHomePage />
      ) : (loginRole || selected_Role) === 'BU Head' ? (
        <BUHeadHomePage />
      ) : (loginRole || selected_Role) === 'Finance Director' ? (
        <FinanceDirectorHomePage />
      ) : (loginRole || selected_Role) === 'Zone Control' ? (
        <ZoneControlHomePage />
      ) : (loginRole || selected_Role) === 'Zone VP' ? (
        <ZoneVPHomePage />
      ) : (
        <GlobalPersonaHomePage />
      )}
    </div>
  );
};

export default BU_HomePage;

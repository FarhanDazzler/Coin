import React, { useEffect, useMemo, useState } from 'react';
import GlobalPersonaHomePage from './GlobalPersonaHomePage/GlobalPersonaHomePage';
import DisclosureProcessorHomePage from './DisclosureProcessorHomePage/DisclosureProcessorHomePage';
import BUHeadHomePage from './BUHeadHomePage/BUHeadHomePage';
import FinanceDirectorHomePage from './FinanceDirectorHomePage/FinanceDirectorHomePage';
import ZoneControlHomePage from './ZoneControlHomePage/ZoneControlHomePage';
import ZoneVPHomePage from './ZoneVP/ZoneVPHomePage';
import '../styles.scss';

const BU_HomePage = () => {
  return (
    <div>
      {localStorage.getItem('selected_Role') === 'Disclosure Processor' ? (
        <DisclosureProcessorHomePage />
      ) : localStorage.getItem('selected_Role') === 'BU Head' ? (
        <BUHeadHomePage />
      ) : localStorage.getItem('selected_Role') === 'Finance Director' ? (
        <FinanceDirectorHomePage />
      ) : localStorage.getItem('selected_Role') === 'Zone Control' ? (
        <ZoneControlHomePage />
      ) : localStorage.getItem('selected_Role') === 'Zone VP' ? (
        <ZoneVPHomePage />
      ) : (
        <GlobalPersonaHomePage />
      )}
    </div>
  );
};

export default BU_HomePage;

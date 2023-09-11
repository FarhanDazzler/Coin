import React, { useEffect, useMemo, useState } from 'react';
import GlobalPersonaHomePage from './GlobalPersonaHomePage/GlobalPersonaHomePage';
import DisclosureProcessorHomePage from './DisclosureProcessorHomePage/DisclosureProcessorHomePage';
import BUHeadHomePage from './BUHeadHomePage/BUHeadHomePage';
import FinanceDirectorHomePage from './FinanceDirectorHomePage/FinanceDirectorHomePage';
import ZoneControlHomePage from './ZoneControlHomePage/ZoneControlHomePage';
import ZoneVPHomePage from './ZoneVP/ZoneVPHomePage';
import '../styles.scss';

const BU_HomePage = () => {
  const selectedUserRole = localStorage.getItem('selected_Role');

  return (
    <div>
      {selectedUserRole === 'Disclosure Processor' ? (
        <DisclosureProcessorHomePage />
      ) : selectedUserRole === 'BU Head' ? (
        <BUHeadHomePage />
      ) : selectedUserRole === 'Finance Director' ? (
        <FinanceDirectorHomePage />
      ) : selectedUserRole === 'Zone Control' ? (
        <ZoneControlHomePage />
      ) : selectedUserRole === 'Zone VP' ? (
        <ZoneVPHomePage />
      ) : (
        <GlobalPersonaHomePage />
      )}
    </div>
  );
};

export default BU_HomePage;

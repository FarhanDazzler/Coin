import React, { useEffect, useMemo, useState } from 'react';
import GlobalPersonaHomePage from './GlobalPersonaHomePage/GlobalPersonaHomePage';
import DisclosureProcessorHomePage from './DisclosureProcessorHomePage/DisclosureProcessorHomePage';
import '../styles.scss';

const BU_HomePage = () => {
  const selectedUserRole = localStorage.getItem('selected_Role');

  return (
    <div>
      {selectedUserRole !== 'Disclosure Processor' ? (
        <DisclosureProcessorHomePage />
      ) : (
        <GlobalPersonaHomePage />
      )}
    </div>
  );
};

export default BU_HomePage;

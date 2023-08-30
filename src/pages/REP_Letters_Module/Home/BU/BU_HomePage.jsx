import React, { useEffect, useMemo, useState } from 'react';
import GlobalPersonaHomePage from './GlobalPersonaHomePage/GlobalPersonaHomePage';
import '../styles.scss';

const BU_HomePage = () => {
  const selectedUserRole = localStorage.getItem('selected_Role');

  return (
    <div>
      <GlobalPersonaHomePage />
      {/* {selectedUserRole === 'Recipient' ? <RecipientHomePage /> : <GlobalPersonaHomePage />} */}
    </div>
  );
};

export default BU_HomePage;

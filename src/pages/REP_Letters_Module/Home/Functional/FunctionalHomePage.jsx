import React, { useEffect, useMemo, useState } from 'react';
import RecipientHomePage from './RecipientHomePage/RecipientHomePage';
import GlobalPersonaHomePage from './GlobalPersonaHomePage/GlobalPersonaHomePage';
import '../styles.scss';

const FunctionalHomePage = () => {
  const selectedUserRole = localStorage.getItem('selected_Role');

  return (
    <div>
      {selectedUserRole === 'Recipient' ? <RecipientHomePage /> : <GlobalPersonaHomePage />}
    </div>
  );
};

export default FunctionalHomePage;

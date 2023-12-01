import React, { useEffect, useMemo, useState } from 'react';
import RecipientHomePage from './RecipientHomePage/RecipientHomePage';
import GlobalPersonaHomePage from './GlobalPersonaHomePage/GlobalPersonaHomePage';
import '../styles.scss';
import { useSelector } from 'react-redux';
import ZoneICHomePage from './ZoneIC/ZoneICHomePage';

const FunctionalHomePage = () => {
  const selected_Role = localStorage.getItem('selected_Role');
  const loginRole = useSelector((state) => state?.auth?.loginRole);

  return (
    <div>
      {(loginRole || selected_Role) === 'Recipient' ? (
        <RecipientHomePage />
      ) : (loginRole || selected_Role) === 'Functional Zone Internal Control' ? (
        <ZoneICHomePage />
      ) : (
        <GlobalPersonaHomePage />
      )}
    </div>
  );
};

export default FunctionalHomePage;

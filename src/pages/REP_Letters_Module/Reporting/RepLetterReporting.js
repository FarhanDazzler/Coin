import React from 'react';
import FunctionReporting from './Function/FunctionReporting';
import BUReporting from './BU/BUReporting';

const RepLetterReporting = () => {
  return (
    <>
      {localStorage.getItem('selected_module_Role') === 'Functional' ? (
        <FunctionReporting />
      ) : (
        <BUReporting />
      )}
    </>
  );
};

export default RepLetterReporting;

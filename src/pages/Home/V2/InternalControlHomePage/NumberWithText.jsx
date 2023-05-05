import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { ReactComponent as InfoIcon } from '../../../../assets/images/InfoCircle.svg';

const NumberWithText = ({ number, tooltip, subTitle }) => {
  return (
    <div className="d-flex justify-content-between bg-black mb-2 p-1 px-4 rounded-3">
      <div className="d-flex align-items-center">
        <Tooltip title={tooltip} arrow>
          <InfoIcon />
        </Tooltip>
        {subTitle}
      </div>
      <h3 className="largeNumber yellow-gradient-text mb-0">{number}</h3>
    </div>
  );
};

export default NumberWithText;

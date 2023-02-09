import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { ReactComponent as InfoIcon } from '../../assets/images/InfoCircle.svg';

const NumberWithText = ({ number, tooltip, subTitle }) => {
  return (
    <div>
      <h3 className="largeNumber yellow-gradient-text">{number}</h3>
      <div className="d-flex align-items-center">
        <Tooltip title={tooltip} arrow>
          <InfoIcon />
        </Tooltip>
        {subTitle}
      </div>
    </div>
  );
};

export default NumberWithText;

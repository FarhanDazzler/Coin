import React from 'react';
import { Popover as MuiPopover } from '@mui/material';
import './styles.scss';
const Popover = ({ children, ...res }) => {
  return (
    <MuiPopover
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      classes={{ root: 'customMuiPopover-root' }}
      {...res}
    >
      <div className="MuiPopover-wrapper">{children}</div>
    </MuiPopover>
  );
};

export default Popover;

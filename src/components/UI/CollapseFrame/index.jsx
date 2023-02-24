import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import './collapseFrameStyles.scss';
import cs from 'classnames';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

const CollapseFrame = ({ title = '', centerText = '', active, className, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className={cs('mb-4 pb-2', { [className]: className })}>
      <div
        className={cs(
          'collapse-frame-actionbar d-flex align-items-center justify-content-between',
          { ['active-collapse-frame']: active },
        )}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <div className="d-flex align-items-center collapse-frame-title">{title && title}</div>
        <div className="collapse-frame-center">{centerText && centerText}</div>
        <div>
          <KeyboardArrowUpOutlinedIcon className={cs('arrow-icon', { ['open-arrow']: open })} />
        </div>
      </div>
      <Collapse in={open}>
        <div>{children}</div>
      </Collapse>
    </div>
  );
};

export default CollapseFrame;

import React, { useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import './collapseFrameStyles.scss';
import cs from 'classnames';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';

const CollapseFrame = ({
  title = '',
  centerText = '',
  active,
  isOpen = true,
  className,
  children,
  isDisabled,
}) => {
  const [open, setOpen] = useState(isOpen == true && !isDisabled ? true : false);

  useEffect(() => {
    setOpen(!isDisabled);
  }, [isDisabled]);

  return (
    <div className={cs('mb-4 pb-2', { [className]: className })}>
      <div
        className={cs(
          'collapse-frame-actionbar d-flex align-items-center justify-content-between',
          { ['active-collapse-frame']: active },
          { ['cursor-not-allowed']: isDisabled },
        )}
        onClick={() => {
          if (isDisabled) return;
          setOpen(!open);
        }}
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

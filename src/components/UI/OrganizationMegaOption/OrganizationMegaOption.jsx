import React, { useState } from 'react';
import cs from 'classnames';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Popover from '../Popover';
import MultiSelectButton from '../../Buttons/MultiSelect/MultiSelectButtonComponents';

const OrganizationMegaOption = ({ options, label }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const processName = [
    { label: 'Search or Select', value: 'Select' },
    { label: 'KU', value: 'KU' },
    { label: 'AB', value: 'AB' },
    { label: 'EUR', value: 'EUR' },
    { label: 'APAC', value: 'APAC' },
  ];

  return (
    <>
      <div
        className={cs('select-options-background', { 'open-popover': open })}
        aria-describedby={id}
        onClick={handleClick}
      >
        {label} <ArrowDropDownIcon className={cs({ 'open-select': open })} />
      </div>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}>
        <div className="d-flex">
          <div className="year-side">
            <h3 className="popover-title">Receiver Organization</h3>
            <MultiSelectButton data={['Organization']} placeholder="Select your option" />
          </div>

          <div className="period-side">
            <h3 className="popover-title">Provider Organization</h3>
            <MultiSelectButton data={['Organization']} placeholder="Select your option" />
          </div>
        </div>
      </Popover>
    </>
  );
};

export default OrganizationMegaOption;

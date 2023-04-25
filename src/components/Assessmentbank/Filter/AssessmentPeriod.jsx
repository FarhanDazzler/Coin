import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Popover from '../../UI/Popover';
import Radio from '../../UI/Radio';
import cs from 'classnames';

const AssessmentPeriod = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [yearValue, setYearValue] = useState(null);
  const [periodValue, setPeriodValue] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleChangeYearRadio = (value) => {
    setYearValue(value);
  };
  const handleChangePeriodRadio = (value) => {
    setPeriodValue(value);
  };

  return (
    <>
      <div
        className={cs('select-options-background', { 'open-popover': open })}
        aria-describedby={id}
        onClick={handleClick}
      >
        Assessment Period <ArrowDropDownIcon className={cs({ 'open-select': open })} />
      </div>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}>
        <div className="d-flex">
          <div className="year-side">
            <h3 className="popover-title">Select Year</h3>
            <Radio
              options={[
                { value: '2023', label: '2023' },
                { value: '2022', label: '2022' },
                { value: '2021', label: '2021' },
                { value: '2020', label: '2020' },
              ]}
              value={yearValue}
              radioGroupProps={{ classes: { root: 'white-radio-icon' }, name: 'year' }}
              handleChange={handleChangeYearRadio}
            />
          </div>

          <div className="period-side">
            <h3 className="popover-title">Select Period</h3>
            <Radio
              options={[
                { value: '1st Assessment Period', label: '1st Assessment Period' },
                { value: '2nd Assessment Period', label: '2nd Assessment Period' },
                { value: '3rd Assessment Period', label: '3rd Assessment Period' },
                { value: '4th Assessment Period', label: '4th Assessment Period' },
              ]}
              value={periodValue}
              radioGroupProps={{ classes: { root: 'white-radio-icon' }, name: 'Period' }}
              handleChange={handleChangePeriodRadio}
            />
          </div>
        </div>
      </Popover>
    </>
  );
};

export default AssessmentPeriod;

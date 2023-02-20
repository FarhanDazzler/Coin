import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import { Select as SelectBase } from '@mui/material';
import './selectStyles.scss';

const Select = ({ options, classes = {}, placeholder, ...rest }) => {
  return (
    <SelectBase
      input={<OutlinedInput classes={{ root: 'select-options', ...classes }} />}
      classes={{ ...classes }}
      {...rest}
    >
      {placeholder && (
        <MenuItem disabled value="">
          <em>Placeholder</em>
        </MenuItem>
      )}

      {options.map(({ label, value }) => (
        <MenuItem key={label} value={value}>
          {label}
        </MenuItem>
      ))}
    </SelectBase>
  );
};

export default Select;

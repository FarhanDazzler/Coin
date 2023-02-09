import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import { Select as SelectBase } from '@mui/material';
import './selectStyles.scss';

const Select = ({ options, classes = {}, ...rest }) => {
  return (
    <SelectBase
      input={<OutlinedInput classes={{ root: 'select-options', ...classes }} />}
      classes={{ ...classes }}
      {...rest}
    >
      <MenuItem disabled value="">
        <em>Placeholder</em>
      </MenuItem>
      {options.map((name) => (
        <MenuItem key={name} value={name}>
          {name}
        </MenuItem>
      ))}
    </SelectBase>
  );
};

export default Select;

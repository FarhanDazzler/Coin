import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import { Select as SelectBase } from '@mui/material';
import './selectStyles.scss';

const Select = ({ options, classes = {}, startAdornment, placeholder, inputLook, ...rest }) => {
  return (
    <SelectBase classes={{ ...classes }} {...rest}>
      {placeholder && (
        <MenuItem disabled selected value="">
          <em>{placeholder}</em>
        </MenuItem>
      )}

      {options.map((op, i) => {
        if (typeof op === 'string') {
          return (
            <MenuItem key={i} value={op}>
              {op}
            </MenuItem>
          );
        }
        const { label, value } = op;
        return (
          <MenuItem key={label} value={value}>
            {label}
          </MenuItem>
        );
      })}
    </SelectBase>
  );
};

export default Select;

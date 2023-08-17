import React, { useEffect, useState } from 'react';
import { Radio as BaseRadio } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './radioStyles.scss';

const Radio = ({
  formControlProps = {},
  formLabelProps = {},
  radioGroupProps = {},
  label = '',
  options = [],
  value,
  handleChange,
  block = {},
  disabled,
}) => {
  const onChange = ({ target: { value } }) => {
    if (handleChange) {
      handleChange(value, block);
    }
  };

  return (
    <FormControl className="radio-wrapper" {...formControlProps}>
      {label && <FormLabel {...formLabelProps}>{label}</FormLabel>}
      <RadioGroup value={value} onChange={onChange} {...radioGroupProps}>
        {options.map((o, i) => (
          <FormControlLabel
            key={`${i}--FormControlLabel-option--${o.value}`}
            value={o.value}
            control={<BaseRadio checked={o.value === value} />}
            disabled={disabled}
            label={o.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default Radio;

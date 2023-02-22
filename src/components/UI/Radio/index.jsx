import React from 'react';
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
}) => {
  const onChange = ({ target: { value } }) => {
    if (handleChange) {
      handleChange(value, block);
    }
  };

  console.log('options', options);

  return (
    <FormControl className="radio-wrapper" {...formControlProps}>
      {label && <FormLabel {...formLabelProps}>{label}</FormLabel>}
      <RadioGroup value={value} onChange={onChange} {...radioGroupProps}>
        {options.map((o, i) => (
          <FormControlLabel key={i} value={o.value} control={<BaseRadio />} label={o.label} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default Radio;

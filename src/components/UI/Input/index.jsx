import React from 'react';
import { OutlinedInput } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import './inpurstyles.scss';
import FormLabel from '@mui/material/FormLabel';

const Input = ({
  formControlProps,
  formLabelProps,
  label,
  handleChange,
  block,
  value,
  fullInput,
  ...res
}) => {
  const onChange = ({ target: { value } }) => {
    if (handleChange) {
      handleChange(value, block);
    }
  };
  return (
    <FormControl className="input-wrapper" {...formControlProps}>
      {label && <FormLabel {...formLabelProps}>{label}</FormLabel>}
      <OutlinedInput value={value} onChange={onChange} {...res} />
    </FormControl>
  );
};

export default Input;

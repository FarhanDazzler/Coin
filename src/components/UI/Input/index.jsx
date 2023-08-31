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
  required,
  value,
  fullInput,
  disabled,
  maxLength = 255,
  ...res
}) => {
  const onChange = ({ target: { value } }) => {
    if (handleChange) {
      handleChange(value, block);
    }
  };
  return (
    <FormControl className="input-wrapper" {...formControlProps}>
      {label && (
        <FormLabel {...formLabelProps}>
          {label} {required && <span className="text-danger">*</span>}
        </FormLabel>
      )}
      <OutlinedInput
        disabled={disabled}
        required
        value={value}
        inputProps={{
          maxLength: maxLength,
        }}
        onChange={onChange}
        {...res}
      />
    </FormControl>
  );
};

export default Input;

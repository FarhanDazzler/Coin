import React from 'react';
import { OutlinedInput } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import './inpurstyles.scss';
import FormLabel from '@mui/material/FormLabel';
import cs from 'classnames';
import { message } from 'react-widgets/PropTypes';

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
  maxLength = 2500,
  errorMessage,
  ...res
}) => {
  const isMaxValueEnter = maxLength === value?.length;
  const onChange = ({ target: { value } }) => {
    if (handleChange && value.length <= maxLength) {
      handleChange(value, block);
    }
  };

  const message = errorMessage || `Only ${maxLength} character allow`;

  return (
    <FormControl className="input-wrapper" {...formControlProps}>
      {label && (
        <FormLabel {...formLabelProps}>
          <span className={cs({ ['text-danger']: isMaxValueEnter })}>
            {label} {required && <span className="text-danger">*</span>}
          </span>
        </FormLabel>
      )}
      <OutlinedInput
        disabled={disabled}
        required
        value={value}
        inputProps={{
          maxLength: maxLength,
        }}
        classes={{ root: isMaxValueEnter ? 'error-input' : '' }}
        onChange={onChange}
        {...res}
      />
      {isMaxValueEnter && <small className="text-danger input-error-message">{message}</small>}
    </FormControl>
  );
};

export default Input;

import React from 'react';
import FormControl from '@mui/material/FormControl';
import './inpurstyles.scss';
import FormLabel from '@mui/material/FormLabel';
import cs from 'classnames';
import TextField from '@mui/material/TextField';

const CustomTextarea = ({
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
  children,
  onChange,
  ...res
}) => {
  const isMaxValueEnter = maxLength === value?.length;
  const onChangeInput = ({ target: { value } }) => {
    if (value.length <= maxLength) {
      if (handleChange) handleChange(value.trimStart(), block);
      if (onChange) onChange({ target: { value: value.trimStart() } });
    }
  };

  const message = errorMessage || `Only ${maxLength} character allow`;

  return (
    <FormControl className="input-wrapper-textarea" {...formControlProps}>
      {label && (
        <FormLabel {...formLabelProps}>
          <span className={cs({ ['text-danger']: isMaxValueEnter })}>
            {label} {required && <span className="text-danger">*</span>}
          </span>
        </FormLabel>
      )}
      <TextField rowsMin={5} multiline value={value} onChange={onChangeInput} {...res} />
      {isMaxValueEnter && <small className="text-danger input-error-message">{message}</small>}
    </FormControl>
  );
};

export default CustomTextarea;

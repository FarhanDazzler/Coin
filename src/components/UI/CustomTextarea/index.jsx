import React from 'react';
// import { Textarea } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import './inpurstyles.scss';
import FormLabel from '@mui/material/FormLabel';
import cs from 'classnames';
// import { message } from 'react-widgets/PropTypes';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

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
    <FormControl className="input-wrapper-textarea" {...formControlProps}>
      {label && (
        <FormLabel {...formLabelProps}>
          <span className={cs({ ['text-danger']: isMaxValueEnter })}>
            {label} {required && <span className="text-danger">*</span>}
          </span>
        </FormLabel>
      )}
      <TextareaAutosize rowsMin={5} {...res} />
      {isMaxValueEnter && <small className="text-danger input-error-message">{message}</small>}
    </FormControl>
  );
};

export default CustomTextarea;

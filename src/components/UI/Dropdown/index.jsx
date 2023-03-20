import React from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '../Select/Select';
import { v4 as uuidv4 } from 'uuid';
import './styles.scss';

const Dropdown = ({
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
    <FormControl className="dropdown-wrapper" {...formControlProps} size="small">
      {label && <FormLabel {...formLabelProps}>{label}</FormLabel>}
      <Select
        labelId={uuidv4()}
        placeholder="Select one"
        value={value}
        onChange={onChange}
        options={[...options]}
      />
    </FormControl>
  );
};

export default Dropdown;

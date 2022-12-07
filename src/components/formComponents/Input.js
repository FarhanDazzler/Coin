import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function Input(props) {
  const { label, name, ...rest } = props;
  return (
    <div className="form-control-md">
      <div>
        <label className="golden-text" htmlFor={name}>
          <strong>{label}</strong>
        </label>
      </div>
      <div className="row">
        <div className='col col-lg-5'><Field className="form-control input-group" id={name} name={name} {...rest} /></div>
        <div className='col col-lg-3'></div>
      </div>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default Input;

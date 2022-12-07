import React from 'react';
import { Field, ErrorMessage } from 'formik';
import TextError from './TextError';

function RadioButtons(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-radio">
      <label className="golden-text">
        <strong>{label}</strong>
      </label>
      <Field name={name}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.option_id}>
                <br></br>
                <input
                  type="radio"
                  id={option.option_id}
                  {...field}
                  {...rest}
                  value={option.option_value}
                  checked={field.value === option.option_value}
                />{' '}
                <label htmlFor={option.option_id}>{option.option_value}</label>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default RadioButtons;

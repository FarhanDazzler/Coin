import React from 'react';
import FormLabel from '@mui/material/FormLabel';
import Radio from '../Radio';
import RenderBlockWrapper from '../../RenderBlock/RenderBlockWrapper';

const RadioMulti = ({ block, label, renderOption, handleChange, index }) => {
  return (
    <div className="radio-multi-wrapper">
      <div className="radio-wrapper">
        <FormLabel>{label}</FormLabel>
      </div>
      <div className="first-three-options mt-3">
        {renderOption.map((firstOption, i) => {
          return (
            <div className="mb-2" key={`${i}--${index}`}>
              <Radio
                block={firstOption}
                formControlProps={{ className: 'radio-wrapper side-by-side-radio-wrapper' }}
                radioGroupProps={{
                  className: 'side-by-side-radio',
                }}
                formLabelProps={{ className: 'side-by-side-radio-label' }}
                label={firstOption.label}
                options={firstOption.options}
                value={firstOption.value}
                handleChange={(value, innerBlock) => handleChange(value, innerBlock, block)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RadioMulti;

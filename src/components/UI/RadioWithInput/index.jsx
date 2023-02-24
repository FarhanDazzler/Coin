import React from 'react';
import Radio from '../Radio';
import Input from '../Input';

const RadioWithInput = ({ label = '', block, handleChange }) => {
  return (
    <div className="radio--with-input-wrapper">
      <Radio
        block={block}
        label={block.label}
        options={block.options}
        value={block.value}
        handleChange={handleChange}
      />
      <Input />
    </div>
  );
};

export default RadioWithInput;

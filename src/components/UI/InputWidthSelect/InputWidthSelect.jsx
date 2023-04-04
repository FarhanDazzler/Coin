import React, { useState } from 'react';
import Input from '../Input';
import { Loader, Select } from '@mantine/core';
import FormControl from '@mui/material/FormControl';
import './styles.scss';

const InputWidthSelect = ({ block = {}, handleChange }) => {
  const { label, required, loading, dropDownOption, isDropdownSaveInput = true, value } = block;
  return (
    <div>
      <Input
        value={value}
        label={label}
        required={required}
        block={block}
        handleChange={handleChange}
      />
      <div>
        {block.loading && (
          <div className="mt-4 ml-8">
            <Loader color="yellow" />
          </div>
        )}

        {!loading && dropDownOption && dropDownOption.length > 0 && (
          <FormControl sx={{ mt: 1, minWidth: 250 }} size="small">
            <Select
              zIndex={999999}
              label="Select user"
              placeholder="Select user"
              searchable
              nothingFound="No options"
              maxDropdownHeight={280}
              onChange={(val) => {
                if (isDropdownSaveInput) handleChange(val, { ...block, optionSelect: true });
              }}
              styles={(theme) => ({
                item: {
                  '&.mantine-Select-selected ': {
                    background: '#e7c55d !important',
                    color: '#333333 !important',
                  },
                  '&[data-selected]': {
                    background: '#e7c55d99 !important',
                    color: '#333333 !important',
                    '&, &:hover': {},
                  },

                  // applies styles to hovered item (with mouse or keyboard)
                  '&[data-hovered]': {},
                },
              })}
              data={dropDownOption}
            />
          </FormControl>
        )}
      </div>
    </div>
  );
};

export default InputWidthSelect;

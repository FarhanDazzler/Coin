import React from 'react';
import Input from '../Input';
import { Loader, Select } from '@mantine/core';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './styles.scss';
import { validateEmail } from '../../../utils/helper';

const InputWidthSelect = ({ block = {}, handleChange, userApiStart, disabled }) => {
  const {
    label,
    required,
    loading,
    dropDownOption,
    isDropdownSaveInput = true,
    value,
    emailCheck,
  } = block;

  return (
    <div>
      <Input
        value={value}
        label={label}
        required={required}
        block={block}
        handleChange={handleChange}
        disabled={disabled}
      />
      <div>
        {block.loading && (
          <div className="mt-4 ml-8">
            <Loader color="yellow" />
          </div>
        )}

        {!loading && userApiStart && !dropDownOption?.length && !emailCheck && (
          <Typography component="div" variant="body1">
            <Box sx={{ color: 'error.main' }}>This user is not in our list!</Box>
          </Typography>
        )}
        {((!loading && dropDownOption && dropDownOption.length > 0) ||
          (!loading && userApiStart && !dropDownOption?.length && !emailCheck)) && (
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

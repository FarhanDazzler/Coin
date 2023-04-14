import React from 'react';
import Input from '../../../../../components/UI/Input';
import { Loader, Select } from '@mantine/core';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../../../../../components/UI/InputWidthSelect/styles.scss';
import { validateEmail } from '../../../../../utils/helper';

const AdSearch = ({ block = {}, handleChange, userApiStart }) => {
  const { label, required, loading, dropDownOption, isDropdownSaveInput = true, value } = block;
  console.log(block, "Hi........................")
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

        {!loading && userApiStart && !dropDownOption?.length && !validateEmail(value) && (
          <Typography component="div" variant="body1">
            <Box sx={{ color: 'error.main' }}>This user is not in our list!</Box>
          </Typography>
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

export default AdSearch;

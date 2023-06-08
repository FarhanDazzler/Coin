import React from 'react';
import { Loader, Select } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../../../../components/UI/InputWidthSelect/styles.scss';
import { validateEmail } from '../../../../utils/helper';
import { isEmailValidAD } from '../../../../redux/AzureAD/AD_Action';
import { isEmailValidADSelector } from '../../../../redux/AzureAD/AD_Selectors';

const AdSearch = ({ userApiStart, values, setFieldValue, block = {}, setBlock, mode }) => {
  const { loading, dropDownOption, isDropdownSaveInput = true, value } = block;
  const dispatch = useDispatch();
  const isEmailValidADState = useSelector(isEmailValidADSelector);
  const [adValue, setAdValue] = React.useState('');
  React.useEffect(() => {
    if (isEmailValidADState.data?.isValid === true) {
      setFieldValue(adValue);
      setBlock({ dropDownOption: [], loading: false });
    }
  }, [isEmailValidADState.data]);
  const handleChange = (value) => {
    console.log(value, 'testing vaue');
    setAdValue(value);
    const param = {
      email: value,
    };

    dispatch(isEmailValidAD(param));

    // setFieldValue(adValue);
    // setAdValue(value)
  };
  return (
    <div>
      <div>
        {block.loading && (
          <div className="mt-4 ml-8">
            <Loader color="yellow" />
          </div>
        )}
        {!loading && !dropDownOption?.length && !validateEmail(values) && (
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
                if (isDropdownSaveInput) handleChange(val);
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

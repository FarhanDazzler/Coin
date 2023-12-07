import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import cs from 'classnames';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    borderColor: '#4b4b4b !important',
    border: '1px solid',
    padding: '8px 8px',
    borderRadius: 4,
  },
}));

export default function DatePickers({ ...res }) {
  const classes = useStyles();

  return (
    <form className={cs(classes.container, 'date-wrapper')} noValidate>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker', 'DatePicker']}>
          <DatePicker
            type="date"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            {...res}
          />
        </DemoContainer>
      </LocalizationProvider>
    </form>
  );
}

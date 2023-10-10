import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import cs from 'classnames';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 300,
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
      <TextField
        type="date"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        {...res}
      />
    </form>
  );
}

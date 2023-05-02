import React from 'react';
import './styles.scss';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import cs from 'classnames';

const TableLoader = ({ className }) => {
  return (
    <div className={cs('tableLoaderWrapper', { [className]: className })}>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    </div>
  );
};

export default TableLoader;

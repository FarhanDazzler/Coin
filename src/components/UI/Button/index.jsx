import React from 'react';
import { Button as BaseButton } from '@mui/material';
import './buttonStyles.scss';
import CircularProgress from '@mui/material/CircularProgress';

const Button = ({ variant = 'contained', loading, className, children, style = {}, ...res }) => {
  return (
    <BaseButton
      variant={variant}
      className={`custom-button-wrapper ${className}`}
      style={style}
      disabled={loading}
      {...res}
    >
      {loading ? <CircularProgress size={22} /> : children}
    </BaseButton>
  );
};

export default Button;

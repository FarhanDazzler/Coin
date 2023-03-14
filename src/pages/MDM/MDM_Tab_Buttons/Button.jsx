import React from 'react';
import { Button as BaseButton } from '@mui/material';
import './TabStyle.scss';

const Button = ({ variant = 'contained', className, children, style = {}, ...res }) => {
  return (
    <BaseButton
      variant={variant}
      className={`custom-button-wrapper ${className}`}
      style={style}
      {...res}
    >
      {children}
    </BaseButton>
  );
};

export default Button;

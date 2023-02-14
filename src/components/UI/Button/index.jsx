import React from 'react';
import { Button as BaseButton } from '@mui/material';
import './buttonStyles.scss';

const Button = ({ variant = 'contained', className, children, ...res }) => {
  return (
    <BaseButton variant={variant} className={`custom-button-wrapper ${className}`} {...res}>
      {children}
    </BaseButton>
  );
};

export default Button;

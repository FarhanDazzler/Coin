import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
const DropdownMenu = ({ openMenu, options, selected, handleClick, handleClose, handleSelect }) => {
  const open = Boolean(openMenu);

  const selectedVal = options?.find((o) => o.value === selected)?.value || selected;

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {selectedVal}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={openMenu}
        open={open}
        onClose={handleClose}
      >
        {options.map((o, i) => {
          return (
            <MenuItem key={i} onClick={() => handleSelect(o.value)}>
              {o.label}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default DropdownMenu;

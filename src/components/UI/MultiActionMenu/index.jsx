import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import cs from 'classnames';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
const ITEM_HEIGHT = 48;

const MultiActionMenu = ({ handleEdit, handleDelete, moreAction = [] }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        color="secondary"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {handleEdit && (
          <MenuItem
            onClick={() => {
              handleClose();
              handleEdit();
            }}
          >
            <EditOutlinedIcon className="mr-3" />
            Edit
          </MenuItem>
        )}

        {moreAction.length > 0 &&
          moreAction.map((data) => {
            const { onClick = () => {}, Icon, iconClassName, name } = data;
            return (
              <MenuItem onClick={onClick}>
                <Icon className={cs('mr-3', { [iconClassName]: iconClassName })} /> {name}
              </MenuItem>
            );
          })}

        {handleDelete && (
          <MenuItem
            onClick={() => {
              handleClose();
              handleDelete();
            }}
          >
            <DeleteOutlinedIcon className="mr-3" /> Delete
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default MultiActionMenu;

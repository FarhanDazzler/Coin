import React, { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';

const ShowSignaturesBU_Zone = ({ signatures = {} }) => {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(0);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    setCount(Object.keys(signatures).length);
    let val = 0;
    Object.keys(signatures).map((d) => {
      if (signatures[d]) {
        val = val + 1;
      }
    });
    setActive(val);
  }, [signatures]);

  const getSignaturesName = (val) => {
    switch (val) {
      case 'exc_signed':
        return 'Excom Member';
      case 'zlr_signed':
        return 'Zone Legal Representative';
      case 'zc_signed':
        return 'Zone Control';
      case 'zv_signed':
        return 'Zone VP';
      default:
        return val.split('_').join(' ');
    }
  };

  return (
    <>
      <div
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <p className="m-0">
          {active} of {count}
        </p>
        <LinearProgress variant="determinate" value={active * (100 / count)} />
      </div>

      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>
          {Object.keys(signatures).map((s) => {
            return (
              <div className="d-flex align-items-center justify-content-between w-full">
                <span>{getSignaturesName(s)}</span>
                <Radio size="small" checked={signatures[s]} />
              </div>
            );
          })}
        </Typography>
      </Popover>
    </>
  );
};

export default ShowSignaturesBU_Zone;

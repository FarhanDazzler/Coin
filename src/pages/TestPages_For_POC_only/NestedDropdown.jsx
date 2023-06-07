import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { Box, Link } from '@mui/material';
import ArrowRight from '@mui/icons-material/ArrowRight';
import Typography from '@material-ui/core/Typography';

import {
  Dropdown,
  DropdownMenuItem,
  DropdownNestedMenuItem,
} from '../../components/UI/NestedDropdown/Dropdown';

function NestedDropdown() {
  return (
    <div>
      <Box>
        <Dropdown
          trigger={<Button>Module</Button>}
          menu={[
            <DropdownMenuItem onClick={() => {}}>Assessment Module</DropdownMenuItem>,
            <DropdownNestedMenuItem
              label="Rep Letters"
              rightIcon={<ArrowRight />}
              menu={[
                <DropdownMenuItem
                  onClick={() => {
                    console.log('clicked');
                  }}
                >
                  BU Module
                </DropdownMenuItem>,
                <DropdownMenuItem
                  onClick={() => {
                    console.log('clicked');
                  }}
                >
                  Functional Module
                </DropdownMenuItem>,
              ]}
            />,
          ]}
        />
      </Box>
    </div>
  );
}

export default NestedDropdown;

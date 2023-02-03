import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FilterListIcon from '@mui/icons-material/FilterList';

export default function FilterHomePageTable() {
  const [open, setOpen] = React.useState(false);
  const [assessmentCycle, setAssessmentCycle] = React.useState('All');
  const [assessmentYear, setAssessmentYear] = React.useState(2023);

  const handleAssessmentCycle = (event) => {
    setAssessmentCycle(event.target.value);
  };

  const handleAssessmentYear = (event) => {
    setAssessmentYear(Number(event.target.value) || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <div>
      <Button variant="outlined" startIcon={<FilterListIcon />} onClick={handleClickOpen}>
        {' '}
        Assessment Filter
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Filter Assessment on the basis of :</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 190 }}>
              <InputLabel htmlFor="demo-dialog-native">Assessment Cycle</InputLabel>
              <Select
                native
                value={assessmentCycle}
                onChange={handleAssessmentCycle}
                input={<OutlinedInput label="AssessmentCycle" id="demo-dialog-native" />}
              >
                <option aria-label="None" value="None" />
                <option value={'A1'}>Cycle 1</option>
                <option value={'A2'}>Cycle 2</option>
                <option value={'A3'}>Cycle 3</option>
                <option value={'A4'}>Cycle 4</option>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">Year</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={assessmentYear}
                onChange={handleAssessmentYear}
                input={<OutlinedInput label="Year" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={2023}>2023</MenuItem>
                <MenuItem value={2024}>2024</MenuItem>
                <MenuItem value={2025}>2025</MenuItem>
                <MenuItem value={2026}>2026</MenuItem>
                <MenuItem value={2027}>2027</MenuItem>
                <MenuItem value={2028}>2028</MenuItem>
                <MenuItem value={2029}>2029</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

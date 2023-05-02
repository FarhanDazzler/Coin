import * as React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import Button from '../../../../../components/UI/Button';
import Select from '../../../../../components/UI/Select/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 140,
    },
  },
};

export default function FilterHomePageTable() {
  const [open, setOpen] = useState(false);
  const [assessmentCycle, setAssessmentCycle] = useState('All');
  const [assessmentYear, setAssessmentYear] = useState(2023);

  const [personName, setPersonName] = React.useState(['All Zones']);

  const names = [
    { label: 'All Zones', value: 'All Zones' },
    { label: 'AFR', value: 'AFR' },
    { label: 'NAZ', value: 'NAZ' },
    { label: 'EUR', value: 'EUR' },
    { label: 'APAC', value: 'APAC' },
  ];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

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
    <div className="d-flex justify-content-end">
      <FormControl sx={{ width: 130 }}>
        <Select
          value={personName}
          onChange={handleChange}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Placeholder</em>;
            }
            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
          options={names}
        />
      </FormControl>

      <Button
        size="large"
        startIcon={<FilterAltOutlinedIcon style={{ color: 'white' }} />}
        onClick={handleClickOpen}
        className="ml-4 dark-btn"
      >
        Assessment Filter
      </Button>

      <Button
        size="large"
        startIcon={<VisibilityOutlinedIcon style={{ color: 'white' }} />}
        className="ml-4 dark-btn"
      >
        View All
      </Button>

      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Filter Assessment on the basis of :</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 190 }}>
              <Select
                placeholder="Assessment Cycle"
                value={assessmentCycle}
                onChange={handleAssessmentCycle}
                options={[
                  { label: 'Assessment Cycle', value: 'All' },
                  { label: 'Cycle 1', value: 'A1' },
                  { label: 'Cycle 2', value: 'A2' },
                  { label: 'Cycle 3', value: 'A3' },
                  { label: 'Cycle 4', value: 'A4' },
                ]}
              />
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                labelId="demo-dialog-select-label"
                placeholder="Year"
                value={assessmentYear}
                onChange={handleAssessmentYear}
                options={[
                  { label: '2023', value: 2023 },
                  { label: '2023', value: 2024 },
                  { label: '2025', value: 2025 },
                  { label: '2026', value: 2026 },
                  { label: '2027', value: 2027 },
                  { label: '2028', value: 2028 },
                  { label: '2029', value: 2029 },
                  { label: '2030', value: 2030 },
                ]}
              />
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

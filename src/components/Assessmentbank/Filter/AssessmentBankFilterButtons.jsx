import React from 'react';
import { Group } from '@mantine/core';
import Select from '../../UI/Select/Select';
import FormControl from '@mui/material/FormControl';
import AssessmentPeriod from './AssessmentPeriod';
import './styles.scss';
import OrganizationMegaOption from '../../UI/OrganizationMegaOption/OrganizationMegaOption';
import Button from '../../UI/Button';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import SettingsBackupRestoreOutlinedIcon from '@mui/icons-material/SettingsBackupRestoreOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
const AssessmentBankFilterButtons = ({ handleSheduleSurvey }) => {
  const zoneNames = [
    { label: 'All Zones', value: 'All Zones' },
    { label: 'AFR', value: 'AFR' },
    { label: 'NAZ', value: 'NAZ' },
    { label: 'EUR', value: 'EUR' },
    { label: 'APAC', value: 'APAC' },
  ];

  const buNames = [
    { label: 'BU', value: 'BU' },
    { label: 'KU', value: 'KU' },
    { label: 'AB', value: 'AB' },
    { label: 'EUR', value: 'EUR' },
    { label: 'APAC', value: 'APAC' },
  ];

  const assessmentPeriodNames = [
    { label: 'Assessment Period', value: 'Assessment Period' },
    { label: 'KU', value: 'KU' },
    { label: 'AB', value: 'AB' },
    { label: 'EUR', value: 'EUR' },
    { label: 'APAC', value: 'APAC' },
  ];
  const organizationNames = [
    { label: 'Organization', value: 'Organization' },
    { label: 'KU', value: 'KU' },
    { label: 'AB', value: 'AB' },
    { label: 'EUR', value: 'EUR' },
    { label: 'APAC', value: 'APAC' },
  ];
  const processName = [
    { label: 'Process', value: 'Process' },
    { label: 'KU', value: 'KU' },
    { label: 'AB', value: 'AB' },
    { label: 'EUR', value: 'EUR' },
    { label: 'APAC', value: 'APAC' },
  ];
  return (
    <div className="container-fluid mt-5">
      <div className="row pt-5">
        <div className="col-12 col-lg-12">
          <Group spacing="xs">
            <FormControl sx={{ width: 130 }}>
              <Select
                options={zoneNames}
                label="Assessment Period"
                defaultValue={'All Zones'}
                placeholder="Select your option"
              />
            </FormControl>

            <FormControl sx={{ width: 100 }}>
              <Select
                options={buNames}
                label="BU"
                defaultValue={'BU'}
                placeholder="Select your option"
              />
            </FormControl>

            <AssessmentPeriod />

            <OrganizationMegaOption options={organizationNames} label="Organization" />

            <FormControl sx={{ width: 140 }}>
              <Select
                options={processName}
                label="Process"
                defaultValue={'Process'}
                placeholder="S elect your option"
              />
            </FormControl>
          </Group>
        </div>
        <div className="col-12 col-lg-12 pt-5">
          <Group spacing="xs" className="actions-button-wrapper">
            <Button
              color="silver"
              size="large"
              startIcon={<MoreTimeIcon />}
              onClick={handleSheduleSurvey}
            >
              Schedule Survey
            </Button>
            <Button size="large" startIcon={<SearchIcon />}>
              Search
            </Button>
            <Button size="large" startIcon={<FilterAltOutlinedIcon />}>
              Filter
            </Button>
            <Button size="large" startIcon={<DeleteOutlineOutlinedIcon />}>
              Delete
            </Button>
            <Button size="large" startIcon={<ContentCopyOutlinedIcon />}>
              Duplicate
            </Button>
            <Button size="large" startIcon={<SettingsBackupRestoreOutlinedIcon />}>
              Batch Recall
            </Button>
            <Button size="large" startIcon={<CampaignOutlinedIcon />}>
              Batch Trigger
            </Button>
          </Group>
        </div>
      </div>
    </div>
  );
};

export default AssessmentBankFilterButtons;

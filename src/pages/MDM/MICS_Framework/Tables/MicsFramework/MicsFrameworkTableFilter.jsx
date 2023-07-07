import React, { useState } from 'react';
import { Group, MultiSelect } from '@mantine/core';

const MicsFrameworkTableFilter = ({
  className,
  MICS_IDData,
  MICS_IDValue,
  setMICS_IDValue,
  mega_ProcessData,
  mega_ProcessValue,
  setMega_ProcessValue,
  subProcessData,
  subProcessValue,
  setSubProcessValue,
  weightData,
  weightValue,
  setWeightValue,
  kpiStatusData,
  kpiStatusValue,
  setKpiStatusValue,
}) => {
  const [searchValue, onSearchChange] = useState('');
  return (
    <div className={className}>
      <Group spacing="xs">
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={MICS_IDData}
          label={<span className="mantine-MultiSelect-label">{'MICS ID'}</span>}
          placeholder={'Select MICS ID'}
          searchable
          limit={20}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
          value={MICS_IDValue}
          onChange={(e) => {
            setMICS_IDValue(e);
          }}
          radius="xl"
          variant="filled"
          size="xs"
        />
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={mega_ProcessData}
          label={<span className="mantine-MultiSelect-label">{'Mega Process'}</span>}
          placeholder={'Select your Mega Process'}
          searchable
          limit={20}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
          value={mega_ProcessValue}
          onChange={(e) => {
            setMega_ProcessValue(e);
          }}
          radius="xl"
          variant="filled"
          size="xs"
        />
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={subProcessData}
          label={<span className="mantine-MultiSelect-label">{'Sub Process'}</span>}
          placeholder={'Select your Control ID'}
          searchable
          limit={20}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
          value={subProcessValue}
          onChange={(e) => {
            setSubProcessValue(e);
          }}
          radius="xl"
          variant="filled"
          size="xs"
        />
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={weightData}
          label={<span className="mantine-MultiSelect-label">{'MICS Weight'}</span>}
          placeholder={'Select your Provider Organization'}
          searchable
          limit={20}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
          value={weightValue}
          onChange={(e) => {
            setWeightValue(e);
          }}
          radius="xl"
          variant="filled"
          size="xs"
        />
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={kpiStatusData}
          label={<span className="mantine-MultiSelect-label">{'Kpi Status'}</span>}
          placeholder={'Select your Kpi Status'}
          searchable
          limit={20}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
          value={kpiStatusValue}
          onChange={(e) => {
            setKpiStatusValue(e);
          }}
          radius="xl"
          variant="filled"
          size="xs"
        />
      </Group>
    </div>
  );
};

export default MicsFrameworkTableFilter;

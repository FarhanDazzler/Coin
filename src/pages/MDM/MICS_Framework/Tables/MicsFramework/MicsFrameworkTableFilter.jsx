import React, { useState } from 'react';
import { Group, MultiSelect } from '@mantine/core';


// Filter buttons
const FilterMultiSelect = ({ data, label, value, onChange }) => {
  const [searchValue, onSearchChange] = useState('');

  return (
    <MultiSelect
      className="mantine-MultiSelect-wrapper"
      data={data}
      label={<span className="mantine-MultiSelect-label">{label}</span>}
      placeholder="Select your option"
      searchable
      limit={20}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      nothingFound="Nothing found"
      clearButtonLabel="Clear selection"
      clearable
      value={value}
      onChange={onChange}
      radius="xl"
      variant="filled"
      size="xs"
    />
  );
};

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
      <FilterMultiSelect
          data={MICS_IDData}
          label="MICS ID"
          value={MICS_IDValue}
          onChange={(e) => {
            setMICS_IDValue(e);
          }}
        />
        <FilterMultiSelect
          data={mega_ProcessData}
          label="Mega Process"
          value={mega_ProcessValue}
          onChange={(e) => {
            setMega_ProcessValue(e);
          }}
        />
        <FilterMultiSelect
          data={subProcessData}
          label="Sub Process"
          value={subProcessValue}
          onChange={(e) => {
            setSubProcessValue(e);
          }}
        />
        <FilterMultiSelect
          data={weightData}
          label="MICS Weight"
          value={weightValue}
          onChange={(e) => {
            setWeightValue(e);
          }}
        />
        <FilterMultiSelect
          data={kpiStatusData}
          label="Kpi Status"
          value={kpiStatusValue}
          onChange={(e) => {
            setKpiStatusValue(e);
          }}
        />
      </Group>
    </div>
  );
};

export default MicsFrameworkTableFilter;

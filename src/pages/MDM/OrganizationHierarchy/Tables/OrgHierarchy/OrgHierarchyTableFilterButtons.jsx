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

const OrgHierarchyTableFilterButtons = ({
  zoneData,
  zoneValue,
  setZoneValue,
  entityData,
  entityValue,
  setEntityValue,
  BUData,
  buValue,
  setBUValue,
  className = '',
}) => {
  const [searchValue, onSearchChange] = useState('');

  return (
    <div className={className}>
      <Group spacing="xs">
        <FilterMultiSelect
          data={zoneData}
          label="Zone"
          value={zoneValue}
          onChange={(e) => {
            setZoneValue(e);
          }}
        />
        <FilterMultiSelect
          data={entityData}
          label="Entity"
          value={entityValue}
          onChange={(e) => {
            setEntityValue(e);
          }}
        />
        <FilterMultiSelect
          data={BUData}
          label="BU"
          value={buValue}
          onChange={(e) => {
            setBUValue(e);
          }}
        />
      </Group>
    </div>
  );
};

export default OrgHierarchyTableFilterButtons;

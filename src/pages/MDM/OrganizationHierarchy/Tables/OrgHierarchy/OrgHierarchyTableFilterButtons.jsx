import React, { useState } from 'react';
import { Group, MultiSelect } from '@mantine/core';

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
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={zoneData}
          label={<span className="mantine-MultiSelect-label">{'Zone'}</span>}
          placeholder={'Select Zone'}
          searchable
          limit={20}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
          value={zoneValue}
          onChange={(e) => {
            setZoneValue(e);
          }}
          radius="xl"
          variant="filled"
          size="xs"
        />
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={entityData}
          label={<span className="mantine-MultiSelect-label">{'Entity'}</span>}
          placeholder={'Select your entity'}
          searchable
          limit={20}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
          value={entityValue}
          onChange={(e) => {
            setEntityValue(e);
          }}
          radius="xl"
          variant="filled"
          size="xs"
        />
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={BUData}
          label={<span className="mantine-MultiSelect-label">{'BU'}</span>}
          placeholder={'Select your option'}
          searchable
          limit={20}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
          value={buValue}
          onChange={(e) => {
            setBUValue(e);
          }}
          radius="xl"
          variant="filled"
          size="xs"
        />
      </Group>
    </div>
  );
};

export default OrgHierarchyTableFilterButtons;

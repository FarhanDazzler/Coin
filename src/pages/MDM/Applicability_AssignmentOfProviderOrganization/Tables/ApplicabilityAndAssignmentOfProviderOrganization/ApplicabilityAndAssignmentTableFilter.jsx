import React, { useState } from 'react';
import { Group, MultiSelect } from '@mantine/core';

const ApplicabilityAndAssignmentTableFilter = ({
  className,
  entityData,
  entityValue,
  setEntityValue,
  control_IDData,
  control_IDValue,
  setControl_IDValue,
  providerOrganizationData,
  providerOrganizationValue,
  setProviderOrganizationValue,
}) => {
  const [searchValue, onSearchChange] = useState('');

  return (
    <div className={className}>
      <Group spacing="xs">
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={entityData}
          label={<span className="mantine-MultiSelect-label">{'Entity / Receiver'}</span>}
          placeholder={'Select your Entity / Receiver'}
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
          data={control_IDData}
          label={<span className="mantine-MultiSelect-label">{'Control ID'}</span>}
          placeholder={'Select your Control ID'}
          searchable
          limit={20}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
          value={control_IDValue}
          onChange={(e) => {
            setControl_IDValue(e);
          }}
          radius="xl"
          variant="filled"
          size="xs"
        />
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={providerOrganizationData}
          label={<span className="mantine-MultiSelect-label">{'Provider Organization'}</span>}
          placeholder={'Select your Provider Organization'}
          searchable
          limit={20}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
          value={providerOrganizationValue}
          onChange={(e) => {
            setProviderOrganizationValue(e);
          }}
          radius="xl"
          variant="filled"
          size="xs"
        />
      </Group>
    </div>
  );
};

export default ApplicabilityAndAssignmentTableFilter;

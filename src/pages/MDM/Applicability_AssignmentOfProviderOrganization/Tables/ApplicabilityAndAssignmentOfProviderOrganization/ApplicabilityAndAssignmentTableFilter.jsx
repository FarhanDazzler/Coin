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
      <FilterMultiSelect
          data={entityData}
          label="Entity / Receiver"
          value={entityValue}
          onChange={(e) => {
            setEntityValue(e);
          }}
        />
        <FilterMultiSelect
          data={control_IDData}
          label="Control ID"
          value={control_IDValue}
          onChange={(e) => {
            setControl_IDValue(e);
          }}
        />
        <FilterMultiSelect
          data={providerOrganizationData}
          label="Provider Organization"
          value={providerOrganizationValue}
          onChange={(e) => {
            setProviderOrganizationValue(e);
          }}
        />
      </Group>
    </div>
  );
};

export default ApplicabilityAndAssignmentTableFilter;

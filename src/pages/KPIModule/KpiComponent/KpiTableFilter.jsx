import React, { useEffect, useMemo, useState } from 'react';
import { Group, MultiSelect } from '@mantine/core';
import { useTranslation } from 'react-i18next';

// Filter buttons
const FilterMultiSelect = ({ data, label, value, onChange }) => {
  const { t } = useTranslation();
  const [searchValue, onSearchChange] = useState('');
  return (
    <MultiSelect
      className="mantine-MultiSelect-wrapper"
      data={data}
      label={<span className="mantine-MultiSelect-label">{label}</span>}
      placeholder={t('selfAssessment.multi_select_filter_placeHolder')}
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

function removeDuplicates(array) {
  return array.filter(
    (item, index, self) => index === self.findIndex((t) => t.value === item.value),
  );
}

const KpiTableFilter = ({
  tableData = [],
  setFilterData,
  distinct_control_ids = [],
  distinct_provider = [],
  distinct_receiver = [],
  distinct_zone = [],
}) => {
  const [zoneValue, setZoneValue] = useState([]);
  const [entityValue, setEntityValue] = useState([]);
  const [providerValue, setProviderValue] = useState([]);
  const [controlIDValue, setControlIDValue] = useState([]);

  useEffect(() => {
    setFilterData({
      zoneValue,
      entityValue,
      providerValue,
      controlIDValue,
    });
  }, [zoneValue, entityValue, providerValue, controlIDValue]);

  return (
    <div className="col-12 col-lg-12 mb-5">
      <Group spacing="xs" className="actions-button-wrapper">
        <FilterMultiSelect
          data={distinct_zone || []}
          label="Zone"
          value={zoneValue}
          onChange={setZoneValue}
          disabled={!distinct_zone?.length}
        />
        <FilterMultiSelect
          data={distinct_control_ids || []}
          label="Control ID"
          value={controlIDValue}
          onChange={setControlIDValue}
          disabled={!distinct_control_ids?.length}
        />
        <FilterMultiSelect
          data={distinct_provider || []}
          label="Provider"
          value={providerValue}
          onChange={setProviderValue}
          disabled={!distinct_provider?.length}
        />
        <FilterMultiSelect
          data={distinct_receiver || []}
          label="Entity"
          value={entityValue}
          onChange={setEntityValue}
          disabled={!distinct_receiver?.length}
        />
      </Group>
    </div>
  );
};

export default KpiTableFilter;

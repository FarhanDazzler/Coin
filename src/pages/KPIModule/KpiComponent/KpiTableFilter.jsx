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

const KpiTableFilter = ({ tableData, setFilterData }) => {
  const [zoneValue, setZoneValue] = useState([]);
  const [entityValue, setEntityValue] = useState([]);
  const [providerValue, setProviderValue] = useState([]);
  const [controlIDValue, setControlIDValue] = useState([]);

  const zoneOption = useMemo(() => {
    return removeDuplicates(tableData.map((td) => ({ label: td.Zone, value: td.Zone })));
  }, [tableData]);
  const entityOption = useMemo(() => {
    return removeDuplicates(tableData.map((td) => ({ label: td.Entity, value: td.Entity })));
  }, [tableData]);
  const providerOption = useMemo(() => {
    return removeDuplicates(tableData.map((td) => ({ label: td.provider, value: td.provider })));
  }, [tableData]);
  const controlIDOption = useMemo(() => {
    return removeDuplicates(
      tableData.map((td) => ({ label: td.CONTROL_ID, value: td.CONTROL_ID })),
    );
  }, [tableData]);

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
          data={zoneOption}
          label="Zone"
          value={zoneValue}
          onChange={setZoneValue}
          disabled={!zoneOption.length}
        />
        <FilterMultiSelect
          data={entityOption}
          label="Entity"
          value={entityValue}
          onChange={setEntityValue}
          disabled={!entityOption.length}
        />
        <FilterMultiSelect
          data={providerOption}
          label="Provider"
          value={providerValue}
          onChange={setProviderValue}
          disabled={!providerOption.length}
        />
        {/*<FilterMultiSelect*/}
        {/*  data={providerOption}*/}
        {/*  label="Provider"*/}
        {/*  value={providerValue}*/}
        {/*  onChange={setProviderValue}*/}
        {/*  disabled={!providerOption.length}*/}
        {/*/>*/}
        <FilterMultiSelect
          data={controlIDOption}
          label="Control ID"
          value={controlIDValue}
          onChange={setControlIDValue}
          disabled={!controlIDOption.length}
        />
      </Group>
    </div>
  );
};

export default KpiTableFilter;

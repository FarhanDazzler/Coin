import React, { useState } from 'react';
import { Group, MultiSelect } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const FilterButtons = ({
  year,
  assessment_Cycle,
  Zone,
  BU,
  Receiver,
  Provider,
  yearValue,
  assessmentCycleValue,
  zoneValue,
  buValue,
  receiverValue,
  providerValue,
  setZoneValue,
  setBUValue,
  setReceiverValue,
  setProviderValue,
  setYearValue,
  setAssessmentCycleValue,
  isHide = false,
}) => {
  const [searchValue, onSearchChange] = useState('');
  const { t } = useTranslation();

  return (
    <div>
      <Group spacing="xs">
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={year}
          label={<span className="mantine-MultiSelect-label">Year</span>}
          placeholder={t('selfAssessment.multi_select_filter_placeHolder')}
          searchable
          limit={20}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
          value={yearValue}
          onChange={(e) => {
            setYearValue(e);
          }}
          radius="xl"
          variant="filled"
          size="xs"
        />
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={assessment_Cycle}
          label={<span className="mantine-MultiSelect-label">Assessment Cycle</span>}
          placeholder={t('selfAssessment.multi_select_filter_placeHolder')}
          searchable
          limit={20}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
          value={assessmentCycleValue}
          onChange={(e) => {
            setAssessmentCycleValue(e);
          }}
          radius="xl"
          variant="filled"
          size="xs"
        />
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={Zone}
          label={<span className="mantine-MultiSelect-label">Zone</span>}
          placeholder={t('selfAssessment.multi_select_filter_placeHolder')}
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
          data={BU}
          label={<span className="mantine-MultiSelect-label">BU</span>}
          placeholder={t('selfAssessment.multi_select_filter_placeHolder')}
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
        {!isHide && (
          <MultiSelect
            className="mantine-MultiSelect-wrapper"
            data={Receiver}
            label={<span className="mantine-MultiSelect-label">{'Receiver Organization'}</span>}
            placeholder={t('selfAssessment.multi_select_filter_placeHolder')}
            searchable
            limit={20}
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            nothingFound="Nothing found"
            clearButtonLabel="Clear selection"
            clearable
            value={receiverValue}
            onChange={(e) => {
              setReceiverValue(e);
            }}
            radius="xl"
            variant="filled"
            size="xs"
          />
        )}
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={Provider}
          label={<span className="mantine-MultiSelect-label">Provider Organization</span>}
          placeholder={t('selfAssessment.multi_select_filter_placeHolder')}
          searchable
          limit={20}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
          value={providerValue}
          onChange={(e) => {
            setProviderValue(e);
          }}
          radius="xl"
          variant="filled"
          size="xs"
        />
      </Group>
    </div>
  );
};

export default FilterButtons;

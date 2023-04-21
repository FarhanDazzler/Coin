import React from 'react';
import MultiSelectButton from '../Buttons/MultiSelect/MultiSelectButtonComponents';
import { Group } from '@mantine/core';

const FilterButtons = () => {
  const names = ['All Zones', 'AFR', 'NAZ', 'EUR', 'APAC'];
  return (
    <div className="container mt-5">
      <div className="row pt-5">
        <div className="col col-lg-12">
          <Group spacing="xs">
            <MultiSelectButton
              data={names}
              label="Assessment Period"
              placeholder="Select your option"
            />
            <MultiSelectButton data={names} label="Zone" placeholder="Select your option" />
            <MultiSelectButton
              data={names}
              label="Business Unit"
              placeholder="Select your option"
            />
            <MultiSelectButton data={names} label="Receiver Org" placeholder="Select your option" />
          </Group>
        </div>
      </div>
    </div>
  );
};

export default FilterButtons;

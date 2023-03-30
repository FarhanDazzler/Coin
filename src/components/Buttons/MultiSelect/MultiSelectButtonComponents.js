import { MultiSelect } from '@mantine/core';
import { useEffect, useState } from 'react';
import './MultiSelectButtonStyles.scss';

const MultiSelectButton = (props) => {
  const [searchValue, onSearchChange] = useState('');
  const [data, setData] = useState([]);
  const [value, setValue] = useState([]);

  useEffect(() => {
    if (props.data?.length > 0) {
      setData(props?.data);
    }
  }, [props]);

  console.log(value, 'Value');
  return (
    <MultiSelect
      className="mantine-MultiSelect-wrapper"
      //data={['React', 'Angular', 'Svelte', 'Vue', 'Riot', 'Next.js', 'Blitz.js']}
      data={data}
      label={<span className="mantine-MultiSelect-label">{props.label}</span>}
      placeholder={props.placeholder}
      searchable
      limit={20}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      nothingFound="Nothing found"
      clearButtonLabel="Clear selection"
      clearable
      value={value}
      onChange={(e) => {
        setValue(e);
        console.log(e);
      }}
      radius="xl"
      variant="filled"
      size="xs"
    />
  );
};

export default MultiSelectButton;

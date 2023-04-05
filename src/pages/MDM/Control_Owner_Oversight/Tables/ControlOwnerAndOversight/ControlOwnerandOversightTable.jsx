import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';

import Table from '../../../../../components/UI/Table';

import '../TableStyle.scss';

// geting data from redux
import { getControlOwnerAndOversightSelector } from '../../../../../redux/MDM/MDM_Selectors';
import Button from '../../../MDM_Tab_Buttons/Button';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';

// import for multi select filter
import { Group } from '@mantine/core';
import MultiSelectButton from '../../../../../components/Buttons/MultiSelect/MultiSelectButtonComponents.js';
import { MultiSelect } from '@mantine/core';
import '../../MultiSelectButtonStyles.scss';

// Filter buttons
const FilterButtons = ({
  Control_ID,
  provider_entity,
  cowner,
  coversight,
  valueControl_ID,
  valueProvider_entity,
  valueCowner,
  valueCoversight,
  setValueCoversight,
  setValueCowner,
  setValueProvider_entity,
  setValueControl_ID,
}) => {
  //console.log(props.zone, 'ZONE');
  const [searchValue, onSearchChange] = useState('');

  return (
    <div>
      <Group spacing="xs">
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={Control_ID}
          label={<span className="mantine-MultiSelect-label">{'Control ID'}</span>}
          placeholder={'Select your option'}
          searchable
          limit={20}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
          value={valueControl_ID}
          onChange={(e) => {
            setValueControl_ID(e);
            //console.log(e, 'Control_ID filter');
          }}
          radius="xl"
          variant="filled"
          size="xs"
        />
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={provider_entity}
          label={<span className="mantine-MultiSelect-label">{'Provider Org'}</span>}
          placeholder={'Select your option'}
          searchable
          limit={20}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
          value={valueProvider_entity}
          onChange={(e) => {
            setValueProvider_entity(e);
            //console.log(e, 'provider_entity filter');
          }}
          radius="xl"
          variant="filled"
          size="xs"
        />
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={cowner}
          label={<span className="mantine-MultiSelect-label">{'Control Owner'}</span>}
          placeholder={'Select your option'}
          searchable
          limit={20}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
          value={valueCowner}
          onChange={(e) => {
            setValueCowner(e);
            //console.log(e, 'cowner filter');
          }}
          radius="xl"
          variant="filled"
          size="xs"
        />
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={coversight}
          label={<span className="mantine-MultiSelect-label">{'Control Oversight'}</span>}
          placeholder={'Select your option'}
          searchable
          limit={20}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
          value={valueCoversight}
          onChange={(e) => {
            setValueCoversight(e);
            //console.log(e, 'coversight filter');
          }}
          radius="xl"
          variant="filled"
          size="xs"
        />
      </Group>
    </div>
  );
};

const ControlOwnerAndOversightTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableDataArray, setTableDataArray] = useState([]);

  const dispatch = useDispatch();

  // multi choice user input State for filters button
  const [valueControl_ID, setValueControl_ID] = useState([]);
  const [valueProvider_entity, setValueProvider_entity] = useState([]);
  const [valueCowner, setValueCowner] = useState([]);
  const [valueCoversight, setValueCoversight] = useState([]);

  const controlOwnerAndOversight = useSelector(getControlOwnerAndOversightSelector);

  const FilterData = (dataValue, conditionalParam) => {
    return dataValue.filter((i) => i[conditionalParam]);
  };
  useEffect(() => {
    if (
      !valueControl_ID.length &&
      !valueProvider_entity.length &&
      !valueCowner.length &&
      !valueCoversight.length
    ) {
      return setTableData(tableDataArray);
    }

    setTableData(
      tableDataArray.filter(
        (i) => {

          return (valueControl_ID?.length ? valueControl_ID.includes(i.Control_ID) : true) &&
            (valueProvider_entity?.length ? valueProvider_entity.includes(i.provider_entity) : true) &&
            (valueCowner?.length ? valueCowner.includes(i.cowner) : true) &&
            (valueCoversight?.length ? valueCoversight.includes(i.coversight) : true)
        }
      ),
    );
  }, [valueControl_ID, valueProvider_entity, valueCowner, valueCoversight]);
  const TABLE_COLUMNS = [
    {
      field: 'Control_ID',
      headerName: 'Control ID',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'zone',
      headerName: 'Zone',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'provider_entity',
      headerName: 'Provider Org',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'valid_from',
      headerName: 'Valid From',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'valid_to',
      headerName: 'Valid To',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'local_control_description',
      headerName: 'Local Control Desc(LCD)',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'cowner',
      headerName: 'Control Owner',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'coversight',
      headerName: 'Control Oversight',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    const updatedData = controlOwnerAndOversight.data.map((i, index) => {
      return {
        id: index,
        ...i,
      };
    });

    setTableData(updatedData);
    setTableDataArray(updatedData);
  }, [controlOwnerAndOversight.data]);

  const ActiveToolADD = ({ text }) => (
    <Tooltip title={text} placement="bottom-start">
      <ControlPointRoundedIcon color="black" />
    </Tooltip>
  );

  const ActiveToolEdit = ({ text }) => (
    <Tooltip title={text} placement="bottom-start">
      <EditIcon color="black" />
    </Tooltip>
  );

  const handleOnclickEdit = () => {
    // edit code
  };
  const handleOnclickAdd = () => {
    // Add code
  };

  // Function to remove duplicate value from array
  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  // Arrays for showing data on filters
  const controlIDArray = controlOwnerAndOversight.data.map((i) => i.Control_ID);
  const providerOrgArray = controlOwnerAndOversight.data.map((i) => i.provider_entity);
  const cownerArray = controlOwnerAndOversight.data.map((i) => i.cowner);
  const coversightArray = controlOwnerAndOversight.data.map((i) => i.coversight);
  //zoneArray = removeDuplicates(zoneArray);
  //console.log(removeDuplicates(zoneArray),zoneArray, 'zoneeeeee');

  return (
    <>
      <div className="container mt-5">
        <div className="row pt-5">
          <div className="col col-lg-12">
            <div className="mdm-table-global-filters">
              <FilterButtons
                Control_ID={removeDuplicates(controlIDArray)}
                provider_entity={removeDuplicates(providerOrgArray)}
                cowner={removeDuplicates(cownerArray)}
                coversight={removeDuplicates(coversightArray)}
                valueControl_ID={valueControl_ID}
                valueProvider_entity={valueProvider_entity}
                valueCowner={valueCowner}
                valueCoversight={valueCoversight}
                setValueControl_ID={setValueControl_ID}
                setValueProvider_entity={setValueProvider_entity}
                setValueCowner={setValueCowner}
                setValueCoversight={setValueCoversight}
              />
            </div>
            <div className="mdm-table-button">
              <div className="table-heading" style={{ justifyContent: 'space-between' }}>
                <div>
                  <FloatRight size={24} strokeWidth={2} color={'#FFFFFF'} />
                  <span style={{ paddingLeft: '16px' }}>Create or Modify Organizations</span>
                </div>
                <div>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ActiveToolEdit text="Free Text" />}
                    className="edit-button-mdm-table"
                    onClick={handleOnclickEdit}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ActiveToolADD text="Free Text" />}
                    className="add-button-mdm-table"
                    onClick={handleOnclickAdd}
                  >
                    Add New
                  </Button>
                </div>
              </div>
            </div>
            <Table tableData={tableData} tableColumns={tableColumns} columns={tableColumns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ControlOwnerAndOversightTable;

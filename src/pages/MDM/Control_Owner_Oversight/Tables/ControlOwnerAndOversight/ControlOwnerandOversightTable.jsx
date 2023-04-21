import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';
import Table from '../../../../../components/UI/Table';
import { Messaging } from 'react-cssfx-loading';
import '../TableStyle.scss';

// geting data from redux
import {
  getControlOwnerAndOversightSelector,
  modifyControlOwnerAndOversightSelector,
} from '../../../../../redux/MDM/MDM_Selectors';
import { getControlInstanceHistoryAction } from '../../../../../redux/MDM/MDM_Action';
import Button from '../../../MDM_Tab_Buttons/Button';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';

// import for multi select filter
import { Group } from '@mantine/core';
import MultiSelectButton from '../../../../../components/Buttons/MultiSelect/MultiSelectButtonComponents.js';
import { MultiSelect } from '@mantine/core';
import '../../MultiSelectButtonStyles.scss';
import AssignModal from './AssignModal';
import CustomModal from '../../../../../components/UI/CustomModal';
import LcdModal from './LcdModal';
import Swal from 'sweetalert2';

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
  const [showModal, setShowModal] = useState(false);
  const [showLcdModal, setShowLcdModal] = useState(false);
  const [editTableIndex, setEditTableIndex] = useState([]);
  const [assignTableData, setAssignTableData] = useState();
  const [selectedControlIds, setSelectedControlIds] = useState();
  console.log('assignTableData', assignTableData);
  const controlOwnerAndOversight = useSelector(getControlOwnerAndOversightSelector);
  const modifyControlOwnerAndOversightState = useSelector(modifyControlOwnerAndOversightSelector);
  console.log('modifyControlOwnerAndOversightState=====>>>>', modifyControlOwnerAndOversightState);
  const FilterData = (dataValue, conditionalParam) => {
    return dataValue.filter((i) => i[conditionalParam]);
  };
  useEffect(() => {
    console.log(modifyControlOwnerAndOversightState);
    setShowLcdModal(false);
    setShowModal(false);
  }, [modifyControlOwnerAndOversightState.data]);
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
      tableDataArray.filter((i) => {
        return (
          (valueControl_ID?.length ? valueControl_ID.includes(i.Control_ID) : true) &&
          (valueProvider_entity?.length
            ? valueProvider_entity.includes(i.provider_entity)
            : true) &&
          (valueCowner?.length ? valueCowner.includes(i.cowner) : true) &&
          (valueCoversight?.length ? valueCoversight.includes(i.coversight) : true)
        );
      }),
    );
  }, [valueControl_ID, valueProvider_entity, valueCowner, valueCoversight]);

  const class_to_apply = (item) => {
    let className = '';
    if (item.toUpperCase() === 'ACTIVE') {
      className = 'badge badge-success';
    }
    if (item.toUpperCase() === 'INACTIVE') {
      className = 'badge badge-red';
    }
    return className;
  };

  const TABLE_COLUMNS = [
    {
      field: 'zone',
      headerName: 'Zone',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'provider_entity',
      headerName: 'Provider Organization',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Control_ID',
      headerName: 'Control ID',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'control_id_provider_entity',
      headerName: 'Provider Organization + Control ID',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 300,
    },
    {
      field: 'local_control_description',
      headerName: 'Local Control Desc(LCD)',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 500,
    },
    {
      field: 'cowner',
      headerName: 'Control Owner',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'cowner_status',
      headerName: 'Status',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 100,
      renderCell: (row) => {
        return (
          <span className={class_to_apply(row.row.cowner_status)}>
            {row.row.cowner === '' ? 'N/A' : row.row.cowner_status}
          </span>
        );
      },
    },
    {
      field: 'coversight',
      headerName: 'Control Oversight',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'coversight_status',
      headerName: 'Status',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 100,
      renderCell: (row) => {
        return (
          <span className={class_to_apply(row.row.coversight_status)}>
            {row.row.coversight === '' ? 'N/A' : row.row.coversight_status}
          </span>
        );
      },
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
    let assignDataArray = [];
    if (editTableIndex.length >= 1) {
      tableData.find((data, i) => {
        console.log(i);
        editTableIndex.map((dataa) => {
          if (i === dataa) {
            assignDataArray.push(data);
            setAssignTableData(assignDataArray);
            setShowLcdModal(true);
          }
        });
      });
    }
  };
  const handleOnclickAdd = () => {
    let controlIDArray = [];
    console.log('controlIDArray', controlIDArray);
    let assignDataArray = [];
    if (editTableIndex.length == 0) {
      Swal.fire('Oops...', 'You need to select table first to Assign', 'error');
    } else if (editTableIndex.length >= 1) {
      tableData.find((data, i) => {
        console.log(i);
        editTableIndex.map((dataa) => {
          if (i === dataa) {
            assignDataArray.push(data);
            controlIDArray.push(data.control_id_provider_entity);
            // const coverSightCheck = assignDataArray.every(({ coversight }) => coversight === assignDataArray[0]?.coversight);
            // const cownerCheck = assignDataArray.every(({ cowner }) => cowner === assignDataArray[0]?.cowner);
            // if (cownerCheck === true && coverSightCheck === true) {
            setAssignTableData(assignDataArray);
            setSelectedControlIds(controlIDArray);
            setShowModal(true);
            // }else{
            //   setAssignTableData([]);
            //   setShowModal(false);
            //   Swal.fire('Oops...', 'Selected Records are not matching with criteria to Assign. Try Selecting other Records', 'error');
            // }
          }
        });
      });
    }
    // dispatch(getControlInstanceHistoryAction(controlIDArray))
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
        {/*<Messaging color="#fff" width="100px" height="100px" duration="1s" />*/}
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
                  <span style={{ paddingLeft: '16px' }}>Control Owner And Oversight Table</span>
                </div>
                <div>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ActiveToolEdit text="Free Text" />}
                    className="edit-button-mdm-table"
                    onClick={handleOnclickEdit}
                  >
                    Edit LCD
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<ActiveToolADD text="Free Text" />}
                    className="add-button-mdm-table"
                    onClick={handleOnclickAdd}
                  >
                    Assign
                  </Button>
                </div>
              </div>
            </div>
            <Table
              tableData={tableData}
              tableColumns={tableColumns}
              columns={tableColumns}
              setEditTableIndex={setEditTableIndex}
            />
          </div>
        </div>
      </div>
      <CustomModal
        className="add-org"
        open={showModal}
        onClose={() => setShowModal(false)}
        width={900}
        title="Assign Control Owner & Oversight"
        bodyClassName="p-0"
      >
        <AssignModal
          setShowModal={setShowModal}
          assignTableData={assignTableData}
          selectedControlIds={selectedControlIds}
        />
      </CustomModal>
      <CustomModal
        className="add-org"
        open={showLcdModal}
        onClose={() => setShowLcdModal(false)}
        width={900}
        title="Modify LCD"
        bodyClassName="p-0"
      >
        <LcdModal setShowModal={setShowLcdModal} assignTableData={assignTableData} />
      </CustomModal>
    </>
  );
};

export default ControlOwnerAndOversightTable;

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FloatRight } from 'tabler-icons-react';
import Table2 from '../../../../../components/UI/Table/Table2';
import '../TableStyle.scss';
// geting data from redux
import {
  getControlOwnerAndOversightSelector,
  modifyControlOwnerAndOversightSelector,
} from '../../../../../redux/MDM/MDM_Selectors';
import Button from '../../../MDM_Tab_Buttons/Button';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
// import for multi select filter
import { Group } from '@mantine/core';
import { MultiSelect } from '@mantine/core';
import '../../MultiSelectButtonStyles.scss';
import AssignModal from './AssignModal';
import CustomModal from '../../../../../components/UI/CustomModal';
import LcdModal from './LcdModal';
import Swal from 'sweetalert2';
import { DotSpinner } from '@uiball/loaders';

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

// Filter buttons
const FilterButtons = ({
  Control_ID,
  provider_entity,
  cowner,
  coversight,
  Zone,
  valueControl_ID,
  valueProvider_entity,
  valueCowner,
  valueCoversight,
  valueZone,
  setValueCoversight,
  setValueCowner,
  setValueProvider_entity,
  setValueControl_ID,
  setValueZone,
}) => {
  const [searchValue, onSearchChange] = useState('');

  return (
    <div>
      <Group spacing="xs">
        <FilterMultiSelect
          data={Control_ID}
          label="Control ID"
          value={valueControl_ID}
          onChange={(e) => {
            setValueControl_ID(e);
          }}
        />
        <FilterMultiSelect
          data={Zone}
          label="Zone"
          value={valueZone}
          onChange={(e) => {
            setValueZone(e);
          }}
        />
        <FilterMultiSelect
          data={provider_entity}
          label="Provider Organization"
          value={valueProvider_entity}
          onChange={(e) => {
            setValueProvider_entity(e);
          }}
        />
        <FilterMultiSelect
          data={cowner}
          label="Control Owner"
          value={valueCowner}
          onChange={(e) => {
            setValueCowner(e);
          }}
        />
        <FilterMultiSelect
          data={coversight}
          label="Control Oversight"
          value={valueCoversight}
          onChange={(e) => {
            setValueCoversight(e);
          }}
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
  const [valueZone, setValueZone] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showLcdModal, setShowLcdModal] = useState(false);
  const [editTableIndex, setEditTableIndex] = useState([]);
  const [assignTableData, setAssignTableData] = useState();
  const [selectedControlIds, setSelectedControlIds] = useState();
  const controlOwnerAndOversight = useSelector(getControlOwnerAndOversightSelector);
  const modifyControlOwnerAndOversightState = useSelector(modifyControlOwnerAndOversightSelector);
  const FilterData = (dataValue, conditionalParam) => {
    return dataValue.filter((i) => i[conditionalParam]);
  };
  useEffect(() => {
    setShowLcdModal(false);
    setShowModal(false);
    setValueControl_ID([]);
    setValueProvider_entity([]);
    setValueCowner([]);
    setValueCoversight([]);
    setValueZone([]);
  }, [modifyControlOwnerAndOversightState.data]);
  useEffect(() => {
    if (
      !valueControl_ID.length &&
      !valueProvider_entity.length &&
      !valueCowner.length &&
      !valueCoversight.length &&
      !valueZone.length
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
          (valueCoversight?.length ? valueCoversight.includes(i.coversight) : true) &&
          (valueZone?.length ? valueZone.includes(i.zone) : true)
        );
      }),
    );
  }, [valueControl_ID, valueProvider_entity, valueCowner, valueCoversight, valueZone]);

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
      accessorKey: 'zone',
      id: 'zone',
      header: 'Zone',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'provider_entity',
      id: 'provider_entity',
      header: 'Provider Organization',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 230,
    },
    {
      accessorKey: 'Control_ID',
      id: 'Control_ID',
      header: 'Control ID',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 160,
    },
    {
      accessorKey: 'Control_Name',
      id: 'Control_Name',
      header: 'Control Name',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'control_id_provider_entity',
      id: 'control_id_provider_entity',
      header: 'Control ID + Provider Organization',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 300,
    },
    {
      accessorKey: 'cowner',
      id: 'cowner',
      header: 'Control Owner',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 300,
    },
    // {
    //   accessorKey: 'cowner_status',
    //   id: 'cowner_status',
    //   header: 'Control Owner Status',
    //   flex: 1,
    //   columnDefType: 'data',
    //   cellClassName: 'dashboardCell',
    //   size: 180,
    //   Cell: (row) => {
    //     return (
    //       <span className={class_to_apply(row.row.original.cowner_status)}>
    //         {row.row.original.cowner_status === '' ? 'N/A' : row.row.original.cowner_status}
    //       </span>
    //     );
    //   },
    // },
    {
      accessorKey: 'coversight',
      id: 'coversight',
      header: 'Control Oversight',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 300,
    },
    // {
    //   accessorKey: 'coversight_status',
    //   id: 'coversight_status',
    //   header: 'Control Oversight Status',
    //   flex: 1,
    //   columnDefType: 'data',
    //   cellClassName: 'dashboardCell',
    //   size: 190,
    //   Cell: (row) => {
    //     return (
    //       <span className={class_to_apply(row.row.original.coversight_status)}>
    //         {row.row.original.coversight_status === '' ? 'N/A' : row.row.original.coversight_status}
    //       </span>
    //     );
    //   },
    // },
    {
      accessorKey: 'receiver_entity',
      id: 'receiver_entity',
      header: 'Receiver Organization',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 230,
    },
    {
      accessorKey: 'local_control_description',
      id: 'local_control_description',
      header: 'Local Control Desc(LCD)',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 500,
      Cell: (row) => {
        return (
          <span>
            <p dangerouslySetInnerHTML={{ __html: row.row.original.local_control_description }} />
          </span>
        );
      },
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
    if (editTableIndex.length == 0) {
      Swal.fire(
        'Oops...',
        'You need to select a row from the table first to Edit/Add LCD',
        'error',
      );
    } else if (editTableIndex.length >= 1) {
      const data = tableData.filter((data, i) => editTableIndex.includes(data.id));
      setAssignTableData(data);
      setShowLcdModal(true);
    }
  };
  const handleOnclickAdd = () => {
    if (editTableIndex.length == 0) {
      Swal.fire('Oops...', 'You need to select a row from the table first to Assign', 'error');
    } else if (editTableIndex.length >= 1) {
      const data = tableData.filter((data, i) => editTableIndex.includes(data.id));
      const controlIDArray = data.map((obj) => obj.control_id_provider_entity);
      setAssignTableData(data);
      setSelectedControlIds(controlIDArray);
      setShowModal(true);
    }
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
  const zoneArray = controlOwnerAndOversight.data.map((i) => i.zone);
  //zoneArray = removeDuplicates(zoneArray);

  // object for Expanding Detail Panel
  const Is_Expanding_Detail_Panel = {
    Is_Expanding: true,
    Table_Name: 'Control Owner & Oversight',
  };
  return (
    <>
      {modifyControlOwnerAndOversightState.loading ? (
        <div className="loader-animation">
          <DotSpinner size={100} speed={0.9} color="#e3af32" />
          <p className="loader-Desc ml-3">Please wait a moment while we finalize the process</p>
        </div>
      ) : (
        <>
          <div className="container-fluid mt-5">
            {/*<Messaging color="#fff" width="100px" height="100px" duration="1s" />*/}
            <div className="row pt-5">
              <div className="col-12 col-lg-12">
                <div className="mdm-table-global-filters">
                  <FilterButtons
                    Control_ID={removeDuplicates(controlIDArray)}
                    provider_entity={removeDuplicates(providerOrgArray)}
                    cowner={removeDuplicates(cownerArray)}
                    coversight={removeDuplicates(coversightArray)}
                    Zone={removeDuplicates(zoneArray)}
                    valueControl_ID={valueControl_ID}
                    valueProvider_entity={valueProvider_entity}
                    valueCowner={valueCowner}
                    valueCoversight={valueCoversight}
                    valueZone={valueZone}
                    setValueControl_ID={setValueControl_ID}
                    setValueProvider_entity={setValueProvider_entity}
                    setValueCowner={setValueCowner}
                    setValueCoversight={setValueCoversight}
                    setValueZone={setValueZone}
                  />
                </div>
                <div className="mdm-table-button">
                  <div className="table-heading" style={{ justifyContent: 'space-between' }}>
                    <div>
                      <FloatRight size={24} strokeWidth={2} color={'#FFFFFF'} />
                      <span style={{ paddingLeft: '16px' }}>Control Owner And Oversight Table</span>
                    </div>
                    <div>
                      {/*<Button*/}
                      {/*  variant="outlined"*/}
                      {/*  size="small"*/}
                      {/*  startIcon={<ActiveToolEdit text="Free Text" />}*/}
                      {/*  className="edit-button-mdm-table"*/}
                      {/*  onClick={handleOnclickEdit}*/}
                      {/*>*/}
                      {/*  Edit/Add LCD*/}
                      {/*</Button>*/}
                      {/* <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ActiveToolADD text="Free Text" />}
                        className="add-button-mdm-table"
                        onClick={handleOnclickAdd}
                      >
                        Assign
                      </Button> */}
                    </div>
                  </div>
                </div>
                <Table2
                  tableData={tableData}
                  loading={controlOwnerAndOversight.loading}
                  tableColumns={tableColumns}
                  setEditTableIndex={setEditTableIndex}
                  //Is_Expanding_Detail_Panel={Is_Expanding_Detail_Panel}
                />
              </div>
            </div>
          </div>
          <CustomModal
            className="add-org"
            open={showModal}
            onClose={() => setShowModal(false)}
            width={1080}
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
      )}
    </>
  );
};

export default ControlOwnerAndOversightTable;

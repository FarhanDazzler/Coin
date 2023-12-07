import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMsal } from '@azure/msal-react';
import { Group, MultiSelect } from '@mantine/core';
import { toast } from 'react-toastify';
import Table from '../../../../components/UI/Table';
import Table2 from '../../../../components/UI/Table/Table2';
import NoDataPlaceholder from '../../../../components/NoDataPlaceholder';
import { getInternalControlTableData } from '../../../../redux/DashBoard/DashBoardAction';
import { getInternalControlDataSelector } from '../../../../redux/DashBoard/DashBoardSelectors';
import TableLoader from '../../../../components/UI/TableLoader';
import {
  class_to_apply,
  Badge_apply,
} from '../../V2/InternalControlHomePage/HomePageTable/constant';
//import FilterButtons from '../../../../components/FilterButtons';
import Button from '../../../../components/UI/Button';
import {
  getControlDataAction,
  getControlDataGcdAction,
} from '../../../../redux/ControlData/ControlDataAction';
import Cookies from 'js-cookie';

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

const InternalControlTable = ({
  zoneValue,
  setZoneValue,
  buValue,
  setBUValue,
  receiverValue,
  setReceiverValue,
  providerValue,
  setProviderValue,
  statusOfAssessmentValue,
  setStatusOfAssessmentValue,
  controlIdValue,
  setControlIdValue,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = Cookies.get('token');

  const { instance, accounts, inProgress } = useMsal();
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableDataArray, setTableDataArray] = useState([]);

  function getCurrentQuarter() {
    var currentMonth = new Date().getMonth() + 1; // Adding 1 because getMonth() returns zero-based month (0-11)
    var quarter;

    if (currentMonth >= 1 && currentMonth <= 3) {
      quarter = 'Assessment Cycle 1';
    } else if (currentMonth >= 4 && currentMonth <= 6) {
      quarter = 'Assessment Cycle 2';
    } else if (currentMonth >= 7 && currentMonth <= 9) {
      quarter = 'Assessment Cycle 3';
    } else {
      quarter = 'Assessment Cycle 4';
    }
    return quarter;
  }

  const [yearValue, setYearValue] = useState([new Date().getFullYear().toString()]);
  const [assessmentCycleValue, setAssessmentCycleValue] = useState([getCurrentQuarter()]);

  useEffect(() => {
    //code for getting Internal Control Home Page table data

    if (yearValue.length > 0) {
      const payload = {
        assessmentCycle: assessmentCycleValue,
        year: yearValue,
      };
      //toast.error('Please select year in filter.');
      console.log(payload, 'payload');
      dispatch(getInternalControlTableData(payload));
    } else {
      toast.error('Please select Year in filter.');
    }
  }, [assessmentCycleValue, yearValue, token]);

  const handleControlIDClick = (id, row) => {
    //TODO: modal redirect
    let payload = {
      controlId: id,
      coOwner: row.Control_Owner,
      provider: row?.Provider,
    };
    let gcdPayload = {
      controlId: id,
    };
    dispatch(getControlDataAction(payload));
    dispatch(getControlDataGcdAction(gcdPayload));
    history.push(`${history.location.pathname}?Control_ID=${id}`, row);
  };

  const getDashBoardDataState = useSelector(getInternalControlDataSelector);

  useEffect(() => {
    if (
      !zoneValue.length &&
      !buValue.length &&
      !receiverValue.length &&
      !providerValue.length &&
      !statusOfAssessmentValue.length &&
      !controlIdValue.length
    ) {
      return setTableData(tableDataArray);
    }
    const updateData = tableDataArray.filter((i) => {
      return (
        (zoneValue?.length ? zoneValue.includes(i.Zone) : true) &&
        (buValue?.length ? buValue.includes(i.BU) : true) &&
        (receiverValue?.length ? receiverValue.includes(i.Receiver) : true) &&
        (providerValue?.length ? providerValue.includes(i.Provider) : true) &&
        (controlIdValue?.length ? controlIdValue.includes(i.Control_ID) : true) &&
        (statusOfAssessmentValue?.length ? statusOfAssessmentValue.includes(i.Status) : true)
      );
    });
    setTableData(updateData);
  }, [zoneValue, buValue, receiverValue, providerValue, controlIdValue, statusOfAssessmentValue]);

  const TABLE_COLUMNS = [
    {
      accessorKey: 'Action',
      id: 'Action',
      header: 'Action',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 210,
      Cell: (row) => {
        return (
          <div>
            {(row.row.original.Status === 'Completed' ||
              row.row.original.Status === 'Incorrect Owner') && (
              <Button
                className="mr-2"
                // onClick={() => history.push(`/Assessments/${row.row.Control_ID}`)}
                onClick={() => handleControlIDClick(row.row.original.Control_ID, row.row.original)}
              >
                Review
              </Button>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'Zone',
      id: 'Zone',
      header: 'Zone',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'Control_ID',
      id: 'Control_ID',
      header: 'Control ID',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 140,
      Cell: (row) => {
        return (
          <span
            className={'text-yellow'}
            // onClick={() => handleControlIDClick(row.row.Control_ID)}
          >
            {row.row.original.Control_ID}
          </span>
        );
      },
    },
    {
      accessorKey: 'Provider',
      id: 'Provider',
      header: 'Provider Organization',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'BU',
      id: 'BU',
      header: `BU (Receiver/org's BU)`,
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'Receiver',
      id: 'Receiver',
      header: 'Receiver Organization',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'Status',
      id: 'Status',
      header: 'Status',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 120,
      Cell: (row) => {
        return <span className={'text-yellow-dark'}>{row.row.original.Status}</span>;
      },
    },
    {
      accessorKey: 'KPI_Result',
      id: 'KPI_Result',
      header: 'KPI Result',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 100,
      Cell: (row) => {
        return <Badge_apply data={row.row.original.KPI_Result} />;
      },
    },
    {
      accessorKey: 'Assessment_Result',
      id: 'Assessment_Result',
      header: 'Assessment Result',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 150,
      Cell: (row) => {
        return <Badge_apply data={row.row.original.Assessment_Result} />;
      },
    },
    {
      accessorKey: 'Compliance_Result',
      id: 'Compliance_Result',
      header: 'Compliance Result',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 150,
      Cell: (row) => {
        return <Badge_apply data={row.row.original.Compliance_Result} />;
      },
    },
    {
      accessorKey: 'Control_Owner',
      id: 'Control_Owner',
      header: 'Control Owner',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'Control_Oversight',
      id: 'Control_Oversight',
      header: 'Control Oversight',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 250,
    },
    {
      accessorKey: 'Assessment_Cycle',
      id: 'Assessment_Cycle',
      header: 'Assessment Cycle',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 150,
    },
    {
      accessorKey: 'Year',
      id: 'Year',
      header: 'Year',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'Modified_By',
      id: 'Modified_By',
      header: 'Assessment submitted by',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    // const updatedData = getDashBoardDataState?.data?.map((i, index) => {
    //   return {
    //     id: i.id,
    //     ...i,
    //   };
    // });
    setTableData(getDashBoardDataState?.data);
    setTableDataArray(getDashBoardDataState?.data);
  }, [getDashBoardDataState?.data]);

  // Function to remove duplicate value from array
  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  function getYearsData() {
    var currentYear = new Date().getFullYear();
    var previousYear = currentYear - 1;
    var yearBeforePrevious = previousYear - 1;

    var yearsArray = [
      { value: currentYear.toString(), label: currentYear.toString() },
      { value: previousYear.toString(), label: previousYear.toString() },
      { value: yearBeforePrevious.toString(), label: yearBeforePrevious.toString() },
    ];

    return yearsArray;
  }

  // Arrays for showing data on filters
  const Zone = getDashBoardDataState?.data?.map((i) => i.Zone);
  const BU = getDashBoardDataState?.data?.map((i) => i.BU);
  const Receiver = getDashBoardDataState?.data?.map((i) => i.Receiver);
  const Provider = getDashBoardDataState?.data?.map((i) => i.Provider);
  // const year = getDashBoardDataState?.data?.map((i) => i.Year);
  const assessment_Cycle = getDashBoardDataState?.data?.map((i) => i.Assessment_Cycle);
  const control_id = getDashBoardDataState?.data?.map((i) => i.Control_ID);
  const status_of_assessment = getDashBoardDataState?.data?.map((i) => i.Status);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col col-lg-12">
            <div className="container-fluid pl-0 pr-0 mt-5">
              <div className="row">
                <div className="col-12 col-lg-12">
                  <Group spacing="xs" className="actions-button-wrapper">
                    <MultiSelect
                      className="mantine-MultiSelect-wrapper"
                      data={getYearsData() || []}
                      label={<span className="mantine-MultiSelect-label">Year</span>}
                      placeholder="Select your option"
                      limit={20}
                      nothingFound="Nothing found"
                      clearButtonLabel="Clear selection"
                      clearable
                      value={yearValue}
                      onChange={setYearValue}
                      radius="xl"
                      variant="filled"
                      size="xs"
                    />
                    <MultiSelect
                      className="mantine-MultiSelect-wrapper"
                      data={[
                        { value: 'Assessment Cycle 1', label: 'Assessment Cycle 1' },
                        { value: 'Assessment Cycle 2', label: 'Assessment Cycle 2' },
                        { value: 'Assessment Cycle 3', label: 'Assessment Cycle 3' },
                        { value: 'Assessment Cycle 4', label: 'Assessment Cycle 4' },
                      ]}
                      label={<span className="mantine-MultiSelect-label">Assessment Cycle</span>}
                      placeholder="Select your option"
                      limit={20}
                      nothingFound="Nothing found"
                      clearButtonLabel="Clear selection"
                      clearable
                      value={assessmentCycleValue}
                      onChange={setAssessmentCycleValue}
                      radius="xl"
                      variant="filled"
                      size="xs"
                    />
                    <FilterMultiSelect
                      data={removeDuplicates(Zone) || []}
                      label="Zone"
                      value={zoneValue}
                      onChange={setZoneValue}
                    />
                    <FilterMultiSelect
                      data={removeDuplicates(BU) || []}
                      label="BU"
                      value={buValue}
                      onChange={setBUValue}
                    />
                    <FilterMultiSelect
                      data={removeDuplicates(Receiver) || []}
                      label="Receiver Organization"
                      value={receiverValue}
                      onChange={setReceiverValue}
                    />
                    <FilterMultiSelect
                      data={removeDuplicates(Provider) || []}
                      label="Provider Organization"
                      value={providerValue}
                      onChange={setProviderValue}
                    />
                    <FilterMultiSelect
                      data={removeDuplicates(control_id) || []}
                      label="Control ID"
                      value={controlIdValue}
                      onChange={setControlIdValue}
                    />
                    <FilterMultiSelect
                      data={removeDuplicates(status_of_assessment) || []}
                      label="Status of Assessment"
                      value={statusOfAssessmentValue}
                      onChange={setStatusOfAssessmentValue}
                    />
                  </Group>
                </div>
              </div>
            </div>
            <div className="container-fluid pl-0 pr-0 mt-5">
              {getDashBoardDataState.loading ? (
                <TableLoader className="mt-8" />
              ) : (
                <div className="row">
                  {tableData?.length > 0 ? (
                    <Table2
                      tableData={tableData}
                      loading={getDashBoardDataState.loading}
                      tableColumns={tableColumns}
                    />
                  ) : (
                    <NoDataPlaceholder />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InternalControlTable;

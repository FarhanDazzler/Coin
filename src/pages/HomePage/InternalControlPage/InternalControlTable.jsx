import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMsal } from '@azure/msal-react';
import { Group, MultiSelect, Badge } from '@mantine/core';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Button from '../../../components/UI/Button';
import TableLoader from '../../../components/UI/TableLoader';
import Table2 from '../../../components/UI/Table/Table2';
import NoDataPlaceholder from '../../../components/NoDataPlaceholder';
import { getInternalControlTableData } from '../../../redux/DashBoard/DashBoardAction';
import { getInternalControlDataSelector } from '../../../redux/DashBoard/DashBoardSelectors';
import {
  getControlDataAction,
  getControlDataGcdAction,
} from '../../../redux/ControlData/ControlDataAction';
import { stringToArray, useQuery } from '../../../hooks/useQuery';

const Badge_apply = ({ data }) => {
  if (data.toUpperCase() === 'PASS') {
    return (
      <Badge color="green" size="lg" radius="lg" variant="outline">
        {data.toUpperCase()}
      </Badge>
    );
  }
  if (data.toUpperCase() === 'COMPLETE' || data === 'UNDER REVIEW') {
    return (
      <Badge color="green" size="lg" radius="lg" variant="outline">
        {data.toUpperCase()}
      </Badge>
    );
  }
  if (data.toUpperCase() === 'SUBMITED' || data === 'UNDER REVIEWS') {
    return (
      <Badge color="green" size="lg" radius="lg" variant="outline">
        {data.toUpperCase()}
      </Badge>
    );
  }
  if (data.toUpperCase() === 'FAIL') {
    return (
      <Badge color="red" size="lg" radius="lg" variant="outline">
        {data.toUpperCase()}
      </Badge>
    );
  }
  if (data.toUpperCase() === 'IN PROGRESS') {
    return (
      <Badge color="orange" size="lg" radius="lg" variant="outline">
        {data.toUpperCase()}
      </Badge>
    );
  }
  if (data.toUpperCase() === 'NOT STARTED' || data === 'UNDER REVIEW') {
    return (
      <Badge color="gray" size="lg" radius="lg" variant="outline">
        {data.toUpperCase()}
      </Badge>
    );
  }
  if (data.toUpperCase() === 'N/A' || data.toUpperCase() === 'NA') {
    return (
      <Badge color="gray" size="lg" radius="lg" variant="outline">
        {data.toUpperCase()}
      </Badge>
    );
  }
};

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
  const params = useQuery();
  const { instance, accounts, inProgress } = useMsal();
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableDataArray, setTableDataArray] = useState([]);

  function getCurrentAssessmentCycle() {
    const today = new Date();
    const todayDatetime = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (
      new Date(today.getFullYear(), 2, 1) <= todayDatetime &&
      todayDatetime <= new Date(today.getFullYear(), 4, 31)
    ) {
      return 'Assessment Cycle 1';
    } else if (
      new Date(today.getFullYear(), 5, 1) <= todayDatetime &&
      todayDatetime <= new Date(today.getFullYear(), 7, 31)
    ) {
      return 'Assessment Cycle 2';
    } else if (
      new Date(today.getFullYear(), 8, 1) <= todayDatetime &&
      todayDatetime <= new Date(today.getFullYear(), 10, 30)
    ) {
      return 'Assessment Cycle 3';
    } else {
      // For December 1 to February 28, and accounting for leap year (February 29)
      if (
        (new Date(today.getFullYear(), 11, 1) <= todayDatetime &&
          todayDatetime <= new Date(today.getFullYear(), 11, 31)) ||
        (new Date(today.getFullYear(), 0, 1) <= todayDatetime &&
          todayDatetime <= new Date(today.getFullYear(), 1, 28))
      ) {
        return 'Assessment Cycle 4';
      } else if (
        today.getFullYear() % 4 === 0 &&
        todayDatetime.toDateString() === new Date(today.getFullYear(), 1, 29).toDateString()
      ) {
        return 'Assessment Cycle 4';
      } else {
        return 'Invalid date';
      }
    }
  }

  //var currentMonth = new Date().getMonth() + 1;
  // Adding 1 because getMonth() returns zero-based month (0-11)
  const [yearValue, setYearValue] = useState(
    params?.filterYear
      ? stringToArray(params?.filterYear)
      : new Date().getMonth() + 1 === 1 || new Date().getMonth() + 1 === 2
      ? [String(new Date().getFullYear() - 1)]
      : [String(new Date().getFullYear())],
  );
  const [assessmentCycleValue, setAssessmentCycleValue] = useState(
    params?.filterCycle ? stringToArray(params?.filterCycle) : [getCurrentAssessmentCycle()],
  );

  const filterRef = useRef({
    yearValue,
    assessmentCycleValue,
    zoneValue,
    buValue,
    providerValue,
    receiverValue,
    controlIdValue,
    statusOfAssessmentValue,
  });

  useEffect(() => {
    //code for getting Internal Control Home Page table data

    if (yearValue.length > 0) {
      const payload = {
        assessmentCycle: assessmentCycleValue,
        year: yearValue,
      };
      dispatch(getInternalControlTableData(payload));
    } else {
      toast.error('Please select Year in filter.');
    }
  }, [assessmentCycleValue, yearValue, token]);

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
                onClick={() => {
                  const original = row.row.original;
                  const paramsSearch = new URLSearchParams();

                  // Add original values to paramss
                  paramsSearch.set('id', original.id);
                  paramsSearch.set('Provider', original.Provider);
                  paramsSearch.set('Receiver', original.Receiver);
                  paramsSearch.set('coOwner', original.Control_Owner);
                  paramsSearch.set('Control_Oversight', original.Control_Oversight);
                  paramsSearch.set('KPI_To', original.KPI_To);
                  paramsSearch.set('KPI_From', original.KPI_From);
                  paramsSearch.set('BU', original.BU);
                  paramsSearch.set('Year', original.Year);
                  paramsSearch.set('Assessment_Cycle', original.Assessment_Cycle);
                  paramsSearch.set('Question_Bank', original.Question_Bank);

                  // Add only the local state values if they exist
                  if (filterRef.current.yearValue?.length > 0)
                    paramsSearch.set('filterYear', filterRef.current.yearValue);
                  if (filterRef.current.assessmentCycleValue?.length > 0)
                    paramsSearch.set('filterCycle', filterRef.current.assessmentCycleValue);
                  if (filterRef.current.zoneValue?.length > 0)
                    paramsSearch.set('filterZone', filterRef.current.zoneValue);
                  if (filterRef.current.buValue?.length > 0)
                    paramsSearch.set('filterBU', filterRef.current.buValue);
                  if (filterRef.current.providerValue?.length > 0)
                    paramsSearch.set('filterProvider', filterRef.current.providerValue);

                  if (filterRef.current.receiverValue?.length > 0)
                    paramsSearch.set('filterReceiverOrg', filterRef.current.receiverValue);
                  if (filterRef.current.controlIdValue?.length > 0)
                    paramsSearch.set('filterControlId', filterRef.current.controlIdValue);
                  if (filterRef.current.statusOfAssessmentValue?.length > 0)
                    paramsSearch.set(
                      'filterStatusOfAssessment',
                      filterRef.current.statusOfAssessmentValue,
                    );

                  // Construct the final URL
                  const url = `/Assessments/${original.Control_ID}?${paramsSearch.toString()}`;

                  // Navigate to the new URL with the combined query parameters
                  history.push(url);
                }}
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
      accessorKey: 'Control_name',
      id: 'Control_name',
      header: 'Control Name',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
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
      accessorKey: 'assessment_submitted_by',
      id: 'assessment_submitted_by',
      header: 'Last Submitted By',
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    // Update or remove the year parameter
    if (yearValue) {
      params.set('filterYear', yearValue.toString());
    } else {
      params.delete('filterYear');
    }

    // Update or remove the assessment cycle parameter
    if (assessmentCycleValue?.length > 0) {
      params.set('filterCycle', assessmentCycleValue.toString());
    } else {
      params.delete('filterCycle');
    }

    // Update or remove the zone parameter
    if (zoneValue?.length > 0) {
      params.set('filterZone', zoneValue);
    } else {
      params.delete('filterZone');
    }

    // Update or remove the BU parameter
    if (buValue?.length > 0) {
      params.set('filterBU', buValue);
    } else {
      params.delete('filterBU');
    }

    // Update or remove the provider parameter
    if (providerValue?.length > 0) {
      params.set('filterProvider', providerValue);
    } else {
      params.delete('filterProvider');
    }

    // Update or remove the provider parameter
    if (receiverValue?.length > 0) {
      params.set('filterReceiverOrg', receiverValue);
    } else {
      params.delete('filterReceiverOrg');
    }
    // Update or remove the provider parameter
    if (controlIdValue?.length > 0) {
      params.set('filterControlId', controlIdValue);
    } else {
      params.delete('filterControlId');
    }
    // Update or remove the provider parameter
    if (statusOfAssessmentValue?.length > 0) {
      params.set('filterStatusOfAssessment', statusOfAssessmentValue);
    } else {
      params.delete('filterStatusOfAssessment');
    }

    filterRef.current = {
      yearValue,
      assessmentCycleValue,
      zoneValue,
      buValue,
      providerValue,
      receiverValue,
      controlIdValue,
      statusOfAssessmentValue,
    };

    history.replace({
      pathname: window.location.pathname,
      search: params.toString(),
    });
  }, [
    yearValue,
    assessmentCycleValue,
    zoneValue,
    buValue,
    providerValue,
    receiverValue,
    controlIdValue,
    statusOfAssessmentValue,
  ]);

  // Arrays for showing data on filters
  const Zone = getDashBoardDataState?.data?.map((i) => i.Zone);
  const BU = getDashBoardDataState?.data?.map((i) => i.BU);
  const Receiver = getDashBoardDataState?.data?.map((i) => i.Receiver);
  const Provider = getDashBoardDataState?.data?.map((i) => i.Provider);
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

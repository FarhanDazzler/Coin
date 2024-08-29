import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Group, MultiSelect } from '@mantine/core';
import { toast } from 'react-toastify';
import Table2 from '../../../../../components/UI/Table/Table2';
import TableLoader from '../../../../../components/UI/TableLoader';
import Button from '../../../../../components/UI/Button';
import NoDataPlaceholder from '../../../../../components/NoDataPlaceholder/NoDataPlaceholderForRepLetter';
import { getFunctionGlobalPersonaHomePageDataSelector } from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';
import { getFunctionGlobalPersonaHomePageData } from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
import { stringToArray, useQuery } from '../../../../../hooks/useQuery';
import ClearFilter from '../../../../../components/UI/ClearFilter';

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

const GlobalPersonaTable = ({
  zoneValue,
  setZoneValue,
  buValue,
  setBUValue,
  functionValue,
  setFunctionValue,
  handleResetState,
}) => {
  const [tableData, setTableData] = useState([]);
  const [tableDataArray, setTableDataArray] = useState([]);
  const token = Cookies.get('token');
  const params = useQuery();
  const history = useHistory();

  const { accounts } = useMsal();
  const dispatch = useDispatch();

  function getCurrentAssessmentCycle() {
    // Get the current date
    const today = new Date();
    const currentYear = today.getFullYear();

    // Check if the current date falls between February 1st and April 30th
    if (new Date(currentYear, 1, 1) <= today && today < new Date(currentYear, 4, 1)) {
      return 'Assessment Cycle 1';
    }
    // Check if the current date falls between May 1st and July 31st
    else if (new Date(currentYear, 4, 1) <= today && today < new Date(currentYear, 7, 1)) {
      return 'Assessment Cycle 2';
    }
    // Check if the current date falls between August 1st and October 31st
    else if (new Date(currentYear, 7, 1) <= today && today < new Date(currentYear, 10, 1)) {
      return 'Assessment Cycle 3';
    }
    // Check if the current date falls between November 1st and January 31st
    else if (new Date(currentYear, 10, 1) <= today || today < new Date(currentYear, 1, 1)) {
      // If the current month is January, return the previous year and Q4
      if (today.getMonth() == 0) {
        return 'Assessment Cycle 4';
      } else {
        return 'Assessment Cycle 4';
      }
    } else {
      return 'Invalid date';
    }
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

  const initialYear =
    new Date().getMonth() + 1 === 1 || new Date().getMonth() + 1 === 2
      ? [String(new Date().getFullYear() - 1)]
      : [String(new Date().getFullYear())];

  const [yearValue, setYearValue] = useState(
    params?.filterYear ? stringToArray(params?.filterYear) : initialYear,
  );
  const [assessmentCycleValue, setAssessmentCycleValue] = useState(
    params?.filterCycle ? stringToArray(params?.filterCycle) : [getCurrentAssessmentCycle()],
  );

  const handleClearState = () => {
    setYearValue(initialYear);
    setAssessmentCycleValue([getCurrentAssessmentCycle()]);
    if (handleResetState) handleResetState();
  };

  const filterRef = useRef({
    yearValue,
    assessmentCycleValue,
    zoneValue,
    buValue,
    functionValue,
  });

  const getGlobalPersonaHomePageData = useSelector(getFunctionGlobalPersonaHomePageDataSelector);

  //getGlobalPersonaHomePageData?.data[0]?.recipientData
  const recipientHomePageData = useMemo(() => {
    return getGlobalPersonaHomePageData?.data[0]?.home_page_table_global || [];
  }, [getGlobalPersonaHomePageData?.data[0]]);

  useEffect(() => {
    if (yearValue.length > 0) {
      const payload = {
        assessmentCycle: assessmentCycleValue,
        year: yearValue,
      };
      //toast.error('Please select year in filter.');
      //console.log('payload', payload);
      dispatch(getFunctionGlobalPersonaHomePageData(payload));
    } else {
      toast.error('Please select Year in filter.');
    }
  }, [assessmentCycleValue, yearValue, token, dispatch]);

  const TABLE_COLUMNS = [
    {
      accessorKey: 'Action',
      id: 'Action',
      header: 'Action',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 100,
      Cell: (row) => {
        return (
          <div>
            {row.row.original.Status === 'Completed' && (
              <Button
                className="mr-2"
                onClick={() => {
                  // Get the current search parameters from the URL
                  const currentSearchParams = new URLSearchParams(window.location.search);

                  // Build the new URL path
                  const newPath = `/REP-Letters/attempt-letter/functional-letter-form/${row.row.original.id}/review`;

                  // Redirect with the current search parameters appended
                  history.push(`${newPath}?${currentSearchParams.toString()}`);
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
      accessorKey: 'Function',
      id: 'Function',
      header: 'Function',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 150,
    },
    {
      accessorKey: 'BU',
      id: 'BU',
      header: 'BU / Entity / Plants',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 150,
    },
    {
      accessorKey: 'Status',
      id: 'Status',
      header: 'Status',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 170,
      Cell: (row) => {
        return <span className={'text-yellow-dark'}>{row.row.original.Status}</span>;
      },
    },
    {
      accessorKey: 'Recipient',
      id: 'Recipient',
      header: 'Recipient',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'Zone_Control',
      id: 'Zone_Control',
      header: 'Head of Zone Control',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
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
  ];

  useEffect(() => {
    setTableData(recipientHomePageData);
  }, [getGlobalPersonaHomePageData?.data[0], recipientHomePageData]);

  useEffect(() => {
    if (!tableData?.length) return setTableDataArray([]);
    if (!zoneValue?.length && !buValue?.length && !functionValue?.length) {
      return setTableDataArray(tableData);
    }
    const updatedData = tableData?.filter((i) => {
      return (
        (zoneValue?.length ? zoneValue.includes(i.Zone) : true) &&
        (buValue?.length ? buValue.includes(i.BU) : true) &&
        (functionValue?.length ? functionValue.includes(i.Function) : true)
      );
    });
    setTableDataArray(updatedData);
  }, [zoneValue, buValue, functionValue, tableData]);

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

    // Update or remove the functionValue parameter
    if (functionValue?.length > 0) {
      params.set('filterFunction', functionValue);
    } else {
      params.delete('filterFunction');
    }

    filterRef.current = {
      yearValue,
      assessmentCycleValue,
      zoneValue,
      buValue,
      functionValue,
    };

    history.replace({
      pathname: window.location.pathname,
      search: params.toString(),
    });
  }, [yearValue, assessmentCycleValue, zoneValue, buValue, functionValue]);

  return (
    <>
      <div className="container-fluid">
        {getGlobalPersonaHomePageData?.loading ? (
          <TableLoader className="mt-8" />
        ) : (
          <div className="row pt-5">
            <div className="col-12 col-lg-12">
              <div className="d-flex justify-content-between">
                <Group spacing="xs" className="actions-button-wrapper">
                  <FilterMultiSelect
                    data={getYearsData() || []}
                    label="Year"
                    value={yearValue}
                    onChange={setYearValue}
                  />
                  <FilterMultiSelect
                    data={[
                      { value: 'Assessment Cycle 1', label: 'Assessment Cycle 1' },
                      { value: 'Assessment Cycle 2', label: 'Assessment Cycle 2' },
                      { value: 'Assessment Cycle 3', label: 'Assessment Cycle 3' },
                      { value: 'Assessment Cycle 4', label: 'Assessment Cycle 4' },
                    ]}
                    label="Assessment Cycle"
                    value={assessmentCycleValue}
                    onChange={setAssessmentCycleValue}
                  />
                  <FilterMultiSelect
                    data={getGlobalPersonaHomePageData?.data[0]?.distinct_zone || []}
                    label="Zone"
                    value={zoneValue}
                    onChange={setZoneValue}
                  />
                  <FilterMultiSelect
                    data={getGlobalPersonaHomePageData?.data[0]?.distinct_bu || []}
                    label="BU / Entity"
                    value={buValue}
                    onChange={setBUValue}
                  />
                  <FilterMultiSelect
                    data={getGlobalPersonaHomePageData?.data[0]?.distinct_function || []}
                    label="Function"
                    value={functionValue}
                    onChange={setFunctionValue}
                  />
                </Group>
                <div className="d-flex align-items-end">
                  <ClearFilter onClick={handleClearState} />
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-12 mt-5">
              {tableDataArray?.length > 0 ? (
                <Table2
                  tableData={tableDataArray}
                  loading={getGlobalPersonaHomePageData.loading}
                  tableColumns={TABLE_COLUMNS}
                />
              ) : (
                <NoDataPlaceholder />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GlobalPersonaTable;

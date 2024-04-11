import React, { useEffect, useState, useMemo, useCallback } from 'react';
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
import { get_BUZone_GlobalPersonaHomePageDataSelector } from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';
import { get_BUZone_GlobalPersonaHomePageData } from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
import ShowSignaturesBU_Zone from '../../../../../components/ShowSignatures/ShowSignaturesBU_Zone';

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

const ZoneGlobalPersonaTable = ({ zoneValue, setZoneValue }) => {
  const [tableDataArray, setTableDataArray] = useState([]);
  const token = Cookies.get('token');

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

  const [yearValue, setYearValue] = useState(
    new Date().getMonth() + 1 === 1 || new Date().getMonth() + 1 === 2
      ? [String(new Date().getFullYear() - 1)]
      : [String(new Date().getFullYear())],
  );
  const [assessmentCycleValue, setAssessmentCycleValue] = useState([getCurrentAssessmentCycle()]);

  const history = useHistory();

  const { accounts } = useMsal();
  const dispatch = useDispatch();
  const getGlobalPersonaHomePageData = useSelector(get_BUZone_GlobalPersonaHomePageDataSelector);

  //getGlobalPersonaHomePageData?.data[0]?.recipientData
  const HomePageData = useMemo(() => {
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
      dispatch(get_BUZone_GlobalPersonaHomePageData(payload));
    } else {
      toast.error('Please select Year in filter.');
    }
  }, [yearValue, assessmentCycleValue, dispatch]);

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
            {['Prepared', 'Signed', 'Completed'].includes(row.row.original.Status) && (
              <Button
                className="mr-2"
                onClick={() => {
                  history.push(
                    `/REP-Letters/attempt-letter/Zone-letter-form/${row.row.original.id}/Review`,
                  );
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
      accessorKey: 'signatures',
      id: 'signatures',
      header: 'Signatures',
      flex: 1,
      cellClassName: 'dashboardCell',
      size: 170,
      Cell: (row) => {
        return <ShowSignaturesBU_Zone signatures={row.row.original?.signatures} />;
      },
    },
    {
      accessorKey: 'Disclosure_Processor',
      id: 'Disclosure_Processor',
      header: 'Local Internal Control',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'Zone_Control',
      id: 'Zone_Control',
      header: 'Zone Control',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'Zone_VP',
      id: 'Zone_VP',
      header: 'Zone VP',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'Excom_Member',
      id: 'Excom_Member',
      header: 'Excom Member',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'Zone_Legal_Representative',
      id: 'Zone_Legal_Representative',
      header: 'Zone Legal Representative',
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
    if (!HomePageData?.length) return setTableDataArray([]);
    if (!assessmentCycleValue?.length && !zoneValue?.length) {
      return setTableDataArray(HomePageData);
    }
    const updatedData = HomePageData?.filter((i) => {
      return (
        (assessmentCycleValue?.length ? assessmentCycleValue.includes(i.Assessment_Cycle) : true) &&
        (zoneValue?.length ? zoneValue.includes(i.Zone) : true)
      );
    });
    setTableDataArray(updatedData);
  }, [assessmentCycleValue, zoneValue, HomePageData]);
  return (
    <>
      <div className="container-fluid">
        {getGlobalPersonaHomePageData?.loading ? (
          <TableLoader className="mt-8" />
        ) : (
          <div className="row pt-5">
            <div className="col-12 col-lg-12">
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
              </Group>
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

export default ZoneGlobalPersonaTable;

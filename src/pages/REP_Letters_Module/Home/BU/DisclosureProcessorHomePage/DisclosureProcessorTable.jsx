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
import {
  get_BU_Disclosure_ProcessorHomePageDataSelector,
  addBUSubmitResponseSelector,
  addOrUpdateBUDraftResponseSelector,
  addBUSection3ResponseSelector,
  approveBUSection3ResponseSelector,
  addBUSection2CheckboxSelector,
  addBUSection2UploadMailApprovalSelector,
} from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';
import { get_BU_Disclosure_ProcessorHomePageData } from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
import ShowSignatures from '../../../../../components/ShowSignatures';
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

const DisclosureProcessorTable = ({
  zoneValue,
  setZoneValue,
  buValue,
  setBUValue,
  overallStatusValue,
  setOverallStatusValue,
  rbaStatusValue,
  setRbaStatusValue,
  handleResetState,
}) => {
  const [tableDataArray, setTableDataArray] = useState([]);
  const token = Cookies.get('token');
  const params = useQuery();
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
    overallStatusValue,
    rbaStatusValue,
  });

  const history = useHistory();

  const { accounts } = useMsal();
  const dispatch = useDispatch();

  const getDisclosureProcessorHomePageData = useSelector(
    get_BU_Disclosure_ProcessorHomePageDataSelector,
  );
  const addOrUpdateDraftResponseState = useSelector(addOrUpdateBUDraftResponseSelector);
  const addBUSubmitResponseState = useSelector(addBUSubmitResponseSelector);
  const addBUSection3ResponseState = useSelector(addBUSection3ResponseSelector);
  const approveBUSection3ResponseState = useSelector(approveBUSection3ResponseSelector);
  const addBUSection2UploadMailApprovalState = useSelector(addBUSection2UploadMailApprovalSelector);
  const addBUSection2CheckboxState = useSelector(addBUSection2CheckboxSelector);

  //getRecipientHomePageData?.data[0]?.recipientData
  const disclosureProcessorHomePageData = useMemo(() => {
    return getDisclosureProcessorHomePageData?.data[0]?.dpData || [];
  }, [getDisclosureProcessorHomePageData?.data[0]]);

  useEffect(() => {
    if (yearValue.length > 0) {
      const payload = {
        assessmentCycle: assessmentCycleValue,
        year: yearValue,
      };
      //toast.error('Please select year in filter.');
      //console.log('payload', payload);
      dispatch(get_BU_Disclosure_ProcessorHomePageData(payload));
    } else {
      toast.error('Please select Year in filter.');
    }
  }, [
    addOrUpdateDraftResponseState?.data,
    addBUSubmitResponseState?.data,
    addBUSection3ResponseState?.data,
    approveBUSection3ResponseState?.data,
    addBUSection2UploadMailApprovalState?.data,
    addBUSection2CheckboxState?.data,
    yearValue,
    assessmentCycleValue,
    dispatch,
  ]);

  // Function to check if RBA is accessible or not. If RBA is accessible, then only RBA button will be enabled.
  // RBA will be applicable on the 11th working day of the month of startDate.

  const isRBA_Accessible = (startDate) => {
    const today = new Date();
    const startDateObj = new Date(startDate);

    // Initialize the count of working days
    let workingDayCount = 0;

    // Start from the first day of the month
    let currentDay = new Date(startDateObj.getFullYear(), startDateObj.getMonth(), 1);

    // Loop through days of the month
    while (workingDayCount < 11) {
      const dayOfWeek = currentDay.getDay();

      // Increment working day count if it's a weekday (Monday to Friday)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        workingDayCount++;
      }

      // Move to the next day
      currentDay.setDate(currentDay.getDate() + 1);
    }

    // currentDay now holds the 11th working day of the month
    const rbaDate = currentDay;

    // Check if today's date is on or after the 11th working day of the month
    return today >= rbaDate;
  };

  const handleButtonRedirect = (urlString) => {
    const paramsSearch = new URLSearchParams();

    // Add only the local state values if they exist
    if (filterRef.current.yearValue?.length > 0)
      paramsSearch.set('filterYear', filterRef.current.yearValue);
    if (filterRef.current.assessmentCycleValue?.length > 0)
      paramsSearch.set('filterCycle', filterRef.current.assessmentCycleValue);
    if (filterRef.current.zoneValue?.length > 0)
      paramsSearch.set('filterZone', filterRef.current.zoneValue);
    if (filterRef.current.buValue?.length > 0)
      paramsSearch.set('filterBU', filterRef.current.buValue);
    if (filterRef.current.overallStatusValue?.length > 0)
      paramsSearch.set('filterOverallStatus', filterRef.current.overallStatusValue);
    if (filterRef.current.rbaStatusValue?.length > 0)
      paramsSearch.set('filterRbaStatus', filterRef.current.rbaStatusValue);

    // Construct the final URL
    const url = `${urlString}?${paramsSearch.toString()}`;

    // Navigate to the new URL with the combined query parameters
    history.push(url);
  };

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
            {['Approval Pending', 'Prepared', 'Signed', 'Completed'].includes(
              row.row.original.Status,
            ) && (
              <Button
                className="mr-2"
                onClick={() => {
                  handleButtonRedirect(
                    `/REP-Letters/attempt-letter/BU-letter-form/${row.row.original.id}/Review`,
                  );
                }}
              >
                Review
              </Button>
            )}
            {['Not Started', 'Drafted'].includes(row.row.original.Status) && (
              <Button
                className="mr-2"
                onClick={() => {
                  handleButtonRedirect(
                    `/REP-Letters/attempt-letter/BU-letter-form/${row.row.original.id}/attemptSection1`,
                  );
                }}
              >
                Letter
              </Button>
            )}
            {['Prepared', 'Approval Pending'].includes(row.row.original.Status) && (
              <Button
                className="mr-2"
                onClick={() => {
                  handleButtonRedirect(
                    `/REP-Letters/attempt-letter/BU-letter-form/${row.row.original.id}/attemptSection2`,
                  );
                }}
              >
                Signature
              </Button>
            )}
            {isRBA_Accessible(row.row.original.Start_Date) &&
              ['Prepared', 'Signed', 'Approval Pending'].includes(row.row.original.Status) &&
              ['Not Started'].includes(row.row.original.RBA_Status) && (
                <Button
                  className="mr-2"
                  onClick={() => {
                    handleButtonRedirect(
                      `/REP-Letters/attempt-letter/BU-letter-form/${row.row.original.id}/attemptSection3`,
                    );
                  }}
                >
                  RBA
                </Button>
              )}
          </div>
        );
      },
    },
    {
      accessorKey: 'Letter_Type',
      id: 'Letter_Type',
      header: 'Letter Type',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
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
      accessorKey: 'BU',
      id: 'BU',
      header: 'BU',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 150,
    },
    {
      accessorKey: 'Status',
      id: 'Status',
      header: 'Overall Status',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 170,
      Cell: (row) => {
        return <span className={'text-yellow-dark'}>{row.row.original.Status}</span>;
      },
    },
    {
      accessorKey: 'RBA_Status',
      id: 'RBA_Status',
      header: 'RBA Status',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 170,
      Cell: (row) => {
        return <span className={'text-yellow-dark'}>{row.row.original.RBA_Status}</span>;
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
        return <ShowSignatures signatures={row.row.original?.signatures} />;
      },
    },
    {
      accessorKey: 'Disclosure_Processor',
      id: 'Disclosure_Processor',
      header: 'Processor',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'Finance_Director',
      id: 'Finance_Director',
      header: 'Head of BU Control',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'BU_Head',
      id: 'BU_Head',
      header: 'BU Head',
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
      accessorKey: 'Zone_VP',
      id: 'Zone_VP',
      header: 'Zone VP Finance',
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
    if (!disclosureProcessorHomePageData?.length) return setTableDataArray([]);
    if (
      !assessmentCycleValue?.length &&
      !zoneValue?.length &&
      !buValue?.length &&
      !rbaStatusValue?.length &&
      !overallStatusValue.length
    ) {
      return setTableDataArray(disclosureProcessorHomePageData);
    }
    const updatedData = disclosureProcessorHomePageData?.filter((i) => {
      return (
        (assessmentCycleValue?.length ? assessmentCycleValue.includes(i.Assessment_Cycle) : true) &&
        (zoneValue?.length ? zoneValue.includes(i.Zone) : true) &&
        (overallStatusValue?.length ? overallStatusValue.includes(i.Status) : true) &&
        (rbaStatusValue?.length ? rbaStatusValue.includes(i.RBA_Status) : true) &&
        (buValue?.length ? buValue.includes(i.BU) : true)
      );
    });
    setTableDataArray(updatedData);
  }, [
    assessmentCycleValue,
    zoneValue,
    buValue,
    disclosureProcessorHomePageData,
    overallStatusValue,
    rbaStatusValue,
  ]);

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
    if (overallStatusValue?.length > 0) {
      params.set('filterOverallStatus', overallStatusValue);
    } else {
      params.delete('filterOverallStatus');
    }

    // Update or remove the provider parameter
    if (rbaStatusValue?.length > 0) {
      params.set('filterRbaStatus', rbaStatusValue);
    } else {
      params.delete('filterRbaStatus');
    }

    filterRef.current = {
      yearValue,
      assessmentCycleValue,
      zoneValue,
      buValue,
      overallStatusValue,
      rbaStatusValue,
    };

    history.replace({
      pathname: window.location.pathname,
      search: params.toString(),
    });
  }, [yearValue, assessmentCycleValue, zoneValue, buValue, overallStatusValue, rbaStatusValue]);

  const isClearButtonDisabled = useMemo(() => {
    const paramsKeyLength = Object.keys(params).length;
    if (paramsKeyLength === 2) {
      if (
        params.filterYear === initialYear[0] &&
        params.filterCycle === getCurrentAssessmentCycle()
      ) {
        return true;
      }
    }
    return false;
  }, [params]);

  return (
    <>
      <div className="container-fluid">
        {getDisclosureProcessorHomePageData?.loading ? (
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
                    data={getDisclosureProcessorHomePageData?.data[0]?.distinct_zone || []}
                    label="Zone"
                    value={zoneValue}
                    onChange={setZoneValue}
                  />
                  <FilterMultiSelect
                    data={getDisclosureProcessorHomePageData?.data[0]?.distinct_bu || []}
                    label="BU"
                    value={buValue}
                    onChange={setBUValue}
                  />

                  <FilterMultiSelect
                    data={[
                      'Not Started',
                      'Drafted',
                      'Approval Pending',
                      'Prepared',
                      'Signed',
                      'Completed',
                    ]}
                    label="Overall Status"
                    value={overallStatusValue}
                    onChange={setOverallStatusValue}
                  />

                  <FilterMultiSelect
                    data={['Not Started', 'Pending RBA Approval', 'RBA Approved']}
                    label="RBA Status"
                    value={rbaStatusValue}
                    onChange={setRbaStatusValue}
                  />
                </Group>

                <div className="d-flex align-items-end">
                  <ClearFilter
                    onClick={handleClearState}
                    isClearButtonDisabled={isClearButtonDisabled}
                  />
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-12 mt-5 LocalInternalControlTable">
              <Table2
                tableData={tableDataArray}
                loading={getDisclosureProcessorHomePageData.loading}
                tableColumns={TABLE_COLUMNS}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DisclosureProcessorTable;

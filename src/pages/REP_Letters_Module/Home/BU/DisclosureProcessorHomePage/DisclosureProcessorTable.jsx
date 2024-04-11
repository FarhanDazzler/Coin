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

const DisclosureProcessorTable = ({ zoneValue, setZoneValue, buValue, setBUValue }) => {
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
  // RBA will be applicable on work day 11 from the start date of the assessment cycle.
  const isRBA_Accessible = (startDate) => {
    const today = new Date();
    const startDateObj = new Date(startDate);
    const diffTime = Math.abs(today - startDateObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 11;
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
            {row.row.original.Status === 'Completed' && (
              <Button
                className="mr-2"
                onClick={() => {
                  history.push(
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
                  history.push(
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
                  history.push(
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
                    history.push(
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
      header: 'Local Internal Control',
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
      accessorKey: 'Finance_Director',
      id: 'Finance_Director',
      header: 'Finance Director',
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
    if (!assessmentCycleValue?.length && !zoneValue?.length && !buValue?.length) {
      return setTableDataArray(disclosureProcessorHomePageData);
    }
    const updatedData = disclosureProcessorHomePageData?.filter((i) => {
      return (
        (assessmentCycleValue?.length ? assessmentCycleValue.includes(i.Assessment_Cycle) : true) &&
        (zoneValue?.length ? zoneValue.includes(i.Zone) : true) &&
        (buValue?.length ? buValue.includes(i.BU) : true)
      );
    });
    setTableDataArray(updatedData);
  }, [assessmentCycleValue, zoneValue, buValue, disclosureProcessorHomePageData]);
  return (
    <>
      <div className="container-fluid">
        {getDisclosureProcessorHomePageData?.loading ? (
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
              </Group>
            </div>

            <div className="col-12 col-lg-12 mt-5">
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

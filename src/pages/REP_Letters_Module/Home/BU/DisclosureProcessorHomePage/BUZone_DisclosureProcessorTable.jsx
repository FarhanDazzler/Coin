import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { Group, MultiSelect } from '@mantine/core';
import Table2 from '../../../../../components/UI/Table/Table2';
import TableLoader from '../../../../../components/UI/TableLoader';
import Button from '../../../../../components/UI/Button';
import {
  get_BUZone_Disclosure_ProcessorHomePageDataSelector,
  addBUZoneSubmitResponseSelector,
  addOrUpdateBUZoneDraftResponseSelector,
  addBUZoneSection2CheckboxSelector,
  addBUZoneSection2UploadMailApprovalSelector,
} from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';
import { get_BUZone_Disclosure_ProcessorHomePageData } from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
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

const BUZone_DisclosureProcessorTable = ({
  assessmentCycleValue,
  setAssessmentCycleValue,
  zoneValue,
  setZoneValue,
}) => {
  const [tableDataArray, setTableDataArray] = useState([]);
  const token = Cookies.get('token');

  const history = useHistory();

  const { accounts } = useMsal();
  const dispatch = useDispatch();

  const getDisclosureProcessorHomePageData = useSelector(
    get_BUZone_Disclosure_ProcessorHomePageDataSelector,
  );
  const addOrUpdateBUZoneDraftResponseState = useSelector(addOrUpdateBUZoneDraftResponseSelector);
  const addBUZoneSubmitResponseState = useSelector(addBUZoneSubmitResponseSelector);
  const addBUZoneSection2UploadMailApprovalState = useSelector(
    addBUZoneSection2UploadMailApprovalSelector,
  );
  const addBUZoneSection2CheckboxState = useSelector(addBUZoneSection2CheckboxSelector);

  //getRecipientHomePageData?.data[0]?.recipientData
  const disclosureProcessorHomePageData = useMemo(() => {
    return getDisclosureProcessorHomePageData?.data[0]?.disclosureProcessorData || [];
  }, [getDisclosureProcessorHomePageData?.data[0]]);

  useEffect(() => {
    dispatch(get_BUZone_Disclosure_ProcessorHomePageData());
  }, [
    addOrUpdateBUZoneDraftResponseState?.data,
    addBUZoneSubmitResponseState?.data,
    addBUZoneSection2UploadMailApprovalState?.data,
    addBUZoneSection2CheckboxState?.data,
  ]);

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
                  const data = {
                    scopeData: row.row.original,
                    modalType: 'Review',
                    letterType: row.row.original.Letter_Type === 'BU Letter' ? 'BU' : 'Zone',
                  };
                  history.push('/REP-Letters/attempt-letter/Zone-letter-form', { data });
                }}
              >
                Review
              </Button>
            )}
            {['Not Started', 'Drafted'].includes(row.row.original.Status) && (
              <Button
                className="mr-2"
                onClick={() => {
                  const data = {
                    scopeData: row.row.original,
                    modalType: 'attemptSection1',
                    letterType: row.row.original.Letter_Type === 'BU Letter' ? 'BU' : 'Zone',
                  };
                  history.push('/REP-Letters/attempt-letter/Zone-letter-form', { data });
                }}
              >
                Letter
              </Button>
            )}
            {['Prepared', 'Approval Pending'].includes(row.row.original.Status) && (
              <Button
                className="mr-2"
                onClick={() => {
                  const data = {
                    scopeData: row.row.original,
                    modalType: 'attemptSection2',
                    letterType: row.row.original.Letter_Type === 'BU Letter' ? 'BU' : 'Zone',
                  };
                  history.push('/REP-Letters/attempt-letter/Zone-letter-form', { data });
                }}
              >
                Signature
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
    if (!assessmentCycleValue?.length && !zoneValue?.length) {
      return setTableDataArray(disclosureProcessorHomePageData);
    }
    const updatedData = disclosureProcessorHomePageData?.filter((i) => {
      return (
        (assessmentCycleValue?.length ? assessmentCycleValue.includes(i.Assessment_Cycle) : true) &&
        (zoneValue?.length ? zoneValue.includes(i.Zone) : true)
      );
    });
    setTableDataArray(updatedData);
  }, [assessmentCycleValue, zoneValue, disclosureProcessorHomePageData]);
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
                  data={getDisclosureProcessorHomePageData?.data[0]?.distinct_zone || []}
                  label="Zone"
                  value={zoneValue}
                  onChange={setZoneValue}
                />
                <FilterMultiSelect
                  data={getDisclosureProcessorHomePageData?.data[0]?.distinct_assesment_cycle || []}
                  label="Assessment Cycle"
                  value={assessmentCycleValue}
                  onChange={setAssessmentCycleValue}
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

export default BUZone_DisclosureProcessorTable;

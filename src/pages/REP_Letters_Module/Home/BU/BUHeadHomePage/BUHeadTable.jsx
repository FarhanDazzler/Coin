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
  get_BU_BU_HeadHomePageDataSelector,
  addBUSection2CheckboxSelector,
  addBUSection2UploadMailApprovalSelector,
} from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';
import { get_BU_BU_HeadHomePageData } from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
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

const DisclosureProcessorTable = ({
  assessmentCycleValue,
  setAssessmentCycleValue,
  zoneValue,
  setZoneValue,
  buValue,
  setBUValue,
}) => {
  const [tableData, setTableData] = useState([]);
  const [tableDataArray, setTableDataArray] = useState([]);
  const token = Cookies.get('token');

  const history = useHistory();

  const { accounts } = useMsal();
  const dispatch = useDispatch();

  const getHomePageData = useSelector(get_BU_BU_HeadHomePageDataSelector);
  const addBUSection2UploadMailApprovalState = useSelector(addBUSection2UploadMailApprovalSelector);
  const addBUSection2CheckboxState = useSelector(addBUSection2CheckboxSelector);

  //getRecipientHomePageData?.data[0]?.recipientData
  const HomePageData = useMemo(() => {
    return getHomePageData?.data[0]?.buHeadData || [];
  }, [getHomePageData?.data[0]]);

  useEffect(() => {
    dispatch(get_BU_BU_HeadHomePageData());
  }, [addBUSection2UploadMailApprovalState?.data, addBUSection2CheckboxState?.data]);

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
                  history.push('/REP-Letters/attempt-letter/BU-letter-form', { data });
                }}
              >
                Review
              </Button>
            )}
            {['Responded', 'Approval Pending'].includes(row.row.original.Status) &&
              row.row.original?.signatures?.buh_signed === false && (
                <Button
                  className="mr-2"
                  onClick={() => {
                    const data = {
                      scopeData: row.row.original,
                      modalType: 'attemptSection2',
                      letterType: row.row.original.Letter_Type === 'BU Letter' ? 'BU' : 'Zone',
                    };
                    history.push('/REP-Letters/attempt-letter/BU-letter-form', { data });
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
      header: 'Over All Status',
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
      header: 'Disclosure Processor',
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
    setTableData(HomePageData);
  }, [getHomePageData?.data[0], HomePageData]);

  useEffect(() => {
    if (!tableData?.length) return setTableDataArray([]);
    if (!assessmentCycleValue?.length && !zoneValue?.length && !buValue?.length) {
      return setTableDataArray(tableData);
    }
    const updatedData = tableData?.filter((i) => {
      return (
        (assessmentCycleValue?.length ? assessmentCycleValue.includes(i.Assessment_Cycle) : true) &&
        (zoneValue?.length ? zoneValue.includes(i.Zone) : true) &&
        (buValue?.length ? buValue.includes(i.BU) : true)
      );
    });
    setTableDataArray(updatedData);
  }, [assessmentCycleValue, zoneValue, buValue, tableData]);
  return (
    <>
      <div className="container-fluid">
        {getHomePageData?.loading ? (
          <TableLoader className="mt-8" />
        ) : (
          <div className="row pt-5">
            <div className="col-12 col-lg-12">
              <Group spacing="xs" className="actions-button-wrapper">
                <FilterMultiSelect
                  data={getHomePageData?.data[0]?.distinct_zone || []}
                  label="Zone"
                  value={zoneValue}
                  onChange={setZoneValue}
                />
                <FilterMultiSelect
                  data={getHomePageData?.data[0]?.distinct_bu || []}
                  label="BU"
                  value={buValue}
                  onChange={setBUValue}
                />
                <FilterMultiSelect
                  data={getHomePageData?.data[0]?.distinct_assesment_cycle || []}
                  label="Assessment Cycle"
                  value={assessmentCycleValue}
                  onChange={setAssessmentCycleValue}
                />
              </Group>
            </div>

            <div className="col-12 col-lg-12 mt-5">
              <Table2
                tableData={tableDataArray}
                loading={getHomePageData.loading}
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

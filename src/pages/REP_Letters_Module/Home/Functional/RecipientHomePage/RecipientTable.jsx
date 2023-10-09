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
  getFunctionRecipientHomePageDataSelector,
  addFunctionSubmitResponseSelector,
  addOrUpdateFunctionDraftResponseSelector,
} from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';
import { getFunctionRecipientHomePageData } from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';

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

const RecipientTable = ({
  assessmentCycleValue,
  setAssessmentCycleValue,
  zoneValue,
  setZoneValue,
  buValue,
  setBUValue,
  functionValue,
  setFunctionValue,
}) => {
  const [tableDataArray, setTableDataArray] = useState([]);
  const token = Cookies.get('token');

  const history = useHistory();

  const { accounts } = useMsal();
  const dispatch = useDispatch();

  const getRecipientHomePageData = useSelector(getFunctionRecipientHomePageDataSelector);
  const addOrUpdateDraftResponseState = useSelector(addOrUpdateFunctionDraftResponseSelector);
  const addFunctionSubmitResponseState = useSelector(addFunctionSubmitResponseSelector);

  //getRecipientHomePageData?.data[0]?.recipientData
  const tableData = useMemo(() => {
    return getRecipientHomePageData?.data[0]?.recipientData || [];
  }, [getRecipientHomePageData?.data[0]]);

  useEffect(() => {
    dispatch(getFunctionRecipientHomePageData());
  }, [token, addOrUpdateDraftResponseState?.data, addFunctionSubmitResponseState?.data]);

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
                    modalType: 'review',
                  };
                  history.push('/REP-Letters/attempt-letter/functional-letter-form', { data });
                }}
              >
                Review
              </Button>
            )}
            {['Not started', 'Drafted'].includes(row.row.original.Status) && (
              <Button
                onClick={() => {
                  const data = {
                    scopeData: row.row.original,
                    modalType: 'attempt',
                  };
                  history.push('/REP-Letters/attempt-letter/functional-letter-form', { data });
                }}
              >
                Letter
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
      header: 'Zone Control',
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
    if (!tableData?.length) return setTableDataArray([]);
    if (
      !assessmentCycleValue?.length &&
      !zoneValue?.length &&
      !buValue?.length &&
      !functionValue?.length
    ) {
      return setTableDataArray(tableData);
    }
    const updatedData = tableData?.filter((i) => {
      return (
        (assessmentCycleValue?.length ? assessmentCycleValue.includes(i.Assessment_Cycle) : true) &&
        (zoneValue?.length ? zoneValue.includes(i.Zone) : true) &&
        (buValue?.length ? buValue.includes(i.BU) : true) &&
        (functionValue?.length ? functionValue.includes(i.Function) : true)
      );
    });
    setTableDataArray(updatedData);
  }, [assessmentCycleValue, zoneValue, buValue, functionValue, tableData]);
  return (
    <>
      <div className="container-fluid">
        {getRecipientHomePageData?.loading ? (
          <TableLoader className="mt-8" />
        ) : (
          <div className="row pt-5">
            <div className="col-12 col-lg-12">
              <Group spacing="xs" className="actions-button-wrapper">
                <FilterMultiSelect
                  data={getRecipientHomePageData?.data[0]?.distinct_zone || []}
                  label="Zone"
                  value={zoneValue}
                  onChange={setZoneValue}
                />
                <FilterMultiSelect
                  data={getRecipientHomePageData?.data[0]?.distinct_bu || []}
                  label="BU / Entity"
                  value={buValue}
                  onChange={setBUValue}
                />
                <FilterMultiSelect
                  data={getRecipientHomePageData?.data[0]?.distinct_function || []}
                  label="Function"
                  value={functionValue}
                  onChange={setFunctionValue}
                />
                <FilterMultiSelect
                  data={getRecipientHomePageData?.data[0]?.distinct_assesment_cycle || []}
                  label="Assessment Cycle"
                  value={assessmentCycleValue}
                  onChange={setAssessmentCycleValue}
                />
              </Group>
            </div>

            <div className="col-12 col-lg-12 mt-5">
              <Table2
                tableData={tableDataArray}
                loading={getRecipientHomePageData.loading}
                tableColumns={TABLE_COLUMNS}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RecipientTable;

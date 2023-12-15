import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMsal } from '@azure/msal-react';
import { Group } from '@mantine/core';
import NoDataPlaceholder from '../../../../components/NoDataPlaceholder';
import { getInternalControlTableData } from '../../../../redux/DashBoard/DashBoardAction';
import { getInternalControlDataSelector } from '../../../../redux/DashBoard/DashBoardSelectors';
import { class_to_apply } from '../../V2/InternalControlHomePage/HomePageTable/constant';
import FilterButtons from '../../../../components/FilterButtons';
import Button from '../../../../components/UI/Button';
import {
  getControlDataAction,
  getControlDataGcdAction,
} from '../../../../redux/ControlData/ControlDataAction';
import Table2 from '../../../../components/UI/Table/Table2';
import Cookies from 'js-cookie';
//TODO:Replace with new desgine
// Filter buttons

const InternalControlTable = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = Cookies.get('token');

  const { instance, accounts, inProgress } = useMsal();
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableDataArray, setTableDataArray] = useState([]);
  const [editTableIndex, setEditTableIndex] = useState([]);
  const [editTableData, setEditTableData] = useState();

  // multi choice user input State for filters button
  const [yearValue, setYearValue] = useState([]);
  const [assessmentCycleValue, setAssessmentCycleValue] = useState([]);
  const [zoneValue, setZoneValue] = useState([]);
  const [buValue, setBUValue] = useState([]);
  const [receiverValue, setReceiverValue] = useState([]);
  const [providerValue, setProviderValue] = useState([]);

  useEffect(() => {
    //code for getting Internal Control Home Page table data
    dispatch(
      getInternalControlTableData({
        email: accounts[0]?.username,
      }),
    );
  }, [token]);

  const handleControlIDClick = (id) => {
    //TODO: modal redirect
    let payload = {
      controlId: id,
      coOwner: accounts.length > 0 ? accounts[0].username : '',
    };
    let gcdPayload = {
      controlId: id,
    };
    dispatch(getControlDataAction(payload));
    console.log('@@@@ ->71');
    dispatch(getControlDataGcdAction(gcdPayload));
    history.push(`${history.location.pathname}?Control_ID=${id}`);
  };

  const getDashBoardDataState = useSelector(getInternalControlDataSelector);

  useEffect(() => {
    if (
      !yearValue.length &&
      !assessmentCycleValue.length &&
      !zoneValue.length &&
      !buValue.length &&
      !receiverValue.length &&
      !providerValue.length
    ) {
      return setTableData(tableDataArray);
    }
    const updateData = tableDataArray.filter((i) => {
      return (
        (yearValue?.length ? yearValue.includes(i.Year) : true) &&
        (assessmentCycleValue?.length ? assessmentCycleValue.includes(i.Assessment_Cycle) : true) &&
        (zoneValue?.length ? zoneValue.includes(i.Zone) : true) &&
        (buValue?.length ? buValue.includes(i.BU) : true) &&
        (receiverValue?.length ? receiverValue.includes(i.Receiver) : true) &&
        (providerValue?.length ? providerValue.includes(i.Provider) : true)
      );
    });
    setTableData(updateData);
  }, [yearValue, assessmentCycleValue, zoneValue, buValue, receiverValue, providerValue]);

  const TABLE_COLUMNS = [
    {
      accessorKey: 'Action',
      header: 'Action',
      id: 'Action',
      columnDefType: 'data',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 120,
      Cell: (row) => {
        return (
          <div>
            {row.row.original.Status === 'Completed' && (
              <Button onClick={() => handleControlIDClick(row.row.original.Control_ID)}>
                Review
              </Button>
            )}
            {/* {['Not started', 'Re-assessed'].includes(row.row.original.Status) && (
              <Button onClick={() => handleControlIDClick(row.row.original.Control_ID)}>
                Attempt response
              </Button>
            )} */}
          </div>
        );
      },
    },
    {
      accessorKey: 'Zone',
      header: 'Zone',
      id: 'Zone',
      columnDefType: 'data',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 90,
    },
    {
      accessorKey: 'Receiver',
      header: 'Receiver Organization',
      id: 'Receiver_Organization',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      accessorKey: 'Provider',
      header: 'Provider Organization',
      id: 'Provider_Organization',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      accessorKey: 'Control_ID',
      header: 'Control ID',
      id: 'Control_ID',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      minWidth: 140,
      Cell: (row) => {
        return (
          <span
            className={'text-yellow cursor-pointer'}
            onClick={() => handleControlIDClick(row.row.original.Control_ID)}
          >
            {row.row.original.Control_ID}
          </span>
        );
      },
    },

    {
      accessorKey: 'Status',
      header: 'Status',
      id: 'Status',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      minWidth: 120,
      Cell: (row) => {
        return <span className={'text-yellow-dark'}>{row.row.original.Status}</span>;
      },
    },
    {
      accessorKey: 'KPI_Result',
      header: 'KPI Result',
      id: 'KPI_Result',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      minWidth: 100,
      Cell: (row) => {
        return (
          <span className={class_to_apply(row.row.original.KPI_Result)}>
            {row.row.original.KPI_Result}
          </span>
        );
      },
    },
    {
      accessorKey: 'Assessment_Result',
      header: 'Assessment Result',
      id: 'Assessment_Result',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      minWidth: 150,
      Cell: (row) => {
        return (
          <span className={class_to_apply(row.row.original.Assessment_Result)}>
            {row.row.original.Assessment_Result}
          </span>
        );
      },
    },
    {
      accessorKey: 'Compliance_Result',
      header: 'Compliance Result',
      id: 'Compliance_Result',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      minWidth: 150,
      Cell: (row) => {
        return (
          <span className={class_to_apply(row.row.original.Compliance_Result)}>
            {row.row.original.Compliance_Result}
          </span>
        );
      },
    },
    {
      accessorKey: 'Control_Owner',
      id: 'Control_Owner',
      header: 'Control Owner',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      accessorKey: 'Control_Oversight',
      id: 'Control_Oversight',
      header: 'Control Oversight',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      accessorKey: 'Assessment_Cycle',
      id: 'Assessment_Cycle',
      header: 'Assessment Cycle',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      minWidth: 150,
    },
    {
      accessorKey: 'Year',
      id: 'Year',
      header: 'Year',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      minWidth: 100,
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    const updatedData = getDashBoardDataState?.data?.map((i, index) => {
      return {
        id: i.id,
        ...i,
      };
    });
    setTableData(updatedData);
    setTableDataArray(updatedData);
  }, [getDashBoardDataState?.data]);

  // Function to remove duplicate value from array
  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  // Arrays for showing data on filters
  const Zone = getDashBoardDataState?.data?.map((i) => i.Zone);
  const BU = getDashBoardDataState?.data?.map((i) => i.BU);
  const Receiver = getDashBoardDataState?.data?.map((i) => i.Receiver);
  const Provider = getDashBoardDataState?.data?.map((i) => i.Provider);
  const year = getDashBoardDataState?.data?.map((i) => i.Year);
  const assessment_Cycle = getDashBoardDataState?.data?.map((i) => i.Assessment_Cycle);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col col-lg-12">
            <div className="container-fluid mt-5">
              <div className="row">
                <div className="col col-lg-12">
                  <Group spacing="xs" className="actions-button-wrapper">
                    <FilterButtons
                      year={removeDuplicates(year)}
                      assessment_Cycle={removeDuplicates(assessment_Cycle)}
                      Zone={removeDuplicates(Zone)}
                      BU={removeDuplicates(BU)}
                      Receiver={removeDuplicates(Receiver)}
                      Provider={removeDuplicates(Provider)}
                      yearValue={yearValue}
                      assessmentCycleValue={assessmentCycleValue}
                      zoneValue={zoneValue}
                      buValue={buValue}
                      receiverValue={receiverValue}
                      providerValue={providerValue}
                      setYearValue={setYearValue}
                      setAssessmentCycleValue={setAssessmentCycleValue}
                      setZoneValue={setZoneValue}
                      setBUValue={setBUValue}
                      setReceiverValue={setReceiverValue}
                      setProviderValue={setProviderValue}
                    />
                  </Group>
                </div>
              </div>
            </div>
            <div className="container-fluid mt-5">
              <div className="row">
                {tableData?.length > 0 || getDashBoardDataState.loading ? (
                  <Table2
                    tableData={tableData}
                    tableColumns={tableColumns}
                    columns={tableColumns}
                    loading={getDashBoardDataState.loading}
                    setEditTableIndex={setEditTableIndex}
                  />
                ) : (
                  <NoDataPlaceholder />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InternalControlTable;

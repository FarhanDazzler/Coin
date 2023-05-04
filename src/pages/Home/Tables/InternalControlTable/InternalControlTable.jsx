import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMsal } from '@azure/msal-react';
import { MultiSelect } from '@mantine/core';
import { Group } from '@mantine/core';
import Table from '../../../../components/UI/Table';
import NoDataPlaceholder from '../../../../components/NoDataPlaceholder';
import { getInternalControlTableData } from '../../../../redux/DashBoard/DashBoardAction';
import { getInternalControlDataSelector } from '../../../../redux/DashBoard/DashBoardSelectors';
import TableLoader from '../../../../components/UI/TableLoader';
import { class_to_apply } from '../../V2/InternalControlHomePage/HomePageTable/constant';
import FilterButtons from '../../../../components/FilterButtons';
import Button from '../../../../components/UI/Button';
import {
  getControlDataAction,
  getControlDataGcdAction,
} from '../../../../redux/ControlData/ControlDataAction';

// Filter buttons

const InternalControlTable = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
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
  }, []);

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
      field: 'Action',
      headerName: 'Action',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 270,
      renderCell: (row) => {
        return (
          <div>
            {row.row.Status === 'Completed' && (
              <Button className="mr-2" onClick={() => handleControlIDClick(row.row.Control_ID)}>
                ReView Assessment
              </Button>
            )}
            {/* {['Not started', 'Re-assessed'].includes(row.row.Status) && (
              <Button onClick={() => handleControlIDClick(row.row.Control_ID)}>
                Attempt response
              </Button>
            )} */}
          </div>
        );
      },
    },
    {
      field: 'Zone',
      headerName: 'Zone',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 180,
    },
    {
      field: 'Receiver',
      headerName: 'Receiver Organization',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Provider',
      headerName: 'Provider Organization',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Control_ID',
      headerName: 'Control ID',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 120,
      renderCell: (row) => {
        return (
          <span
            className={'text-yellow cursor-pointer'}
            onClick={() => handleControlIDClick(row.row.Control_ID)}
          >
            {row.row.Control_ID}
          </span>
        );
      },
    },

    {
      field: 'Status',
      headerName: 'Status',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 120,
      renderCell: (row) => {
        return <span className={'text-yellow-dark'}>{row.row.Status}</span>;
      },
    },
    {
      field: 'KPI_Result',
      headerName: 'KPI Result',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 100,
      renderCell: (row) => {
        return <span className={class_to_apply(row.row.KPI_Result)}>{row.row.KPI_Result}</span>;
      },
    },
    {
      field: 'Assessment_Result',
      headerName: 'Assessment Result',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 100,
      renderCell: (row) => {
        return (
          <span className={class_to_apply(row.row.Assessment_Result)}>
            {row.row.Assessment_Result}
          </span>
        );
      },
    },
    {
      field: 'Compliance_Result',
      headerName: 'Compliance Result',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 100,
      renderCell: (row) => {
        return (
          <span className={class_to_apply(row.row.Compliance_Result)}>
            {row.row.Compliance_Result}
          </span>
        );
      },
    },
    {
      field: 'Control_Owner',
      headerName: 'Control Owner',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Control_Oversight',
      headerName: 'Control Oversight',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Assessment_Cycle',
      headerName: 'Assessment Cycle',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 120,
    },
    {
      field: 'Year',
      headerName: 'Year',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 120,
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
      <div className="container">
        <div className="row">
          <div className="col col-lg-12">
            <div className="container mt-5">
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
            <div className="container mt-5">
              {getDashBoardDataState.loading ? (
                <TableLoader className="mt-8" />
              ) : (
                <div className="row">
                  {tableData?.length > 0 ? (
                    <Table
                      tableData={tableData}
                      tableColumns={tableColumns}
                      columns={tableColumns}
                      setEditTableIndex={setEditTableIndex}
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

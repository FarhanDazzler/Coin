import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import {
  getControlDataGcdAction,
  getControlDataAction,
} from '../../../../redux/ControlData/ControlDataAction';
import { class_to_apply } from '../../V2/InternalControlHomePage/HomePageTable/constant';
import Table from '../../../../components/UI/Table';
import { getControlOwnerTableData } from '../../../../redux/DashBoard/DashBoardAction';
import { getControlOwnerDataSelector } from '../../../../redux/DashBoard/DashBoardSelectors';
import TableLoader from '../../../../components/UI/TableLoader';
import Button from '../../../../components/UI/Button';
import { Group } from '@mantine/core';
import FilterButtons from '../../../../components/FilterButtons';
import Cookies from 'js-cookie';
const ControlOwnerTable = ({ tableName }) => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableDataArray, setTableDataArray] = useState([]);
  const token=Cookies.get('token')

  const history = useHistory();
 
  const { accounts } = useMsal();
  const dispatch = useDispatch();
  const userRole = localStorage.getItem('selected_Role');
  const loginRole = useSelector((state) => state?.auth?.loginRole);
  const loginUserRole = loginRole ?? userRole;
  const getControlOwnerData = useSelector(getControlOwnerDataSelector);

  let controlOwnerData = ([] = []);
  if (loginUserRole === 'Control owner') {
    controlOwnerData = getControlOwnerData.data[0]?.cOwnerData || [];
  } else {
    controlOwnerData = getControlOwnerData.data[1]?.cOverSightData || [];
  }

  // multi choice user input State for filters button
  const [yearValue, setYearValue] = useState([]);
  const [assessmentCycleValue, setAssessmentCycleValue] = useState([]);
  const [zoneValue, setZoneValue] = useState([]);
  const [buValue, setBUValue] = useState([]);
  const [receiverValue, setReceiverValue] = useState([]);
  const [providerValue, setProviderValue] = useState([]);

  useEffect(() => {
    dispatch(
      getControlOwnerTableData({
        email: accounts[0]?.username,
      }),
    );
    setTableColumns(TABLE_COLUMNS);
  }, [token]);

  const TABLE_COLUMNS = [
    {
      field: 'Action',
      headerName: 'Action',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
      renderCell: (row) => {
        return (
          <div>
            {row.row.Status === 'Completed' && (
              <Button
                className="mr-2"
                // onClick={() => history.push(`/Assessments/${row.row.Control_ID}`)}
                onClick={() => handleControlIDClick(row.row.Control_ID,row.row)}
              >
                Review
              </Button>
            )}
            {['Not started', 'Re-assessed','Drafted'].includes(row.row.Status) && (
              <Button onClick={() => history.push(`/Assessments/${row.row.Control_ID}`,row.row)}>
                Take Assessment
              </Button>
            )}
          </div>
        );
      },
    },
    {
      field: 'Zone',
      headerName: 'Zone',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 90,
    },
    // {
    //   field: 'Receiver',
    //   headerName: 'Receiver Organization',
    //   flex: 1,
    //   cellClassName: 'dashboardCell',
    //   minWidth: 200,
    // },
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
      minWidth: 140,
      renderCell: (row) => {
        return (
          <span
            className={'text-yellow cursor-pointer'}
            // onClick={() => handleControlIDClick(row.row.Control_ID)}
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
      minWidth: 150,
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
      minWidth: 150,
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
      headerName: "Control \nOwner",
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 250,
    },
    {
      field: 'Control_Oversight',
      headerName: 'Control Oversight',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 250,
    },
    {
      field: 'Assessment_Cycle',
      headerName: 'Assessment Cycle',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 150,
    },
    {
      field: 'Year',
      headerName: 'Year',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 100,
    },
  ];

  const Zone = controlOwnerData?.map((i) => i.Zone);
  const BU = controlOwnerData?.map((i) => i.BU);
  const Receiver = controlOwnerData?.map((i) => i.Receiver);
  const Provider = controlOwnerData?.map((i) => i.Provider);
  const year = controlOwnerData?.map((i) => i.Year);
  const assessment_Cycle = controlOwnerData?.map((i) => i.Assessment_Cycle);
  const handleControlIDClick = (id,row) => {
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
    history.push(`${history.location.pathname}?Control_ID=${id}`,row);
  };

  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  useEffect(() => {
    if (loginUserRole === 'Control owner') {
      setTableData(getControlOwnerData.data[0]?.cOwnerData || []);
    } else {
      setTableData(getControlOwnerData.data[1]?.cOverSightData || []);
    }
  }, [getControlOwnerData.data, loginUserRole]);

  useEffect(() => {
    if (!tableData.length) return setTableDataArray([]);
    if (
      !yearValue.length &&
      !assessmentCycleValue.length &&
      !zoneValue.length &&
      !buValue.length &&
      !receiverValue.length &&
      !providerValue.length
    ) {
      return setTableDataArray(tableData);
    }
    const updatedData = tableData.filter((i) => {
      return (
        (yearValue?.length ? yearValue.includes(i.Year) : true) &&
        (assessmentCycleValue?.length ? assessmentCycleValue.includes(i.Assessment_Cycle) : true) &&
        (zoneValue?.length ? zoneValue.includes(i.Zone) : true) &&
        (buValue?.length ? buValue.includes(i.BU) : true) &&
        (receiverValue?.length ? receiverValue.includes(i.Receiver) : true) &&
        (providerValue?.length ? providerValue.includes(i.Provider) : true)
      );
    });
    setTableDataArray(updatedData);
  }, [
    yearValue,
    assessmentCycleValue,
    zoneValue,
    buValue,
    receiverValue,
    providerValue,
    tableData,
    loginUserRole,
  ]);
  return (
    <>
      {/*<div className="container mt-5">
        <div className="row pt-5">
          <div className="col-12 col-lg-12">
            <Typography className="table-title">{tableName}</Typography>
          </div>
        </div>
  </div> */}

      <div className="container">
        {getControlOwnerData.loading ? (
          <TableLoader className="mt-8" />
        ) : (
          <div className="row pt-5">
            <div className="col-12 col-lg-12">
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
                  isHide={true}
                />
              </Group>
            </div>

            <div className="col-12 col-lg-12 mt-5">
              <Table
                tableData={tableDataArray}
                tableColumns={tableColumns}
                columns={tableColumns}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ControlOwnerTable;

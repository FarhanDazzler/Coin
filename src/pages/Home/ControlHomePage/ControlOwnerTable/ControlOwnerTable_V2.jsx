import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getControlDataGcdAction,
  getControlDataAction,
} from '../../../../redux/ControlData/ControlDataAction';
import { class_to_apply } from '../../V2/InternalControlHomePage/HomePageTable/constant';
import { getControlOwnerTableData } from '../../../../redux/DashBoard/DashBoardAction';
import { getControlOwnerDataSelector } from '../../../../redux/DashBoard/DashBoardSelectors';
import Button from '../../../../components/UI/Button';
import { Group } from '@mantine/core';
import FilterButtons from '../../../../components/FilterButtons';
import Table2 from '../../../../components/UI/Table/Table2';
import Cookies from 'js-cookie';
//TODO:Replace new table with desgin
const ControlOwnerTable = ({ tableName }) => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableDataArray, setTableDataArray] = useState([]);
  const token = Cookies.get('token');

  const history = useHistory();
  const { accounts } = useMsal();
  const dispatch = useDispatch();
  const userRole = localStorage.getItem('selected_Role');
  const loginRole = useSelector((state) => state?.auth?.loginRole);
  const loginUserRole = loginRole ?? userRole;
  const getControlOwnerData = useSelector(getControlOwnerDataSelector);

  let controlOwnerData = ([] = []);
  if (loginUserRole === 'Control Owner') {
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
        User_oid: accounts[0]?.idTokenClaims.oid,
      }),
    );
    setTableColumns(TABLE_COLUMNS);
  }, [token]);

  const TABLE_COLUMNS = [
    {
      accessorKey: 'Action',
      id: 'Action',
      header: 'Action',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      minWidth: 200,
      Cell: (row) => {
        return (
          <div>
            {row.row.original.Status === 'Completed' && (
              <Button
                className="mr-2"
                // onClick={() => history.push(`/Assessments/${row.row.original.Control_ID}`)}
                onClick={() => handleControlIDClick(row.row.original.Control_ID)}
              >
                Review
              </Button>
            )}
            {['Not started', 'Re-assessed'].includes(row.row.original.Status) && (
              <Button onClick={() => history.push(`/Assessments/${row.row.original.Control_ID}`)}>
                Take Assessment
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
      minWidth: 90,
    },
    {
      accessorKey: 'Receiver',
      id: 'Receiver',
      header: 'Receiver Organization',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      accessorKey: 'Provider',
      id: 'Provider',
      header: 'Provider Organization',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      accessorKey: 'Control_ID',
      id: 'Control_ID',
      header: 'Control ID',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      minWidth: 140,
      Cell: (row) => {
        return (
          <span
            className={'text-yellow'}
            onClick={() => handleControlIDClick(row.row.original.Control_ID)}
          >
            {row.row.original.Control_ID}
          </span>
        );
      },
    },
    {
      accessorKey: 'Provider',
      id: 'Provider',
      header: 'Provider',
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
      minWidth: 120,
      Cell: (row) => {
        return <span className={'text-yellow-dark'}>{row.row.original.Status}</span>;
      },
    },
    {
      accessorKey: 'Control_Owner',
      id: 'Control_Owner',
      header: 'Control \nOwner',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      minWidth: 250,
    },
    {
      accessorKey: 'Control_Oversight',
      id: 'Control_Oversight',
      header: 'Control Oversight',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      minWidth: 250,
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
    {
      accessorKey: 'KPI_Result',
      id: 'KPI_Result',
      header: 'KPI Result',
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
      id: 'Assessment_Result',
      header: 'Assessment Result',
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
      id: 'Compliance_Result',
      header: 'Compliance Result',
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
  ];

  const Zone = controlOwnerData?.map((i) => i.Zone);
  const BU = controlOwnerData?.map((i) => i.BU);
  const Receiver = controlOwnerData?.map((i) => i.Receiver);
  const Provider = controlOwnerData?.map((i) => i.Provider);
  const year = controlOwnerData?.map((i) => i.Year);
  const assessment_Cycle = controlOwnerData?.map((i) => i.Assessment_Cycle);
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

  function removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  useEffect(() => {
    if (loginUserRole === 'Control Owner') {
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
      {/*<div className="container-fluid mt-5">
        <div className="row pt-5">
          <div className="col-12 col-lg-12">
            <Typography className="table-title">{tableName}</Typography>
          </div>
        </div>
  </div> */}

      <div className="container-fluid">
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
              />
            </Group>
          </div>

          <div className="col-12 col-lg-12 mt-5">
            <Table2
              tableData={tableDataArray}
              loading={getControlOwnerData.loading}
              tableColumns={tableColumns}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ControlOwnerTable;

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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

const ControlOwnerTable = ({ tableName }) => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const history = useHistory();
  const { accounts } = useMsal();
  const dispatch = useDispatch();
  const userRole = localStorage.getItem('selected_Role');
  const loginRole = useSelector((state) => state?.auth?.loginRole);
  const loginUserRole = loginRole ?? userRole;
  const getControlOwnerData = useSelector(getControlOwnerDataSelector);

  useEffect(() => {
    dispatch(
      getControlOwnerTableData({
        email: 'Vikash.Jha@AB-inbev.com',
      }),
    );
    setTableColumns(TABLE_COLUMNS);
  }, []);

  const TABLE_COLUMNS = [
    {
      field: 'id',
      headerName: 'id',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 50,
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
    {
      field: 'Zone',
      headerName: 'Zone',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 180,
    },
    {
      field: 'Provider',
      headerName: 'Provider Org',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 180,
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
      field: '',
      headerName: 'Action',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 250,
      renderCell: (row) => {
        return (
          <div>
            <Button
              className="mr-2"
              onClick={() => history.push(`/Assessments/${row.row.Control_ID}`)}
            >
              view
            </Button>
            <Button onClick={() => handleControlIDClick(row.row.Control_ID)}>assessment</Button>
          </div>
        );
      },
    },
  ];

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

  useEffect(() => {
    if (loginUserRole === 'Control owner') {
      setTableData(getControlOwnerData.data[0]?.cOwnerData || []);
    } else {
      setTableData(getControlOwnerData.data[1]?.cOverSightData || []);
    }
  }, [getControlOwnerData.data, loginUserRole]);
  return (
    <>
      <div className="container mt-5">
        <div className="row pt-5">
          <div className="col col-lg-12">
            <Typography className="table-title">{tableName}</Typography>
          </div>
        </div>
      </div>

      <div className="container">
        {getControlOwnerData.loading ? (
          <TableLoader className="mt-8" />
        ) : (
          <div className="row pt-5">
            <div className="col col-lg-12">
              <Table tableData={tableData} tableColumns={tableColumns} columns={tableColumns} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ControlOwnerTable;

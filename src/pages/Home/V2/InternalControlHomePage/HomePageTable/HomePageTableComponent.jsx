import * as React from 'react';
import { useHistory } from 'react-router-dom';
import '../../../../../assets/styles/custom.css';
import { class_to_apply, TABLE_ROES } from './constant';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMsal } from '@azure/msal-react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Table from '../../../../../components/UI/Table';
import {
  getControlDataAction,
  getControlDataGcdAction,
} from '../../../../../redux/ControlData/ControlDataAction';
import Button from '../../../../../components/UI/Button';

const DashboardTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const history = useHistory();
  const { accounts } = useMsal();
  const dispatch = useDispatch();

  const TABLE_COLUMNS = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 70,
    },
    {
      field: 'Zone',
      headerName: 'Zone',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 120,
    },
    {
      field: 'Provider_Org',
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
      field: 'Co_Owner',
      headerName: 'Co Owner',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Co_Oversight',
      headerName: 'Co Oversight',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'View',
      headerName: 'View',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
      renderCell: (row) => {
        return (
          <Button
            variant="outlined"
            className={' cursor-pointer'}
            startIcon={<VisibilityIcon style={{ color: '#d3a306' }} />}
            onClick={() => handleControlView(row.row.Control_ID)}
          >
            View
          </Button>
        );
      },
    },
  ];

  const handleControlView = (id) => {
    window.location.href = `/Assessments/${id}`;
  };

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
    setTableColumns(TABLE_COLUMNS);
    setTableData(TABLE_ROES);
  }, []);
  return (
    <>
      {/*<div className="rounded-4 shadow-4 float-end mb-3">*/}
      {/*  <FilterHomePageTable />*/}
      {/*</div>*/}
      <div className="container-fluid mt-5">
        <div className="row pt-5">
          <div className="col-12 col-lg-12">
            <Table tableData={tableData} tableColumns={tableColumns} columns={tableColumns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardTable;

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { useDispatch } from 'react-redux';
import { TABLE_ROES } from './constant';
import Button from '../../UI/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  getControlDataAction,
  getControlDataGcdAction,
} from '../../../redux/ControlData/ControlDataAction';
import Table from '../../UI/Table';
import Typography from '@mui/material/Typography';
import { class_to_apply } from '../../HomePage/HomePageTable/constant';

const ControlOwnerTable = ({ tableName }) => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const history = useHistory();
  const { accounts } = useMsal();
  const dispatch = useDispatch();
  const query = new URLSearchParams(history.location.search);

  const TABLE_COLUMNS = [
    {
      field: 'id',
      headerName: 'id',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 50,
    },
    {
      field: 'assessmentCycle',
      headerName: 'Assessment Cycle',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 120,
    },
    {
      field: 'year',
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
      field: 'providerOrg',
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
      headerName: 'Control Owner',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Co_Oversight',
      headerName: 'Control Oversight',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
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
    setTableColumns(TABLE_COLUMNS);
    setTableData(TABLE_ROES);
  }, []);
  return (
    <>
      <div className="container mt-5">
        <div className="row pt-5">
          <div className="col col-lg-12">
            <Typography className="table-title">{tableName}</Typography>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row pt-5">
          <div className="col col-lg-12">
            <Table tableData={tableData} tableColumns={tableColumns} columns={tableColumns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ControlOwnerTable;

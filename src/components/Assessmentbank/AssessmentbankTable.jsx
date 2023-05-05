import * as React from 'react';
import { useHistory } from 'react-router-dom';
import '../../assets/styles/custom.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMsal } from '@azure/msal-react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  getControlDataAction,
  getControlDataGcdAction,
} from '../../redux/ControlData/ControlDataAction';
import Button from '../UI/Button';
import Table from '../UI/Table';
import { getSurveyStatusClass, TABLE_ROES } from './constant';
import NoDataPlaceholder from '../NoDataPlaceholder';

const AssessmentbankTable = () => {
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const history = useHistory();
  const { accounts } = useMsal();
  const dispatch = useDispatch();
  const query = new URLSearchParams(history.location.search);

  const TABLE_COLUMNS = [
    {
      field: 'assessmentName',
      headerName: 'Assessment Name ',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 150,
    },
    {
      field: 'ControlID',
      headerName: 'Control ID',
      flex: 1,
      cellClassName: 'dashboardCell',
      // text-yellow
      minWidth: 150,
      renderCell: (row) => {
        return <span className={'text-yellow'}>{row.row.ControlID}</span>;
      },
    },
    {
      field: 'ReceiverOrganization',
      headerName: 'Receiver Organization',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 180,
    },
    {
      field: 'ProviderOrganization',
      headerName: 'Provider Organization',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 120,
    },
    {
      field: 'ControlOwner',
      headerName: 'Control Owner',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'ControlOversight',
      headerName: 'Control Oversight',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'AssessmentCycle',
      headerName: 'Assessment Cycle',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },

    {
      field: 'SurveyStatus',
      headerName: 'Survey Status',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
      renderCell: (row) => {
        return (
          <span className={getSurveyStatusClass(row.row.SurveyStatus)}>{row.row.SurveyStatus}</span>
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

  console.log('tableData', tableData, tableColumns);
  return (
    <>
      {/*<div className="rounded-4 shadow-4 float-end mb-3">*/}
      {/*  <FilterHomePageTable />*/}
      {/*</div>*/}
      <div className="container mt-5">
        <div className="row pt-5">
          <div className="col-12 col-lg-12">
            {tableData?.length > 0 ? (
              <Table tableData={tableData} tableColumns={tableColumns} columns={tableColumns} />
            ) : (
              <NoDataPlaceholder />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AssessmentbankTable;

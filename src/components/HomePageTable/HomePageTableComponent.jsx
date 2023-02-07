import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Grid } from '@mui/material';

import '../../assets/styles/custom.css';
import { useMsal } from '@azure/msal-react';
import './StatusTrackerCard.css';
import FilterHomePageTable from './FilterHomePageTableComponent';
import ProgressBar from './ProgressBar/ProgressBar';

import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Button from '@mui/material/Button';

const rows = [
  {
    id: 1,
    Zone: 'AFR',
    BU: 'AFR - South East Africa',
    Provider_Entity: 'Mozambique',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Control_ID: 'ATR_MJE_01a-K',
    Co_Owner: 'Kuldeep.singh@ab-inbev.com',
    Co_Oversight: 'vikash.jha@ab-inbev.com',
    Status: 'UNDER REVIEW',
    KPI_Result: 'FAIL',
    Assessment_Result: 'PASS',
    Compliance_Result: 'FAIL',
    Lock: '0',
  },
  {
    id: 2,
    Zone: 'NAZ',
    BU: 'AFR - South East Africa',
    Provider_Entity: 'Mozambique',
    Provider_Org: 'SSC_GCC_Bangalore_GHQ',
    Control_ID: 'ATR_ACCR_01a',
    Co_Owner: 'Kuldeep.singh@ab-inbev.com',
    Co_Oversight: 'vikash.jha@ab-inbev.com',
    Status: 'UNDER REVIEW',
    KPI_Result: 'FAIL',
    Assessment_Result: 'PASS',
    Compliance_Result: 'FAIL',
    Lock: '0',
  },
];

const HomePageStatusTable = () => {
  return (
    <Grid container item xs={12} sx={{ height: 500, width: '100%' }}>
      <DataGrid
        sx={{ width: '100%', color: 'White' }}
        rows={rows}
        className="remove-search-boarder"
        componentsProps={{
          toolbar: { showQuickFilter: true },
        }}
        components={{
          Toolbar: GridToolbar,
        }}
        columns={[
          {
            field: 'id',
            headerName: 'ID',
            flex: 1,
            cellClassName: 'dashboardCell',
            minWidth: 120,
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
          },
          {
            field: 'Status',
            headerName: 'Status',
            flex: 1,
            cellClassName: 'dashboardCell',
            minWidth: 130,
            renderCell: (row) => {
              return <span className={class_to_apply(row.row.Status)}>{row.row.Status}</span>;
            },
          },
          {
            field: 'KPI_Result',
            headerName: 'KPI Result',
            flex: 1,
            cellClassName: 'dashboardCell',
            minWidth: 130,
            renderCell: (row) => {
              return (
                <span className={class_to_apply(row.row.KPI_Result)}>{row.row.KPI_Result}</span>
              );
            },
          },
          {
            field: 'Assessment_Result',
            headerName: 'Assessment Result',
            flex: 1,
            cellClassName: 'dashboardCell',
            minWidth: 190,
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
            minWidth: 190,
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
            minWidth: 120,
          },
          {
            field: 'Co_Oversight',
            headerName: 'Co Oversight',
            flex: 1,
            cellClassName: 'dashboardCell',
            minWidth: 100,
          },
        ]}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 50, 100]}
        disableSelectionOnClick
      />
    </Grid>
  );
};

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

const StatusTracker = () => {
  return (
    <div style={{ width: '100%', padding: 0 }}>
      <div className="parent">
        <div className="child">
          <span className="golden-text">
            <strong style={{ fontSize: 40 }}>46</strong>
          </span>
          <br />
          <BootstrapTooltip
            title="Assessments which are still pending to be completed"
            style={{ padding: 0 }}
          >
            <Button style={{ color: 'white' }}>
              <InfoOutlinedIcon className="golden-color" /> &nbsp;Not started
            </Button>
          </BootstrapTooltip>
        </div>
        <div className="child">
          <span className="golden-text">
            <strong style={{ fontSize: 40 }}>222</strong>
          </span>
          <br />
          <BootstrapTooltip title="Assessments which are saved as draft" style={{ padding: 0 }}>
            <Button style={{ color: 'white' }}>
              <InfoOutlinedIcon className="golden-color" /> &nbsp;Draft
            </Button>
          </BootstrapTooltip>
        </div>
      </div>
      <div className="parent">
        <div className="child">
          <span className="golden-text">
            <strong style={{ fontSize: 40 }}>4000</strong>
          </span>
          <br />
          <BootstrapTooltip title="Assessments which are Submited" style={{ padding: 0 }}>
            <Button style={{ color: 'white' }}>
              <InfoOutlinedIcon className="golden-color" /> &nbsp;Completed
            </Button>
          </BootstrapTooltip>
        </div>
        <div className="child">
          <span className="golden-text">
            <strong style={{ fontSize: 40 }}>80</strong>
          </span>
          <br />
          <BootstrapTooltip title="Assessment which are re-Attempted" style={{ padding: 0 }}>
            <Button style={{ color: 'white' }}>
              <InfoOutlinedIcon className="golden-color" /> &nbsp;Re-assessed
            </Button>
          </BootstrapTooltip>
        </div>
      </div>
    </div>
  );
};

const class_to_apply = (item) => {
  let className = '';
  if (item.toUpperCase() === 'PASS') {
    className = 'badge-success';
  }
  if (item.toUpperCase() === 'COMPLETE' || item === 'UNDER REVIEW') {
    className = 'badge-success';
  }
  if (item.toUpperCase() === 'SUBMITED' || item === 'UNDER REVIEWS') {
    className = 'badge-success';
  }
  if (item.toUpperCase() === 'FAIL') {
    className = 'badge-red';
  }
  if (item.toUpperCase() === 'IN PROGRESS') {
    className = 'badge-amber';
  }
  if (item.toUpperCase() === 'NOT STARTED' || item === 'UNDER REVIEW') {
    className = 'badge-grey';
  }

  return className;
};

const DashboardTable = () => {
  const { accounts } = useMsal();

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col col-sm-3">
            <div className="row">
              <div className="card-title" style={{ textAlign: 'left', paddingTop: 40 }}>
                <span>
                  <strong style={{ fontSize: 25, color: 'white' }}>{`Welcome`}</strong>
                </span>
                <br></br>
                <span className="golden-text">
                  <strong style={{ fontSize: 35 }}>
                    {accounts.length > 0 ? accounts[0].name : ''}
                  </strong>
                </span>
              </div>
            </div>
          </div>
          <div className="col col-lg">
            <div className="row">
              <div
                className="card"
                style={{
                  backgroundColor: '#28282B',
                  marginBottom: 8,
                  marginTop: 8,
                }}
              >
                <div className="charWrapper">
                  <ProgressBar />
                  <StatusTracker />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ paddingBottom: 10 }}>
        <FilterHomePageTable />
      </div>
      <HomePageStatusTable />
    </>
  );
};

export default DashboardTable;

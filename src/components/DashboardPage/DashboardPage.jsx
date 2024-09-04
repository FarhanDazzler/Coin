import React from 'react';
import FeatherIcon from 'feather-icons-react';
import DashboardCards from './DashboardCards/DashboardCards';
import './DashboardPageStyles.scss';
import Button from '../UI/Button';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

const DashboardPage = () => {
  const dummyDataControlAssessments = [
    {
      cardTitle: 'Control Owner',
      badge: {
        color: 'orange',
        title: '1Pending',
      },
      actionList: [
        {
          // icon: <FeatherIcon icon="clock" size={14} />,
          // errorText: 'No issues',
          message: '2024 - ATR_MIE_Ola-k-Manual Journal Entry Approval - South Africa',
        },
      ],
    },
    {
      cardTitle: 'Control Oversight',
      badge: {
        color: 'green',
        title: 'Completed',
      },
      actionList: [],
    },
  ];

  const dummyDataRepresentationLetters = [
    {
      cardTitle: 'BU',
      badge: {
        color: 'orange',
        title: '2Pending',
      },
      actionList: [
        {
          icon: <FeatherIcon icon="clock" size={14} />,
          errorText: 'Overdue',
          message: '10 - Solutions - GHQ',
        },
        {
          message: 'BU Weissbeerger',
        },
      ],
    },
    {
      cardTitle: 'Zone',
      badge: {
        color: 'orange',
        title: '2Pending',
      },
      actionList: [
        {
          icon: <FeatherIcon icon="clock" size={14} />,
          errorText: 'Overdue',
          message: '10 - Solutions - GHQ',
        },
        {
          message: 'BU Weissbeerger',
        },
      ],
    },
    {
      cardTitle: 'Functional',
      badge: {
        color: 'orange',
        title: '2Pending',
      },
      actionList: [
        {
          icon: <FeatherIcon icon="clock" size={14} />,
          errorText: 'Overdue',
          message: '10 - Solutions - GHQ',
        },
        {
          message: 'BU Weissbeerger',
        },
      ],
    },
  ];

  const dummyDataKPIInsights = [
    { title: 'Load KPIs', icon: <SystemUpdateAltIcon /> },
    { title: 'KPI Bible', icon: <AutoStoriesIcon /> },
    { title: 'KPI Insights', icon: <TipsAndUpdatesIcon /> },
  ];

  return (
    <div className="container-fluid pt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="dashboard-page control-actions-wrapper">
            <h4 className="section-title">Control Assessments</h4>

            <div>
              {dummyDataControlAssessments.map((data) => {
                return <DashboardCards data={data} />;
              })}
            </div>

            <div className="mt-4">
              <Button className="w-full" style={{ color: '#f4e003' }}>
                Go to Assessment Overview
              </Button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-page control-actions-wrapper">
            <h4 className="section-title">Representation Letter</h4>

            <div>
              {dummyDataRepresentationLetters.map((data) => {
                return <DashboardCards data={data} />;
              })}
            </div>

            <div className="mt-4">
              <Button className="w-full" style={{ color: '#f4e003' }}>
                Go to Representation Letter Overview
              </Button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="dashboard-page control-actions-wrapper">
            <h4 className="section-title">KPI Insights</h4>

            {dummyDataKPIInsights.map((data) => {
              return (
                <div className="kpi-insight-box">
                  <span>{data.title}</span>
                  <span style={{ color: '#f4e003' }}>{data.icon}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

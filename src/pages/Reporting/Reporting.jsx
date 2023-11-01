import React, { useState } from 'react';
import { models } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import { Card, Container, Row } from 'react-bootstrap';
import PageWrapper from '../../components/wrappers/PageWrapper';
import { Tabs } from '@mantine/core';

const Reporting = () => {
  const reportClass = 'report-container';
  var accessToken = localStorage.getItem('powerbi_access_token');

  const AssessmentProgressReportComponent = (
    <PowerBIEmbed
      embedConfig={{
        type: 'report', // Supported types: report, dashboard, tile, visual, qna, paginated report and create
        id: process.env.REACT_APP_SA_ASSESSMENT_PROGRESS_POWERBI_REPORT_ID, //report Id
        embedUrl: process.env.REACT_APP_SA_ASSESSMENT_PROGRESS_POWERBI_EMBED_URL,
        accessToken: accessToken,
        tokenType: models.TokenType.Aad,
        viewMode: models.ViewMode.View,
        permissions: models.Permissions.Read,
        //pageName: process.env.REACT_APP_POWERBI_EMBED_PAGE_NAME, //set Default page
        settings: {
          filterPaneEnabled: false,
          navContentPaneEnabled: false,
          panes: {
            bookmarks: {
              visible: false,
            },
            fields: {
              expanded: false,
              visible: false,
            },
            filters: {
              expanded: false,
              visible: true,
            },
            pageNavigation: {
              visible: true,
              position: models.PageNavigationPosition.Left,
            },
            selection: {
              visible: true,
            },
            syncSlicers: {
              visible: false,
            },
            visualizations: {
              expanded: false,
              visible: false,
            },
          },
          bars: {
            actionBar: {
              visible: false,
            },
            statusBar: {
              visible: false,
            },
          },
          background: models.BackgroundType.Default,
        },
      }}
      cssClassName={reportClass}
    />
  );

  const KPI_DETAILS_ReportComponent = (
    <PowerBIEmbed
      embedConfig={{
        type: 'report', // Supported types: report, dashboard, tile, visual, qna, paginated report and create
        id: process.env.REACT_APP_SA_KPI_DETAILS_POWERBI_REPORT_ID, //report Id
        embedUrl: process.env.REACT_APP_SA_KPI_DETAILS_POWERBI_EMBED_URL,
        accessToken: accessToken,
        tokenType: models.TokenType.Aad,
        viewMode: models.ViewMode.View,
        permissions: models.Permissions.Read,
        //pageName: process.env.REACT_APP_POWERBI_EMBED_PAGE_NAME, //set Default page
        settings: {
          filterPaneEnabled: false,
          navContentPaneEnabled: false,
          panes: {
            bookmarks: {
              visible: false,
            },
            fields: {
              expanded: false,
              visible: false,
            },
            filters: {
              expanded: false,
              visible: true,
            },
            pageNavigation: {
              visible: true,
              position: models.PageNavigationPosition.Left,
            },
            selection: {
              visible: true,
            },
            syncSlicers: {
              visible: false,
            },
            visualizations: {
              expanded: false,
              visible: false,
            },
          },
          bars: {
            actionBar: {
              visible: false,
            },
            statusBar: {
              visible: false,
            },
          },
          background: models.BackgroundType.Default,
        },
      }}
      cssClassName={reportClass}
    />
  );

  const NetworkOfCapabilityCentersReportComponent = (
    <PowerBIEmbed
      embedConfig={{
        type: 'report', // Supported types: report, dashboard, tile, visual, qna, paginated report and create
        id: process.env.REACT_APP_SA_NETWORK_OF_CAPABILITY_CENTER_POWERBI_REPORT_ID, //report Id
        embedUrl: process.env.REACT_APP_SA_NETWORK_OF_CAPABILITY_CENTER_POWERBI_EMBED_URL,
        accessToken: accessToken,
        tokenType: models.TokenType.Aad,
        viewMode: models.ViewMode.View,
        permissions: models.Permissions.Read,
        //pageName: process.env.REACT_APP_POWERBI_EMBED_PAGE_NAME, //set Default page
        settings: {
          filterPaneEnabled: false,
          navContentPaneEnabled: false,
          panes: {
            bookmarks: {
              visible: false,
            },
            fields: {
              expanded: false,
              visible: false,
            },
            filters: {
              expanded: false,
              visible: true,
            },
            pageNavigation: {
              visible: true,
              position: models.PageNavigationPosition.Left,
            },
            selection: {
              visible: true,
            },
            syncSlicers: {
              visible: false,
            },
            visualizations: {
              expanded: false,
              visible: false,
            },
          },
          bars: {
            actionBar: {
              visible: false,
            },
            statusBar: {
              visible: false,
            },
          },
          background: models.BackgroundType.Default,
        },
      }}
      cssClassName={reportClass}
    />
  );

  const AssessmentResultReportComponent = (
    <PowerBIEmbed
      embedConfig={{
        type: 'report', // Supported types: report, dashboard, tile, visual, qna, paginated report and create
        id: process.env.REACT_APP_SA_ASSESSMENT_RESULT_POWERBI_REPORT_ID, //report Id
        embedUrl: process.env.REACT_APP_SA_ASSESSMENT_RESULT_POWERBI_EMBED_URL,
        accessToken: accessToken,
        tokenType: models.TokenType.Aad,
        viewMode: models.ViewMode.View,
        permissions: models.Permissions.Read,
        //pageName: process.env.REACT_APP_POWERBI_EMBED_PAGE_NAME, //set Default page
        settings: {
          filterPaneEnabled: false,
          navContentPaneEnabled: false,
          panes: {
            bookmarks: {
              visible: false,
            },
            fields: {
              expanded: false,
              visible: false,
            },
            filters: {
              expanded: false,
              visible: true,
            },
            pageNavigation: {
              visible: true,
              position: models.PageNavigationPosition.Left,
            },
            selection: {
              visible: true,
            },
            syncSlicers: {
              visible: false,
            },
            visualizations: {
              expanded: false,
              visible: false,
            },
          },
          bars: {
            actionBar: {
              visible: false,
            },
            statusBar: {
              visible: false,
            },
          },
          background: models.BackgroundType.Default,
        },
      }}
      cssClassName={reportClass}
    />
  );

  return (
    <>
      <Tabs
        grow
        position="center"
        color="yellow"
        styles={{
          root: { margin: '20px' },
          //tabsListWrapper: { borderRadius: '10px' },
        }}
      >
        <Tabs.Tab label="Assessment Progress">
          <div className="dashboard-width">{AssessmentProgressReportComponent}</div>
        </Tabs.Tab>
        <Tabs.Tab label="Assessment Results">
          <div className="dashboard-width">{AssessmentResultReportComponent}</div>
        </Tabs.Tab>
        <Tabs.Tab label="KPI Details">
          <div className="dashboard-width">{KPI_DETAILS_ReportComponent}</div>
        </Tabs.Tab>
        <Tabs.Tab label="Network of capability center">
          <div className="dashboard-width">{NetworkOfCapabilityCentersReportComponent}</div>
        </Tabs.Tab>
      </Tabs>
    </>
  );
};

export default Reporting;
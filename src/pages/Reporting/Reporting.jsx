import React, { useState } from 'react';
import { models } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import { Card, Container, Row } from 'react-bootstrap';
import PageWrapper from '../../components/wrappers/PageWrapper';

const Reporting = () => {
  const reportClass = 'report-container';
  var accessToken = localStorage.getItem('powerbi_access_token');

  const reportComponent = (
    <PowerBIEmbed
      embedConfig={{
        type: 'report', // Supported types: report, dashboard, tile, visual, qna, paginated report and create
        id: process.env.REACT_APP_SA_POWERBI_REPORT_ID, //report Id
        embedUrl: process.env.REACT_APP_SA_POWERBI_EMBED_URL,
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
      <div className="dashboard-width">{reportComponent}</div>
    </>
  );
};

export default Reporting;

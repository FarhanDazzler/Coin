import React, { useState } from 'react';
import { models } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import { Card, Container, Row } from 'react-bootstrap';
import PageWrapper from '../../components/wrappers/PageWrapper';

const Reporting = () => {
  const reportClass = 'report-container';
  var accessToken = localStorage.getItem('powerbi_access_token');

  //https://app.powerbi.com/reportEmbed?reportId=47029d01-e6d0-4531-874a-5bc3a0ccb3cc&appId=72d682e3-2280-4b47-a554-d85c3065ebe0&autoAuth=true&ctid=cef04b19-7776-4a94-b89b-375c77a8f936
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

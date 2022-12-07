import React from 'react';
//import ReactDOM from "react-dom";

const Section3 = () => {
  return (
    <div className="container">
      <div className="card" style={{ margin: '10px' }}>
        <div className="card-header golden-text">
          <div className="card-title">
            {`Based on survey response provided, assessment is marked as failed. Respective zone IC team would soon reach out to you, for alignment on action plan.`}
          </div>
        </div>
        <div className="card-body">
          <ul style={{ listStyle: 'circle' }}>
            <li>
              <a href="DL_Internal-Control-North-America@ab-inbev.com">
                DL_Internal-Control-North-America
              </a>
            </li>
            <li>
              <a href="DL_Internal-Control-APAC@ab-inbev.com">DL_Internal-Control-APAC</a>
            </li>
            <li>
              <a href="DL_Internal-Control-Europe@ab-inbev.com">DL_Internal-Control-Europe</a>
            </li>
            <li>
              <a href="DL_Internal-Control-Middle-Americas@ab-inbev.com">
                DL_Internal-Control-Middle-Americas
              </a>
            </li>
            <li>
              <a href="DL_Internal-Control-Africa@ab-inbev.com">DL_Internal-Control-Africa</a>
            </li>
            <li>
              <a href="DL_Internal-South-Americas@ab-inbev.com">
                DL_Internal-Control-South-Americas
              </a>
            </li>
            <li>
              <a href="DL_Internal-Control-GHQ@ab-inbev.com">DL_Internal-Control-GHQ</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Section3;

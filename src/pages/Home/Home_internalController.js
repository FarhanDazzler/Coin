import React from 'react';
import { useMsal} from '@azure/msal-react';
import ProgressBar from 'react-bootstrap/ProgressBar';

import '../../assets/styles/custom.css';


const Home = () => {
  const { accounts } = useMsal();

  const control_name = 'ATR_MJE_01a-K';

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col col-sm-3">
          <div className="row">
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  {`Hi `}
                  <span className="golden-text">
                    <strong>
                      {accounts.length > 0 ? accounts[0].name : ''} {`!`}
                    </strong>
                  </span>
                </div>
              </div>
              <div className="card-title small m-1">
                <h4>{`You are an Internal Controller`}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-lg">
          <div className="card">
            <div className="card-body text-left">
              <span className="card-title golden-text">
                <strong>Response Summary</strong>
              </span>
              <br />
              <br />
              <span
                className="card-title small"
                style={{
                  fontSize: '0.9rem',
                }}
              >
                <p>A summary of responses submitted by Control Owners.</p>
              </span>
              <div className="container">
                <div>
                  <p className="grey-text">
                    {`1.`} {control_name}
                  </p>
                  <p className="grey-text">
                    {`2.`} {`ATR_RECON_01a-K`}
                  </p>
                </div>
              </div>

              <div className="container">
                <div className="row">
                  <div className="col col-sm-5">
                    <ProgressBar>
                      <ProgressBar variant="success" now={10} key={1} />
                      <ProgressBar variant="warning" now={10} key={2} />
                      <ProgressBar variant="danger" now={80} key={3} />
                    </ProgressBar>
                    <br />
                  </div>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col col-sm-2">
                    <p className="row card-subtitle">
                      <strong>RESPONDED</strong>
                    </p>
                    <p className="row card-subtitle">
                      <strong className="red-text">33%</strong>
                    </p>
                    <p className="row card-subtitle"></p>
                  </div>
                  <div className="col col-sm-2">
                    <p className="card-subtitle">
                      <strong>AWAITED</strong>
                    </p>
                    <p className="row card-subtitle">
                      <strong className="golden-text">66%</strong>
                    </p>
                  </div>
                  <div className="col col-sm-2">
                    <p className="card-subtitle">
                      <strong>FAILED</strong>
                    </p>
                    <p className="row card-subtitle">
                      <strong className="green-text">0%</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="card-title text-center">
              <hr></hr>
              <p className="card-subtitle">{`No actions logs available currently`}</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

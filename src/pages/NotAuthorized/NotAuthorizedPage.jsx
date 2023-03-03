import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import TopBar from '../../parts/TopBar/TopBar';
import PageWrapper from '../../components/wrappers/PageWrapper';
import './NotAuthorizedStyles.scss';

const NotAuthorized = (props) => {
  return (
    <div>
      <PageWrapper>
        <div className="container">
          <div className="row pt-5 align-items-center">
            <div className="col-lg-4">
              <h1 className="user-name-home yellow-gradient-text">{`Not Authorized`}</h1>
            </div>
            <div className="col-lg-8">
              <div className="home-right-overview">
                <h4 className="welcome-text">
                  {`Sorry but you are not authorized to access this application contact your System Administrator`}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
};

export default NotAuthorized;

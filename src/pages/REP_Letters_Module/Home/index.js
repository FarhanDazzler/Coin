import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageWrapper from '../../../components/wrappers/PageWrapper';
// import './NotAuthorizedStyles.scss';

const REP_Letters_HomePage = () => {
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
                <h4 className="welcome-text">{`Sorry REP Letters Module is under Development`}</h4>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
};

export default REP_Letters_HomePage;

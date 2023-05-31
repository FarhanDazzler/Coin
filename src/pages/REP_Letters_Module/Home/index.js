import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageWrapper from '../../../components/wrappers/PageWrapper';
// import './NotAuthorizedStyles.scss';

const REP_Letters_HomePage = () => {
  return (
    <div>
      <PageWrapper>
        <div className="container-fluid">
          <div className="row pt-5 align-items-center">
            <div className="col-lg-8 offset-lg-2 mt-5 pt-5">
              <div className="home-right-overview">
                <div className="text-center pt-3 pb-5">
                  <h1 className="user-name-home yellow-gradient-text">{`Not Authorized`}</h1>
                  <h4 className="welcome-text font-22">{`Representation Letters module is under construction`}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
};

export default REP_Letters_HomePage;

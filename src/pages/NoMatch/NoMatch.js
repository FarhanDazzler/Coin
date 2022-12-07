import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import TopBar from '../../parts/TopBar/TopBar';

const NoMatch = (props) => {
  return (
    <div className="page">
      <div className="flex-fill">
        <div className="my-3 my-md-5">
          <Container>
            <Row>
              <Col xs={12}>
                <Card>
                  <Card.Header>
                    <h3
                      className="card-title text-left golden-text"
                      style={{
                        marginTop: 'auto',
                        marginBottom: 'auto',
                      }}
                    >
                      <strong>{`404 Not Found`}</strong>
                    </h3>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col xs={12} className="text-left">
                        <h4>
                          Sorry but we could not find the page you were looking for. Please make
                          sure the address is correct.
                        </h4>
                        <p>
                          Click <Link to="/">here</Link> to go to the homepage.
                        </p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default NoMatch;

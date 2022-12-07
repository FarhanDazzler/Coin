import React, { useEffect, useState } from 'react';
import * as serviceWorker from '../../serviceWorkerRegistration';

import { app_name } from '../../utils/config';

import { Button, Toast, Row, Col, Container, ToastContainer } from 'react-bootstrap';

const ServiceWorkerWrapper = () => {
  const [showReload, setShowReload] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState(null);

  const onSWUpdate = (registration) => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  };

  useEffect(() => {
    serviceWorker.register({ onUpdate: onSWUpdate });
  }, []);

  const reloadPage = () => {
    waitingWorker?.postMessage({ type: 'SKIP_WAITING' });
    setShowReload(false);
    window.location.reload(true);
  };

  return (
    <ToastContainer className="p-3" position="bottom-center" style={{ zIndex: '1050' }}>
      <Toast show={showReload}>
        <Toast.Header closeButton={false}>
          <strong className="me-auto orange-text">{app_name}</strong>
        </Toast.Header>
        <Toast.Body>
          <Container>
            <Row>
              <Col>{`A new version is available!`}</Col>
            </Row>
            <Row style={{ marginTop: '1rem' }}>
              <Col xs={12}>
                <Button
                  className="btn-block btn-warning"
                  style={{ borderRadius: '40px' }}
                  onClick={reloadPage}
                >
                  {`Update`}
                </Button>
              </Col>
            </Row>
          </Container>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ServiceWorkerWrapper;

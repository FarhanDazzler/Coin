import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

const DataAccordion = ({ acc_key, acc_header, acc_body }) => {
  return (
    <>
      <Accordion>
        <Accordion.Item eventKey={acc_key}>
          <Accordion.Header>
            <span key="acc_key" className="golden-text" style={{ fontWeight: 'bold' }}>
              {acc_header}
            </span>
          </Accordion.Header>
          <Accordion.Body>{acc_body}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
};

export default DataAccordion;

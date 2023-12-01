import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Divider, Group, SimpleGrid, Text } from '@mantine/core';
import CollapseFrame from '../../../../../../components/UI/CollapseFrame';
import '../../../LetterFormStyle.scss';
import { clearGetBUSection3Response } from '../../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
import { getBUSection3ResponseSelector } from '../../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';
import Table2 from '../../../../../../components/UI/Table/Table2';

const ReviewSection3 = () => {
  const dispatch = useDispatch();

  const getBUSection3ResponseState = useSelector(getBUSection3ResponseSelector);

  // clear all the states on page leave or refresh page or change url path or change module or change role
  useEffect(() => {
    return () => {
      dispatch(clearGetBUSection3Response());
      //console.log('clearing section 3 response');
    };
  }, []);

  const TABLE_COLUMNS = [
    {
      accessorKey: 'Date',
      id: 'Date',
      header: 'Date',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'Reporting_Entity_COGNOS_Entity',
      id: 'Reporting_Entity_COGNOS_Entity',
      header: 'Reporting Entity (COGNOS Entity)',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'Type_Of_Reconciliation_Error',
      id: 'Type_Of_Reconciliation_Error',
      header: 'Type Of Reconciliation Error',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 250,
    },
    {
      accessorKey: 'Accounts_Of_The_Reconciliation',
      id: 'Accounts_Of_The_Reconciliation',
      header: 'Accounts Of The Reconciliation',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'Description_Of_Reconciliation',
      id: 'Description_Of_Reconciliation',
      header: 'Description Of Reconciliation',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'Account1',
      id: 'Account1',
      header: 'Account 1',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'Account2',
      id: 'Account2',
      header: 'Account 2',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'Reconciliation_Local_Currency',
      id: 'Reconciliation_Local_Currency',
      header: 'Reconciliation Local Currency',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 100,
    },
    {
      accessorKey: 'Reconciliation_USD',
      id: 'Reconciliation_USD',
      header: 'Reconciliation USD',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'Absolute_Values',
      id: 'Absolute_Values',
      header: 'Absolute Values',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
  ];

  return (
    <CollapseFrame title="Section 3 : RBA" active isOpen={false}>
      <Col xs={12} md={12}>
        <Card className="bu-letter-section3 mt-5">
          <Card.Body>
            <Row>
              <Row>
                <h5>
                  Please find the list of existing RBAs. Request you to review the same and kindly
                  provide an approval with comments (if required).
                </h5>
              </Row>
              <Divider color="gray" className="section3-divider" size="xs" />
            </Row>
            {getBUSection3ResponseState?.data?.RBA_Data && (
              <Row>
                <Table2
                  tableData={getBUSection3ResponseState?.data?.RBA_Data[0]}
                  loading={getBUSection3ResponseState.loading}
                  tableColumns={TABLE_COLUMNS}
                />
              </Row>
            )}
            <Row>
              <Divider color="gray" className="section3-divider" size="xs" />
              {getBUSection3ResponseState?.data?.DP_Comment && (
                <>
                  <Row>
                    <h5>
                      <span className="golden-text">
                        Comment provided by the Disclosure Processor :
                      </span>
                    </h5>
                  </Row>
                  <Row>
                    <h5>{getBUSection3ResponseState?.data?.DP_Comment}</h5>
                  </Row>
                </>
              )}
              {getBUSection3ResponseState?.data?.FD_Comment && (
                <>
                  <Row>
                    <h5>
                      <span className="golden-text">
                        Comment provided by the Finance Director :
                      </span>
                    </h5>
                  </Row>
                  <Row>
                    <h5>{getBUSection3ResponseState?.data?.FD_Comment}</h5>
                  </Row>
                </>
              )}
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </CollapseFrame>
  );
};

export default ReviewSection3;

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Form } from 'react-bootstrap';
import * as formik from 'formik';
import { useMsal } from '@azure/msal-react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Divider, Group, SimpleGrid, Text } from '@mantine/core';
import CollapseFrame from '../../../../../../components/UI/CollapseFrame';
import Button from '../../../../../../components/UI/Button';
import '../../../LetterFormStyle.scss';
import {
  approveBUSection3Response,
  clearGetBUSection3Response,
} from '../../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
import { getBUSection3ResponseSelector } from '../../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';
import Table2 from '../../../../../../components/UI/Table/Table2';

const ApprovalPageSection3 = ({ scopeData }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { accounts } = useMsal();
  const { Formik } = formik;

  const getBUSection3ResponseState = useSelector(getBUSection3ResponseSelector);

  // clear all the states on page leave or refresh page or change url path or change module or change role
  useEffect(() => {
    return () => {
      dispatch(clearGetBUSection3Response());
    };
  }, []);

  const handleSave = (value, resetForm) => {
    const payload = {
      assessment_id: scopeData?.id,
      FD_Comment: value.Comment,
    };

    //console.log('payload', payload);
    dispatch(approveBUSection3Response(payload));
    dispatch(clearGetBUSection3Response());
    history.push('/');
  };

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
    <CollapseFrame title="Section 3 : RBA" active>
      <Formik
        enableReinitialize
        initialValues={{
          Comment: '',
        }}
        validationSchema={Yup.object().shape({
          Comment: Yup.string().required('Comment is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            handleSave(values, resetForm);
          } catch (error) {
            const message = error.message || 'Something went wrong';
            setStatus({ success: false });
            setErrors({ submit: message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Col xs={12} md={12}>
              <Card className="bu-letter-section3 mt-5">
                <Card.Body>
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
                    <Row>
                      <h5>
                        <span className="golden-text">
                          Comment provided by the Disclosure Processor :
                        </span>
                        {' ' + getBUSection3ResponseState?.data?.FD_Comment}
                      </h5>
                    </Row>
                  </Row>
                  <Row>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Comment :</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Please provide your comment..."
                        required
                        onChange={handleChange}
                        isInvalid={!!errors.Comment}
                        name="Comment"
                        maxLength={5000}
                        value={values.Comment}
                        rows={3}
                      />
                      <Form.Control.Feedback type="invalid">{errors.Comment}</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <div className="d-flex align-items-center justify-content-end">
                    <div>
                      <Button
                        //variant="outlined"
                        color="secondary"
                        onClick={() => history.push('/')}
                      >
                        Cancel
                      </Button>
                      <Button
                        color="neutral"
                        className="ml-4"
                        onClick={handleSubmit}
                        id="submit-button"
                      >
                        Approve
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Form>
        )}
      </Formik>
    </CollapseFrame>
  );
};

export default ApprovalPageSection3;

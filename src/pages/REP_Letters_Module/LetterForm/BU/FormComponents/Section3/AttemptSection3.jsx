import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Form } from 'react-bootstrap';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useMsal } from '@azure/msal-react';
import * as formik from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Divider, Group, SimpleGrid, Text } from '@mantine/core';
import CollapseFrame from '../../../../../../components/UI/CollapseFrame';
import Button from '../../../../../../components/UI/Button';
import ActionLogChatTimeline from './ActionLogChatTimeline';
import '../../../LetterFormStyle.scss';
import {
  addBUSection3Response,
  clearGetBUSection3Response,
} from '../../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
import { getBUSection3ResponseSelector } from '../../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';

const AttemptSection3 = ({ scopeData }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { accounts } = useMsal();
  const { Formik } = formik;

  const getBUSection3ResponseState = useSelector(getBUSection3ResponseSelector);

  var formdata = new FormData();

  // clear all the states on page leave or refresh page or change url path or change module or change role
  useEffect(() => {
    return () => {
      dispatch(clearGetBUSection3Response());
      console.log('clearing section 3 response');
    };
  }, []);

  const handleSave = (value, resetForm) => {
    formdata.append('assessment_id', scopeData?.id);
    if (value.is_rba_applicable === 'Yes') {
      formdata.append('is_rba_applicable', true);
      formdata.append('rba_attachment', value.RBA_File);
    } else {
      formdata.append('is_rba_applicable', false);
    }
    formdata.append('comment', value.Comment);
    formdata.append('created_by', accounts[0]?.username);

    dispatch(addBUSection3Response(formdata));
    dispatch(clearGetBUSection3Response());
    history.push('/');
  };

  return (
    <CollapseFrame title="Section 3 : RBA" active>
      <Formik
        enableReinitialize
        initialValues={{
          RBA_File: null,
          is_rba_applicable: getBUSection3ResponseState?.data?.is_rba_applicable
            ? getBUSection3ResponseState?.data?.is_rba_applicable === 'true'
              ? 'Yes'
              : 'No'
            : 'Yes',
          Comment: '',
        }}
        validationSchema={Yup.object().shape({
          is_rba_applicable: Yup.string().required('Please select an option'),
          RBA_File: Yup.mixed().when('is_rba_applicable', {
            is: (value) => ['Yes'].includes(value),
            then: Yup.mixed().required('RBA file is required'),
          }),
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
                  <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Col>
                      <h5>Is the RBA applicable?</h5>
                    </Col>
                    <Col className="col-lg-4">
                      <Form.Group className="input-group mb-3">
                        <Form.Control
                          as="select"
                          name="is_rba_applicable"
                          placeholder=""
                          value={values.is_rba_applicable}
                          isInvalid={!!errors.is_rba_applicable}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          readOnly={false}
                          className="form-select"
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Form.Control>

                        <Form.Control.Feedback type="invalid">
                          {errors.is_rba_applicable}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                  {values.is_rba_applicable === 'Yes' && (
                    <>
                      <h5>
                        Kindly consolidate all relevant RBA proof documents into a single, polished
                        PDF file. Merge all proofs into a unified document and attach it
                        accordingly. If necessary, feel free to include comments to provide
                        explanations regarding the content.
                      </h5>
                      <Row className="col-lg-4">
                        <Form.Group style={{ padding: '0px', marginBottom: '20px' }}>
                          <Form.Control
                            type="file"
                            required
                            accept=".pdf, .zip, .rar, .7z, .gz"
                            name="RBA_File"
                            onChange={(event) => {
                              setFieldValue('RBA_File', event.currentTarget.files[0]);
                            }}
                            isInvalid={!!errors.RBA_File}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.RBA_File}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                    </>
                  )}
                  {getBUSection3ResponseState?.data?.is_rba_applicable === 'true' && (
                    <Row>
                      <Col>
                        <h5>RBA file attached by Disclosure Processor</h5>
                      </Col>
                      <Col>
                        <Button
                          startIcon={<PictureAsPdfIcon />}
                          onClick={() => {
                            const pdfUrl = getBUSection3ResponseState?.data?.rba_attachment_url;
                            window.open(pdfUrl, '_blank');
                          }}
                        >
                          RBA Attachment
                        </Button>
                      </Col>
                    </Row>
                  )}
                  {getBUSection3ResponseState?.data?.comment_response && (
                    <Row>
                      <Group position="apart">
                        <SimpleGrid cols={1}>
                          <Text
                            size="lg"
                            weight={700}
                            color="#ffffff"
                            align="left"
                          >{`Chat Logs`}</Text>
                        </SimpleGrid>
                      </Group>
                      <Divider color="gray" className="section3-divider" size="xs" />
                      <ActionLogChatTimeline
                        comments={getBUSection3ResponseState?.data?.comment_response}
                      />
                    </Row>
                  )}
                  <Row>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label className="mt-5">Comment :</Form.Label>
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
                        Confirm
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

export default AttemptSection3;

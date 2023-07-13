import React, { useEffect, useState } from 'react';
import { Card, Modal, Container, Row, Col } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { Divider, Box } from '@mantine/core';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import * as Yup from 'yup';
import { useFormikContext, Formik } from 'formik';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import DeleteIcon from '@mui/icons-material/Delete';
import PageWrapper from '../../components/wrappers/PageWrapper';
import Button from '../../components/UI/Button';
import './ContactUSStyle.scss';

const GetFormikFieldValue = () => {
  // Grab values and submitForm from context
  const dispatch = useDispatch();
  const { values } = useFormikContext();
  useEffect(() => {}, []);
  return null;
};

const ContactUSLandingPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [files, setFiles] = useState('');

  const handleOnclickCancel = () => {
    history.push('/');
  };
  const HandleSave = (value) => {
    let payload = {};
  };

  return (
    <PageWrapper>
      <div className="container py-5">
        <div className="col-lg-12 py-4 ContactUSBOXWrapper">
          <div id="Contact-US" className="content">
            <div className="wrapper">
              <div className="AssessmentBank-inputPage-title">
                <SupportAgentIcon sx={{ fontSize: 40, paddingRight: '5px' }} />
                Raise Ticket
              </div>
              <p className="AdminPageDesc">
                Please fill the following details to create a support ticket on your queries. The
                team will get back to you shortly.
              </p>
              <Divider
                style={{ paddingBottom: '24px' }}
                className="divider"
                size="md"
                my="xs"
                labelPosition="center"
              />
              <Formik
                enableReinitialize
                initialValues={{
                  TypeOfIssue: '',
                  Module: '',
                  Subject: '',
                  ShortDescription: '',
                }}
                validationSchema={Yup.object().shape({
                  TypeOfIssue: Yup.string().required('Type Of Issue is required'),
                  Module: Yup.string().required('Module is required'),
                  Subject: Yup.string().required('Subject is required'),
                  ShortDescription: Yup.string().required('Short Description is required'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                  try {
                    HandleSave(values);
                    resetForm();
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
                    <div id="mics-inputPage" className="row">
                      <div className="row mb-4">
                        <div className="col-lg-12">
                          <Form.Label>Type Of Issue :</Form.Label>
                        </div>
                        <div className="col-lg-6">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="TypeOfIssue"
                              placeholder=""
                              value={values.TypeOfIssue}
                              isInvalid={Boolean(touched.TypeOfIssue && errors.TypeOfIssue)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Select </option>
                              <option value="Technical">Technical</option>
                              <option value="Business">Business</option>
                            </Form.Control>

                            {!!touched.TypeOfIssue && (
                              <Form.Control.Feedback type="invalid">
                                {errors.TypeOfIssue}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>

                      <div className="row mb-4">
                        <div className="col-lg-12">
                          <Form.Label>Module :</Form.Label>
                        </div>
                        <div className="col-lg-6">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="Module"
                              placeholder=""
                              value={values.Module}
                              isInvalid={Boolean(touched.Module && errors.Module)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Select Module</option>
                              <option value="Assessment Module">Assessment Module</option>
                              <option value="BU Representation Letter">
                                BU Representation Letter
                              </option>
                              <option value="Functional Representation Letter">
                                Functional Representation Letter
                              </option>
                            </Form.Control>

                            {!!touched.Module && (
                              <Form.Control.Feedback type="invalid">
                                {errors.Module}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>

                      <div className="row mb-4">
                        <div className="col-lg-12">
                          <Form.Label>Subject :</Form.Label>
                        </div>
                        <div className="col-lg-12">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="text"
                              name="Subject"
                              placeholder=""
                              value={values.Subject}
                              isInvalid={Boolean(touched.Subject && errors.Subject)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              maxLength={500}
                              readOnly={false}
                              className="form-control"
                            />

                            {!!touched.Subject && (
                              <Form.Control.Feedback type="invalid">
                                {errors.Subject}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>

                      <div className="row mb-4">
                        <div className="col-lg-12">
                          <Form.Label>Short Description :</Form.Label>
                        </div>
                        <div className="col-lg-12">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              id="ShortDescription"
                              type="text"
                              name="ShortDescription"
                              placeholder=""
                              value={values.ShortDescription}
                              isInvalid={Boolean(
                                touched.ShortDescription && errors.ShortDescription,
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              maxLength={500}
                              readOnly={false}
                              className="form-control"
                            />

                            {!!touched.ShortDescription && (
                              <Form.Control.Feedback type="invalid">
                                {errors.ShortDescription}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>

                      <Row className="cardInputGroup">
                        <Col md={12} className="cardInputHeader" style={{ margin: '0' }}>
                          <Form.Label>Attachments :</Form.Label>
                        </Col>
                        <Col md={12} className="cardNote">
                          <p style={{ margin: '0' }}>
                            (Strictly allowed File types : .zip, .png , .jpeg, .jpg, .docx, .xlsx,
                            .csv)
                          </p>
                        </Col>
                        <Col md={6} sm={8} xs={12}>
                          <div className="upload-sec">
                            <input
                              type="file"
                              className="form-control"
                              id="mp-attachment"
                              multiple={false}
                              style={{ display: 'none' }}
                              accept="image/png,image/jpeg,application/pdf,text/csv,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/zip"
                              onChange={(e) => {
                                setFiles(e.target.files);
                              }}
                            />
                            <div style={{ paddingRight: '15px' }}>
                              <label style={{ marginBottom: '0.2rem' }}>Choose Files</label>
                              <div
                                style={{
                                  maxWidth: 150,
                                  fontWeight: 600,
                                  fontSize: 10,
                                  paddingBottom: '3px',
                                }}
                              >
                                {' '}
                                (Max-Size: 2MB){' '}
                              </div>
                            </div>
                            <div>
                              <label htmlFor="mp-attachment" id="uploadEvidencebtn">
                                <Button
                                  className="icon-button"
                                  variant="contained"
                                  color="primary"
                                  component="span"
                                >
                                  <FeatherIcon icon="upload" size={14} />
                                </Button>
                              </label>
                            </div>
                          </div>
                        </Col>
                        <Col md={12}>
                          <div
                            className="attachment-links"
                            style={{ paddingLeft: '10px', paddingTop: '30px' }}
                          >
                            {files.length > 0 ? (
                              <>
                                {files[0]?.name ? (
                                  <div>{files[0]?.name}</div>
                                ) : (
                                  <div>{files[0]?.fileName}</div>
                                )}
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <div className="d-flex align-items-center justify-content-end">
                      <div>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => handleOnclickCancel()}
                        >
                          Cancel
                        </Button>
                        <Button color="neutral" className="ml-4" onClick={handleSubmit}>
                          Confirm
                        </Button>
                      </div>
                    </div>
                    <GetFormikFieldValue />
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ContactUSLandingPage;

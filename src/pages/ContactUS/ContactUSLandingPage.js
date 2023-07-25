import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, Modal, Container, Row, Col } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { Group, Text, Image, SimpleGrid } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Divider, Box } from '@mantine/core';
import { MsalProvider, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { InteractionStatus, PublicClientApplication } from '@azure/msal-browser';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import * as Yup from 'yup';
import { useFormikContext, Formik } from 'formik';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDropzone } from 'react-dropzone';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PageWrapper from '../../components/wrappers/PageWrapper';
import Button from '../../components/UI/Button';
import './ContactUSStyle.scss';
import axios from 'axios';

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
  const { instance, accounts, inProgress } = useMsal();

  const [SYS_ID, setSYS_ID] = useState();

  var formdata = new FormData();

  // Code for File Drop Zone
  // state to store files
  const [files, setFiles] = useState([]);

  // Function to detele file on the basis of file name
  const handleDeleteFile = useCallback(
    (fileName) => {
      const updatedFiles = files.filter((file) => file.name !== fileName);
      setFiles(updatedFiles);
    },
    [files],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg'],
    },

    // Specify the file types you want to accept
    //multiple: true, // Allow multiple file selection
    multiple: false,
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
  });

  // Function to preview files (Thumbnail)
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <div className="previews-block" key={index}>
        <VideoLibraryIcon />
        <span className="upload-image-file-name">{file.name}</span>

        <DeleteIcon
          className="previews-cancel-icon"
          size={30}
          strokeWidth={1.5}
          color={'#ffc800'}
          onClick={() => {
            handleDeleteFile(file.name);
          }}
        />
      </div>
    );
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  // Code for changing background color of dropzone
  const style = useMemo(
    () => ({
      ...(isDragActive ? { backgroundColor: '#ffc800' } : {}),
      ...(isDragAccept ? { backgroundColor: '#508A3B' } : {}),
      ...(isDragReject ? { backgroundColor: '#b11f24' } : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  );

  // code for changing text of dropzone with icons nad text color
  const messageWithIconAndColor = useMemo(() => {
    if (fileRejections.length > 0) {
      const { errors } = fileRejections[0];
      return (
        <Group position="center" spacing="xl" style={{ minHeight: '220px', pointerEvents: 'none' }}>
          <IconX size="3.2rem" strokeWidth={2} color="#b11f24" />
          <div className="dropzone-message-text" style={{ color: '#b11f24' }}>
            <Text size="xl" inline>
              {' '}
              {errors[0].message}{' '}
            </Text>
          </div>
        </Group>
      );
    }
    if (files.length > 0) {
      return (
        <Group position="center" spacing="xl" style={{ minHeight: '220px', pointerEvents: 'none' }}>
          <IconPhoto size="3.2rem" strokeWidth={2} color="#ffff" />
          <div className="dropzone-message-text" style={{ color: '#ffff' }}>
            <Text size="xl" inline>
              {' '}
              {`${files.length} file${files.length > 1 ? 's' : ''} selected`}
            </Text>
          </div>
        </Group>
      );
    }
    return (
      <Group position="center" spacing="xl" style={{ minHeight: '220px', pointerEvents: 'none' }}>
        <IconUpload size="3.2rem" strokeWidth={2} color="#ffc800" />
        <div className="dropzone-message-text" style={{ color: '#ffc800' }}>
          <Text size="xl" inline>
            {' '}
            Drag and drop some files here, or click to select files
          </Text>
        </div>
      </Group>
    );
  }, [files, fileRejections]);

  const handleOnclickCancel = () => {
    history.push('/');
  };
  const HandleSave = (value) => {
    let payload = {
      issueType: 'u_performance',
      shortDescription: 'Test',
      projectName: 'COIN',
      zone: 'GHQ',
      issueDescription: 'Test',
      pointOfContact: accounts[0]?.name ? accounts[0].name : '',
      assignmentGroup: 'getFromVamshi',
      priority: '3',
      sys_id: SYS_ID,
      businessService: 'GetITFromVamshi',
      typeOfSolution: 'COIN_application_issue',
    };
    // let config = {
    //   method: 'post',
    //   url: process.env.REACT_APP_SNOW_CREATE_TICKET,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${localStorage.getItem('snow_api_access_token')}`,
    //   },
    //   data: payload,
    // };
    // axios
    //   .request(config)
    //   .then((response) => {
    //     console.log(JSON.stringify(response.data));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const getSystemID = async () => {
    let config = {
      method: 'get',
      url: process.env.REACT_APP_SNOW_GET_SYSTEM_ID + accounts[0]?.username,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('snow_api_access_token')}`,
      },
    };
    axios
      .request(config)
      .then((response) => {
        //console.log(JSON.stringify(response.data), 'system ID');
        setSYS_ID(response.data.result[0].sys_id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSystemID();
  }, []);

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
                        <div className="col-lg-12">
                          <Form.Label>Attachments :</Form.Label>
                        </div>

                        <Col md={12} className="cardNote">
                          <p>(Strictly allowed File types : .png , .jpeg, .jpg)</p>
                        </Col>
                        <div className="row mb-8">
                          <section className="container">
                            <div className="dropZoneContainer" style={style}>
                              <div {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} />
                                {messageWithIconAndColor}
                              </div>
                            </div>
                            <SimpleGrid
                              cols={4}
                              breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                              mt={previews.length > 0 ? 'xl' : 0}
                            >
                              {previews}
                            </SimpleGrid>
                          </section>
                        </div>
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

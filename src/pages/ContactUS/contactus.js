import React, { useEffect, useState } from 'react';
import { TextInput, Textarea, Group, Button, Select, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Card, Modal, Container, Row, Col } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';
// import {  IconInfoCircle, IconX, IconPlaystationX, IconFileUpload} from '@tabler/icons';
import { useMsal } from '@azure/msal-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { Constants } from '../../Constants/Constants';
import '../../assets/styles/custom.css';
import './contactus.css';
import { toast } from 'react-toastify';
import { Delete } from '@mui/icons-material';
import PageWrapper from '../../components/wrappers/PageWrapper';

let INC_NUM;

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const { instance, accounts, inProgress } = useMsal();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [files, setFiles] = useState('');
  const [issueType, setIssueType] = useState('');
  const [module, setModule] = useState('');
  const [showProgress, setShowProgress] = useState(false);
  const [SYS_ID, setSYS_ID] = useState(false);

  const allowedExtensions = ['zip', 'png', 'jpg', 'jpeg', 'doc', 'docx', 'xlsx', 'csv', 'txt'];

  const handleFileSelect = async (event) => {
    const file = event.target.files;
    const extension = file[0].name.split('.').pop().toLowerCase();
    if (allowedExtensions.includes(extension)) {
      setFiles(file);
    } else {
      toast.error('Invalid file selected. Please refer to the list of allowed file types');
    }
  };

  const [errors, setErrors] = useState({
    issueType: false,
    module: false,
    shortDescription: false,
    issueDescription: false,
  });

  const form = useForm({
    initialValues: {
      shortDescription: '',
      issueDescription: '',
    },
    validate: {
      shortDescription: (value) => value.trim().length === 0,
      issueDescription: (value) => value.trim().length === 0,
    },
  });

  const issueTypeDropDownOptions = [
    {
      label: 'Technical',
      value: 'Technical',
    },
    {
      label: 'Business',
      value: 'Business',
    },
  ];

  const moduleDropDownOptions = [
    {
      label: 'Assessment Module',
      value: 'Assessment Module',
    },
    {
      label: 'BU Representation Letter',
      value: 'BU Representation Letter',
    },
    {
      label: 'Functional Representation Letter',
      value: 'Functional Representation Letter',
    },
  ];

  const removeAttachment = () => {
    // uploadInputRef.current.value = "";
    setFiles('');
  };

  const getSysID = async () => {
    const config = {
      headers: {
        Authorization: `${localStorage.getItem('snow_api_access_token')}`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_SNOW_GET_SYSTEM_ID}${
          accounts.length > 0 ? accounts[0].username : ''
        }`,
        config,
      )
      .then((response) => {
        setSYS_ID(response.data.result[0].sys_id);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getSysID();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const value = form.values;

    if (
      issueType === '' ||
      module === '' ||
      value.shortDescription === '' ||
      value.issueDescription === ''
    ) {
      toast.error('Please fill all the required fields');
      setErrors({
        issueType: issueType === '' ? true : false,
        module: module === '' ? true : false,
        shortDescription: value.shortDescription === '' ? true : false,
        issueDescription: value.issueDescription === '' ? true : false,
      });
      return;
    } else if (module === '') {
      toast.error('Please fill all the required fields');
      setErrors({
        module: module === '' ? true : false,
      });
      return;
    } else if (value.shortDescription.length >= 5000 || value.issueDescription.length >= 5000) {
      toast.error('Only 5000 character allow');
      setErrors({
        shortDescription: value.shortDescription.length >= 5000 ? true : false,
        issueDescription: value.issueDescription.length >= 5000 ? true : false,
      });
      return;
    }
    setShowProgress(true);
    let data = {};
    data['sys_id'] = SYS_ID;
    data['username'] = accounts.length > 0 ? accounts[0].username : '';
    data['issueDescription'] = value.issueDescription;
    data['issueType'] = issueType;
    if (module != '') {
      data['shortDescription'] = 'COIN Module: ' + module + ' || ' + value.shortDescription;
    } else {
      data['shortDescription'] = 'COIN: ' + module + ' || ' + value.shortDescription;
    }
    data['projectName'] = 'COIN';
    data['module'] = module;
    data['priority'] = '3';
    data['typeOfSolution'] = 'PWA';
    data['issueType'] = 'u_performance';
    if (issueType === 'Technical') {
      // please uncomment the below code once RnM handover is done
      data['assignmentGroup'] = process.env.REACT_APP_SNOW_ASSIGNMENT_GROUP_BUSINESS;
      //data['assignmentGroup'] = process.env.REACT_APP_SNOW_ASSIGNMENT_GROUP_TECHNICAL;
    } else {
      data['assignmentGroup'] = process.env.REACT_APP_SNOW_ASSIGNMENT_GROUP_BUSINESS;
    }
    data['typeOfSolution'] = 'PWA';
    data['businessService'] = '62a65f2fdbf92090c014fe03f3961915';

    async function uploadFile(data) {
      const formData = new FormData();
      formData.append('attachment', files[0]);
      formData.append('sys_id', data['IncidentSysId']);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('snow_api_access_token')}`,
        },
      };
      axios.post(process.env.REACT_APP_SNOW_UPLOAD_FILE, formData, config).then((response) => {});
    }

    async function getIncidentSysID(incidentNumber) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('snow_api_access_token')}`,
        },
      };
      axios
        .get(`${process.env.REACT_APP_SNOW_GET_INCIDENT_SYSTEM}${incidentNumber}`, config)
        .then((res) => {
          data['IncidentSysId'] = res.data.result[0].sys_id;
          uploadFile(data);
        });
    }

    const pushSQL = async (data) => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('snow_api_access_token')}`,
        },
      };
      axios.post(process.env.REACT_APP_SNOW_PUSH_INC_SQL, data, config).then((res) => {
        setShowProgress(false);
        handleShow();
      });
    };

    async function raiseTicket(data) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('snow_api_access_token')}`,
        },
      };
      axios
        .post(process.env.REACT_APP_SNOW_CREATE_TICKET, data, config)
        .then((res) => {
          data['IncidentNumber'] = res.data.result.number;
          INC_NUM = data['IncidentNumber'];
          if (files[0]?.name?.length > 0) getIncidentSysID(INC_NUM);
          pushSQL(data);
        })
        .catch((e) => {
          setShowProgress(false);
          alert('Upload Error');
        });
    }
    raiseTicket(data);
  };

  return (
    <PageWrapper>
      {!loading ? (
        <div className="contactUs">
          <Container
            fluid
            style={{ paddingTop: '0.75rem', paddingBottom: '0.75rem' }}
            className="cardContainer"
          >
            <Row>
              <Col md={10} lg={10} sm={10} xs={11} style={{ margin: 'auto' }}>
                <form onSubmit={onSubmit}>
                  <Card className="customCard">
                    <div>
                      <Text
                        weight={600}
                        color="goldenrod"
                        align="left"
                        style={{
                          fontSize: '30px',
                        }}
                      >{`Contact Us`}</Text>
                    </div>
                    <hr
                      style={{
                        color: 'black',
                        marginTop: '1rem',
                        marginBottom: '1rem',
                      }}
                    />
                    <div className="cardNote">
                      <p style={{ color: '#fff' }}>
                        Please fill the following details to create a support ticket on your
                        queries. The team will get back to you shortly.
                      </p>
                    </div>

                    <Row className="cardInputGroup">
                      <Col md={3} sm={6} xs={12} className="cardInput">
                        <Text size="md" weight={500} color="white" align="left">
                          {`Type of Issue `}
                          {<span style={{ color: 'red' }}>*</span>}
                        </Text>
                        <Select
                          placeholder="Select"
                          required
                          data={issueTypeDropDownOptions}
                          name="issueType"
                          border="2px"
                          radius="14px"
                          value={issueType}
                          onChange={setIssueType}
                          error={errors.issueType}
                        />
                      </Col>
                      <Col md={3} sm={6} xs={12} className="cardInput">
                        <Text size="md" weight={500} color="White" align="left">
                          {`Module `}
                          {<span style={{ color: 'red' }}>*</span>}
                        </Text>
                        <Select
                          placeholder="Select"
                          required
                          data={moduleDropDownOptions}
                          name="module"
                          border="2px"
                          radius="14px"
                          value={module}
                          onChange={setModule}
                          error={errors.issueType}
                        />
                      </Col>
                      {/* <Col md={3} sm={6} xs={12} className="cardInput">
                        <Text size="md" weight={500} color="black" align="left">
                          {`MJE ID `}
                        </Text>
                        <TextInput
                          placeholder="Enter MJE ID"
                          mt="md"
                          name="mjeId"
                          radius="14px"
                          style={{ borderRadius: '14px', marginTop: '0px' }}
                          {...form.getInputProps('mjeId')}
                          error={errors.mjeId}
                        />
                      </Col> */}
                    </Row>
                    <Row style={{ marginTop: '20px' }}>
                      <Col>
                        <Row>
                          <Col md={12}>
                            <Text size="md" weight={500} color="white" align="left">
                              {`Subject `}
                              {<span style={{ color: 'red' }}>*</span>}
                            </Text>
                            <TextInput
                              placeholder="Enter Subject"
                              required
                              mt="md"
                              name="shortDescription"
                              radius="14px"
                              style={{ borderRadius: '14px', marginTop: '0px' }}
                              {...form.getInputProps('shortDescription')}
                              error={errors.shortDescription}
                            />
                          </Col>
                          <Col md={12} style={{ marginTop: '10px' }}>
                            <Text size="md" weight={500} color="white" align="left">
                              {`Issue Description `}
                              {<span style={{ color: 'red' }}>*</span>}
                            </Text>
                            <Textarea
                              mt="md"
                              required
                              placeholder="Enter Detailed Description"
                              maxRows={10}
                              minRows={3}
                              autosize
                              name="issueDescription"
                              border="2px"
                              radius="14px"
                              style={{ marginTop: '0px' }}
                              {...form.getInputProps('issueDescription')}
                              error={errors.issueDescription}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col md={12} className="cardInputHeader" style={{ margin: '0' }}>
                            <Text
                              size="md"
                              weight={500}
                              color="white"
                              align="left"
                            >{`Attachment (If Any)`}</Text>
                          </Col>
                          <Col md={12} className="cardNote">
                            <p style={{ margin: '0', color: 'white', fontSize: 10 }}>
                              (Strictly allowed File types : .zip, .png , .jpeg, .jpg, .docx, .xlsx,
                              .csv)
                            </p>
                          </Col>
                          <Col md={12} sm={8} xs={12}>
                            <div className="upload-sec">
                              <input
                                type="file"
                                className="form-control"
                                id="mp-attachment"
                                multiple={false}
                                style={{ display: 'none' }}
                                // ref={uploadInputRef}
                                onChange={handleFileSelect}
                              />
                              <div style={{ paddingRight: '15px' }}>
                                <label style={{ marginBottom: '0.2rem', color: 'white' }}>
                                  Choose Files
                                </label>
                                <div
                                  style={{
                                    maxWidth: 150,
                                    fontWeight: 600,
                                    fontSize: 10,
                                    paddingBottom: '3px',
                                    color: 'white',
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
                              style={{
                                paddingLeft: '10px',
                                paddingTop: '30px',
                              }}
                            >
                              {files.length > 0 ? (
                                <>
                                  {files[0]?.name ? (
                                    <div>
                                      {files[0]?.name}
                                      <Delete
                                        size={14}
                                        className="close-icon"
                                        onClick={removeAttachment}
                                        style={{ cursor: 'pointer' }}
                                      ></Delete>
                                    </div>
                                  ) : (
                                    <div>
                                      {files[0]?.fileName}
                                      <Delete
                                        size={14}
                                        className="close-icon"
                                        onClick={removeAttachment}
                                        style={{ cursor: 'pointer' }}
                                      ></Delete>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Group position="right" mt="xl">
                      <Link to="/">
                        <button size="md" radius="xl" className="cancel-btn-contact-us">
                          Cancel
                        </button>
                      </Link>
                      <button type="submit" size="md" radius="xl" className="submit-btn-contact-us">
                        Submit
                      </button>
                    </Group>
                  </Card>
                </form>
              </Col>
            </Row>

            <Modal show={showProgress} backdrop="static" keyboard={false} position="center">
              <Modal.Header>
                <Modal.Title style={{ fontFamily: 'Avantt-Bold' }}>Thank You!</Modal.Title>
              </Modal.Header>
              <Modal.Body text-align="center" style={{ fontFamily: 'Avantt-SemiBold' }}>
                Please wait we are communicating your query to the support team.
                <div className="loader" style={{ margin: 'auto' }}></div>
              </Modal.Body>
            </Modal>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
              position="center"
              className="successModal"
            >
              <Modal.Header>
                <Modal.Title>
                  <span style={{ color: 'green', fontFamily: 'Avantt-Bold' }}>
                    Ticket Created Successfully
                  </span>
                </Modal.Title>
                <Link to="/">
                  <FeatherIcon icon="x" size={20} />
                </Link>
              </Modal.Header>
              <Modal.Body text-align="center" style={{ fontFamily: 'Avantt-SemiBold' }}>
                Your ticket has been raised with Incident Number:{' '}
                <span className="golden-text">{INC_NUM}</span>. On Clicking Close, you will be
                redirected to Home page.
              </Modal.Body>
            </Modal>
          </Container>
        </div>
      ) : (
        <div className="loader"> </div>
      )}
    </PageWrapper>
  );
};

export default ContactUs;

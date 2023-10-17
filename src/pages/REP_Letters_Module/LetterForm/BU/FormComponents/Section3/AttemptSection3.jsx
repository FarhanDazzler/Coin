import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Form } from 'react-bootstrap';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useMsal } from '@azure/msal-react';
import * as formik from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import CollapseFrame from '../../../../../../components/UI/CollapseFrame';
import Button from '../../../../../../components/UI/Button';
import SendIcon from '@mui/icons-material/Send';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import { Container, Row, Col, Card } from 'react-bootstrap';
import {
  Switch,
  Divider,
  Group,
  SimpleGrid,
  Text,
  TextInput,
  ActionIcon,
  Loader,
} from '@mantine/core';
import ActionLogChatTimeline from './ActionLogChatTimeline';
import {
  getBUSection3Response,
  addBUSection3Response,
} from '../../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
import {
  getBUSection3ResponseSelector,
  addBUSection3ResponseSelector,
} from '../../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';

const AttemptSection3 = ({ scopeData, comments, existingValues }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { instance, accounts, inProgress } = useMsal();
  const { Formik } = formik;
  const [chatMessage, setChatMessage] = useState();
  const [chatMessageSaved, setChatMessageSaved] = useState(false);
  const [isNotificationChecked, setIsNotificationChecked] = useState(false);

  const section3Response = useSelector(getBUSection3ResponseSelector);
  const addBUSection3ResponseState = useSelector(addBUSection3ResponseSelector);

  // useEffect(() => {
  //   const payload = {
  //     assessment_id: scopeData?.id,
  //   };
  //   dispatch(getBUSection3Response(payload));
  // }, []);

  //console.log(section3Response?.data, '@@@@');
  const addChatMessageApi = () => {
    const payload = {
      id: scopeData?.id,
      chat: chatMessage,
    };
    //dispatch(addSection3Chat(payload))
    setChatMessageSaved(true);
    setChatMessage('');
  };

  var formdata = new FormData();

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

    //console.log(formdata, '@@@@');
    dispatch(addBUSection3Response(formdata));
    history.push('/');
  };

  return (
    <CollapseFrame title="Section 3 : RBA" active>
      <Formik
        enableReinitialize
        initialValues={{
          RBA_File: null,
          is_rba_applicable: 'Yes',
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
                            accept=".pdf"
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
                      {/* {existingValues?.is_rba_applicable === 'true' && (
                        <Row>
                          <Col>
                            <h5>RBA file attached by Disclosure Processor</h5>
                          </Col>
                          <Col>
                            <Button
                              startIcon={<PictureAsPdfIcon />}
                              onClick={() => {
                                const pdfUrl = existingValues?.rba_attachment_url;
                                window.open(pdfUrl, '_blank');
                              }}
                            >
                              RBA Attachment
                            </Button>
                          </Col>
                        </Row>
                      )} */}
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
                          comments={comments}
                          action_log_id={scopeData?.id}
                          chatMessageSaved={chatMessageSaved}
                          setChatMessageSaved={setChatMessageSaved}
                          //actionLogData={actionLogData}
                        />
                      </Row>
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
                          <Form.Control.Feedback type="invalid">
                            {errors.Comment}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                      {/* <Row>
                        <Col xl="9">
                          <TextInput
                            className="chat-input-section"
                            radius={'md'}
                            placeholder={`Enter a message`}
                            value={chatMessage}
                            onChange={(e) => {
                              setChatMessage(e.target.value);
                            }}
                            icon={<MessageOutlinedIcon size={14} />}
                            disabled={chatMessageSaved}
                            rightSection={
                              chatMessageSaved ? <Loader color={'yellow'} size="xs" /> : null
                            }
                            styles={{
                              //wrapper: { color: '#ffffff', background: 'rgba(140, 140, 140, 0.14)' },
                              defaultVariant: {
                                color: '#ffffff',
                                background: 'rgba(140, 140, 140, 0.14)',
                              },
                              invalid: { color: 'red' },
                              disabled: { color: 'red' },
                              //icon: { color: 'red' },
                              withIcon: { color: 'red' },
                              input: { color: 'red' },
                              rightSection: { color: 'red' },
                              root: { color: 'red' },
                              label: { color: 'red' },
                              error: { color: 'red' },
                              description: { color: 'red' },
                              required: { color: 'red' },
                            }}
                          />
                        </Col>

                        <Col xs="3" style={{ padding: '2 !important' }}>
                          <Group position="center">
                            <ActionIcon
                              variant="filled"
                              color={'yellow'}
                              radius="xl"
                              size="lg"
                              // disabled={!searchName}
                              onClick={() => {
                                addChatMessageApi();
                              }}
                              disabled={!chatMessage}
                            >
                              <SendIcon size={16} color="black" />
                            </ActionIcon>
                          </Group>
                        </Col>
                      </Row> */}
                    </>
                  )}
                  <Row className="section3-footer-action">
                    <div className="d-flex align-items-center justify-content-end">
                      <Button className="w-30" onClick={() => history.push('/')}>
                        Cancel
                      </Button>
                      <Button
                        color="neutral"
                        className="w-30"
                        id="submit-button"
                        onClick={handleSubmit}
                      >
                        Confirm
                      </Button>
                    </div>
                  </Row>
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

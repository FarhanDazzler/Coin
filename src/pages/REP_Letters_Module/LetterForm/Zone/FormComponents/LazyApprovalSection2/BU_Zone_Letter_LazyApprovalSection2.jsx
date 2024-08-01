import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { DotSpinner } from '@uiball/loaders';
import * as XLSX from 'xlsx';
import { compile, convert } from 'html-to-text';
import { Divider, Box } from '@mantine/core';
import { Form } from 'react-bootstrap';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import * as Yup from 'yup';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Container, Title, Text, Group, Stack } from '@mantine/core';
import { useFormikContext, Field, Formik, ErrorMessage } from 'formik';
import CryptoJS from 'crypto-js';
import CollapseFrame from '../../../../../../components/UI/CollapseFrame';
// import Button from '../../../../../../components/UI/Button';
import Button from '../../../../../MDM/MDM_Tab_Buttons/Button';
import PageWrapper from '../../../../../../components/wrappers/PageWrapper';
import Section0 from '../Section0';
import ReviewSection1 from '../ReviewResponseComponents/ReviewSection1';
import { getInstructions } from '../../../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
import { getInstructionsSelector } from '../../../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankSelector';
import {
  getBUZoneSubmitResponse,
  getBUZoneSection2SignatureResponseAction,
  addBUZoneSection2LazyApproval,
  clearGetBUZoneSection2SignatureResponseAction,
  getBUZoneScopeData,
  clearBUZoneScopeData,
  clearBUZoneSubmitResponse,
} from '../../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
import {
  getBUZoneSubmitResponseSelector,
  getBUZoneSection2SignatureResponseSelector,
  addBUZoneSection2LazyApprovalSelector,
  getBUZoneScopeDataSelector,
} from '../../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';
import '../../../LetterFormStyle.scss';
import useIPandGeoLocation from '../../../../../../hooks/useIPandGeoLocation';

const Section2 = ({ id }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { ipAddress, location } = useIPandGeoLocation();

  const { instance, accounts, inProgress } = useMsal();

  const getBUSection2SignatureResponseState = useSelector(
    getBUZoneSection2SignatureResponseSelector,
  );

  const [toggleData, setToggleData] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('selected_Role') === 'Head of Zone Control') {
      if (
        getBUSection2SignatureResponseState?.data?.signatures?.zc?.submitted === true &&
        getBUSection2SignatureResponseState?.data?.signatures?.zc?.finame === ''
      ) {
        setToggleData(true);
      } else {
        setToggleData(false);
      }
    }
    if (localStorage.getItem('selected_Role') === 'Excom Member') {
      if (
        getBUSection2SignatureResponseState?.data?.signatures?.exc?.submitted === true &&
        getBUSection2SignatureResponseState?.data?.signatures?.exc?.finame === ''
      ) {
        setToggleData(true);
      } else {
        setToggleData(false);
      }
    }
    if (localStorage.getItem('selected_Role') === 'Zone VP Finance') {
      if (
        getBUSection2SignatureResponseState?.data?.signatures?.zv?.submitted === true &&
        getBUSection2SignatureResponseState?.data?.signatures?.zv?.finame === ''
      ) {
        setToggleData(true);
      } else {
        setToggleData(false);
      }
    }
    if (localStorage.getItem('selected_Role') === 'Zone Legal Representative') {
      if (
        getBUSection2SignatureResponseState?.data?.signatures?.zlr?.submitted === true &&
        getBUSection2SignatureResponseState?.data?.signatures?.zlr?.finame === ''
      ) {
        setToggleData(true);
      } else {
        setToggleData(false);
      }
    }
  }, [
    getBUSection2SignatureResponseState?.data?.signatures?.zlr ||
      getBUSection2SignatureResponseState?.data?.signatures?.exc ||
      getBUSection2SignatureResponseState?.data?.signatures?.zc ||
      getBUSection2SignatureResponseState?.data?.signatures?.zv,
  ]);

  const handleAutoAuth = (value, resetForm) => {
    // // Retrieve the encrypted data from localStorage
    // const encryptedData = localStorage.getItem('encryptedData');

    // // Get the decryption key from environment variable
    // const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

    // // Decrypt the data
    // const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
    // const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);

    // // Extract the individual pieces of information
    // const [ip, city, region, country_name] = decryptedData.split(',');

    const payload = {
      id: id,
      comment: value.Comments,
      ip: ipAddress,
      location: !location.error
        ? `Latitude: ${location.coordinates.lat}, Longitude: ${location.coordinates.lng}`
        : location.error.message,
    };

    //console.log('payload', payload);
    dispatch(addBUZoneSection2LazyApproval(payload));
  };
  const getBUScopeDataState = useSelector(getBUZoneScopeDataSelector);

  const AutoAuth = () => {
    return (
      <div className="section2-form">
        <Formik
          enableReinitialize
          initialValues={{
            toggle: toggleData,
            Comments: '',
          }}
          validationSchema={Yup.object().shape({
            toggle: Yup.boolean().oneOf([true], 'You must accept to complete Authentication'),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
            try {
              handleAutoAuth(values);
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
              <Form.Group className="position-relative mb-3">
                <Form.Label className="mt-3">
                  <Field type="checkbox" name="toggle" />
                  <span>
                    &nbsp;&nbsp;I hereby certify that the above representation letter reflects my
                    understanding of the accuracy of the financial reporting package and the
                    effectiveness of the internal controls and financial reporting controls of{' '}
                    {getBUScopeDataState?.data?.Zone}. I hereby allow the capturing of the following
                    data in order to verify my identity: Location, Object Identifier, IP Address,
                    Email, Timestamp and Persona.
                  </span>
                  {/* <p>
                    with this selection, I agree to let COIN collect my information - (ie. Timestamp
                    & email adress) for authentication
                  </p> */}
                </Form.Label>
                <ErrorMessage name="toggle" component="div" className="error" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  placeholder="Comments"
                  required
                  onChange={handleChange}
                  isInvalid={!!errors.Comments}
                  maxLength={5001}
                  name="Comments"
                  value={values.Comments}
                  rows={3}
                />
              </Form.Group>

              <div className="footer-action">
                <div className="d-flex align-items-center justify-content-end">
                  <div>
                    <Button variant="outlined" color="secondary" onClick={() => history.push('/')}>
                      Cancel
                    </Button>
                    <Button
                      color="neutral"
                      className="ml-4"
                      onClick={handleSubmit}

                      //loading={values.toggle}
                    >
                      Confirm
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  };

  return (
    <div className="Rep-Letter-form-Section0">
      <CollapseFrame title="Section 2 : Signatures" active>
        <div className="renderBlockWrapper-rep-letter-form mt-5">
          <div className="renderBlockWrapper-control-actions-wrapper pb-5 pt-4">
            <div>
              <div className="renderBlockWrapper_content">
                <p>
                  Select the check-box below to provide your Signatures for the above filled
                  responses.
                </p>
              </div>
              {getBUSection2SignatureResponseState?.data?.signatures?.zlr?.submitted ||
              getBUSection2SignatureResponseState?.data?.signatures?.exc?.submitted ||
              getBUSection2SignatureResponseState?.data?.signatures?.zc?.submitted ||
              getBUSection2SignatureResponseState?.data?.signatures?.zv?.submitted ? (
                <>
                  <Divider
                    className="renderBlockWrapper_divider"
                    size="md"
                    my="xs"
                    labelPosition="center"
                  />
                  <div className="existing-attachment-review">
                    <p>
                      <b>Review Signed Responses</b>
                    </p>
                    <br />
                    <div className="row">
                      {getBUSection2SignatureResponseState?.data?.signatures?.zlr?.submitted &&
                      getBUSection2SignatureResponseState?.data?.signatures?.zlr?.finame ? (
                        <div className="col-lg-12">
                          <p>
                            <b>Zone Legal Representative</b>
                          </p>
                          <div className="rep-letter-form-bottom-btn">
                            <h5>
                              Approval Email attached by Processor For Zone Legal Representative
                            </h5>

                            <Button
                              startIcon={<PictureAsPdfIcon />}
                              onClick={() => {
                                const pdfUrl =
                                  getBUSection2SignatureResponseState?.data?.signatures?.zlr
                                    ?.sas_url;
                                window.open(pdfUrl, '_blank');
                              }}
                            >
                              Email Attachment
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {getBUSection2SignatureResponseState?.data?.signatures?.zlr?.submitted ===
                            true &&
                            getBUSection2SignatureResponseState?.data?.signatures?.zlr?.finame ===
                              '' && (
                              <div className="col-lg-12 auto-auth">
                                <p>
                                  <b>Zone Legal Representative</b>
                                </p>
                                <h5>Zone Legal Representative has Signed by Auto Authenticator</h5>
                                {getBUSection2SignatureResponseState?.data?.signatures?.zlr
                                  ?.comment && (
                                  <h6>
                                    <b>Comments:</b>{' '}
                                    {
                                      getBUSection2SignatureResponseState?.data?.signatures?.zlr
                                        ?.comment
                                    }
                                  </h6>
                                )}
                              </div>
                            )}
                        </>
                      )}
                      {getBUSection2SignatureResponseState?.data?.signatures?.zv?.submitted &&
                      getBUSection2SignatureResponseState?.data?.signatures?.zv?.finame ? (
                        <div className="col-lg-12">
                          <p>
                            <b>Zone VP Finance</b>
                          </p>
                          <div className="rep-letter-form-bottom-btn">
                            <h5>Approval Email attached by Processor For Zone VP Finance</h5>

                            <Button
                              startIcon={<PictureAsPdfIcon />}
                              onClick={() => {
                                const pdfUrl =
                                  getBUSection2SignatureResponseState?.data?.signatures?.zv
                                    ?.sas_url;
                                window.open(pdfUrl, '_blank');
                              }}
                            >
                              Email Attachment
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {getBUSection2SignatureResponseState?.data?.signatures?.zv?.submitted ===
                            true &&
                            getBUSection2SignatureResponseState?.data?.signatures?.zv?.finame ===
                              '' && (
                              <div className="col-lg-12 auto-auth">
                                <p>
                                  <b>Zone VP Finance</b>
                                </p>
                                <h5>Zone VP Finance has Signed by Auto Authenticator</h5>
                                {getBUSection2SignatureResponseState?.data?.signatures?.zv
                                  ?.comment && (
                                  <h6>
                                    <b>Comments:</b>{' '}
                                    {
                                      getBUSection2SignatureResponseState?.data?.signatures?.zv
                                        ?.comment
                                    }
                                  </h6>
                                )}
                              </div>
                            )}
                        </>
                      )}
                      {getBUSection2SignatureResponseState?.data?.signatures?.exc?.submitted &&
                      getBUSection2SignatureResponseState?.data?.signatures?.exc?.finame ? (
                        <div className="col-lg-12">
                          <p>
                            <b>Excom Member</b>
                          </p>
                          <div className="rep-letter-form-bottom-btn">
                            <h5>Approval Email attached by Processor For Excom Member</h5>

                            <Button
                              startIcon={<PictureAsPdfIcon />}
                              onClick={() => {
                                const pdfUrl =
                                  getBUSection2SignatureResponseState?.data?.signatures?.exc
                                    ?.sas_url;
                                window.open(pdfUrl, '_blank');
                              }}
                            >
                              Email Attachment
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {getBUSection2SignatureResponseState?.data?.signatures?.exc?.submitted ===
                            true &&
                            getBUSection2SignatureResponseState?.data?.signatures?.exc?.finame ===
                              '' && (
                              <div className="col-lg-12 auto-auth">
                                <p>
                                  <b>Excom Member</b>
                                </p>
                                <h5>Excom Member has Signed by Auto Authenticator</h5>
                                {getBUSection2SignatureResponseState?.data?.signatures?.exc
                                  ?.comment && (
                                  <h6>
                                    <b>Comments:</b>{' '}
                                    {
                                      getBUSection2SignatureResponseState?.data?.signatures?.exc
                                        ?.comment
                                    }
                                  </h6>
                                )}
                              </div>
                            )}
                        </>
                      )}
                      {getBUSection2SignatureResponseState?.data?.signatures?.zc?.submitted &&
                      getBUSection2SignatureResponseState?.data?.signatures?.zc?.finame ? (
                        <div className="col-lg-12">
                          <p>
                            <b>Head of Zone Control</b>
                          </p>
                          <div className="rep-letter-form-bottom-btn">
                            <h5>Approval Email attached by Processor For Head of Zone Control</h5>

                            <Button
                              startIcon={<PictureAsPdfIcon />}
                              onClick={() => {
                                const pdfUrl =
                                  getBUSection2SignatureResponseState?.data?.signatures?.zc
                                    ?.sas_url;
                                window.open(pdfUrl, '_blank');
                              }}
                            >
                              Email Attachment
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {getBUSection2SignatureResponseState?.data?.signatures?.zc?.submitted ===
                            true &&
                            getBUSection2SignatureResponseState?.data?.signatures?.zc?.finame ===
                              '' && (
                              <div className="col-lg-12 auto-auth">
                                <p>
                                  <b>Head of Zone Control</b>
                                </p>
                                <h5>Head of Zone Control has Signed by Auto Authenticator</h5>
                                {getBUSection2SignatureResponseState?.data?.signatures?.zc
                                  ?.comment && (
                                  <h6>
                                    <b>Comments:</b>{' '}
                                    {
                                      getBUSection2SignatureResponseState?.data?.signatures?.zc
                                        ?.comment
                                    }
                                  </h6>
                                )}
                              </div>
                            )}
                        </>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                ''
              )}

              <Divider
                className="renderBlockWrapper_divider"
                size="md"
                my="xs"
                labelPosition="center"
              />
              <div className="renderBlockWrapper_file">
                <AutoAuth />
              </div>
            </div>
          </div>

          <div id="lastShow" />
        </div>
      </CollapseFrame>
    </div>
  );
};

const ReviewSubmittedResponses = ({ scopeData, getBUSubmitResponseState }) => {
  const getBUScopeDataState = useSelector(getBUZoneScopeDataSelector);
  const exportResponseToExcel = (info, responses, Last_Saved_At) => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Create a worksheet for the info data
    const infoSheet = XLSX.utils.json_to_sheet([
      { Key: 'Title', Value: info.Title },
      { Key: 'Letter Type', Value: info.Letter_Type },
      { Key: 'Assessment Cycle', Value: info.Assessment_Cycle },
      { Key: 'Year', Value: info.Year },
      { Key: 'Zone', Value: info.Zone },
      { Key: 'BU', Value: info.BU },
      { Key: 'Entity', Value: info.Entity },
      { Key: 'Processor', Value: info.Disclosure_Processor },
      { Key: 'Zone Legal Representative', Value: info.Finance_Director },
      { Key: 'Excom Member', Value: info.BU_Head },
      { Key: 'Head of Zone Control', Value: info.Zone_Control },
      { Key: 'Zone VP Finance', Value: info.Zone_VP },
      { Key: 'Submitted on', Value: Last_Saved_At },
    ]);
    XLSX.utils.book_append_sheet(wb, infoSheet, 'Information');

    // Create a worksheet for the responses data with questionText converted to plain text
    const responsesSheet = XLSX.utils.json_to_sheet(
      responses.map((response) => ({
        'Question Number': response.questionNumber,
        'Question Text': convert(response.questionText),
        response: response.response,
        comment: response.comment,
        'Action plan due date - Month': response.month,
        'Action plan due date - Year': response.year,
      })),
    );
    XLSX.utils.book_append_sheet(wb, responsesSheet, 'Responses');

    // Save the workbook to an Excel file
    const fileName = `${scopeData?.Letter_Type} - ${scopeData?.Disclosure_Processor} - Submitted-Responses - ${scopeData?.Title} - ${scopeData?.Assessment_Cycle} - ${scopeData?.Year}`;
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <>
      <div>
        <div className="d-flex align-items-center" style={{ paddingTop: '14px' }}>
          <span className="review-response-page-title">Review Responses</span>
          <button
            className="export_excel_button"
            onClick={() => {
              const info = {
                Title: scopeData?.Title,
                Letter_Type: scopeData?.Letter_Type,
                Assessment_Cycle: scopeData?.Assessment_Cycle,
                Year: scopeData?.Year,
                Zone: scopeData?.Zone,
                BU: scopeData?.BU,
                Entity: scopeData?.Entity,
                Disclosure_Processor: scopeData?.Disclosure_Processor,
                Finance_Director: scopeData?.Finance_Director,
                BU_Head: scopeData?.BU_Head,
                Zone_Control: scopeData?.Zone_Control,
                Zone_VP: scopeData?.Zone_VP,
              };
              exportResponseToExcel(
                info,
                getBUSubmitResponseState?.data?.Latest_Response,
                getBUSubmitResponseState?.data?.Last_Saved_At,
              );
            }}
          >
            <strong>Export</strong>
          </button>
        </div>
      </div>
      <Section0 scopeData={getBUScopeDataState?.data} letterType="BU" isReview={true} />
      <ReviewSection1 submittedResponses={getBUSubmitResponseState?.data?.Latest_Response} />
    </>
  );
};

const SuccessDialog = () => {
  const history = useHistory();

  return (
    <div className="container py-5">
      <div>
        <Stack
          align="center"
          justify="center"
          spacing="sm"
          sx={(theme) => ({
            height: 300,
          })}
        >
          <Title className="golden-text">
            <CheckCircleOutlineIcon style={{ fontSize: 100, paddingRight: '5px' }} />
            Success
          </Title>
          <Text c="dimmed" size="lg" ta="center" style={{ fontSize: '26px', fontWeight: '600' }}>
            Thank you for signing the responses. Feel free to close this window now.
          </Text>
          <Group justify="center">
            <Button color="neutral" className="ml-4" onClick={() => history.push('/')}>
              Take me back to home page
            </Button>
          </Group>
        </Stack>
      </div>
    </div>
  );
};

const BU_Zone_Letter_LazyApprovalSection2 = () => {
  const { instance, accounts, inProgress } = useMsal();
  const dispatch = useDispatch();
  const { id } = useParams();
  const token = Cookies.get('token');
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const instructionState = useSelector(getInstructionsSelector);
  const getBUSubmitResponseState = useSelector(getBUZoneSubmitResponseSelector);
  const getBUSection2SignatureResponseState = useSelector(
    getBUZoneSection2SignatureResponseSelector,
  );
  const addBUSection2LazyApprovalState = useSelector(addBUZoneSection2LazyApprovalSelector);
  const getBUScopeDataState = useSelector(getBUZoneScopeDataSelector);

  useEffect(() => {
    if (token) {
      dispatch(
        getInstructions({
          module: 'BU',
        }),
      );

      const payloadForGettingScopeData = {
        id: id,
      };

      dispatch(getBUZoneScopeData(payloadForGettingScopeData));

      let payloadForGettingSubmittedResp = {
        assessment_id: id,
      };

      dispatch(getBUZoneSubmitResponse(payloadForGettingSubmittedResp));
      let payloadForBuSection2Response = {
        id: id,
      };
      dispatch(getBUZoneSection2SignatureResponseAction(payloadForBuSection2Response));
    }
  }, [token]);

  // logic to open success dialog box on successful submission of response
  useEffect(() => {
    if (addBUSection2LazyApprovalState.success) {
      setSuccessDialogOpen(true);
    }
  }, [addBUSection2LazyApprovalState]);

  // clear all the states on page leave or refresh page or change url path or change module or change role
  useEffect(() => {
    return () => {
      dispatch(clearBUZoneSubmitResponse());
      dispatch(clearGetBUZoneSection2SignatureResponseAction());
      dispatch(clearBUZoneScopeData());
    };
  }, []);

  return (
    <div>
      <PageWrapper>
        {successDialogOpen === false ? (
          <div className="container-fluid custom-scroll-page">
            {token?.length <= 0 ||
            instructionState.loading ||
            getBUScopeDataState.loading ||
            getBUSubmitResponseState.loading ||
            getBUSection2SignatureResponseState?.loading ? (
              <div className="loader-animation">
                <DotSpinner size={100} speed={0.9} color="#e3af32" />
                <p className="loader-Desc ml-3">
                  Please wait while we are Loading responses for you
                </p>
              </div>
            ) : addBUSection2LazyApprovalState?.loading ? (
              <div className="loader-animation">
                <DotSpinner size={100} speed={0.9} color="#e3af32" />
                <p className="loader-Desc ml-3">Please wait ...</p>
              </div>
            ) : (
              <div className="col-lg-12">
                <ReviewSubmittedResponses
                  scopeData={getBUScopeDataState?.data}
                  getBUSubmitResponseState={getBUSubmitResponseState}
                />
                <Section2 id={id} />
              </div>
            )}
          </div>
        ) : (
          <SuccessDialog />
        )}
      </PageWrapper>
    </div>
  );
};

export default BU_Zone_Letter_LazyApprovalSection2;

import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';
import { useDispatch, useSelector } from 'react-redux';
import { DotSpinner } from '@uiball/loaders';
import * as XLSX from 'xlsx';
import { compile, convert } from 'html-to-text';
import { Divider, Box } from '@mantine/core';
import { Form } from 'react-bootstrap';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import * as Yup from 'yup';
import { useFormikContext, Field, Formik } from 'formik';
import CollapseFrame from '../../../../../../components/UI/CollapseFrame';
// import Button from '../../../../../../components/UI/Button';
import Button from '../../../../../MDM/MDM_Tab_Buttons/Button';
import PageWrapper from '../../../../../../components/wrappers/PageWrapper';
import Section0 from '../Section0';
import ReviewSection1 from '../ReviewResponseComponents/ReviewSection1';
import { getInstructions } from '../../../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
import { getInstructionsSelector } from '../../../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankSelector';
import {
  getBUSubmitResponse,
  getBUSection2SignatureResponseAction,
  addBUSection2CheckboxAction,
} from '../../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
import {
  getBUSubmitResponseSelector,
  getBUSection2SignatureResponseSelector,
} from '../../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';
import '../../../LetterFormStyle.scss';

const Section2 = ({ id }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { instance, accounts, inProgress } = useMsal();

  const getBUSection2SignatureResponseState = useSelector(getBUSection2SignatureResponseSelector);

  const [toggleData, setToggleData] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('selected_Role') === 'Zone Control') {
      if (
        getBUSection2SignatureResponseState?.data?.signatures?.zc?.submitted === true &&
        getBUSection2SignatureResponseState?.data?.signatures?.zc?.finame === ''
      ) {
        setToggleData(true);
      } else {
        setToggleData(false);
      }
    }
    if (localStorage.getItem('selected_Role') === 'BU Head') {
      if (
        getBUSection2SignatureResponseState?.data?.signatures?.buh?.submitted === true &&
        getBUSection2SignatureResponseState?.data?.signatures?.buh?.finame === ''
      ) {
        setToggleData(true);
      } else {
        setToggleData(false);
      }
    }
    if (localStorage.getItem('selected_Role') === 'Zone VP') {
      if (
        getBUSection2SignatureResponseState?.data?.signatures?.zv?.submitted === true &&
        getBUSection2SignatureResponseState?.data?.signatures?.zv?.finame === ''
      ) {
        setToggleData(true);
      } else {
        setToggleData(false);
      }
    }
    if (localStorage.getItem('selected_Role') === 'Finance Director') {
      if (
        getBUSection2SignatureResponseState?.data?.signatures?.fd?.submitted === true &&
        getBUSection2SignatureResponseState?.data?.signatures?.fd?.finame === ''
      ) {
        setToggleData(true);
      } else {
        setToggleData(false);
      }
    }
  }, [
    getBUSection2SignatureResponseState?.data?.signatures?.fd ||
      getBUSection2SignatureResponseState?.data?.signatures?.buh ||
      getBUSection2SignatureResponseState?.data?.signatures?.zc ||
      getBUSection2SignatureResponseState?.data?.signatures?.zv,
  ]);

  const handleAutoAuth = (value, resetForm) => {
    const payload = {
      id: id,
      Email: accounts[0]?.username,
      oid: accounts[0]?.idTokenClaims.oid,
    };

    console.log('payload', payload);
    // dispatch(
    //   addBUSection2CheckboxAction({
    //     formData,
    //     event: {
    //       onSuccess: () => {
    //         resetForm();
    //       },
    //     },
    //   }),
    // );
  };

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
            toggle: Yup.string().required('Agree is required'),
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
                    &nbsp;&nbsp;I hereby declare, that the above responses are in alignment with the
                    business expectations
                  </span>
                  <p>
                    with this selection, I agree to let COIN collect my information - (ie. Timestamp
                    & email adress) for authentication
                  </p>
                </Form.Label>
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
                      disabled={!values.toggle}
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
        <div className="renderBlockWrapper mt-5">
          <div className="renderBlockWrapper-control-actions-wrapper pb-5 pt-4">
            <div>
              <div className="renderBlockWrapper_content">
                <p>
                  <b>
                    As a{' '}
                    {localStorage.getItem('selected_Role') === 'Disclosure Processor'
                      ? 'Disclosure Processor'
                      : `${localStorage.getItem('selected_Role')} - Signatory`}
                  </b>
                </p>
              </div>
              <div className="renderBlockWrapper_content">
                <>
                  <p>Choose your method of approval/authentication</p>
                  <ul>
                    <li>
                      Select the check-box below to provide your approval for the above filled
                      responses
                    </li>
                  </ul>
                </>
              </div>
              {getBUSection2SignatureResponseState?.data?.signatures?.fd?.submitted ||
              getBUSection2SignatureResponseState?.data?.signatures?.buh?.submitted ||
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
                      {getBUSection2SignatureResponseState?.data?.signatures?.fd?.submitted &&
                      getBUSection2SignatureResponseState?.data?.signatures?.fd?.finame ? (
                        <div className="col-lg-12">
                          <p>
                            <b>Finance Director</b>
                          </p>
                          <div className="rep-letter-form-bottom-btn">
                            <h5>
                              Approval Email attached by Disclosure Processor For Finance Director
                            </h5>

                            <Button
                              startIcon={<PictureAsPdfIcon />}
                              onClick={() => {
                                const pdfUrl =
                                  getBUSection2SignatureResponseState?.data?.signatures?.fd
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
                          {getBUSection2SignatureResponseState?.data?.signatures?.fd?.submitted ===
                            true &&
                            getBUSection2SignatureResponseState?.data?.signatures?.fd?.finame ===
                              '' && (
                              <div className="col-lg-12 auto-auth">
                                <p>
                                  <b>Finance Director</b>
                                </p>
                                <h5>Finance Director has Approved by Auto Authentication</h5>
                              </div>
                            )}
                        </>
                      )}
                      {getBUSection2SignatureResponseState?.data?.signatures?.zv?.submitted &&
                      getBUSection2SignatureResponseState?.data?.signatures?.zv?.finame ? (
                        <div className="col-lg-12">
                          <p>
                            <b>Zone VP</b>
                          </p>
                          <div className="rep-letter-form-bottom-btn">
                            <h5>Approval Email attached by Disclosure Processor For Zone VP</h5>

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
                                  <b>Zone VP</b>
                                </p>
                                <h5>Zone VP has Approved by Auto Authenticator</h5>
                              </div>
                            )}
                        </>
                      )}
                      {getBUSection2SignatureResponseState?.data?.signatures?.buh?.submitted &&
                      getBUSection2SignatureResponseState?.data?.signatures?.buh?.finame ? (
                        <div className="col-lg-12">
                          <p>
                            <b>BU Head</b>
                          </p>
                          <div className="rep-letter-form-bottom-btn">
                            <h5>Approval Email attached by Disclosure Processor For BU Head</h5>

                            <Button
                              startIcon={<PictureAsPdfIcon />}
                              onClick={() => {
                                const pdfUrl =
                                  getBUSection2SignatureResponseState?.data?.signatures?.buh
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
                          {getBUSection2SignatureResponseState?.data?.signatures?.buh?.submitted ===
                            true &&
                            getBUSection2SignatureResponseState?.data?.signatures?.buh?.finame ===
                              '' && (
                              <div className="col-lg-12 auto-auth">
                                <p>
                                  <b>BU Head</b>
                                </p>
                                <h5>BU Head has Approved by Auto Authenticator</h5>
                              </div>
                            )}
                        </>
                      )}
                      {getBUSection2SignatureResponseState?.data?.signatures?.zc?.submitted &&
                      getBUSection2SignatureResponseState?.data?.signatures?.zc?.finame ? (
                        <div className="col-lg-12">
                          <p>
                            <b>Zone Control</b>
                          </p>
                          <div className="rep-letter-form-bottom-btn">
                            <h5>
                              Approval Email attached by Disclosure Processor For Zone Control
                            </h5>

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
                                  <b>Zone Control</b>
                                </p>
                                <h5>Zone Control has Approved by Auto Authenticator</h5>
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
      { Key: 'Disclosure Processor', Value: info.Disclosure_Processor },
      { Key: 'Finance Director', Value: info.Finance_Director },
      { Key: 'BU Head', Value: info.BU_Head },
      { Key: 'Zone Control', Value: info.Zone_Control },
      { Key: 'Zone VP', Value: info.Zone_VP },
      { Key: 'Submitted on', Value: Last_Saved_At },
    ]);
    XLSX.utils.book_append_sheet(wb, infoSheet, 'Information');

    // Create a worksheet for the responses data with questionText converted to plain text
    const responsesSheet = XLSX.utils.json_to_sheet(
      responses.map((response) => ({
        questionNumber: response.questionNumber,
        questionText: convert(response.questionText),
        response: response.response,
        comment: response.comment,
        month: response.month,
        year: response.year,
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
      <Section0 scopeData={scopeData} letterType="BU" />
      <ReviewSection1 submittedResponses={getBUSubmitResponseState?.data?.Latest_Response} />
    </>
  );
};

const BU_Letter_LazyApprovalSection2 = () => {
  const dispatch = useDispatch();
  const scopeData = {};
  const { id } = useParams();

  const instructionState = useSelector(getInstructionsSelector);
  const getBUSubmitResponseState = useSelector(getBUSubmitResponseSelector);
  const getBUSection2SignatureResponseState = useSelector(getBUSection2SignatureResponseSelector);

  useEffect(() => {
    dispatch(
      getInstructions({
        module: 'BU',
      }),
    );

    let payloadForGettingSubmittedResp = {
      assessment_id: id,
    };

    dispatch(getBUSubmitResponse(payloadForGettingSubmittedResp));
    let payloadForBuSection2Response = {
      id: id,
    };
    dispatch(getBUSection2SignatureResponseAction(payloadForBuSection2Response));
  }, []);

  return (
    <div>
      <PageWrapper>
        <div className="container-fluid custom-scroll-page">
          {instructionState.loading ||
          getBUSubmitResponseState.loading ||
          getBUSection2SignatureResponseState?.loading ? (
            <div className="loader-animation">
              <DotSpinner size={100} speed={0.9} color="#e3af32" />
              <p className="loader-Desc ml-3">Please wait while we are Loading responses for you</p>
            </div>
          ) : (
            <div className="col-lg-12">
              <ReviewSubmittedResponses
                scopeData={scopeData}
                getBUSubmitResponseState={getBUSubmitResponseState}
              />
              <Section2 id={id} />
            </div>
          )}
        </div>
      </PageWrapper>
    </div>
  );
};

export default BU_Letter_LazyApprovalSection2;

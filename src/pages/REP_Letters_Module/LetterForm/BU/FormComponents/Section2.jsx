import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Box } from '@mantine/core';
import CollapseFrame from '../../../../../components/UI/CollapseFrame';
import Button from '../../../../MDM/MDM_Tab_Buttons/Button';
import { Form, Container, Row, Col, Card } from 'react-bootstrap';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import * as Yup from 'yup';
import { useFormikContext, Field, Formik } from 'formik';
import {
  getBUSection2SignatureResponseAction,
  addBUSection2CheckboxAction,
  addBUSection2UploadMailApprovalAction,
} from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
import {
  getBUSection2SignatureResponseSelector,
  addBUSection2CheckboxSelector,
  addBUSection2UploadMailApprovalSelector,
} from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';

const Section2 = ({ scopeData }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const getBUSection2SignatureResponseState = useSelector(getBUSection2SignatureResponseSelector);

  const [toggleData, setToggleData] = useState(false);

  // useEffect(() => {
  //   let payload = {
  //     id: scopeData.id,
  //   };
  //   dispatch(getBUSection2SignatureResponseAction(payload));
  // }, []);

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
    const formData = new FormData();
    let signatures = [];
    if (localStorage.getItem('selected_Role') === 'Zone Control') {
      signatures.push({
        role: 'ZC',
        type: 'checkbox',
      });
    }
    if (localStorage.getItem('selected_Role') === 'BU Head') {
      signatures.push({
        role: 'BUH',
        type: 'checkbox',
      });
    }
    if (localStorage.getItem('selected_Role') === 'Zone VP') {
      signatures.push({
        role: 'ZV',
        type: 'checkbox',
      });
    }
    if (localStorage.getItem('selected_Role') === 'Finance Director') {
      signatures.push({
        role: 'FD',
        type: 'checkbox',
      });
    }
    const data = JSON.stringify({
      assessment_id: scopeData.id,
      signatures: signatures,
    });
    formData.append('data', data);
    dispatch(
      addBUSection2CheckboxAction({
        formData,
        event: {
          onSuccess: () => {
            resetForm();
          },
        },
      }),
    );
    history.push('/');
  };

  const handleSave = (values, resetForm) => {
    const formData = new FormData();
    let signatures = [];

    if (
      !getBUSection2SignatureResponseState?.data?.signatures?.fd?.submitted &&
      values.FinanceDirectorSignature
    ) {
      formData.append('fd_support_doc', values.FinanceDirectorSignature);
      signatures.push({
        role: 'FD',
        type: 'support doc',
      });
    }

    if (
      !getBUSection2SignatureResponseState?.data?.signatures?.buh?.submitted &&
      values.BUHeadSignature
    ) {
      formData.append('buh_support_doc', values.BUHeadSignature);
      signatures.push({
        role: 'BUH',
        type: 'support doc',
      });
    }

    if (
      !getBUSection2SignatureResponseState?.data?.signatures?.zc?.submitted &&
      values.ZoneControlSignature
    ) {
      formData.append('zc_support_doc', values.ZoneControlSignature);
      signatures.push({
        role: 'ZC',
        type: 'support doc',
      });
    }

    if (
      !getBUSection2SignatureResponseState?.data?.signatures?.zv?.submitted &&
      values.ZoneVPSignature
    ) {
      formData.append('zv_support_doc', values.ZoneVPSignature);
      signatures.push({
        role: 'ZV',
        type: 'support doc',
      });
    }
    const data = JSON.stringify({
      assessment_id: scopeData.id,
      signatures: signatures,
    });
    formData.append('data', data);
    dispatch(
      addBUSection2UploadMailApprovalAction({
        formData,
        event: {
          onSuccess: () => {
            resetForm();
          },
        },
      }),
    );
    history.push('/');
  };

  const EmailAttachmentDiv = () => {
    return (
      <div className="section2-form">
        <Formik
          enableReinitialize
          initialValues={{
            FinanceDirectorSignature: '',
            BUHeadSignature: '',
            ZoneControlSignature: '',
            ZoneVPSignature: '',
          }}
          validationSchema={Yup.object().shape({
            // FinanceDirectorSignature: Yup.string().required('Attachment required'),
            // BUHeadSignature: Yup.string().required('Attachment required'),
            // ZoneControlSignature: Yup.string().required('Attachment required'),
            // ZoneVPSignature: Yup.string().required('Attachment required'),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
            try {
              handleSave(values, resetForm);
              //history.push('/master-data-management/mics-framework');
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
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-6">
                      <Form.Group className="position-relative mb-3">
                        <Form.Label className="mt-3">Finance Director :</Form.Label>
                        <Form.Control
                          type="file"
                          required
                          name="FinanceDirectorSignature"
                          //onChange={handleChange}
                          onChange={(event) => {
                            setFieldValue('FinanceDirectorSignature', event.currentTarget.files[0]);
                          }}
                          disabled={
                            getBUSection2SignatureResponseState?.data?.signatures?.fd?.submitted
                              ? true
                              : false
                          }
                          isInvalid={!!errors.FinanceDirectorSignature}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.FinanceDirectorSignature}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    <div className="col-lg-6">
                      <Form.Group className="position-relative mb-3">
                        <Form.Label className="mt-3">BU Head :</Form.Label>
                        <Form.Control
                          type="file"
                          required
                          name="BUHeadSignature"
                          //onChange={handleChange}
                          onChange={(event) => {
                            setFieldValue('BUHeadSignature', event.currentTarget.files[0]);
                          }}
                          disabled={
                            getBUSection2SignatureResponseState?.data?.signatures?.buh?.submitted
                              ? true
                              : false
                          }
                          isInvalid={!!errors.BUHeadSignature}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.BUHeadSignature}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    <div className="col-lg-6">
                      <Form.Group className="position-relative mb-3">
                        <Form.Label className="mt-3">Zone Control :</Form.Label>
                        <Form.Control
                          type="file"
                          required
                          name="ZoneControlSignature"
                          //onChange={handleChange}
                          onChange={(event) => {
                            setFieldValue('ZoneControlSignature', event.currentTarget.files[0]);
                          }}
                          disabled={
                            getBUSection2SignatureResponseState?.data?.signatures?.zc?.submitted
                              ? true
                              : false
                          }
                          isInvalid={!!errors.ZoneControlSignature}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.ZoneControlSignature}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    <div className="col-lg-6">
                      <Form.Group className="position-relative mb-3">
                        <Form.Label className="mt-3">Zone VP :</Form.Label>
                        <Form.Control
                          type="file"
                          required
                          name="ZoneVPSignature"
                          //onChange={handleChange}
                          onChange={(event) => {
                            setFieldValue('ZoneVPSignature', event.currentTarget.files[0]);
                          }}
                          disabled={
                            getBUSection2SignatureResponseState?.data?.signatures?.zv?.submitted
                              ? true
                              : false
                          }
                          isInvalid={!!errors.ZoneVPSignature}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.ZoneVPSignature}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </div>
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
                      //   loading={modifyInstructionVal.loading}
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

  const AutoAuth = () => {
    return (
      <div className="section2-form">
        <Formik
          enableReinitialize
          initialValues={{
            toggle: toggleData,
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
                      //disable={values.toggle.toString()}
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
                {localStorage.getItem('selected_Role') === 'Disclosure Processor' ? (
                  <>
                    <p>Upload the approval email from the respective signatories/authenticators</p>
                  </>
                ) : (
                  <>
                    <p>Choose your method of approval/authentication</p>
                    <ul>
                      <li>
                        Select the check-box below to provide your approval for the above filled
                        responses
                      </li>
                    </ul>
                  </>
                )}
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
                <div>
                  {localStorage.getItem('selected_Role') === 'Disclosure Processor' ? (
                    <EmailAttachmentDiv />
                  ) : (
                    <AutoAuth />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div id="lastShow" />
        </div>
      </CollapseFrame>
    </div>
  );
};

export default Section2;

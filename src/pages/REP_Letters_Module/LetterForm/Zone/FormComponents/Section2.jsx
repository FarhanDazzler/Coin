import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Box } from '@mantine/core';
import CollapseFrame from '../../../../../components/UI/CollapseFrame';
import Button from '../../../../MDM/MDM_Tab_Buttons/Button';
import { Form } from 'react-bootstrap';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import * as Yup from 'yup';
import { Field, Formik, ErrorMessage } from 'formik';
import {
  addBUZoneSection2CheckboxAction,
  addBUZoneSection2UploadMailApprovalAction,
} from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
import {
  getBUZoneScopeDataSelector,
  getBUZoneSection2SignatureResponseSelector,
} from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';
import useIPandGeoLocation from '../../../../../hooks/useIPandGeoLocation';

const Section2 = ({ scopeData }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { ipAddress, location } = useIPandGeoLocation();

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
    const formData = new FormData();
    let signatures = [];

    // // Retrieve the encrypted data from localStorage
    // const encryptedData = localStorage.getItem('encryptedData');

    // // Get the decryption key from environment variable
    // const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

    // // Decrypt the data
    // const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
    // const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);

    // // Extract the individual pieces of information
    // const [ip, city, region, country_name] = decryptedData.split(',');

    if (localStorage.getItem('selected_Role') === 'Head of Zone Control') {
      signatures.push({
        role: 'ZC',
        type: 'checkbox',
        comment: value.Comments,
        ip: ipAddress,
        location: !location.error
          ? `Latitude: ${location.coordinates.lat}, Longitude: ${location.coordinates.lng}`
          : location.error.message,
      });
    }
    if (localStorage.getItem('selected_Role') === 'Excom Member') {
      signatures.push({
        role: 'EXC',
        type: 'checkbox',
        comment: value.Comments,
        ip: ipAddress,
        location: !location.error
          ? `Latitude: ${location.coordinates.lat}, Longitude: ${location.coordinates.lng}`
          : location.error.message,
      });
    }
    if (localStorage.getItem('selected_Role') === 'Zone VP Finance') {
      signatures.push({
        role: 'ZV',
        type: 'checkbox',
        comment: value.Comments,
        ip: ipAddress,
        location: !location.error
          ? `Latitude: ${location.coordinates.lat}, Longitude: ${location.coordinates.lng}`
          : location.error.message,
      });
    }
    if (localStorage.getItem('selected_Role') === 'Zone Legal Representative') {
      signatures.push({
        role: 'ZLR',
        type: 'checkbox',
        comment: value.Comments,
        ip: ipAddress,
        location: !location.error
          ? `Latitude: ${location.coordinates.lat}, Longitude: ${location.coordinates.lng}`
          : location.error.message,
      });
    }
    const data = JSON.stringify({
      assessment_id: scopeData.id,
      signatures: signatures,
    });
    formData.append('data', data);
    dispatch(
      addBUZoneSection2CheckboxAction({
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

    // // Retrieve the encrypted data from localStorage
    // const encryptedData = localStorage.getItem('encryptedData');

    // // Get the decryption key from environment variable
    // const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

    // // Decrypt the data
    // const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, encryptionKey);
    // const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);

    // // Extract the individual pieces of information
    // const [ip, city, region, country_name] = decryptedData.split(',');

    if (
      !getBUSection2SignatureResponseState?.data?.signatures?.zlr?.submitted &&
      values.ZoneLegalRepresentativeSignature
    ) {
      formData.append('zlr_support_doc', values.ZoneLegalRepresentativeSignature);
      signatures.push({
        role: 'ZLR',
        type: 'support doc',
        ip: ipAddress,
        location: !location.error
          ? `Latitude: ${location.coordinates.lat}, Longitude: ${location.coordinates.lng}`
          : location.error.message,
      });
    }

    if (
      !getBUSection2SignatureResponseState?.data?.signatures?.exc?.submitted &&
      values.ExcomMemberSignature
    ) {
      formData.append('exc_support_doc', values.ExcomMemberSignature);
      signatures.push({
        role: 'EXC',
        type: 'support doc',
        ip: ipAddress,
        location: !location.error
          ? `Latitude: ${location.coordinates.lat}, Longitude: ${location.coordinates.lng}`
          : location.error.message,
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
        ip: ipAddress,
        location: !location.error
          ? `Latitude: ${location.coordinates.lat}, Longitude: ${location.coordinates.lng}`
          : location.error.message,
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
        ip: ipAddress,
        location: !location.error
          ? `Latitude: ${location.coordinates.lat}, Longitude: ${location.coordinates.lng}`
          : location.error.message,
      });
    }
    const data = JSON.stringify({
      assessment_id: scopeData.id,
      signatures: signatures,
    });
    formData.append('data', data);
    dispatch(
      addBUZoneSection2UploadMailApprovalAction({
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
            ZoneLegalRepresentativeSignature: '',
            ExcomMemberSignature: '',
            ZoneControlSignature: '',
            ZoneVPSignature: '',
          }}
          validationSchema={Yup.object().shape({
            // ZoneLegalRepresentativeSignature: Yup.string().required('Attachment required'),
            // ExcomMemberSignature: Yup.string().required('Attachment required'),
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
                        <Form.Label className="mt-3">Zone Legal Representative :</Form.Label>
                        <Form.Control
                          type="file"
                          required
                          name="ZoneLegalRepresentativeSignature"
                          //onChange={handleChange}
                          accept="application/vnd.ms-outlook, .eml, .msg"
                          onChange={(event) => {
                            setFieldValue(
                              'ZoneLegalRepresentativeSignature',
                              event.currentTarget.files[0],
                            );
                          }}
                          disabled={
                            getBUSection2SignatureResponseState?.data?.signatures?.zlr?.submitted
                              ? true
                              : false
                          }
                          isInvalid={!!errors.ZoneLegalRepresentativeSignature}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.ZoneLegalRepresentativeSignature}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    <div className="col-lg-6">
                      <Form.Group className="position-relative mb-3">
                        <Form.Label className="mt-3">Excom Member :</Form.Label>
                        <Form.Control
                          type="file"
                          required
                          name="ExcomMemberSignature"
                          //onChange={handleChange}
                          accept="application/vnd.ms-outlook, .eml, .msg"
                          onChange={(event) => {
                            setFieldValue('ExcomMemberSignature', event.currentTarget.files[0]);
                          }}
                          disabled={
                            getBUSection2SignatureResponseState?.data?.signatures?.exc?.submitted
                              ? true
                              : false
                          }
                          isInvalid={!!errors.ExcomMemberSignature}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.ExcomMemberSignature}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    <div className="col-lg-6">
                      <Form.Group className="position-relative mb-3">
                        <Form.Label className="mt-3">Head of Zone Control :</Form.Label>
                        <Form.Control
                          type="file"
                          required
                          name="ZoneControlSignature"
                          //onChange={handleChange}
                          accept="application/vnd.ms-outlook, .eml, .msg"
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
                        <Form.Label className="mt-3">Zone VP Finance :</Form.Label>
                        <Form.Control
                          type="file"
                          required
                          name="ZoneVPSignature"
                          //onChange={handleChange}
                          accept="application/vnd.ms-outlook, .eml, .msg"
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
                  <b>
                    As a{' '}
                    {localStorage.getItem('selected_Role') === 'Processor'
                      ? 'Processor'
                      : `${localStorage.getItem('selected_Role')} - Signatory`}
                  </b>
                </p>
              </div>
              <div className="renderBlockWrapper_content">
                {localStorage.getItem('selected_Role') === 'Processor' ? (
                  <>
                    <p>Upload the approval email from the respective signatories/authenticators</p>
                  </>
                ) : (
                  <p>
                    Select the check-box below to provide your signature for the above filled
                    responses
                  </p>
                )}
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
                <div>
                  {localStorage.getItem('selected_Role') === 'Processor' ? (
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

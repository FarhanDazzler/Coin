import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Box } from '@mantine/core';
import CollapseFrame from '../../../../../components/UI/CollapseFrame';
import Button from '../../../../MDM/MDM_Tab_Buttons/Button';
import { Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormikContext, Field, Formik } from 'formik';

const Section2 = ({ scopeData, letterType }) => {
  const dispatch = useDispatch();
  const [ShowVideoModal, setShowVideoModal] = useState(false);
  const [activeTab, setActiveTab] = useState('testt');
  const SignatoryList = [
    { label: 'BU Head', value: 'BU Head' },
    { label: 'Zone Control', value: 'Zone Control' },
    { label: 'Zone VP', value: 'Zone VP' },
    { label: 'Finance Director', value: 'Finance Director' },
  ];
  var formdata = new FormData();

  const handleSave = (value, resetForm) => {
    console.log('values', value);
  };

  const EmailAttachmentDiv = () => {
    return (
      <div className="section2-form">
        <Formik
          enableReinitialize
          initialValues={{
            FinanceDirectorSignature: "",
            BUHeadSignature: "",
            ZoneControlSignature: "",
            ZoneVPSignature: "",
          }}
          validationSchema={Yup.object().shape({
            FinanceDirectorSignature: Yup.string().required('Attachment required'),
            BUHeadSignature: Yup.string().required('Attachment required'),
            ZoneControlSignature: Yup.string().required('Attachment required'),
            ZoneVPSignature: Yup.string().required('Attachment required'),
           
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
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        //setShowModal(false);
                      }}
                    >
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
            toggle: false,
          }}
          validationSchema={Yup.object().shape({
            //toggle: Yup.string().required('Agree is required'),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
            try {
              handleSave(values);
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
              <Form.Group className="position-relative mb-3">
                <Form.Label className="mt-3">
                  <Field type="checkbox" name="toggle" />
                  <span>
                    &nbsp;&nbsp;I hereby declare, that the above responses are in alignment with the business expectations
                  </span>
                  <p><i>with this selection, I agree to let COIN collect my information - (ie. Timestamp & email adress) for authentication</i></p>
                </Form.Label>
              </Form.Group>

              <div className="footer-action">
                <div className="d-flex align-items-center justify-content-end">
                  <div>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        //setShowModal(false);
                      }}
                    >
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
                    As a {activeTab === 'test' ? 'Disclosure Processor' : `${localStorage.getItem('selected_Role')} - Signatory`}
                  </b>
                </p>
              </div>
              <div className="renderBlockWrapper_content">
                {activeTab === 'test' ? (
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
              <Divider
                className="renderBlockWrapper_divider"
                size="md"
                my="xs"
                labelPosition="center"
              />
              <div className="renderBlockWrapper_file">
                <div>{activeTab === 'test' ? <EmailAttachmentDiv /> : <AutoAuth />}</div>
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

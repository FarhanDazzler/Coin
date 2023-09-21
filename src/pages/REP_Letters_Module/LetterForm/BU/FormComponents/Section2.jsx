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
  const [activeTab, setActiveTab] = useState('test');
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
            toggle: false,
          }}
          validationSchema={Yup.object().shape({
            isFileAttached: Yup.string().required('Please select to upload Files?'),
            Signature: Yup.mixed().when('isFileAttached', {
              is: (value) => ['Opening'].includes(value),
              then: Yup.mixed().required('Email Attachment required'),
            }),
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
                    <div className="col-lg-4">
                      <Form.Group className="position-relative mb-3">
                        <Form.Label className="mt-3">Select Signatory :</Form.Label>
                        <Form.Control
                          as="select"
                          name="isFileAttached"
                          placeholder=""
                          value={values.isFileAttached}
                          isInvalid={!!errors.isFileAttached}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          readOnly={false}
                          className="form-select"
                        >
                          <option value="">Select</option>
                          {SignatoryList.map((data, i) => (
                            <option key={i} value={data.value}>
                              {data.label}
                            </option>
                          ))}
                        </Form.Control>

                        <Form.Control.Feedback type="invalid">
                          {errors.isFileAttached}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    {values.isFileAttached && (
                      <div className="col-lg-4">
                        <Form.Group className="position-relative mb-3">
                          <Form.Label className="mt-3">Email Attachment :</Form.Label>
                          <Form.Control
                            type="file"
                            required
                            name="Signature"
                            //onChange={handleChange}
                            onChange={(event) => {
                              setFieldValue('Signature', event.currentTarget.files[0]);
                            }}
                            isInvalid={!!errors.Signature}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.Signature}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                    )}
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
                    &nbsp;&nbsp;I Agree to let COIN collect the exact timestamp of submission for
                    authentication
                  </span>
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
                  <b>Select how Finance Director will provide signature.</b>
                </p>
              </div>
              <div className="renderBlockWrapper_content">
                <p>
                  In case of wet signature, use below button for signature & signing date to attach
                  signed PDF.
                </p>
                <p>
                  In case of signature email, attach the email containing the signature to this PDF.
                </p>
              </div>
              <Divider
                className="renderBlockWrapper_divider"
                size="md"
                my="xs"
                labelPosition="center"
              />
              <div className="renderBlockWrapper_file">
                <div>{activeTab !== 'test' ? <EmailAttachmentDiv /> : <AutoAuth />}</div>
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

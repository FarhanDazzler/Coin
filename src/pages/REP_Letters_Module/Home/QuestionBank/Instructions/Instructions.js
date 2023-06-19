import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { useFormikContext, Formik } from 'formik';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../RepLetterQuestionBank.scss';
import Button from '../../../../MDM/MDM_Tab_Buttons/Button';
import { TextEditor } from '../../../../../components/FormInputs/RichTextEditor/RichTextEditor';
import { Divider, Box } from '@mantine/core';
import DescriptionIcon from '@mui/icons-material/Description';
import PageWrapper from '../../../../../components/wrappers/PageWrapper';

const Instructions = ({ setShowModal, editTableData, modalType }) => {
  // Access passed props from location.state

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSave = (value) => {
    let payload = {
      Module: modalType,
      id: editTableData?.id,
      Instructions: value.Instructions,
      URL: value.URL,
    };
    console.log(payload, 'payload');

    //dispatch(addMicsFramework(payload));
  };

  return (
    <div className="p-5">
      <Formik
        enableReinitialize
        initialValues={{
          Instructions: editTableData?.Instructions || '',
          URL: editTableData?.URL || '',
        }}
        validationSchema={Yup.object().shape({
          Instructions: Yup.string().required('Instructions is required'),
          URL: Yup.string().required('Instructions Video URL is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            handleSave(values);
            resetForm();
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
              {/*Rich text Editor call*/}
              <div className="col-lg-12">
                <div className="row mb-8">
                  <Form.Label className="mt-5">Instructions :</Form.Label>

                  <TextEditor
                    setFieldValue={(val) => setFieldValue('Instructions', val)}
                    value={values.Instructions}
                  />
                  {values.Instructions.length > 5000 && (
                    <span className="error">
                      Instructions are not allowed more than 5000 characters
                    </span>
                  )}
                </div>
              </div>

              <div className="col-lg-12">
                <div className="row mb-4">
                  <div className="col-lg-2">
                    <Form.Label className="mt-2">Video URL :</Form.Label>
                  </div>
                  <div className="col-lg-10">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        type="text"
                        name="URL"
                        placeholder=""
                        value={values.URL}
                        isInvalid={Boolean(touched.URL && errors.URL)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        maxLength={5000}
                        readOnly={false}
                        className="form-control"
                      />

                      {!!touched.URL && (
                        <Form.Control.Feedback type="invalid">{errors.URL}</Form.Control.Feedback>
                      )}
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
                      setShowModal(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button color="neutral" className="ml-4" onClick={handleSubmit}>
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

export default Instructions;

import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../../../../../components/UI/Button';

const AddNewQuestionModal = ({ setShowModal, modalType }) => {
  const dispatch = useDispatch();

  return (
    <div className="p-5">
      <Formik
        initialValues={{ questionText: '' }}
        validationSchema={Yup.object().shape({
          questionText: Yup.string().required('Question text is required'),
        })}
        onSubmit={(values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            const payload = {
              module: modalType,
              questionText: values.questionText,
            };
            console.log(payload, 'payload');
            // dispatch(addMicsFramework(payload));
          } catch (error) {
            const message = error.message || 'Something went wrong';
            setStatus({ success: false });
            setErrors({ submit: message });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="row">
              <div className="col-lg-12">
                <div className="row mb-4">
                  <div className="col-lg-5">
                    <label htmlFor="questionText">Question Text :</label>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-lg-12">
                    <div className="input-group mb-3">
                      <Field
                        type="text"
                        name="questionText"
                        placeholder=""
                        maxLength={5000}
                        className={`form-control ${
                          touched.questionText && errors.questionText ? 'is-invalid' : ''
                        }`}
                      />
                      <ErrorMessage
                        name="questionText"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer-action">
              <div className="d-flex align-items-center justify-content-end">
                <div>
                  <Button variant="outlined" color="secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" color="neutral" className="ml-4">
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

export default AddNewQuestionModal;

import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormikContext, Formik, Field } from 'formik';
import { Alert, Form } from 'react-bootstrap';
import Button from '../../../MDM_Tab_Buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import '../TableStyle.scss';
// for Updating data
import {
  getAllProviderEntities,
  assignApplicabilityAndAssignmentOfProviderOrganization,
} from '../../../../../redux/MDM/MDM_Action';
import moment from 'moment';

const GetFormikFieldValue = () => {
  // Grab values and submitForm from context
  const dispatch = useDispatch();
  const { values } = useFormikContext();
  useEffect(() => {
    dispatch(getAllProviderEntities());
  }, [values]);
  return null;
};

const GlobalApprove = ({ setShowGlobalApproveModal, assignTableData }) => {
  const dispatch = useDispatch();

  const handleSaveAssign = (value) => {
    const newState = assignTableData.map((obj) => {
      return {
        ...obj,
        Global_Approved: value.Global_Approved,
      };
    });
    //console.log(newState);
    const payload = {
      receivers: newState,
    };
    console.log(payload, 'payload');
    dispatch(assignApplicabilityAndAssignmentOfProviderOrganization(payload));
  };

  return (
    <>
      <div className="p-5 assign-modal">
        <Formik
          enableReinitialize
          initialValues={{
            Global_Approved: '',
          }}
          validationSchema={Yup.object().shape({
            Global_Approved: Yup.string().required('Global Approved is required'),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
            try {
              handleSaveAssign(values);

              // resetForm();
            } catch (error) {
              const message = error.message || 'Something went wrong';
              setStatus({ success: false });
              setErrors({ submit: message });
              setSubmitting(false);
            }
          }}
        >
          {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
            <>
              <Form onSubmit={handleSubmit}>
                <Form.Label>Selected Control Id:</Form.Label>
                <div className="MDM-assign-pop">
                  {assignTableData.map((data, i) => (
                    <div className="row">
                      <div>
                        <p style={{ margin: '2px' }}>{data?.Entity_Control_ID_IsApplicable}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="row">
                  <div className="col-lg-6">
                    <div className="row mb-4">
                      <div className="col-lg-5">
                        <Form.Label>Global Approval</Form.Label>
                      </div>
                      <div className="col-lg-7">
                        <Form.Group className="input-group mb-3">
                          <Form.Control
                            as="select"
                            name="Global_Approved"
                            placeholder=""
                            value={values.Global_Approved}
                            isInvalid={Boolean(touched.Global_Approved && errors.Global_Approved)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            disabled={false}
                            className="form-select"
                          >
                            <option value="">Global Approved ?</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </Form.Control>

                          {!!touched.Global_Approved && (
                            <Form.Control.Feedback type="invalid">
                              {errors.Global_Approved}
                            </Form.Control.Feedback>
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
                          setShowGlobalApproveModal(false);
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
                <GetFormikFieldValue />
              </Form>
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

export default GlobalApprove;

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

const EditModal = ({ setShowEditModal, assignTableData }) => {
  const dispatch = useDispatch();

  const handleSaveAssign = (value) => {
    console.log(value);
    const newState = assignTableData.map((obj) => {
     let updateObj={...obj}

      if (value.is_FSI_Entity !== '') {
        console.log("value.is_FSI_Entity", value.is_FSI_Entity)
        updateObj.is_FSI_Entity= value.is_FSI_Entity
        // return { ...obj, is_FSI_Entity: value.is_FSI_Entity };
      }

      if (value.is_SOX_scope !== '') {
        updateObj.is_SOX_scope= value.is_SOX_scope 
        // return { ...obj, is_SOX_scope: value.is_SOX_scope };
      }

      if (value.Entity_Weight !== '') {
        updateObj. Entity_Weight= value.Entity_Weight
        // return { ...obj, Entity_Weight: value.Entity_Weight };
      }
      console.log("update obj",updateObj);
      return { ...updateObj };
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
            //Entity_Weight: '',
            is_SOX_scope: '',
            is_FSI_Entity: '',
          }}
          validationSchema={Yup.object().shape({})}
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
                  {/*  <div className="col-lg-6">
                    <div className="row mb-4">
                      <div className="col-lg-5">
                        <Form.Label>Entity Weight</Form.Label>
                      </div>
                      <div className="col-lg-7">
                        <Form.Group className="input-group mb-3">
                          <Form.Control
                            type="number"
                            name="Entity_Weight"
                            placeholder=""
                            value={values.Entity_Weight}
                            isInvalid={Boolean(touched.Entity_Weight && errors.Entity_Weight)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            readOnly={false}
                            className="form-control"
                          />

                          {!!touched.Entity_Weight && (
                            <Form.Control.Feedback type="invalid">
                              {errors.Entity_Weight}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                  */}

                  <div className="col-lg-6">
                    <div className="row mb-4">
                      <div className="col-lg-5">
                        <Form.Label>Is SOX?</Form.Label>
                      </div>
                      <div className="col-lg-7">
                        <Form.Group className="input-group mb-3">
                          <Form.Control
                            as="select"
                            name="is_SOX_scope"
                            placeholder=""
                            value={values.is_SOX_scope}
                            isInvalid={Boolean(touched.is_SOX_scope && errors.is_SOX_scope)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            readOnly={false}
                            className="form-select"
                          >
                            <option value="">Select Option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </Form.Control>

                          {!!touched.is_SOX_scope && (
                            <Form.Control.Feedback type="invalid">
                              {errors.is_SOX_scope}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="row mb-4">
                      <div className="col-lg-5">
                        <Form.Label>IS FSI Entity?</Form.Label>
                      </div>
                      <div className="col-lg-7">
                        <Form.Group className="input-group mb-3">
                          <Form.Control
                            as="select"
                            name="is_FSI_Entity"
                            placeholder=""
                            value={values.is_FSI_Entity}
                            isInvalid={Boolean(touched.is_FSI_Entity && errors.is_FSI_Entity)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            readOnly={false}
                            className="form-select"
                          >
                            <option value="">Select Option</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </Form.Control>

                          {!!touched.is_FSI_Entity && (
                            <Form.Control.Feedback type="invalid">
                              {errors.is_FSI_Entity}
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
                          setShowEditModal(false);
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

export default EditModal;

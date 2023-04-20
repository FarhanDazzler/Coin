import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormikContext, Formik, Field } from 'formik';
import { Alert, Form } from 'react-bootstrap';
import Button from '../../../MDM_Tab_Buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import '../TableStyle.scss';
import { getAllProviderEntitiesSelector } from '../../../../../redux/MDM/MDM_Selectors';
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

const AssignModal = ({ setShowModal, assignTableData }) => {
  const dispatch = useDispatch();
  const getAllProviderEntitiesState = useSelector(getAllProviderEntitiesSelector);

  const handleSaveAssign = (value) => {
    const newState = assignTableData.map((obj) => {
      return {
        ...obj,
        Is_applicable: value.Is_applicable,
        Provider_Entity: value.Provider_Entity,
        Reason_for_NA: value.Reason_for_NA,
        Global_Approved: value.Global_Approved,
        Entity_Weight: value.Entity_Weight,
        is_SOX_scope: value.is_SOX_scope,
        is_FSI_Entity: value.is_FSI_Entity,
        Valid_to: value.Valid_to,
        Valid_from: value.Valid_from,
      };
    });
    //console.log(newState);
    const payload = {
      receivers: newState,
    };
    console.log(payload, 'payload');
    dispatch(assignApplicabilityAndAssignmentOfProviderOrganization(payload));
  };
  let today = moment().format('YYYY-MM-DD');
  let validToDate = '9999-12-31';
  return (
    <>
      <div className="p-5 assign-modal">
        <Formik
          enableReinitialize
          initialValues={{
            Is_applicable: '',
            Provider_Entity: '',
            Reason_for_NA: '',
            Global_Approved: '',
            Entity_Weight: '',
            is_SOX_scope: '',
            is_FSI_Entity: '',
            Valid_from: today ? today : '',
            Valid_to: validToDate ? validToDate : '',
          }}
          validationSchema={Yup.object().shape({
            Is_applicable: Yup.string().required('Applicability is required'),
            Provider_Entity: Yup.string().when('Is_applicable', {
              is: 'Yes',
              then: Yup.string().required('Provider Organization is required'),
            }),
            Reason_for_NA: Yup.string().when('Is_applicable', {
              is: 'No',
              then: Yup.string().required('Reason for NA is required'),
            }),
            Global_Approved: Yup.string().when('Is_applicable', {
              is: 'No',
              then: Yup.string().required('Global Approved is required'),
            }),
            Valid_from: Yup.string().required('Valid From Date is required'),
            Valid_to: Yup.string().required('Valid To Date is required'),
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
                        <Form.Label>Applicability</Form.Label>
                      </div>
                      <div className="col-lg-7">
                        <Form.Group className="input-group mb-3">
                          <Form.Control
                            as="select"
                            name="Is_applicable"
                            placeholder=""
                            value={values.Is_applicable}
                            isInvalid={Boolean(touched.Is_applicable && errors.Is_applicable)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            readOnly={false}
                            className="form-select"
                          >
                            <option value="">Select Applicability</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </Form.Control>

                          {!!touched.Is_applicable && (
                            <Form.Control.Feedback type="invalid">
                              {errors.Is_applicable}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="row mb-4">
                      <div className="col-lg-5">
                        <Form.Label>Provider Organization</Form.Label>
                      </div>
                      <div className="col-lg-7">
                        <Form.Group className="input-group mb-3">
                          <Form.Control
                            as="select"
                            name="Provider_Entity"
                            placeholder=""
                            value={values.Provider_Entity}
                            isInvalid={Boolean(touched.Provider_Entity && errors.Provider_Entity)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            disabled={values.Is_applicable === 'Yes' ? false : true}
                            className="form-select"
                          >
                            <option value="">Select Provider Organization</option>
                            {getAllProviderEntitiesState?.data.map((data, i) => (
                              <option key={i} value={data.Org_name}>
                                {data.Org_name}
                              </option>
                            ))}
                          </Form.Control>

                          {!!touched.Provider_Entity && (
                            <Form.Control.Feedback type="invalid">
                              {errors.Provider_Entity}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="row mb-4">
                      <div className="col-lg-5">
                        <Form.Label>Reason for NA</Form.Label>
                      </div>
                      <div className="col-lg-7">
                        <Form.Group className="input-group mb-3">
                          <Form.Control
                            type="text"
                            name="Reason_for_NA"
                            placeholder=""
                            value={values.Reason_for_NA}
                            isInvalid={Boolean(touched.Reason_for_NA && errors.Reason_for_NA)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            readOnly={values.Is_applicable === 'No' ? false : true}
                            className="form-control"
                          />

                          {!!touched.Reason_for_NA && (
                            <Form.Control.Feedback type="invalid">
                              {errors.Reason_for_NA}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                  </div>

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
                            disabled={values.Is_applicable === 'No' ? false : true}
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

                  <div className="col-lg-6">
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

                  <div className="col-lg-6">
                    <div className="row mb-4">
                      <div className="col-lg-5">
                        <Form.Label>Valid From</Form.Label>
                      </div>
                      <div className="col-lg-7">
                        <Form.Group className="input-group mb-3">
                          <Form.Control
                            type="date"
                            name="Valid_from"
                            placeholder=""
                            value={values.Valid_from}
                            isInvalid={Boolean(touched.Valid_from && errors.Valid_from)}
                            min={today}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            readOnly={false}
                            className="form-control"
                          />

                          {!!touched.Valid_from && (
                            <Form.Control.Feedback type="invalid">
                              {errors.Valid_from}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="row mb-4">
                      <div className="col-lg-5">
                        <Form.Label>Valid To</Form.Label>
                      </div>
                      <div className="col-lg-7">
                        <Form.Group className="input-group mb-3">
                          <Form.Control
                            type="date"
                            name="Valid_to"
                            placeholder=""
                            value={values.Valid_to}
                            isInvalid={Boolean(touched.Valid_to && errors.Valid_to)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            readOnly={false}
                            className="form-control"
                          />

                          {!!touched.Valid_to && (
                            <Form.Control.Feedback type="invalid">
                              {errors.Valid_to}
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
                <GetFormikFieldValue />
              </Form>
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AssignModal;

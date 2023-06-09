import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormikContext, Formik, Field } from 'formik';
import { Form } from 'react-bootstrap';
import Button from '../../MDM_Tab_Buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const FunctionalMasterdataModal = ({ setShowModal, ediatbleData, setEditTableData, modalType }) => {
  const dispatch = useDispatch();

  const [orgTypeValue, setOrgTypeValue] = useState('');
  console.log('state=>>>>>>>>>>>>>>>>>>', ediatbleData);
  console.log(orgTypeValue);
  const orgTypeData = [
    {
      value: 'Zone',
      label: 'Zone',
    },
    {
      value: 'BU',
      label: 'BU',
    },
    {
      value: 'Country',
      label: 'Country',
    },
    {
      value: 'Cognos',
      label: 'Cognos',
    },
    {
      value: 'SAP',
      label: 'SAP',
    },
    {
      value: 'Plant',
      label: 'Plant',
    },
  ];

  return (
    <div className="p-5">
      <Formik
        enableReinitialize
        initialValues={{
          orgType: ediatbleData?.Org_type ? ediatbleData?.Org_type : '',
          Zone: ediatbleData?.Zone ? ediatbleData?.Zone : '',
          Functional: ediatbleData?.Functional ? ediatbleData?.Functional : '',
          Position: ediatbleData?.Position ? ediatbleData?.Position : '',
          Recipient: ediatbleData?.Valid_from ? ediatbleData?.Valid_from : '',
          ZoneControl: ediatbleData?.Zone_Control ? ediatbleData?.Zone_Control : '',
        }}
        validationSchema={Yup.object().shape({
          orgType: Yup.string().required('Organization Type is required'),
          Zone: Yup.string().required('Zone is required'),
          Functional: Yup.string()
              .required('Functional is required'),
          Position: Yup.string()
              .required('Position is required'),
          Recipient: Yup.string().required('Recipient is required'),
          ZoneControl: Yup.string().required('ZoneControl is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            // handleSaveAdd(values);

            // resetForm();
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
            <div className="col-lg-6">
                <div className="row mb-4">
                  <div className="col-lg-5">
                    <Form.Label>Zone</Form.Label>
                  </div>
                  <div className="col-lg-7">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        as="select"
                        name="Zone"
                        placeholder=""
                        value={values.Zone}
                        isInvalid={Boolean(touched.Zone && errors.Zone)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-select"
                      >
                        <option value="">Select Zone</option>

                       
                      </Form.Control>

                      {!!touched.Zone && (
                        <Form.Control.Feedback type="invalid">
                          {errors.Zone}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="row mb-4">
                  <div className="col-lg-5">
                    <Form.Label>BU/Organization Type</Form.Label>
                  </div>
                  <div className="col-lg-7">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        as="select"
                        name="orgType"
                        placeholder=""
                        value={values.orgType}
                        isInvalid={Boolean(touched.orgType && errors.orgType)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-select"
                      >
                        <option value="">Select Organization Type</option>
                        {orgTypeData.map((data, i) => (
                          <option value={data?.value} key={i}>
                            {data?.label === 'Country' ? 'Entity' : data?.label}
                          </option>
                        ))}
                      </Form.Control>

                      {!!touched.orgType && (
                        <Form.Control.Feedback type="invalid">
                          {errors.orgType}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>

             

              <div className="col-lg-6">
                <div className="row mb-4">
                  <div className="col-lg-5">
                    <Form.Label>Functional</Form.Label>
                  </div>
                  <div className="col-lg-7">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        as="select"
                        name="Functional"
                        placeholder="Functional"
                        value={values.Functional}
                        isInvalid={Boolean(touched.Functional && errors.Functional)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-select"
                      >
                    
                            <option value="">Select Functional</option>
                           
                         
                      </Form.Control>

                      {!!touched.Functional && (
                        <Form.Control.Feedback type="invalid">
                          {errors.Functional}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="row mb-4">
                  <div className="col-lg-5">
                    <Form.Label>Recipient</Form.Label>
                  </div>
                  <div className="col-lg-7">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        type="date"
                        name="Recipient"
                        placeholder=""
                        value={values.Recipient}
                        isInvalid={Boolean(touched.Recipient && errors.Recipient)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-control"
                      />

                      {!!touched.Recipient && (
                        <Form.Control.Feedback type="invalid">
                          {errors.Recipient}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="row mb-4">
                  <div className="col-lg-5">
                    <Form.Label>Title/Position</Form.Label>
                  </div>
                  <div className="col-lg-7">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        type="text"
                        name="Position"
                        placeholder="Position"
                        value={values.Position}
                        isInvalid={Boolean(touched.Position && errors.Position)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-control"
                      />
                    

                      {!!touched.Position && (
                        <Form.Control.Feedback type="invalid">
                          {errors.Position}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>


              <div className="col-lg-6">
                <div className="row mb-4">
                  <div className="col-lg-5">
                    <Form.Label>Zone Control</Form.Label>
                  </div>
                  <div className="col-lg-7">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        type="text"
                        name="ZoneControl"
                        placeholder="ZoneControl"
                        value={values.ZoneControl}
                        isInvalid={Boolean(touched.ZoneControl && errors.ZoneControl)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-control"
                      />

                      {!!touched.ZoneControl && (
                        <Form.Control.Feedback type="invalid">
                          {errors.ZoneControl}
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
                      setEditTableData();
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

export default FunctionalMasterdataModal;

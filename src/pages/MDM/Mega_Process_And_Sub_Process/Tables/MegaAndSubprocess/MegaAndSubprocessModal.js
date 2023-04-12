import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormikContext, Formik, Field } from 'formik';
import { Alert, Form } from 'react-bootstrap';
import CustomModal from '../../../../../components/UI/CustomModal';
import Button from '../../../MDM_Tab_Buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
// for adding data
import { addMegaAndSubprocess } from '../../../../../redux/MDM/MDM_Action';
// for Updating data
//import { updateMegaAndSubprocess } from '../../../../../redux/MDM/MDM_Action';
import moment from 'moment';

const MegaAndSubprocessModal = ({ setShowModal, ediatbleData, modalType }) => {
  const dispatch = useDispatch();
  console.log('state=>>>>>>>>>>>>>>>>>>', ediatbleData);

  const handleSaveAdd = (value) => {
    console.log(value);

    let payload = {
      Type_of_Process: value.Type_of_Process,
      Parent_Process: value.Parent_Process,
      Prefix: value.Prefix,
      Name_2: value.Name_2,
      Name_Detailed_Name: value.Name_Detailed_Name,
    };

    // Edit Payload for API

    // let editPayload = {
    //   ...payload,
    //   Org_code: ediatbleData?.Org_code,
    // };

    if (modalType === 'add') {
      console.log('ADD=>>>>>>>>>>>>>>>>>>');
      dispatch(addMegaAndSubprocess(payload));
    } else {
      console.log('Edit=>>>>>>>>>>>>>>>>>>');
      //dispatch(updateMegaAndSubprocess(editPayload));
    }
  };

  return (
    <div className="p-5">
      <Formik
        enableReinitialize
        initialValues={{
          Type_of_Process: ediatbleData?.Type_of_Process ? ediatbleData?.Type_of_Process : '',
          Parent_Process: ediatbleData?.Parent_Process ? ediatbleData?.Parent_Process : '',
          Prefix: ediatbleData?.Prefix ? ediatbleData?.Prefix : '',
          Name_2: ediatbleData?.Name_2 ? ediatbleData?.Name_2 : '',
          Name_Detailed_Name: ediatbleData?.Name_Detailed_Name
            ? ediatbleData?.Name_Detailed_Name
            : '',
        }}
        validationSchema={Yup.object().shape({
          Type_of_Process: Yup.string().required('Type of Process is required'),
          Parent_Process: Yup.string().required('Parent Process is required'),
          Prefix: Yup.string().required('Prefix is required'),
          Name_2: Yup.string().required('Name 2 is required'),
          Name_Detailed_Name: Yup.string().required('Detailed Name is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            handleSaveAdd(values);

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
                    <Form.Label>Type of Process</Form.Label>
                  </div>
                  <div className="col-lg-7">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        type="text"
                        name="Type_of_Process"
                        placeholder=""
                        value={values.Type_of_Process}
                        isInvalid={Boolean(touched.Type_of_Process && errors.Type_of_Process)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-control"
                      />

                      {!!touched.Type_of_Process && (
                        <Form.Control.Feedback type="invalid">
                          {errors.Type_of_Process}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="row mb-4">
                  <div className="col-lg-5">
                    <Form.Label>Parent Process</Form.Label>
                  </div>
                  <div className="col-lg-7">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        type="text"
                        name="Parent_Process"
                        placeholder=""
                        value={values.Parent_Process}
                        isInvalid={Boolean(touched.Parent_Process && errors.Parent_Process)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-control"
                      />

                      {!!touched.Parent_Process && (
                        <Form.Control.Feedback type="invalid">
                          {errors.Parent_Process}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="row mb-4">
                  <div className="col-lg-5">
                    <Form.Label>Prefix</Form.Label>
                  </div>
                  <div className="col-lg-7">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        type="text"
                        name="Prefix"
                        placeholder=""
                        value={values.Prefix}
                        isInvalid={Boolean(touched.Prefix && errors.Prefix)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-control"
                      />

                      {!!touched.Prefix && (
                        <Form.Control.Feedback type="invalid">
                          {errors.Prefix}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="row mb-4">
                  <div className="col-lg-5">
                    <Form.Label>Name 2</Form.Label>
                  </div>
                  <div className="col-lg-7">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        type="text"
                        name="Name_2"
                        placeholder=""
                        value={values.Name_2}
                        isInvalid={Boolean(touched.Name_2 && errors.Name_2)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-control"
                      />

                      {!!touched.Name_2 && (
                        <Form.Control.Feedback type="invalid">
                          {errors.Name_2}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="row mb-4">
                  <div className="col-lg-5">
                    <Form.Label>Detailed Name</Form.Label>
                  </div>
                  <div className="col-lg-7">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        type="text"
                        name="Name_Detailed_Name"
                        placeholder=""
                        value={values.Name_Detailed_Name}
                        isInvalid={Boolean(touched.Name_Detailed_Name && errors.Name_Detailed_Name)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-control"
                      />

                      {!!touched.Name_Detailed_Name && (
                        <Form.Control.Feedback type="invalid">
                          {errors.Name_Detailed_Name}
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
                  <Button variant="outlined" color="secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button color="neutral" className="ml-4" onClick={handleSubmit}>
                    Confirm
                  </Button>
                </div>
              </div>
            </div>
            {/*<GetParentEntityValue setOrgTypeValue={setOrgTypeValue} />*/}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MegaAndSubprocessModal;

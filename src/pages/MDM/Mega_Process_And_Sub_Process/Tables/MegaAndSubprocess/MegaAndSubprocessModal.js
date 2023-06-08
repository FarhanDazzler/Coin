import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormikContext, Formik, Field } from 'formik';
import { Form } from 'react-bootstrap';
import Button from '../../../MDM_Tab_Buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
// for adding data
import {
  addMegaAndSubprocess,
  getMegaProcessPrefix,
  getSubprocessParent,
  getSubprocessPrefix,
} from '../../../../../redux/MDM/MDM_Action';

import {
  getMegaProcessPrefixSelector,
  getSubprocessParentSelector,
  getSubprocessPrefixSelector,
} from '../../../../../redux/MDM/MDM_Selectors';
// for Updating data
import { updateMegaAndSubprocess } from '../../../../../redux/MDM/MDM_Action';

const GetFormikFieldValue = ({ setMegaSubProcessValue }) => {
  // Grab values and submitForm from context
  const dispatch = useDispatch();
  const { values } = useFormikContext();

  useEffect(() => {
    if (values.Type_of_Process === 'Mega Process') {
      dispatch(getMegaProcessPrefix());
    } else if (values.Type_of_Process === 'Sub Process') {
      dispatch(getSubprocessParent());
      if (values.Parent_Process) {
        let params = {
          parent: values.Parent_Process,
        };
        dispatch(getSubprocessPrefix(params));
      }
    }
    setMegaSubProcessValue(values);
  }, [values]);
  return null;
};

const MegaAndSubprocessModal = ({ setShowModal, ediatbleData, modalType, setEditTableData }) => {
  const dispatch = useDispatch();
  const [megaSubProcessValue, setMegaSubProcessValue] = useState();
  const [prefixValue, setPrefixValue] = useState('');

  const getMegaProcessPrefixState = useSelector(getMegaProcessPrefixSelector);
  const getSubprocessParentState = useSelector(getSubprocessParentSelector);
  const getSubprocessPrefixState = useSelector(getSubprocessPrefixSelector);

  useEffect(() => {
    if (megaSubProcessValue?.Type_of_Process === 'Mega Process') {
      setPrefixValue(getMegaProcessPrefixState?.data);
    } else if (megaSubProcessValue?.Type_of_Process === 'Sub Process') {
      setPrefixValue(
        getSubprocessPrefixState?.data[0]?.Megaprocess_Short.substring(
          getSubprocessPrefixState?.data[0]?.Megaprocess_Short.indexOf('.') + 2,
        ),
      );
    } else {
      setPrefixValue('');
    }
  }, [getMegaProcessPrefixState, getSubprocessParentState, getSubprocessPrefixState]);

  const handleSaveAdd = (value) => {
    let payload = {
      Type_of_Process: value.Type_of_Process,
      Parent_Process: value.Type_of_Process === 'Mega Process' ? '' : value.Parent_Process,
      Prefix: modalType === 'add' ? prefixValue : ediatbleData?.Prefix,
      Name_2: value.Type_of_Process === 'Mega Process' ? value.Name_2.toUpperCase() : value.Name_2,
      Name_Detailed_Name:
        value.Type_of_Process === 'Mega Process'
          ? value.Name_Detailed_Name
          : value.Parent_Process + ' - ' + value.Name_2,
    };

    // Edit Payload for API

    let editPayload = {
      ...payload,
      id: ediatbleData?.id,
    };

    if (modalType === 'add') {
      dispatch(addMegaAndSubprocess(payload));
    } else {
      dispatch(updateMegaAndSubprocess(editPayload));
    }
  };

  return (
    <div className="p-5">
      <Formik
        enableReinitialize
        initialValues={{
          Type_of_Process: ediatbleData?.Type_of_Process ? ediatbleData?.Type_of_Process : '',
          Parent_Process: ediatbleData?.Parent_Process ? ediatbleData?.Parent_Process : '',
          Prefix:
            ediatbleData?.Type_of_Process === 'Mega Process' && ediatbleData?.Prefix
              ? ediatbleData?.Prefix
              : '',
          Name_2: ediatbleData?.Name_2 ? ediatbleData?.Name_2 : '',
          Name_Detailed_Name: ediatbleData?.Name_Detailed_Name
            ? ediatbleData?.Name_Detailed_Name
            : '',
        }}
        validationSchema={Yup.object().shape({
          Type_of_Process: Yup.string().required('Type of Process is required'),
          Parent_Process: Yup.string().when('Type_of_Process', {
            is: 'Sub Process',
            then: Yup.string().required('Parent Process is required'),
          }),
          Name_2: Yup.string()
            .when('Type_of_Process', {
              is: 'Mega Process',
              then: Yup.string()
                .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed')
                .max(4, 'Name should be maximum of 4 characters')
                .required('Name is required!'),
            })
            .when('Type_of_Process', {
              is: 'Sub Process',
              then: Yup.string()
                .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed')
                .required('Name is required!'),
            }),
          Name_Detailed_Name: Yup.string().when('Type_of_Process', {
            is: 'Mega Process',
            then: Yup.string()
              .matches(/^[aA-zZ\s]+$/, 'Only alphabets are allowed')
              .required('Name is required!'),
          }),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            handleSaveAdd(values);
            //resetForm();
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
                        as="select"
                        name="Type_of_Process"
                        placeholder=""
                        value={values.Type_of_Process}
                        isInvalid={Boolean(touched.Type_of_Process && errors.Type_of_Process)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        disabled={modalType === 'add' ? false : true}
                        className="form-select"
                      >
                        <option value="">Select Type of Process</option>
                        <option value="Mega Process">Mega Process</option>
                        <option value="Sub Process">Sub Process</option>
                      </Form.Control>

                      {!!touched.Type_of_Process && (
                        <Form.Control.Feedback type="invalid">
                          {errors.Type_of_Process}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>

              {values.Type_of_Process === 'Sub Process' && (
                <div className="col-lg-6">
                  <div className="row mb-4">
                    <div className="col-lg-5">
                      <Form.Label>Parent Process</Form.Label>
                    </div>
                    <div className="col-lg-7">
                      <Form.Group className="input-group mb-3">
                        <Form.Control
                          as="select"
                          name="Parent_Process"
                          placeholder=""
                          value={values.Parent_Process}
                          isInvalid={Boolean(touched.Parent_Process && errors.Parent_Process)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          readOnly={false}
                          className="form-select"
                        >
                          <option value="">Select Parent Process</option>
                          {getSubprocessParentState?.data.map((data, i) => (
                            <option key={i} value={data.Megaprocess_Long}>
                              {data.Megaprocess_Long}
                            </option>
                          ))}
                        </Form.Control>

                        {!!touched.Parent_Process && (
                          <Form.Control.Feedback type="invalid">
                            {errors.Parent_Process}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </div>
                  </div>
                </div>
              )}

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
                        placeholder={prefixValue}
                        value={values.Prefix}
                        isInvalid={Boolean(touched.Prefix && errors.Prefix)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={true}
                        className="form-control"
                      />
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
                        onChange={(e) => {
                          setFieldValue(
                            'Name_2',
                            values.Type_of_Process === 'Mega Process'
                              ? e.target.value.toUpperCase()
                              : e.target.value,
                          );
                        }}
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
                        value={
                          values.Type_of_Process === 'Mega Process'
                            ? values.Name_Detailed_Name
                            : values.Parent_Process + ' - ' + values.Name_2
                        }
                        isInvalid={Boolean(touched.Name_Detailed_Name && errors.Name_Detailed_Name)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        maxLength={5000}
                        readOnly={values.Type_of_Process === 'Mega Process' ? false : true}
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
            <GetFormikFieldValue setMegaSubProcessValue={setMegaSubProcessValue} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MegaAndSubprocessModal;

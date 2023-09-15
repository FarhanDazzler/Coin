import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormikContext, Formik, Field } from 'formik';
import { Form } from 'react-bootstrap';
import Button from '../../../MDM_Tab_Buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getRlParentEntityData, addOrganizationalMd, updateOrganizationalMd } from '../../../../../../../redux/REP_Letters/RLMDM/RLMDMAction';
import { getRlParentEntityDataSelector } from '../../../../../../../redux/REP_Letters/RLMDM/RLMDMSelectors';
import moment from 'moment';
const GetParentEntityValue = ({ setOrgTypeValue }) => {
  // Grab values and submitForm from context
  const dispatch = useDispatch();
  const { values } = useFormikContext();
  useEffect(() => {
    let params = {
      entity: values.orgType,
    };
    if (values.orgType) {
      dispatch(getRlParentEntityData(params));
      // resetForm({values:{...values, parentEntity:""}})
    }

    setOrgTypeValue(values.orgType);
  }, [values.orgType]);
  return null;
};

const OrgStructureModal = ({ setShowModal, ediatbleData, setEditTableData, modalType }) => {
  const dispatch = useDispatch();
  const [isProviderValue, setIsProviderValue] = useState('');
  const [isReceiverValue, setIsReceiverValue] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [orgTypeValue, setOrgTypeValue] = useState('');
  const getRlParentEntityDataState = useSelector(getRlParentEntityDataSelector);
  console.log("getRlParentEntityDataState", getRlParentEntityDataState);
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
      value: 'Cognos Code',
      label: 'Cognos Code',
    },
  ];



  const handleSaveAdd = (value) => {
    console.log(value, modalType);
    
    let payload= {
      "id": ediatbleData?.id,
      "Organization_Name" : value.Org_name,
      "Organization_Type" : value.orgType,
      "Parent_Entity" : value.parentEntity,
      "Entity_Name" : value.EntityName,
      "Valid_To" : value.validTo,
      "Valid_From" : value.validFrom
    }
    if (modalType === 'add') {
      console.log('ADD=>>>>>>>>>>>>>>>>>>');
      dispatch(addOrganizationalMd(payload));
    } else {
      console.log('Edit=>>>>>>>>>>>>>>>>>>');
      dispatch(updateOrganizationalMd(payload));
    }
  };
  let today = moment().format('YYYY-MM-DD');
  let validToDate = '9999-12-31';
  console.log(validToDate);
  return (
    <div className="p-5">
      <Formik
        enableReinitialize
        initialValues={{
          orgType: ediatbleData?.Organization_Type ? ediatbleData?.Organization_Type : '',
          parentEntity: ediatbleData?.Parent_Entity ? ediatbleData?.Parent_Entity : '',
          EntityName: ediatbleData?.Entity_Name ? ediatbleData?.Entity_Name : '',
          Org_name: ediatbleData?.Organization_Name ? ediatbleData?.Organization_Name : '',
          validFrom: ediatbleData?.Valid_From ? ediatbleData?.Valid_From : today ? today : '',
          validTo: ediatbleData?.Valid_To ? ediatbleData?.Valid_To : validToDate ? validToDate : '',
        }}
        validationSchema={Yup.object().shape({
          orgType: Yup.string().required('Organization Type is required'),
          parentEntity: Yup.string().required('Parent Entity is required'),
          EntityName: Yup.string()
              .required('EntityName is required')
              .max(5000, 'Max 5000 characters allowed'),
          validFrom: Yup.string().required('Valid Date is required'),
          validTo: Yup.string().required('Valid Date is required'),
          Org_name: Yup.string().required('Organization Name is required'),
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
                    <Form.Label>Organization Name</Form.Label>
                  </div>
                  <div className="col-lg-7">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        type="text"
                        name="Org_name"
                        placeholder=""
                        value={values.Org_name}
                        isInvalid={Boolean(touched.Org_name && errors.Org_name)}
                        onBlur={handleBlur}
                        maxLength={5000}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-control"
                      />

                      {!!touched.Org_name && (
                        <Form.Control.Feedback type="invalid">
                          {errors.Org_name}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="row mb-4">
                  <div className="col-lg-5">
                    <Form.Label>Organization Type</Form.Label>
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
                    <Form.Label>Parent Entity</Form.Label>
                  </div>
                  <div className="col-lg-7">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        as="select"
                        name="parentEntity"
                        placeholder=""
                        value={values.parentEntity}
                        isInvalid={Boolean(touched.parentEntity && errors.parentEntity)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-select"
                      >
                        <option value="">Select Parent Entity</option>
                        {
                          getRlParentEntityDataState?.data instanceof Array ? 
                          (
                            getRlParentEntityDataState?.data &&
                            getRlParentEntityDataState?.data.map((data, i) => (
                              <option value={data[0]} key={i}>
                                {data[0]}
                              </option>
                            ))
                          ) : <option value={getRlParentEntityDataState?.data}>{getRlParentEntityDataState?.data}</option>
                        }
                      </Form.Control>

                      {!!touched.parentEntity && (
                        <Form.Control.Feedback type="invalid">
                          {errors.parentEntity}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="row mb-4">
                  <div className="col-lg-5">
                    <Form.Label>Entity Name</Form.Label>
                  </div>
                  <div className="col-lg-7">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        type="text"
                        name="EntityName"
                        placeholder=""
                        value={values.EntityName}
                        isInvalid={Boolean(touched.EntityName && errors.EntityName)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        maxLength={5000}
                        className="form-control"
                      />
                       

                      {!!touched.EntityName && (
                        <Form.Control.Feedback type="invalid">
                          {errors.EntityName}
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
                        name="validFrom"
                        placeholder=""
                        value={values.validFrom}
                        isInvalid={Boolean(touched.validFrom && errors.validFrom)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-control"
                      />

                      {!!touched.validFrom && (
                        <Form.Control.Feedback type="invalid">
                          {errors.validFrom}
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
                        name="validTo"
                        placeholder=""
                        value={values.validTo}
                        isInvalid={Boolean(touched.validTo && errors.validTo)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-control"
                      />

                      {!!touched.validTo && (
                        <Form.Control.Feedback type="invalid">
                          {errors.validTo}
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
            <GetParentEntityValue setOrgTypeValue={setOrgTypeValue} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OrgStructureModal;

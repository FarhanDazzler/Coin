import * as React from 'react';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import { Alert, Form } from 'react-bootstrap';
import CustomModal from '../../../../../components/UI/CustomModal';
import Button from '../../../MDM_Tab_Buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addOrgStructureAction } from '../../../../../redux/MDM/MDM_Action';

const OrgStructureModal = () => {
    const dispatch = useDispatch();
    const handleSaveAdd = (value) => {
        console.log(value);
        let payload = {
          "Org_type": value.orgType,
          "Org_name": value.Org_name,
          "parent_entity": value.parentEntity,
          "isReceiver": parseInt(value.isReceiver),
          "isProvider": parseInt(value.isProvider),
          "Category": value.Category,
          "Valid_from" : value.validFrom,
          "Valid_to" : value.validTo
        }
        dispatch(addOrgStructureAction(payload))
      }
return (
    <div className="p-5">
          <Formik
            initialValues={{
              orgType: '',
              parentEntity: '',
              isReceiver: '',
              isProvider: '',
              Category: '',
              Org_name: '',
              validFrom: '',
              validTo: ''
            }}
            validationSchema={Yup.object().shape({
              orgType: Yup.string()
                .required('Organization Type is required'),
              parentEntity: Yup.string()
                .required('Parent Entity is required'),
              Category: Yup.string()
                .required('Category is required'),
              validFrom: Yup.string()
              .required('Valid Date is required'),
              validTo: Yup.string()
              .required('Valid Date is required'),
              Org_name: Yup.string()
                .required('Organization Name is required'),
            })}
            onSubmit={async (
              values,
              { setErrors, setStatus, setSubmitting, resetForm }
            ) => {
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
                    <div className='row mb-4'>
                      <div className="col-lg-5">
                        <Form.Label>Organization Type</Form.Label>
                      </div>
                      <div className="col-lg-7">
                        <Form.Group className="input-group mb-3">

                          <Form.Control
                            type="text"
                            name="orgType"
                            placeholder=""
                            value={values.orgType}
                            isInvalid={Boolean(
                              touched.orgType && errors.orgType
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            readOnly={false}
                            className="form-control"
                          />

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
                    <div className='row mb-4'>
                      <div className="col-lg-5">
                        <Form.Label>Parent Entity</Form.Label>
                      </div>
                      <div className="col-lg-7">
                        <Form.Group className="input-group mb-3">

                          <Form.Control
                            type="text"
                            name="parentEntity"
                            placeholder=""
                            value={values.parentEntity}
                            isInvalid={Boolean(
                              touched.parentEntity && errors.parentEntity
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            readOnly={false}
                            className="form-control"
                          />

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
                    <div className='row mb-4'>
                      <div className="col-lg-5">
                        <Form.Label>isReceiver</Form.Label>
                      </div>
                      <div className="col-lg-7">
                        <Form.Group className="input-group mb-3">
                          <div role="group" aria-labelledby="my-radio-group">
                            <label>
                              <Field className="" type="radio" name="isReceiver" value="1"/>
                              <span className='radio-text'>Yes</span>
                            </label>
                            <label>
                              <Field type="radio" name="isReceiver" value="0" />
                              <span className='radio-text'>No</span>
                            </label>

                          </div>
                        </Form.Group>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className='row mb-4'>
                      <div className="col-lg-5">
                        <Form.Label>isProvider</Form.Label>
                      </div>
                      <div className="col-lg-7">
                        <Form.Group className="input-group mb-3">
                          <div role="group" aria-labelledby="my-radio-group">
                            <label>
                              <Field type="radio" name="isProvider" value="1" />
                              <span className='radio-text'>Yes</span>
                            </label>
                            <label>
                              <Field type="radio" name="isProvider" value="0" />
                              <span className='radio-text'>No</span>
                            </label>

                          </div>
                          
                        </Form.Group>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className='row mb-4'>
                      <div className="col-lg-5">
                        <Form.Label>Category</Form.Label>
                      </div>
                      <div className="col-lg-7">
                        <Form.Group className="input-group mb-3">

                          <Form.Control
                            type="text"
                            name="Category"
                            placeholder=""
                            value={values.Category}
                            isInvalid={Boolean(
                              touched.Category && errors.Category
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            readOnly={false}
                            className="form-control"
                          />

                          {!!touched.Category && (
                            <Form.Control.Feedback type="invalid">
                              {errors.Category}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className='row mb-4'>
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
                            isInvalid={Boolean(
                              touched.validFrom && errors.validFrom
                            )}
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
                    <div className='row mb-4'>
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
                            isInvalid={Boolean(
                              touched.validTo && errors.validTo
                            )}
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

                  <div className="col-lg-6">
                    <div className='row mb-4'>
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
                            isInvalid={Boolean(
                              touched.Org_name && errors.Org_name
                            )}
                            onBlur={handleBlur}
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


                </div>
                <div className="footer-action">
                  <div className="d-flex align-items-center justify-content-end">

                    <div>
                      <Button variant="outlined" color="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                      </Button>
                      <Button
                        color="neutral"
                        className="ml-4"
                        onClick={handleSubmit}

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
)
}

export default OrgStructureModal;
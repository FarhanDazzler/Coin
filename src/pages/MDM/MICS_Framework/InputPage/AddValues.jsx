import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageWrapper from '../../../../components/wrappers/PageWrapper';
import * as Yup from 'yup';
import { useFormikContext, Formik, Field } from 'formik';
import { Alert, Form } from 'react-bootstrap';
import Button from '../../MDM_Tab_Buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import {
  addMicsFramework,
  updateMicsFramework,
  getMegaProcessMicsFramework,
  getSubProcessMicsFramework,
} from '../../../../redux/MDM/MDM_Action';
import {
  getMegaProcessMicsFrameworkSelector,
  getSubProcessMicsFrameworkSelector,
} from '../../../../redux/MDM/MDM_Selectors';
import { addMicsInitialValues, addMicsValidationSchema } from '../../../../utils/constants';

import { ContentState } from 'draft-js';
import { TextEditor } from '../../../../components/FormInputs/RichTextEditor/RichTextEditor';
import './InputPageStyle.scss';

const GetFormikFieldValue = () => {
  // Grab values and submitForm from context
  const dispatch = useDispatch();
  const { values } = useFormikContext();

  useEffect(() => {
    dispatch(getMegaProcessMicsFramework());
    let params = {
      mega: values.Mega_Process,
    };
    dispatch(getSubProcessMicsFramework(params));
  }, [values.Mega_Process]);
  return null;
};

const AddValues_MDM_Mics_Framework = (props) => {
  // Access passed props from location.state

  const title = props.location.state.data?.title;
  const modalType = props.location.state.data?.modalType;
  const editTableData = props.location.state.data?.editTableData;

  const history = useHistory();
  const dispatch = useDispatch();

  const getMegaProcessMicsFrameworkState = useSelector(getMegaProcessMicsFrameworkSelector);
  const getSubProcessMicsFrameworkState = useSelector(getSubProcessMicsFrameworkSelector);

  const handleOnclickCancel = () => {
    history.push('/master-data-management/mics-framework');
  };
  const handleSaveAdd = (value) => {
    console.log(value);
    let payload = {
      Control_ID: value.Control_ID,
      Mega_Process: value.Mega_Process,
      Category: value.Category,
      Change_Size: value.Change_Size,
      DTC: value.DTC,
      Reviewed: value.Reviewed,
      ABI_Key: value.ABI_Key,
      Ambev_Key: value.Ambev_Key,
      FCPA: value.FCPA,
      Frequency: value.Frequency,
      Preventive_Detective: value.Preventive_Detective,
      Automation: value.Automation,
      Recommended_Level: value.Recommended_Level,
      Maturity_Relevant: value.Maturity_Relevant,
      mics_weight: parseInt(value.mics_weight),
      Recommended_Standardization: value.Recommended_Standardization,
      ABI_DAG: value.ABI_DAG,
      AmBev_DAG: value.AmBev_DAG,
      B2B: value.B2B,
      Fintech: value.Fintech,
      Control_Split: value.Control_Split,
      Sub_Process: value.Sub_Process,
      Risk: value.Risk,
      Control_name: value.Control_name,
      mics_L1desc: value.mics_L1desc,
      mics_L2desc: value.mics_L2desc,
      mics_L3desc: value.mics_L3desc,
      BS_impact: value.BS_impact,
      PnL_impact: value.PnL_impact,
      Cash_flow_impact: value.Cash_flow_impact,
      testing_approach: value.testing_approach,
      L3_KPI: value.L3_KPI,
      L2_KPI: value.L2_KPI,
      L1_KPI: value.L1_KPI,
      Kpi_status: value.Kpi_status,
      change_comment: value.change_comment,
      Status: value.Status,
    };

    let editPayload = {
      Previous_MICS1: value.Previous_MICS1,
      Previous_MICS: value.Previous_MICS,
      Control_ID: editTableData?.Control_ID,
      Mega_Process: value.Mega_Process,
      Category: value.Category,
      Change_Size: value.Change_Size,
      DTC: value.DTC,
      Reviewed: value.Reviewed,
      ABI_Key: value.ABI_Key,
      Ambev_Key: value.Ambev_Key,
      FCPA: value.FCPA,
      Frequency: value.Frequency,
      Preventive_Detective: value.Preventive_Detective,
      Automation: value.Automation,
      Recommended_Level: value.Recommended_Level,
      Maturity_Relevant: value.Maturity_Relevant,
      mics_weight: parseInt(value.mics_weight),
      Recommended_Standardization: value.Recommended_Standardization,
      ABI_DAG: value.ABI_DAG,
      AmBev_DAG: value.AmBev_DAG,
      B2B: value.B2B,
      Fintech: value.Fintech,
      Control_Split: value.Control_Split,
      Sub_Process: value.Sub_Process,
      Risk: value.Risk,
      Control_name: value.Control_name,
      mics_L1desc: value.mics_L1desc,
      mics_L2desc: value.mics_L2desc,
      mics_L3desc: value.mics_L3desc,
      BS_impact: value.BS_impact,
      PnL_impact: value.PnL_impact,
      Cash_flow_impact: value.Cash_flow_impact,
      testing_approach: value.testing_approach,
      L3_KPI: value.L3_KPI,
      L2_KPI: value.L2_KPI,
      L1_KPI: value.L1_KPI,
      Kpi_status: value.Kpi_status,
      change_comment: value.change_comment,
      Status: value.Status,
    };

    if (modalType === 'add') {
      console.log('ADD=>>>>>>>>>>>>>>>>>>');
      dispatch(addMicsFramework(payload));
    } else {
      console.log('Edit=>>>>>>>>>>>>>>>>>>');
      dispatch(updateMicsFramework(editPayload));
    }
  };

  return (
    <div>
      <PageWrapper>
        <div className="container">
          <div className="p-5">
            <h4 className="MDM-inputPage-title">{title}</h4>
            <Formik
              enableReinitialize
              initialValues={{
                Previous_MICS1: editTableData?.Previous_MICS1 || '',
                Previous_MICS: editTableData?.Previous_MICS ? editTableData?.Previous_MICS : '',
                Control_ID: editTableData?.Control_ID ? editTableData?.Control_ID : '',
                Status: editTableData?.Status ? editTableData?.Status : '',
                Mega_Process: editTableData?.Mega_Process ? editTableData?.Mega_Process : '',
                Category: editTableData?.Category ? editTableData?.Category : '',
                Change_Size: editTableData?.Change_Size ? editTableData?.Change_Size : '',
                DTC: editTableData?.DTC ? editTableData?.DTC : '',
                Reviewed: editTableData?.Reviewed ? editTableData?.Reviewed : '',
                ABI_Key: editTableData?.ABI_Key ? editTableData?.ABI_Key : '',
                Ambev_Key: editTableData?.Ambev_Key ? editTableData?.Ambev_Key : '',
                FCPA: editTableData?.FCPA ? editTableData?.FCPA : '',
                Frequency: editTableData?.Frequency ? editTableData?.Frequency : '',
                Preventive_Detective: editTableData?.Preventive_Detective
                  ? editTableData?.Preventive_Detective
                  : '',
                Automation: editTableData?.Automation ? editTableData?.Automation : '',
                Recommended_Level: editTableData?.Recommended_Level
                  ? editTableData?.Recommended_Level
                  : '',
                Maturity_Relevant: editTableData?.Maturity_Relevant
                  ? editTableData?.Maturity_Relevant
                  : '',
                mics_weight: editTableData?.mics_weight ? editTableData?.mics_weight : '',
                Recommended_Standardization: editTableData?.Recommended_Standardization
                  ? editTableData?.Recommended_Standardization
                  : '',
                ABI_DAG: editTableData?.ABI_DAG ? editTableData?.ABI_DAG : '',
                AmBev_DAG: editTableData?.AmBev_DAG ? editTableData?.AmBev_DAG : '',
                B2B: editTableData?.B2B ? editTableData?.B2B : '',
                Fintech: editTableData?.Fintech ? editTableData?.Fintech : '',
                Control_Split: editTableData?.Control_Split ? editTableData?.Control_Split : '',
                Sub_Process: editTableData?.Sub_Process ? editTableData?.Sub_Process : '',
                Risk: editTableData?.Risk ? editTableData?.Risk : '',
                Control_name: editTableData?.Control_name ? editTableData?.Control_name : '',
                mics_L1desc: editTableData?.mics_L1desc ? editTableData?.mics_L1desc : '',
                mics_L2desc: editTableData?.mics_L2desc ? editTableData?.mics_L2desc : '',
                mics_L3desc: editTableData?.mics_L3desc ? editTableData?.mics_L3desc : '',
                BS_impact: editTableData?.BS_impact ? editTableData?.BS_impact : '',
                PnL_impact: editTableData?.PnL_impact ? editTableData?.PnL_impact : '',
                Cash_flow_impact: editTableData?.Cash_flow_impact
                  ? editTableData?.Cash_flow_impact
                  : '',
                testing_approach: editTableData?.testing_approach
                  ? editTableData?.testing_approach
                  : '',
                L3_KPI: editTableData?.L3_KPI ? editTableData?.L3_KPI : '',
                L2_KPI: editTableData?.L2_KPI ? editTableData?.L2_KPI : '',
                L1_KPI: editTableData?.L1_KPI ? editTableData?.L1_KPI : '',
                Kpi_status: editTableData?.Kpi_status ? editTableData?.Kpi_status : '',
                change_comment: editTableData?.change_comment ? editTableData?.change_comment : '',
              }}
              validationSchema={Yup.object().shape({
                Control_ID: Yup.string().required('Control ID is required'),
                Status: Yup.string().required('Status ID is required'),
                Mega_Process: Yup.string().required('Mega Process is required'),
                Category: Yup.string().required('Category is required'),
                Change_Size: Yup.string().required('Change_Size is required'),
                DTC: Yup.string().required('DTC is required'),
                Reviewed: Yup.string().required('Reviewed is required'),
                ABI_Key: Yup.string().required('ABI Key is required'),
                Ambev_Key: Yup.string().required('Ambev Key is required'),
                FCPA: Yup.string().required('FCPA is required'),
                Frequency: Yup.string().required('Frequency is required'),
                Preventive_Detective: Yup.string().required('Preventive Detective is required'),
                Automation: Yup.string().required('Automation is required'),
                Recommended_Level: Yup.string().required('Recommended Level is required'),
                Maturity_Relevant: Yup.string().required('Maturity Relevant is required'),
                mics_weight: Yup.string().required('mics weight is required'),
                Recommended_Standardization: Yup.string().required(
                  'Recommended Standardization is required',
                ),
                ABI_DAG: Yup.string().required('ABI DAG is required'),
                AmBev_DAG: Yup.string().required('AmBev DAG is required'),
                B2B: Yup.string().required('B2B is required'),
                Fintech: Yup.string().required('Fintech is required'),
                Control_Split: Yup.string().required('Control Split is required'),
                Sub_Process: Yup.string().required('Sub Process is required'),
                Risk: Yup.string().required('Risk is required'),
                Control_name: Yup.string().required('Control name is required'),
                mics_L1desc: Yup.string().required('mics L1 desc is required'),
                mics_L2desc: Yup.string().required('mics L2 desc is required'),
                mics_L3desc: Yup.string().required('mics L3 desc is required'),
                BS_impact: Yup.string().required('BS impact is required'),
                PnL_impact: Yup.string().required('PnL impact is required'),
                Cash_flow_impact: Yup.string().required('Cash flow impact is required'),
                testing_approach: Yup.string().required('testing approach is required'),
                L3_KPI: Yup.string().required('L3 KPI is required'),
                L2_KPI: Yup.string().required('L2 KPI is required'),
                L1_KPI: Yup.string().required('L1 KPI is required'),
                Kpi_status: Yup.string().required('Kpi status  is required'),
                change_comment: Yup.string().required('change comment is required'),
              })}
              onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
                try {
                  console.log(values);
                  handleSaveAdd(values);
                  resetForm();
                  history.push('/master-data-management/mics-framework');
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
                    {modalType === 'edit' && (
                      <div className="col-lg-6">
                        <div className="row mb-4">
                          <div className="col-lg-5">
                            <Form.Label>Previous Year-1 MICS No</Form.Label>
                          </div>
                          <div className="col-lg-7">
                            <Form.Group className="input-group mb-3">
                              <Form.Control
                                type="text"
                                name="Previous_MICS1"
                                placeholder=""
                                value={values.Previous_MICS1}
                                isInvalid={Boolean(touched.Previous_MICS1 && errors.Previous_MICS1)}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                readOnly={false}
                                className="form-control"
                              />

                              {!!touched.Previous_MICS1 && (
                                <Form.Control.Feedback type="invalid">
                                  {errors.Previous_MICS1}
                                </Form.Control.Feedback>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                      </div>
                    )}

                    {modalType === 'edit' && (
                      <div className="col-lg-6">
                        <div className="row mb-4">
                          <div className="col-lg-5">
                            <Form.Label>Previous Year MICS No</Form.Label>
                          </div>
                          <div className="col-lg-7">
                            <Form.Group className="input-group mb-3">
                              <Form.Control
                                type="text"
                                name="Previous_MICS"
                                placeholder=""
                                value={values.Previous_MICS}
                                isInvalid={Boolean(touched.Previous_MICS && errors.Previous_MICS)}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                readOnly={false}
                                className="form-control"
                              />

                              {!!touched.Previous_MICS && (
                                <Form.Control.Feedback type="invalid">
                                  {errors.Previous_MICS}
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
                          <Form.Label>Control ID</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="text"
                              name="Control_ID"
                              placeholder=""
                              value={values.Control_ID}
                              isInvalid={Boolean(touched.Control_ID && errors.Control_ID)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={modalType === 'add' ? false : true}
                              className="form-control"
                            />

                            {!!touched.Control_ID && (
                              <Form.Control.Feedback type="invalid">
                                {errors.Control_ID}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>Category</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="Category"
                              placeholder=""
                              value={values.Category}
                              isInvalid={Boolean(touched.Category && errors.Category)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Select Category</option>
                              <option value="Non IT">Non IT</option>
                              <option value="IT">IT</option>
                            </Form.Control>

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
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>Mega Process</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="Mega_Process"
                              placeholder=""
                              value={values.Mega_Process}
                              isInvalid={Boolean(touched.Mega_Process && errors.Mega_Process)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Select Mega Process</option>
                              {getMegaProcessMicsFrameworkState?.data.map((data, i) => (
                                <option key={i} value={data.Megaprocess_Short}>
                                  {data.Megaprocess_Short}
                                </option>
                              ))}
                            </Form.Control>

                            {!!touched.Mega_Process && (
                              <Form.Control.Feedback type="invalid">
                                {errors.Mega_Process}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>Sub Process</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="Sub_Process"
                              placeholder=""
                              value={values.Sub_Process}
                              isInvalid={Boolean(touched.Sub_Process && errors.Sub_Process)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Select Sub Process</option>
                              {getSubProcessMicsFrameworkState?.data.map((data, i) => (
                                <option key={i} value={data.Sub_Process_Name}>
                                  {data.Sub_Process_Name}
                                </option>
                              ))}
                            </Form.Control>

                            {!!touched.Sub_Process && (
                              <Form.Control.Feedback type="invalid">
                                {errors.Sub_Process}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>ABI Key</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="ABI_Key"
                              placeholder=""
                              value={values.ABI_Key}
                              isInvalid={Boolean(touched.ABI_Key && errors.ABI_Key)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Select ABI Key</option>
                              <option value="Key">Key</option>
                              <option value="Non Key">Non Key</option>
                            </Form.Control>

                            {!!touched.ABI_Key && (
                              <Form.Control.Feedback type="invalid">
                                {errors.ABI_Key}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>Ambev Key</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="Ambev_Key"
                              placeholder=""
                              value={values.Ambev_Key}
                              isInvalid={Boolean(touched.Ambev_Key && errors.Ambev_Key)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Select Ambev Key</option>
                              <option value="Key">Key</option>
                              <option value="Non Key">Non Key</option>
                            </Form.Control>

                            {!!touched.Ambev_Key && (
                              <Form.Control.Feedback type="invalid">
                                {errors.Ambev_Key}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>FCPA</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="FCPA"
                              placeholder=""
                              value={values.FCPA}
                              isInvalid={Boolean(touched.FCPA && errors.FCPA)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Select FCPA</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Control>

                            {!!touched.FCPA && (
                              <Form.Control.Feedback type="invalid">
                                {errors.FCPA}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>Frequency</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="Frequency"
                              placeholder=""
                              value={values.Frequency}
                              isInvalid={Boolean(touched.Frequency && errors.Frequency)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Select Frequency</option>
                              <option value="Annually">Annually</option>
                              <option value="Semi-Annually">Semi-Annually</option>
                              <option value="Quarterly">Quarterly</option>
                              <option value="Monthly">Monthly</option>
                              <option value="Weekly">Weekly</option>
                              <option value="Daily">Daily</option>
                              <option value="Event Based">Event Based</option>
                            </Form.Control>

                            {!!touched.Frequency && (
                              <Form.Control.Feedback type="invalid">
                                {errors.Frequency}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>Preventive/Detective</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="Preventive_Detective"
                              placeholder=""
                              value={values.Preventive_Detective}
                              isInvalid={Boolean(
                                touched.Preventive_Detective && errors.Preventive_Detective,
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Select Preventive Detective</option>
                              <option value="Preventive">Preventive</option>
                              <option value="Detective">Detective</option>
                            </Form.Control>

                            {!!touched.Preventive_Detective && (
                              <Form.Control.Feedback type="invalid">
                                {errors.Preventive_Detective}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>Automation</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="Automation"
                              placeholder=""
                              value={values.Automation}
                              isInvalid={Boolean(touched.Automation && errors.Automation)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Select Automation</option>
                              <option value="Automated">Automated</option>
                              <option value="IT Dependent">IT Dependent</option>
                              <option value="Manual">Manual</option>
                            </Form.Control>

                            {!!touched.Automation && (
                              <Form.Control.Feedback type="invalid">
                                {errors.Automation}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>Recommended Level</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="Recommended_Level"
                              placeholder=""
                              value={values.Recommended_Level}
                              isInvalid={Boolean(
                                touched.Recommended_Level && errors.Recommended_Level,
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Select Recommended Level</option>
                              <option value="BU HQ">BU HQ</option>
                              <option value="Global HQ">Global HQ</option>
                              <option value="NoCC">NoCC</option>
                              <option value="Site">Site</option>
                              <option value="Zone HQ">Zone HQ</option>
                              <option value="Zone Solutions">Zone Solutions</option>
                            </Form.Control>

                            {!!touched.Recommended_Level && (
                              <Form.Control.Feedback type="invalid">
                                {errors.Recommended_Level}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>Maturity Relevant</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="Maturity_Relevant"
                              placeholder=""
                              value={values.Maturity_Relevant}
                              isInvalid={Boolean(
                                touched.Maturity_Relevant && errors.Maturity_Relevant,
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Select Maturity Relevant</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Control>

                            {!!touched.Maturity_Relevant && (
                              <Form.Control.Feedback type="invalid">
                                {errors.Maturity_Relevant}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>MICS Weight</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="mics_weight"
                              placeholder=""
                              value={values.mics_weight}
                              isInvalid={Boolean(touched.mics_weight && errors.mics_weight)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Select Weight</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="10">10</option>
                            </Form.Control>

                            {!!touched.mics_weight && (
                              <Form.Control.Feedback type="invalid">
                                {errors.mics_weight}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>Recommended Standardization</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="text"
                              name="Recommended_Standardization"
                              placeholder=""
                              value={values.Recommended_Standardization}
                              isInvalid={Boolean(
                                touched.Recommended_Standardization &&
                                  errors.Recommended_Standardization,
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-control"
                            />

                            {!!touched.Recommended_Standardization && (
                              <Form.Control.Feedback type="invalid">
                                {errors.Recommended_Standardization}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>ABI DAG</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="text"
                              name="ABI_DAG"
                              placeholder=""
                              value={values.ABI_DAG}
                              isInvalid={Boolean(touched.ABI_DAG && errors.ABI_DAG)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-control"
                            />

                            {!!touched.ABI_DAG && (
                              <Form.Control.Feedback type="invalid">
                                {errors.ABI_DAG}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>AmBev DAG</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="text"
                              name="AmBev_DAG"
                              placeholder=""
                              value={values.AmBev_DAG}
                              isInvalid={Boolean(touched.AmBev_DAG && errors.AmBev_DAG)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-control"
                            />

                            {!!touched.AmBev_DAG && (
                              <Form.Control.Feedback type="invalid">
                                {errors.AmBev_DAG}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>B2B</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="B2B"
                              placeholder=""
                              value={values.B2B}
                              isInvalid={Boolean(touched.B2B && errors.B2B)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Select B2B</option>
                              <option value="B2B">B2B</option>
                              <option value="B2B & Non-B2B">B2B & Non-B2B</option>
                            </Form.Control>

                            {!!touched.B2B && (
                              <Form.Control.Feedback type="invalid">
                                {errors.B2B}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>FinTech</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="Fintech"
                              placeholder=""
                              value={values.Fintech}
                              isInvalid={Boolean(touched.Fintech && errors.Fintech)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Select FinTech</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Control>

                            {!!touched.Fintech && (
                              <Form.Control.Feedback type="invalid">
                                {errors.Fintech}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>DTC</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="DTC"
                              placeholder=""
                              value={values.DTC}
                              isInvalid={Boolean(touched.DTC && errors.DTC)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Select DTC</option>
                              <option value="DTC & Non-DTC">DTC & Non-DTC</option>
                              <option value="DTC Only">DTC Only</option>
                            </Form.Control>

                            {!!touched.DTC && (
                              <Form.Control.Feedback type="invalid">
                                {errors.DTC}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>Control Split</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="Control_Split"
                              placeholder=""
                              value={values.Control_Split}
                              isInvalid={Boolean(touched.Control_Split && errors.Control_Split)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Select Control Split</option>
                              <option value="Main">Main</option>
                              <option value="Split">Split</option>
                            </Form.Control>

                            {!!touched.Control_Split && (
                              <Form.Control.Feedback type="invalid">
                                {errors.Control_Split}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>Risk</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="text"
                              name="Risk"
                              placeholder=""
                              value={values.Risk}
                              isInvalid={Boolean(touched.Risk && errors.Risk)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-control"
                            />

                            {!!touched.Risk && (
                              <Form.Control.Feedback type="invalid">
                                {errors.Risk}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>Control Name</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="text"
                              name="Control_name"
                              placeholder=""
                              value={values.Control_name}
                              isInvalid={Boolean(touched.Control_name && errors.Control_name)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-control"
                            />

                            {!!touched.Control_name && (
                              <Form.Control.Feedback type="invalid">
                                {errors.Control_name}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    {/*Rich text Editor call*/}
                    <div className="col-lg-12">
                      <div className="row mb-8">
                        <Form.Label className="mt-5">MICS L1 Description</Form.Label>
                        <TextEditor
                          setFieldValue={(val) => setFieldValue('mics_L1desc', val)}
                          value={values.mics_L1desc}
                        />
                        <Form.Label className="mt-8">MICS L2 Description</Form.Label>
                        <TextEditor
                          setFieldValue={(val) => setFieldValue('mics_L2desc', val)}
                          value={values.mics_L2desc}
                        />
                        <Form.Label className="mt-8">MICS L3 Description</Form.Label>
                        <TextEditor
                          setFieldValue={(val) => setFieldValue('mics_L3desc', val)}
                          value={values.mics_L3desc}
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>Key Performance and Risk Indicator Status</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="Kpi_status"
                              placeholder=""
                              value={values.Kpi_status}
                              isInvalid={Boolean(touched.Kpi_status && errors.Kpi_status)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Select Kpi status</option>
                              <option value="KPI Created and Mapped">KPI Created and Mapped</option>
                              <option value="No KPI">No KPI</option>
                            </Form.Control>

                            {!!touched.Kpi_status && (
                              <Form.Control.Feedback type="invalid">
                                {errors.Kpi_status}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>L1 KPI</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="L1_KPI"
                              placeholder=""
                              value={values.L1_KPI}
                              isInvalid={Boolean(touched.L1_KPI && errors.L1_KPI)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Select L1 KPI</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Control>

                            {!!touched.L1_KPI && (
                              <Form.Control.Feedback type="invalid">
                                {errors.L1_KPI}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>L2 KPI</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="L2_KPI"
                              placeholder=""
                              value={values.L2_KPI}
                              isInvalid={Boolean(touched.L2_KPI && errors.L2_KPI)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Select L2 KPI</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Control>

                            {!!touched.L2_KPI && (
                              <Form.Control.Feedback type="invalid">
                                {errors.L2_KPI}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>L3 KPI</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="L3_KPI"
                              placeholder=""
                              value={values.L3_KPI}
                              isInvalid={Boolean(touched.L3_KPI && errors.L3_KPI)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Select L3 KPI</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Control>

                            {!!touched.L3_KPI && (
                              <Form.Control.Feedback type="invalid">
                                {errors.L3_KPI}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>Balance Sheet Impact</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="text"
                              name="BS_impact"
                              placeholder=""
                              value={values.BS_impact}
                              isInvalid={Boolean(touched.BS_impact && errors.BS_impact)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-control"
                            />

                            {!!touched.BS_impact && (
                              <Form.Control.Feedback type="invalid">
                                {errors.BS_impact}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>PnL Impact</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="text"
                              name="PnL_impact"
                              placeholder=""
                              value={values.PnL_impact}
                              isInvalid={Boolean(touched.PnL_impact && errors.PnL_impact)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-control"
                            />

                            {!!touched.PnL_impact && (
                              <Form.Control.Feedback type="invalid">
                                {errors.PnL_impact}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>Cash Flow Impact</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="text"
                              name="Cash_flow_impact"
                              placeholder=""
                              value={values.Cash_flow_impact}
                              isInvalid={Boolean(
                                touched.Cash_flow_impact && errors.Cash_flow_impact,
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-control"
                            />

                            {!!touched.Cash_flow_impact && (
                              <Form.Control.Feedback type="invalid">
                                {errors.Cash_flow_impact}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>Testing Approach</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="testing_approach"
                              placeholder=""
                              value={values.testing_approach}
                              isInvalid={Boolean(
                                touched.testing_approach && errors.testing_approach,
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Select Testing Approach</option>
                              <option value="Data Driven Testing (KPI's, system review)">
                                Data Driven Testing (KPI's, system review)
                              </option>
                              <option value="Self-assessment only">Self-assessment only</option>
                              <option value="Walkthrough">Walkthrough</option>
                              <option value="Walkthrough (with involvement of the legal/compliance)">
                                Walkthrough (with involvement of the legal/compliance)
                              </option>
                              <option value="Walkthrough by IC">Walkthrough by IC</option>
                              <option value="Walkthrough by Zone Reporting">
                                Walkthrough by Zone Reporting
                              </option>
                            </Form.Control>

                            {!!touched.testing_approach && (
                              <Form.Control.Feedback type="invalid">
                                {errors.testing_approach}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>Change Comment</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="text"
                              name="change_comment"
                              placeholder=""
                              value={values.change_comment}
                              isInvalid={Boolean(touched.change_comment && errors.change_comment)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-control"
                            />

                            {!!touched.change_comment && (
                              <Form.Control.Feedback type="invalid">
                                {errors.change_comment}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>Change Size</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="Change_Size"
                              placeholder=""
                              value={values.Change_Size}
                              isInvalid={Boolean(touched.Change_Size && errors.Change_Size)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Select Change Size</option>
                              <option value="Change">Change</option>
                              <option value="No Change">No Change</option>
                              <option value="Small Change">Small Change</option>
                            </Form.Control>

                            {!!touched.Change_Size && (
                              <Form.Control.Feedback type="invalid">
                                {errors.Change_Size}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>Reviewed</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="Reviewed"
                              placeholder=""
                              value={values.Reviewed}
                              isInvalid={Boolean(touched.Reviewed && errors.Reviewed)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Reviewed ?</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </Form.Control>

                            {!!touched.Reviewed && (
                              <Form.Control.Feedback type="invalid">
                                {errors.Reviewed}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>Status</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="Status"
                              placeholder=""
                              value={values.Status}
                              isInvalid={Boolean(touched.Status && errors.Status)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              <option value="">Select Status</option>
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                            </Form.Control>

                            {!!touched.Status && (
                              <Form.Control.Feedback type="invalid">
                                {errors.Status}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center justify-content-end">
                    <div>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleOnclickCancel()}
                      >
                        Cancel
                      </Button>
                      <Button color="neutral" className="ml-4" onClick={handleSubmit}>
                        Confirm
                      </Button>
                    </div>
                  </div>
                  <GetFormikFieldValue />
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </PageWrapper>
    </div>
  );
};

export default AddValues_MDM_Mics_Framework;

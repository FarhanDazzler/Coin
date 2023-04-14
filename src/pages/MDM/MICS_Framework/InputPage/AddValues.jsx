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
import { addMicsFramework, updateMicsFramework } from '../../../../redux/MDM/MDM_Action';
import { addMicsInitialValues, addMicsValidationSchema } from '../../../../utils/constants';

import { ContentState } from 'draft-js';
import { TextEditor } from '../../../../components/FormInputs/RichTextEditor/RichTextEditor';
import './InputPageStyle.scss';

const AddValues_MDM_Mics_Framework = (props) => {
  // Access passed props from location.state

  const title = props.location.state.data?.title;
  const modalType = props.location.state.data?.modalType;
  const editTableData = props.location.state.data?.editTableData;

  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  // Handel Rich Text Editor POP up close

  const handleOnclickCancel = () => {
    history.push('/master-data-management/mics-framework');
  };
  const handleSaveAdd = (value) => {
    console.log(value);
    let payload = {
      MICS_2020_No: value.MICS_2020_No,
      MICS_2021_No: value.MICS_2021_No,
      Control_ID: value.Control_ID,
      Mega_Process: value.Mega_Process,
      ABI_Key: parseInt(value.ABI_Key),
      Ambev_Key: parseInt(value.Ambev_Key),
      FCPA: parseInt(value.FCPA),
      Frequency: value.Frequency,
      Preventive_Detective: parseInt(value.Preventive_Detective),
      Automation: value.Automation,
      Recommended_Level: value.Recommended_Level,
      Maturity_Relevant: parseInt(value.Maturity_Relevant),
      mics_weight: parseInt(value.mics_weight),
      Recommended_Standardization: value.Recommended_Standardization,
      ABI_DAG: value.ABI_DAG,
      AmBev_DAG: value.AmBev_DAG,
      B2B: value.B2B,
      Fintech: parseInt(value.Fintech),
      Control_Split: parseInt(value.Control_Split),
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
      L3_KPI: parseInt(value.L3_KPI),
      L2_KPI: parseInt(value.L2_KPI),
      L1_KPI: parseInt(value.L1_KPI),
      Kpi_status: parseInt(value.Kpi_status),
      Change: value.Change,
      change_comment: value.change_comment,
      Risk_ID: value.Risk_ID,
    };

    let editPayload = {
      MICS_2020_No: value.MICS_2020_No,
      MICS_2021_No: value.MICS_2021_No,
      Control_ID: editTableData?.Control_ID,
      Mega_Process: value.Mega_Process,
      ABI_Key: parseInt(value.ABI_Key),
      Ambev_Key: parseInt(value.Ambev_Key),
      FCPA: parseInt(value.FCPA),
      Frequency: value.Frequency,
      Preventive_Detective: parseInt(value.Preventive_Detective),
      Automation: value.Automation,
      Recommended_Level: value.Recommended_Level,
      Maturity_Relevant: parseInt(value.Maturity_Relevant),
      mics_weight: parseInt(value.mics_weight),
      Recommended_Standardization: value.Recommended_Standardization,
      ABI_DAG: value.ABI_DAG,
      AmBev_DAG: value.AmBev_DAG,
      B2B: value.B2B,
      Fintech: parseInt(value.Fintech),
      Control_Split: parseInt(value.Control_Split),
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
      L3_KPI: parseInt(value.L3_KPI),
      L2_KPI: parseInt(value.L2_KPI),
      L1_KPI: parseInt(value.L1_KPI),
      Kpi_status: parseInt(value.Kpi_status),
      Change: value.Change,
      change_comment: value.change_comment,
      Risk_ID: value.Risk_ID,
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
                MICS_2020_No: editTableData?.MICS_2020_No || '',
                MICS_2021_No: editTableData?.MICS_2021_No ? editTableData?.MICS_2021_No : '',
                Control_ID: editTableData?.Control_ID ? editTableData?.Control_ID : '',
                Mega_Process: editTableData?.Mega_Process ? editTableData?.Mega_Process : '',
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
                Change: editTableData?.Change ? editTableData?.Change : '',
                change_comment: editTableData?.change_comment ? editTableData?.change_comment : '',
                Risk_ID: editTableData?.Risk_ID ? editTableData?.Risk_ID : '',
              }}
              validationSchema={Yup.object().shape(addMicsValidationSchema)}
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
                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>MICS_2020_No</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="text"
                              name="MICS_2020_No"
                              placeholder=""
                              value={values.MICS_2020_No}
                              isInvalid={Boolean(touched.MICS_2020_No && errors.MICS_2020_No)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-control"
                            />

                            {!!touched.MICS_2020_No && (
                              <Form.Control.Feedback type="invalid">
                                {errors.MICS_2020_No}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>MICS_2021_No</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="text"
                              name="MICS_2021_No"
                              placeholder=""
                              value={values.MICS_2021_No}
                              isInvalid={Boolean(touched.MICS_2021_No && errors.MICS_2021_No)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-control"
                            />

                            {!!touched.MICS_2021_No && (
                              <Form.Control.Feedback type="invalid">
                                {errors.MICS_2021_No}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>Control_ID</Form.Label>
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
                          <Form.Label>Mega_Process</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="text"
                              name="Mega_Process"
                              placeholder=""
                              value={values.Mega_Process}
                              isInvalid={Boolean(touched.Mega_Process && errors.Mega_Process)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-control"
                            />

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
                          <Form.Label>ABI_Key</Form.Label>
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
                              <option value="1">Yes</option>
                              <option value="0">No</option>
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
                          <Form.Label>Ambev_Key</Form.Label>
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
                              <option value="1">Yes</option>
                              <option value="0">No</option>
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
                              <option value="1">Yes</option>
                              <option value="0">No</option>
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
                              type="text"
                              name="Frequency"
                              placeholder=""
                              value={values.Frequency}
                              isInvalid={Boolean(touched.Frequency && errors.Frequency)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-control"
                            />

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
                          <Form.Label>Preventive_Detective</Form.Label>
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
                              <option value="1">Yes</option>
                              <option value="0">No</option>
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
                          <Form.Label>Automation</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="text"
                              name="Automation"
                              placeholder=""
                              value={values.Automation}
                              isInvalid={Boolean(touched.Automation && errors.Automation)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-control"
                            />

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
                          <Form.Label>Recommended_Level</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="text"
                              name="Recommended_Level"
                              placeholder=""
                              value={values.Recommended_Level}
                              isInvalid={Boolean(
                                touched.Recommended_Level && errors.Recommended_Level,
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-control"
                            />

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
                          <Form.Label>Maturity_Relevant</Form.Label>
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
                              <option value="1">Yes</option>
                              <option value="0">No</option>
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
                          <Form.Label>mics_weight</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="number"
                              name="mics_weight"
                              placeholder=""
                              value={values.mics_weight}
                              isInvalid={Boolean(touched.mics_weight && errors.mics_weight)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-control"
                            />

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
                          <Form.Label>Recommended_Standardization</Form.Label>
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
                          <Form.Label>ABI_DAG</Form.Label>
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
                          <Form.Label>AmBev_DAG</Form.Label>
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
                              type="text"
                              name="B2B"
                              placeholder=""
                              value={values.B2B}
                              isInvalid={Boolean(touched.B2B && errors.B2B)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-control"
                            />

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
                          <Form.Label>Fintech</Form.Label>
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
                              <option value="">Select Maturity Relevant</option>
                              <option value="1">Yes</option>
                              <option value="0">No</option>
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
                          <Form.Label>Control_Split</Form.Label>
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
                              <option value="1">Yes</option>
                              <option value="0">No</option>
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
                          <Form.Label>Sub_Process</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="text"
                              name="Sub_Process"
                              placeholder=""
                              value={values.Sub_Process}
                              isInvalid={Boolean(touched.Sub_Process && errors.Sub_Process)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-control"
                            />

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
                          <Form.Label>Control_name</Form.Label>
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
                    <div className="row mb-4">
                      <p>mics_L1desc</p>
                      <TextEditor
                        setFieldValue={(val) => setFieldValue('mics_L1desc', val)}
                        value={values.mics_L1desc}
                      />

                      <p>mics_L2desc</p>
                      <TextEditor
                        setFieldValue={(val) => setFieldValue('mics_L2desc', val)}
                        value={values.mics_L2desc}
                      />
                      <p>mics_L3desc</p>
                      <TextEditor
                        setFieldValue={(val) => setFieldValue('mics_L3desc', val)}
                        value={values.mics_L3desc}
                      />
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>BS_impact</Form.Label>
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
                          <Form.Label>PnL_impact</Form.Label>
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
                          <Form.Label>Cash_flow_impact</Form.Label>
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
                          <Form.Label>testing_approach</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="text"
                              name="testing_approach"
                              placeholder=""
                              value={values.testing_approach}
                              isInvalid={Boolean(
                                touched.testing_approach && errors.testing_approach,
                              )}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-control"
                            />

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
                          <Form.Label>L3_KPI</Form.Label>
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
                              <option value="1">Yes</option>
                              <option value="0">No</option>
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
                          <Form.Label>L2_KPI</Form.Label>
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
                              <option value="1">Yes</option>
                              <option value="0">No</option>
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
                          <Form.Label>L1_KPI</Form.Label>
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
                              <option value="1">Yes</option>
                              <option value="0">No</option>
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
                          <Form.Label>Kpi_status</Form.Label>
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
                              <option value="1">Yes</option>
                              <option value="0">No</option>
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
                          <Form.Label>Change</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="text"
                              name="Change"
                              placeholder=""
                              value={values.Change}
                              isInvalid={Boolean(touched.Change && errors.Change)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-control"
                            />

                            {!!touched.Change && (
                              <Form.Control.Feedback type="invalid">
                                {errors.Change}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-5">
                          <Form.Label>change_comment</Form.Label>
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
                          <Form.Label>Risk_ID</Form.Label>
                        </div>
                        <div className="col-lg-7">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="text"
                              name="Risk_ID"
                              placeholder=""
                              value={values.Risk_ID}
                              isInvalid={Boolean(touched.Risk_ID && errors.Risk_ID)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-control"
                            />

                            {!!touched.Risk_ID && (
                              <Form.Control.Feedback type="invalid">
                                {errors.Risk_ID}
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

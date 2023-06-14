import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useFormikContext, Formik } from 'formik';
import { Form } from 'react-bootstrap';
import Button from '../../../../../MDM/MDM_Tab_Buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import useDebounce from '../../../../../../hooks/useDebounce';
import AdSearch from '../../../../../AdminPage/AssessmentModulePanel/Tables/AdSearch';
import {
  getUserFromADSelector,
  isEmailValidADSelector,
} from '../../../../../../redux/AzureAD/AD_Selectors';
import { getUserFromAD } from '../../../../../../redux/AzureAD/AD_Action';
import {
  addRlFunctionalMasterdata,
  get_rep_bu_form_zone,
  get_rep_functions,
  get_rep_zones,
} from '../../../../../../redux/REP_Letters/RLMDM/RLMDMAction';
import {
  get_rep_bu_form_zoneSelector,
  get_rep_functionsSelector,
  get_rep_zonesSelector,
} from '../../../../../../redux/REP_Letters/RLMDM/RLMDMSelectors';

const GetFormikFieldValue = () => {
  // Grab values and submitForm from context
  const dispatch = useDispatch();
  const { values } = useFormikContext();
  useEffect(() => {
    if (values.Zone) {
      let ZoneList = [];
      ZoneList.push(values.Zone);
      let payload = { zone: ZoneList };
      dispatch(get_rep_bu_form_zone(payload));
    }
  }, [values]);
  return null;
};

const AddFunctionalMasterdataModal = ({ setShowModal }) => {
  const dispatch = useDispatch();

  const userFromAD = useSelector(getUserFromADSelector);
  const isEmailValidADState = useSelector(isEmailValidADSelector);
  const [adMode, setAdMode] = useState('');
  const [isStart, setIsStart] = useState(false);
  const [block, setBlock] = useState();

  useEffect(() => {
    dispatch(get_rep_zones());
    dispatch(get_rep_functions());
  }, []);

  const get_rep_zonesState = useSelector(get_rep_zonesSelector);
  const get_rep_bu_form_zoneState = useSelector(get_rep_bu_form_zoneSelector);
  const get_rep_functionsState = useSelector(get_rep_functionsSelector);

  const [recepientValue, setRecepientValue] = useState('');
  const recepient_debounce = useDebounce(recepientValue, 500);
  const [zone_ControlValue, setZone_ControlValue] = useState('');
  const zone_Control_debounce = useDebounce(zone_ControlValue, 500);

  useEffect(() => {}, [isEmailValidADState.data]);

  useEffect(() => {
    if (!recepientValue) return;
    dispatch(getUserFromAD({ username: recepientValue }));
  }, [recepient_debounce]);

  useEffect(() => {
    if (!zone_ControlValue) return;
    dispatch(getUserFromAD({ username: zone_ControlValue }));
  }, [zone_Control_debounce]);

  useEffect(() => {
    if (userFromAD.loading) return;
    const apiUserData = userFromAD.data || [];

    const userData = apiUserData.map((d) => ({ value: d.mail, label: d.displayName }));
    const updateAnsObj = { dropDownOption: userData, loading: false };
    setBlock(updateAnsObj);
  }, [userFromAD.data]);

  const handleSaveAssign = (value) => {
    const payload = {
      Zone: value.Zone,
      BU: value.BU,
      Functional: value.Functional,
      Applicability: value.Applicability,
      Recipient: value.Recipient,
      Title_Position: value.Title_Position,
      Zone_Control: value.Zone_Control,
    };

    //console.log(payload, 'Payload');
    dispatch(addRlFunctionalMasterdata(payload));
  };

  const handleChangeAd = (value, mode) => {
    if (mode === 'Recipient') {
      setAdMode('Recipient');
    } else {
      setAdMode('Zone_Control');
    }
    setBlock({ dropDownOption: [], loading: true });
  };

  return (
    <>
      <div className="p-5 assign-modal">
        <Formik
          enableReinitialize
          initialValues={{
            Zone: '',
            BU: '',
            Functional: '',
            Applicability: '',
            Recipient: '',
            Title_Position: '',
            Zone_Control: '',
          }}
          validationSchema={Yup.object().shape({
            Zone: Yup.string().required('Zone is required'),
            BU: Yup.string().required('BU/Org Type is required'),
            Functional: Yup.string().required('Function is required'),
            Applicability: Yup.string().required('Applicability is required'),
            Recipient: Yup.string().when('Applicability', {
              is: 'Yes',
              then: Yup.string().required('Recipient Email is required'),
            }),
            Zone_Control: Yup.string().when('Applicability', {
              is: 'Yes',
              then: Yup.string().required('Zone Control Email is required'),
            }),
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
            <>
              <Form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="row mb-4">
                      <div className="col-lg-5">
                        <Form.Label>Zone:</Form.Label>
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
                            {get_rep_zonesState?.data.map((data, i) => (
                              <option key={i} value={data.Zone}>
                                {data.Zone}
                              </option>
                            ))}
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
                        <Form.Label>Select BU/Org Type:</Form.Label>
                      </div>
                      <div className="col-lg-7">
                        <Form.Group className="input-group mb-3">
                          <Form.Control
                            as="select"
                            name="BU"
                            placeholder=""
                            value={values.BU}
                            isInvalid={Boolean(touched.BU && errors.BU)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            readOnly={false}
                            className="form-select"
                          >
                            <option value="">Select Parent Process</option>
                            {get_rep_bu_form_zoneState?.data.map((data, i) => (
                              <option key={i} value={data.BU}>
                                {data.BU}
                              </option>
                            ))}
                          </Form.Control>

                          {!!touched.BU && (
                            <Form.Control.Feedback type="invalid">
                              {errors.BU}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="row mb-4">
                      <div className="col-lg-5">
                        <Form.Label>Select Function:</Form.Label>
                      </div>
                      <div className="col-lg-7">
                        <Form.Group className="input-group mb-3">
                          <Form.Control
                            as="select"
                            name="Functional"
                            placeholder=""
                            value={values.Functional}
                            isInvalid={Boolean(touched.Functional && errors.Functional)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            readOnly={false}
                            className="form-select"
                          >
                            <option value="">Select Parent Process</option>
                            {get_rep_functionsState?.data.map((data, i) => (
                              <option key={i} value={data.functions}>
                                {data.functions}
                              </option>
                            ))}
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
                      <div className="col-lg-4">
                        <Form.Label>Applicability:</Form.Label>
                      </div>
                      <div className="col-lg-8">
                        <Form.Group className="input-group mb-3">
                          <Form.Control
                            as="select"
                            name="Applicability"
                            placeholder=""
                            value={values.Applicability}
                            isInvalid={Boolean(touched.Applicability && errors.Applicability)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            readOnly={false}
                            className="form-select"
                          >
                            <option value="">Select Applicability</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </Form.Control>

                          {!!touched.Applicability && (
                            <Form.Control.Feedback type="invalid">
                              {errors.Applicability}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                  </div>

                  {values.Applicability === 'Yes' && (
                    <>
                      <div className="col-lg-6">
                        <div className="row mb-4">
                          <div className="col-lg-4">
                            <Form.Label>Recipient:</Form.Label>
                          </div>
                          <div className="col-lg-8">
                            <Form.Group className="input-group mb-3">
                              <Form.Control
                                type="text"
                                name="Recipient"
                                placeholder=""
                                value={values.Recipient}
                                isInvalid={Boolean(touched.Recipient && errors.Recipient)}
                                onBlur={handleBlur}
                                onChange={(e) => {
                                  setFieldValue('Recipient', e.target.value);
                                  setRecepientValue(e.target.value);
                                  handleChangeAd(e.target.value, 'Recipient');
                                }}
                                readOnly={false}
                                className="form-control"
                              />

                              {!!touched.Recipient && (
                                <Form.Control.Feedback type="invalid">
                                  {errors.Recipient}
                                </Form.Control.Feedback>
                              )}
                            </Form.Group>
                            {adMode === 'Recipient' && (
                              <AdSearch
                                block={block}
                                userApiStart={isStart}
                                values={values.Recipient}
                                setBlock={setBlock}
                                setFieldValue={(val) => {
                                  if (!val) return;
                                  setFieldValue('Recipient', val);
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="row mb-4">
                          <div className="col-lg-5">
                            <Form.Label>Title/Position:</Form.Label>
                          </div>
                          <div className="col-lg-7">
                            <Form.Group className="input-group mb-3">
                              <Form.Control
                                type="text"
                                name="Title_Position"
                                placeholder=""
                                value={values.Title_Position}
                                isInvalid={Boolean(touched.Title_Position && errors.Title_Position)}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                maxLength={5000}
                                readOnly={false}
                                className="form-control"
                              />

                              {!!touched.Title_Position && (
                                <Form.Control.Feedback type="invalid">
                                  {errors.Title_Position}
                                </Form.Control.Feedback>
                              )}
                            </Form.Group>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="row mb-4">
                          <div className="col-lg-4">
                            <Form.Label>Zone Control:</Form.Label>
                          </div>
                          <div className="col-lg-8">
                            <Form.Group className="input-group mb-3">
                              <Form.Control
                                type="text"
                                name="Zone_Control"
                                placeholder=""
                                value={values.Zone_Control}
                                isInvalid={Boolean(touched.Zone_Control && errors.Zone_Control)}
                                onBlur={handleBlur}
                                onChange={(e) => {
                                  setFieldValue('Zone_Control', e.target.value);
                                  setZone_ControlValue(e.target.value);
                                  handleChangeAd(e.target.value, 'Zone_Control');
                                }}
                                readOnly={false}
                                className="form-control"
                              />

                              {!!touched.Zone_Control && (
                                <Form.Control.Feedback type="invalid">
                                  {errors.Zone_Control}
                                </Form.Control.Feedback>
                              )}
                            </Form.Group>
                            {adMode === 'Zone_Control' && (
                              <AdSearch
                                block={block}
                                userApiStart={isStart}
                                values={values.Zone_Control}
                                setBlock={setBlock}
                                setFieldValue={(val) => {
                                  if (!val) return;
                                  setFieldValue('Zone_Control', val);
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
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

export default AddFunctionalMasterdataModal;

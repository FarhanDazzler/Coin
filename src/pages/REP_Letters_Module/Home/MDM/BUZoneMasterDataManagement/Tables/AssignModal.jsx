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
import { assignRlBuZoneMasterdata } from '../../../../../../redux/REP_Letters/RLMDM/RLMDMAction';

const GetFormikFieldValue = () => {
  // Grab values and submitForm from context
  const dispatch = useDispatch();
  const { values } = useFormikContext();
  useEffect(() => {}, [values]);
  return null;
};

const AssignModal = ({ setShowModal, assignTableData }) => {
  const dispatch = useDispatch();

  const userFromAD = useSelector(getUserFromADSelector);
  const isEmailValidADState = useSelector(isEmailValidADSelector);
  const [adMode, setAdMode] = useState('');
  const [isStart, setIsStart] = useState(false);
  const [block, setBlock] = useState();

  const [disclosureProcessorValue, setDisclosureProcessorValue] = useState('');
  const disclosureProcessor_debounce = useDebounce(disclosureProcessorValue, 500);
  const [zone_Legal_RepresentativeValue, setZone_Legal_RepresentativeValue] = useState('');
  const zone_Legal_Representative_debounce = useDebounce(zone_Legal_RepresentativeValue, 500);
  const [excom_MemberValue, setExcom_MemberValue] = useState('');
  const excom_Member_debounce = useDebounce(excom_MemberValue, 500);
  const [zoneControlValue, setZoneControlValue] = useState('');
  const zoneControl_debounce = useDebounce(zoneControlValue, 500);
  const [zoneVPValue, setZoneVPValue] = useState('');
  const zoneVP_debounce = useDebounce(zoneVPValue, 500);

  useEffect(() => {}, [isEmailValidADState.data]);

  useEffect(() => {
    if (!disclosureProcessorValue) return;
    dispatch(getUserFromAD({ username: disclosureProcessorValue }));
  }, [disclosureProcessor_debounce]);

  useEffect(() => {
    if (!zone_Legal_RepresentativeValue) return;
    dispatch(getUserFromAD({ username: zone_Legal_RepresentativeValue }));
  }, [zone_Legal_Representative_debounce]);

  useEffect(() => {
    if (!excom_MemberValue) return;
    dispatch(getUserFromAD({ username: excom_MemberValue }));
  }, [excom_Member_debounce]);

  useEffect(() => {
    if (!zoneControlValue) return;
    dispatch(getUserFromAD({ username: zoneControlValue }));
  }, [zoneControl_debounce]);

  useEffect(() => {
    if (!zoneVPValue) return;
    dispatch(getUserFromAD({ username: zoneVPValue }));
  }, [zoneVP_debounce]);

  useEffect(() => {
    if (userFromAD.loading) return;
    const apiUserData = userFromAD.data || [];

    const userData = apiUserData.map((d) => ({ value: d.mail, label: d.displayName }));
    const updateAnsObj = { dropDownOption: userData, loading: false };
    setBlock(updateAnsObj);
  }, [userFromAD.data]);

  const handleSaveAssign = (value) => {
    const newState = assignTableData.map((obj) => {
      let updateObj = { ...obj };
      // if (value.Applicability !== '') {
      //   updateObj.Applicability = value.Applicability;
      // }
      if (value.Disclosure_Processor !== '') {
        updateObj.Disclosure_Processor = value.Disclosure_Processor;
      }
      if (value.Zone_Legal_Representative !== '') {
        updateObj.Zone_Legal_Representative = value.Zone_Legal_Representative;
      }
      if (value.Excom_Member !== '') {
        updateObj.Excom_Member = value.Excom_Member;
      }
      if (value.Zone_Control !== '') {
        updateObj.Zone_Control = value.Zone_Control;
      }
      if (value.Zone_VP !== '') {
        updateObj.Zone_VP = value.Zone_VP;
      }

      return { ...updateObj };
    });
    const payload = {
      bu_zone_master_data: newState,
    };
    console.log(payload, 'Payload');
    dispatch(assignRlBuZoneMasterdata(payload));
  };

  const handleChangeAd = (value, mode) => {
    if (mode === 'Disclosure_Processor') {
      setAdMode('Disclosure_Processor');
    } else if (mode === 'Zone_Legal_Representative') {
      setAdMode('Zone_Legal_Representative');
    } else if (mode === 'Excom_Member') {
      setAdMode('Excom_Member');
    } else if (mode === 'Zone_Control') {
      setAdMode('Zone_Control');
    } else {
      setAdMode('Zone_VP');
    }
    setBlock({ dropDownOption: [], loading: true });
  };

  return (
    <>
      <div className="p-5 assign-modal">
        <Formik
          enableReinitialize
          initialValues={
            assignTableData.length > 1
              ? {
                  // Applicability: '',
                  Disclosure_Processor: '',
                  Excom_Member: '',
                  Zone_Legal_Representative: '',
                  Zone_Control: '',
                  Zone_VP: '',
                }
              : {
                  // Applicability: assignTableData[0]?.Applicability || '',
                  Disclosure_Processor: assignTableData[0]?.Disclosure_Processor || '',
                  Excom_Member: assignTableData[0]?.Excom_Member || '',
                  Zone_Legal_Representative: assignTableData[0]?.Zone_Legal_Representative || '',
                  Zone_Control: assignTableData[0]?.Zone_Control || '',
                  Zone_VP: assignTableData[0]?.Zone_VP || '',
                }
          }
          validationSchema={Yup.object().shape({
            // Applicability: Yup.string().required('Applicability is required'),
            Disclosure_Processor: Yup.string().required('Local Internal Control Email is required'),
            Excom_Member: Yup.string().required('Excom Member Email is required'),
            Zone_Legal_Representative: Yup.string().required(
              'Zone legal representative Email is required',
            ),
            Zone_Control: Yup.string().required('Zone Control Email is required'),
            Zone_VP: Yup.string().required('Zone VP Email is required'),
            // Zone_Control: Yup.string().when('Applicability', {
            //   is: 'Yes',
            //   then: Yup.string().required('Zone Control Email is required'),
            // }),
            // Zone_VP: Yup.string().when('Applicability', {
            //   is: 'Yes',
            //   then: Yup.string().required('Zone VP Email is required'),
            // }),
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
                <Form.Label>Selected Zone:</Form.Label>
                <div className="selected-controls">
                  <table className="table table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th>Zone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignTableData &&
                        assignTableData.map((data, i) => (
                          <tr>
                            <td>{data?.Zone}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <hr />

                <div className="row">
                  {/* <div className="col-lg-6">
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
                  </div> */}

                  {/* {values.Applicability === 'Yes' && (
                    <> */}

                  <div className="col-lg-6">
                    <div className="row mb-4">
                      <div className="col-lg-4">
                        <Form.Label>Local Internal Control:</Form.Label>
                      </div>
                      <div className="col-lg-8">
                        <Form.Group className="input-group mb-3">
                          <Form.Control
                            type="text"
                            name="Disclosure_Processor"
                            placeholder=""
                            value={values.Disclosure_Processor}
                            isInvalid={Boolean(
                              touched.Disclosure_Processor && errors.Disclosure_Processor,
                            )}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              setFieldValue('Disclosure_Processor', e.target.value);
                              setDisclosureProcessorValue(e.target.value);
                              handleChangeAd(e.target.value, 'Disclosure_Processor');
                            }}
                            readOnly={false}
                            className="form-control"
                          />

                          {!!touched.Disclosure_Processor && (
                            <Form.Control.Feedback type="invalid">
                              {errors.Disclosure_Processor}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                        {adMode === 'Disclosure_Processor' && (
                          <AdSearch
                            block={block}
                            userApiStart={isStart}
                            values={values.Disclosure_Processor}
                            setBlock={setBlock}
                            setFieldValue={(val) => {
                              if (!val) return;
                              setFieldValue('Disclosure_Processor', val);
                            }}
                          />
                        )}
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
                              setZoneControlValue(e.target.value);
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
                  <div className="col-lg-6">
                    <div className="row mb-4">
                      <div className="col-lg-4">
                        <Form.Label>Zone VP:</Form.Label>
                      </div>
                      <div className="col-lg-8">
                        <Form.Group className="input-group mb-3">
                          <Form.Control
                            type="text"
                            name="Zone_VP"
                            placeholder=""
                            value={values.Zone_VP}
                            isInvalid={Boolean(touched.Zone_VP && errors.Zone_VP)}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              setFieldValue('Zone_VP', e.target.value);
                              setZoneVPValue(e.target.value);
                              handleChangeAd(e.target.value, 'Zone_VP');
                            }}
                            readOnly={false}
                            className="form-control"
                          />

                          {!!touched.Zone_VP && (
                            <Form.Control.Feedback type="invalid">
                              {errors.Zone_VP}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                        {adMode === 'Zone_VP' && (
                          <AdSearch
                            block={block}
                            userApiStart={isStart}
                            values={values.Zone_VP}
                            setBlock={setBlock}
                            setFieldValue={(val) => {
                              if (!val) return;
                              setFieldValue('Zone_VP', val);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="row mb-4">
                      <div className="col-lg-4">
                        <Form.Label>Excom Member:</Form.Label>
                      </div>
                      <div className="col-lg-8">
                        <Form.Group className="input-group mb-3">
                          <Form.Control
                            type="text"
                            name="Excom_Member"
                            placeholder=""
                            value={values.Excom_Member}
                            isInvalid={Boolean(touched.Excom_Member && errors.Excom_Member)}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              setFieldValue('Excom_Member', e.target.value);
                              setExcom_MemberValue(e.target.value);
                              handleChangeAd(e.target.value, 'Excom_Member');
                            }}
                            readOnly={false}
                            className="form-control"
                          />

                          {!!touched.Excom_Member && (
                            <Form.Control.Feedback type="invalid">
                              {errors.Excom_Member}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                        {adMode === 'Excom_Member' && (
                          <AdSearch
                            block={block}
                            userApiStart={isStart}
                            values={values.Excom_Member}
                            setBlock={setBlock}
                            setFieldValue={(val) => {
                              if (!val) return;
                              setFieldValue('Excom_Member', val);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="row mb-4">
                      <div className="col-lg-4">
                        <Form.Label>Zone Legal Representative:</Form.Label>
                      </div>
                      <div className="col-lg-8">
                        <Form.Group className="input-group mb-3">
                          <Form.Control
                            type="text"
                            name="Zone_Legal_Representative"
                            placeholder=""
                            value={values.Zone_Legal_Representative}
                            isInvalid={Boolean(
                              touched.Zone_Legal_Representative && errors.Zone_Legal_Representative,
                            )}
                            onBlur={handleBlur}
                            onChange={(e) => {
                              setFieldValue('Zone_Legal_Representative', e.target.value);
                              setZone_Legal_RepresentativeValue(e.target.value);
                              handleChangeAd(e.target.value, 'Zone_Legal_Representative');
                            }}
                            readOnly={false}
                            className="form-control"
                          />

                          {!!touched.Zone_Legal_Representative && (
                            <Form.Control.Feedback type="invalid">
                              {errors.Zone_Legal_Representative}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                        {adMode === 'Zone_Legal_Representative' && (
                          <AdSearch
                            block={block}
                            userApiStart={isStart}
                            values={values.Zone_Legal_Representative}
                            setBlock={setBlock}
                            setFieldValue={(val) => {
                              if (!val) return;
                              setFieldValue('Zone_Legal_Representative', val);
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* </>
                  )} */}
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
                      <Button
                        color="neutral"
                        className="ml-4"
                        onClick={handleSubmit}
                        disabled={!isEmailValidADState.data?.isValid}
                      >
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

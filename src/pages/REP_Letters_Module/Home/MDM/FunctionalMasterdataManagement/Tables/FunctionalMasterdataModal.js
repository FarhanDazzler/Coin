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
import { assignRlFunctionalMasterdata } from '../../../../../../redux/REP_Letters/RLMDM/RLMDMAction';

const GetFormikFieldValue = () => {
  // Grab values and submitForm from context
  const dispatch = useDispatch();
  const { values } = useFormikContext();
  useEffect(() => {}, [values]);
  return null;
};

const FunctionalMasterdataModal = ({ setShowModal, assignTableData }) => {
  const dispatch = useDispatch();

  const userFromAD = useSelector(getUserFromADSelector);
  const isEmailValidADState = useSelector(isEmailValidADSelector);
  const [adMode, setAdMode] = useState('');
  const [isStart, setIsStart] = useState(false);
  const [block, setBlock] = useState();

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
    const newState = assignTableData.map((obj) => {
      let updateObj = { ...obj };
      if (value.Applicability !== '') {
        updateObj.Applicability = value.Applicability;
      }
      if (value.Recipient !== '') {
        updateObj.Recipient = value.Recipient;
      }
      if (value.Title_Position !== '') {
        updateObj.Title_Position = value.Title_Position;
      }
      if (value.Zone_Control !== '') {
        updateObj.Zone_Control = value.Zone_Control;
      }

      return { ...updateObj };
    });
    const payload = {
      func_master_data: newState,
    };
    //console.log(payload, 'Payload');
    dispatch(assignRlFunctionalMasterdata(payload));
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
          initialValues={
            assignTableData.length > 1
              ? {
                  Applicability: '',
                  Recipient: '',
                  Title_Position: '',
                  Zone_Control: '',
                }
              : {
                  Applicability: assignTableData[0]?.Applicability || '',
                  Recipient: assignTableData[0]?.Recipient || '',
                  Title_Position: assignTableData[0]?.Title_Position || '',
                  Zone_Control: assignTableData[0]?.Zone_Control || '',
                }
          }
          validationSchema={Yup.object().shape({
            Applicability: Yup.string().required('Applicability is required'),
            Recipient: Yup.string().when('Applicability', {
              is: 'Yes',
              then: Yup.string().required('Recipient Email is required'),
            }),
            Zone_Control: Yup.string().when('Applicability', {
              is: 'Yes',
              then: Yup.string().required('Head of Zone Control Email is required'),
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
                <Form.Label>Selected Function:</Form.Label>
                <div className="selected-controls">
                  <table className="table table-bordered">
                    <thead className="thead-light">
                      <tr>
                        <th>Zone</th>
                        <th>BU / Entity</th>
                        <th>Functional</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignTableData &&
                        assignTableData.map((data, i) => (
                          <tr>
                            <td>{data?.Zone}</td>
                            <td>{data?.BU}</td>
                            <td>{data?.Functional}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <hr />

                <div className="row">
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
                        <div className="col-lg-4">
                          <Form.Label>Title/Position:</Form.Label>
                        </div>
                        <div className="col-lg-8">
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
                          <Form.Label>Head of Zone Control:</Form.Label>
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
                        disabled={
                          block?.loading ||
                          block?.dropDownOption?.length > 0 ||
                          !isEmailValidADState.data?.isValid
                        }
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

export default FunctionalMasterdataModal;

import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormikContext, Formik, Field } from 'formik';
import { Alert, Form } from 'react-bootstrap';
import CustomModal from '../../../../../components/UI/CustomModal';
import Button from '../../../MDM_Tab_Buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
// import { getControlInstanceHistoryAction } from '../../../../../redux/MDM/MDM_Action';
import { getParentEntitySelector } from '../../../../../redux/MDM/MDM_Selectors';
import { getUserFromAD } from '../../../../../redux/AzureAD/AD_Action';
import { getUserFromADSelector } from '../../../../../redux/AzureAD/AD_Selectors';
import moment from 'moment';
import useDebounce from '../../../../../hooks/useDebounce';
import MyStatefulEditor from '../../../../../components/FormInputs/RichTextEditor';
import { TextEditor } from '../../../../../components/FormInputs/RichTextEditor/RichTextEditor';
import {
  modifyControlOwnerAndOversight,
  getControlInstanceHistoryAction,
} from '../../../../../redux/MDM/MDM_Action';
import InputWidthSelect from '../../../../../components/UI/InputWidthSelect/InputWidthSelect';
import AdSearch from './AdSearch';
import { isEmailValidADSelector } from '../../../../../redux/AzureAD/AD_Selectors';
import { Axios } from '../../../../../api/axios';

const GetParentEntityValue = ({ setCownerValue }) => {
  // Grab values and submitForm from context
  const { values } = useFormikContext();
  console.log('values', values);
  useEffect(() => { }, [values]);
  return null;
};

const AssignModal = ({ setShowModal, assignTableData, selectedControlIds }) => {
  console.log('selectedControlIds', selectedControlIds);
  const dispatch = useDispatch();

  const userFromAD = useSelector(getUserFromADSelector);
  const isEmailValidADState = useSelector(isEmailValidADSelector);

  const [cownerValue, setCownerValue] = useState('');
  const [coversightValue, setCoversightValue] = useState('');
  const [adMode, setAdMode] = useState('');
  const cownerValue_debounce = useDebounce(cownerValue, 500);
  const coversightValue_debounce = useDebounce(coversightValue, 500);
  const [showModal, setShowModalRichText] = useState(false);
  const [lcdValue, setLcdValue] = useState('');
  const [isStart, setIsStart] = useState(false);
  const [block, setBlock] = useState();
  const [historyData, setHistoryData] = useState();

  useEffect(() => {
    if (!selectedControlIds) return;
    let payloadForHistory = {
      control_instances: selectedControlIds,
    };
    const getControlInstanceHistoryApi = async () => {
      const result = await Axios.post('/get_control_instances_history', payloadForHistory);
      console.log(result);
      if (result.success) {
        setHistoryData(result?.data);
      }
    };
    getControlInstanceHistoryApi();
    //dispatch(getControlInstanceHistoryAction(payloadForHistory))
  }, []);

  useEffect(() => { }, [isEmailValidADState.data]);

  useEffect(() => {
    if (!cownerValue) return;
    dispatch(getUserFromAD({ username: cownerValue }));
  }, [cownerValue_debounce]);

  useEffect(() => {
    if (!coversightValue) return;
    dispatch(getUserFromAD({ username: coversightValue }));
  }, [coversightValue_debounce]);

  useEffect(() => {
    if (userFromAD.loading) return;
    const apiUserData = userFromAD.data || [];

    const userData = apiUserData.map((d) => ({ value: d.mail, label: d.displayName }));
    const updateAnsObj = { dropDownOption: userData, loading: false };
    setBlock(updateAnsObj);
  }, [userFromAD.data]);

  const handleSaveAssign = (value) => {
    console.log(value);
    const newState = assignTableData.map((obj) => {
      if (value.cowner !== '') {
        return { ...obj, cowner: value.cowner, cowner_valid_from: value.cownerValidFrom };
      }
      if (value.coversight !== '') {
        return { ...obj, coversight: value.coversight, coversight_valid_from: value.coversightValidFrom };
      }
      if (value.cownerValidFrom !== '') {
        return { ...obj, cowner_valid_from: value.cownerValidFrom };
      }
      if (value.cownerValidTo !== '') {
        return { ...obj, cowner_valid_to: value.cownerValidTo };
      }
      if (value.coversightValidFrom !== '') {
        return { ...obj, coversight_valid_from: value.coversightValidFrom };
      }
      if (value.coversightValidTo !== '') {
        return { ...obj, coversight_valid_to: value.coversightValidTo };
      }

      return { ...obj };
    });
    console.log(newState);
    const payload = {
      control_instances: newState,
    };
    dispatch(modifyControlOwnerAndOversight(payload));
  };
  const handleChangeAd = (value, mode) => {
    if (mode === 'cowner') {
      setAdMode('cowner');
    } else {
      setAdMode('coversight');
    }
    setBlock({ dropDownOption: [], loading: true });
  };
  let today = moment().format('YYYY-MM-DD');
  let validToDate = '9999-12-31';
  return (
    <>
      <div className="p-5 assign-modal">
        <Formik
          enableReinitialize
          initialValues={{
            cowner: '',
            coversight: '',
            cownerValidFrom: today ? today : '',
            cownerValidTo: validToDate ? validToDate : '',
            coversightValidFrom : today ? today : '',
            coversightValidTo: validToDate ? validToDate : '',
          }}
          validationSchema={Yup.object().shape({
            // assignTableData: Yup.array()
            //     .of(
            //         Yup.object().shape({
            //             local_control_description: Yup.string().required('LCD Required'),
            //             cowner: Yup.string().required('cowner Required'),
            //         })
            //     )
            // cownerValidFrom: Yup.string().required('Valid Date is required'),
            // cownerValidTo: Yup.string().required('Valid Date is required'),
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
                <div>
                  <div className="selected-controls">
                    <table className="table table-bordered">
                      <thead className="thead-light">
                        <tr>
                          <th>Selected Control ID</th>
                          <th>Previous Control Owner</th>
                          <th>Previous Control Oversight</th>
                          <th>Control Owner Valid From</th>
                          <th>Control Owner Valid To</th>
                          <th>Control Oversight Valid From</th>
                          <th>Control Oversight Valid To</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historyData &&
                          historyData.map((data, i) => (
                            <tr>
                              <td>{data?.control_id_provider_entity}</td>
                              <td>
                                <ul>
                                  {data?.history[0].map((data, i) => (
                                    <li>{data.cowner}</li>
                                  ))}
                                </ul>
                              </td>
                              <td>
                                <ul>
                                  {data?.history[0].map((data, i) => (
                                    <li>{data.coversight}</li>
                                  ))}
                                </ul>
                              </td>
                              <td>
                                <ul>
                                  {data?.history[0].map((data, i) => (
                                    <li>{data.cowner_valid_from}</li>
                                  ))}
                                </ul>
                              </td>
                              <td>
                                <ul>
                                  {data?.history[0].map((data, i) => (
                                    <li>{data.cowner_valid_to}</li>
                                  ))}
                                </ul>
                              </td>
                              <td>
                                <ul>
                                  {data?.history[0].map((data, i) => (
                                    <li>{data.coversight_valid_from}</li>
                                  ))}
                                </ul>
                              </td>
                              <td>
                                <ul>
                                  {data?.history[0].map((data, i) => (
                                    <li>{data.coversight_valid_to}</li>
                                  ))}
                                </ul>
                              </td>
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
                          <Form.Label>Control Owner</Form.Label>
                        </div>
                        <div className="col-lg-8">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="text"
                              name="cowner"
                              placeholder=""
                              value={values.cowner}
                              isInvalid={Boolean(touched.cowner && errors.cowner)}
                              onBlur={handleBlur}
                              //setFieldValue={(val) => setFieldValue(`assignTableData.cowner`, val)}
                              onChange={(e) => {
                                setFieldValue('cowner', e.target.value);
                                setCownerValue(e.target.value);
                                handleChangeAd(e.target.value, 'cowner');
                              }}
                              readOnly={false}
                              className="form-control"
                            />

                            {!!touched.cowner && (
                              <Form.Control.Feedback type="invalid">
                                {errors.cowner}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                          {adMode === 'cowner' && (
                            <AdSearch
                              block={block}
                              userApiStart={isStart}
                              values={values.cowner}
                              setBlock={setBlock}
                              setFieldValue={(val) => {
                                if (!val) return;
                                setFieldValue('cowner', val);
                              }}
                            />
                          )}
                        </div>
                      </div>
                      <div className="row mb-4">
                        <div className="col-lg-4">
                          <Form.Label>Control Owner Valid From</Form.Label>
                        </div>
                        <div className="col-lg-8">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="date"
                              name="cownerValidFrom"
                              placeholder=""
                              value={values.cownerValidFrom}
                              isInvalid={Boolean(touched.cownerValidFrom && errors.cownerValidFrom)}
                              min={today}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-control"
                            />

                            {!!touched.cownerValidFrom && (
                              <Form.Control.Feedback type="invalid">
                                {errors.cownerValidFrom}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                      <div className="row mb-4">
                        <div className="col-lg-4">
                          <Form.Label>Control Owner Valid To</Form.Label>
                        </div>
                        <div className="col-lg-8">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="date"
                              name="cownerValidTo"
                              placeholder=""
                              value={values.cownerValidTo}
                              isInvalid={Boolean(touched.cownerValidTo && errors.cownerValidTo)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-control"
                            />

                            {!!touched.cownerValidTo && (
                              <Form.Control.Feedback type="invalid">
                                {errors.cownerValidTo}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-4">
                          <Form.Label>Control Oversight</Form.Label>
                        </div>
                        <div className="col-lg-8">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="text"
                              name="coversight"
                              placeholder=""
                              value={values.coversight}
                              isInvalid={Boolean(touched.coversight && errors.coversight)}
                              onBlur={handleBlur}
                              onChange={(e) => {
                                setFieldValue('coversight', e.target.value);
                                setCoversightValue(e.target.value);
                                handleChangeAd(e.target.value, 'coversight');
                              }}
                              readOnly={false}
                              className="form-control"
                            />

                            {!!touched.coversight && (
                              <Form.Control.Feedback type="invalid">
                                {errors.coversight}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                          {adMode === 'coversight' && (
                            <AdSearch
                              block={block}
                              userApiStart={isStart}
                              values={values.coversight}
                              setBlock={setBlock}
                              setFieldValue={(val) => {
                                if (!val) return;
                                setFieldValue('coversight', val);
                              }}
                            />
                          )}
                        </div>
                      </div>
                      <div className="row mb-4">
                        <div className="col-lg-4">
                          <Form.Label>Control Oversight Valid From</Form.Label>
                        </div>
                        <div className="col-lg-8">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="date"
                              name="coversightValidFrom"
                              placeholder=""
                              value={values.coversightValidFrom}
                              isInvalid={Boolean(touched.coversightValidFrom && errors.coversightValidFrom)}
                              min={today}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-control"
                            />

                            {!!touched.coversightValidFrom && (
                              <Form.Control.Feedback type="invalid">
                                {errors.coversightValidFrom}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                      <div className="row mb-4">
                        <div className="col-lg-4">
                          <Form.Label>Control Oversight Valid To</Form.Label>
                        </div>
                        <div className="col-lg-8">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="date"
                              name="coversightValidTo"
                              placeholder=""
                              value={values.coversightValidTo}
                              isInvalid={Boolean(touched.coversightValidTo && errors.coversightValidTo)}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-control"
                            />

                            {!!touched.coversightValidTo && (
                              <Form.Control.Feedback type="invalid">
                                {errors.coversightValidTo}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
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
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </Button>
                      <Button color="neutral" className="ml-4" onClick={handleSubmit}>
                        Confirm
                      </Button>
                    </div>
                  </div>
                </div>
                <GetParentEntityValue setCownerValue={setCownerValue} />
              </Form>
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AssignModal;

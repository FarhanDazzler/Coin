import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormikContext, Formik, Field } from 'formik';
import { Alert, Form } from 'react-bootstrap';
import CustomModal from '../../../../../components/UI/CustomModal';
import Button from '../../../MDM_Tab_Buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getControlInstanceHistoryAction } from '../../../../../redux/MDM/MDM_Action';
import {
  getControlInstanceHistorySelector,
  getParentEntitySelector,
} from '../../../../../redux/MDM/MDM_Selectors';
import { getUserFromAD } from '../../../../../redux/AzureAD/AD_Action';
import { getUserFromADSelector } from '../../../../../redux/AzureAD/AD_Selectors';
import moment from 'moment';
import useDebounce from '../../../../../hooks/useDebounce';
import MyStatefulEditor from '../../../../../components/FormInputs/RichTextEditor';
import { TextEditor } from '../../../../../components/FormInputs/RichTextEditor/RichTextEditor';
import { modifyControlOwnerAndOversight } from '../../../../../redux/MDM/MDM_Action';
import InputWidthSelect from '../../../../../components/UI/InputWidthSelect/InputWidthSelect';
import AdSearch from './AdSearch';
import { isEmailValidADSelector } from '../../../../../redux/AzureAD/AD_Selectors';

const GetParentEntityValue = ({ setCownerValue }) => {
  // Grab values and submitForm from context
  const { values } = useFormikContext();
  console.log('values', values);
  useEffect(() => {}, [values]);
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
  // Handel Rich Text Editor POP up close
  const handleSubmitRichText = () => {
    setShowModalRichText('');
  };
  const [lcdValue, setLcdValue] = useState('');
  const [isStart, setIsStart] = useState(false);
  const [block, setBlock] = useState();

  useEffect(() => {
    if (!selectedControlIds) return;
    let payloadForHistory = {
      control_instances: selectedControlIds,
    };
    dispatch(getControlInstanceHistoryAction(payloadForHistory));
  }, []);

  useEffect(() => {}, [isEmailValidADState.data]);

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
    const newState = assignTableData.map((obj) => {
      return {
        ...obj,
        cowner: value.cowner,
        coversight: value.coversight,
        valid_from: value.validFrom,
        valid_to: value.validTo,
      };
    });
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
            validFrom: today ? today : '',
            validTo: validToDate ? validToDate : '',
          }}
          validationSchema={Yup.object().shape({
            // assignTableData: Yup.array()
            //     .of(
            //         Yup.object().shape({
            //             local_control_description: Yup.string().required('LCD Required'),
            //             cowner: Yup.string().required('cowner Required'),
            //         })
            //     )
            validFrom: Yup.string().required('Valid Date is required'),
            validTo: Yup.string().required('Valid Date is required'),
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
                        </tr>
                      </thead>
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
                    </div>

                    <div className="col-lg-6">
                      <div className="row mb-4">
                        <div className="col-lg-4">
                          <Form.Label>Valid From</Form.Label>
                        </div>
                        <div className="col-lg-8">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="date"
                              name="validFrom"
                              placeholder=""
                              value={values.validFrom}
                              isInvalid={Boolean(touched.validFrom && errors.validFrom)}
                              min={today}
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
                        <div className="col-lg-4">
                          <Form.Label>Valid To</Form.Label>
                        </div>
                        <div className="col-lg-8">
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

import React, { useState, useEffect } from 'react';
import { FloatRight } from 'tabler-icons-react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MultiSelect } from '@mantine/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useFormikContext, Formik } from 'formik';
import Button from '../../../MDM/MDM_Tab_Buttons/Button';
import { getUserFromAD } from '../../../../redux/AzureAD/AD_Action';
import { getUserFromADSelector } from '../../../../redux/AzureAD/AD_Selectors';
import moment from 'moment';
import useDebounce from '../../../../hooks/useDebounce';
import AdSearch from './AdSearch';
import { isEmailValidADSelector } from '../../../../redux/AzureAD/AD_Selectors';
import { getAllZone } from '../../../../redux/AssessmentBank/AssessmentBankAction';
import { getAllZoneSelector } from '../../../../redux/AssessmentBank/AssessmentBankSelectors';
import { addAdminRole, modifyAdminRole } from '../../../../redux/AdminPage/AdminPageAction';

const GetFormikValue = () => {
  // Grab values and submitForm from context
  const { values } = useFormikContext();
  useEffect(() => {}, [values]);
  return null;
};

const ZIC_Model = ({ setShowModal, ediatbleData, setEditTableData, modalType }) => {
  const dispatch = useDispatch();

  const [emailValue, setEmailValue] = useState('');
  const [adMode, setAdMode] = useState('');
  const emailValue_debounce = useDebounce(emailValue, 500);

  const [isStart, setIsStart] = useState(false);
  const [block, setBlock] = useState();

  // fetch all zone
  useEffect(() => {
    dispatch(getAllZone());
  }, []);

  const userFromAD = useSelector(getUserFromADSelector);
  const isEmailValidADState = useSelector(isEmailValidADSelector);
  const getAllZone_State = useSelector(getAllZoneSelector);

  console.log(
    getAllZone_State?.data?.map((i) => i.zone),
    'zone from API',
  );

  useEffect(() => {}, [isEmailValidADState.data]);

  useEffect(() => {
    if (!emailValue) return;
    dispatch(getUserFromAD({ username: emailValue }));
  }, [emailValue_debounce]);

  useEffect(() => {
    if (userFromAD.loading) return;
    const apiUserData = userFromAD.data || [];

    const userData = apiUserData.map((d) => ({ value: d.mail, label: d.displayName }));
    const updateAnsObj = { dropDownOption: userData, loading: false };
    setBlock(updateAnsObj);
  }, [userFromAD.data]);

  const handleSave = (values) => {
    if (modalType === 'edit') {
      let payload = {
        Module: 'SA_Admins',
        Zone: values.Zone,
        IC_Email: values.Email,
        Old_IC_OID: ediatbleData.zic_oid,
      };

      console.log(payload, 'ZIC edit payload');
      dispatch(modifyAdminRole(payload));
    } else {
      let payload = {
        Module: 'SA_Admins',
        Zone: values.Zone,
        IC_Email: values.Email,
      };

      console.log(payload, 'ZIC add payload');
      dispatch(addAdminRole(payload));
    }
  };
  const handleChangeAd = () => {
    setAdMode('Email');

    setBlock({ dropDownOption: [], loading: true });
  };

  return (
    <>
      <div className="p-5 assign-modal">
        <Formik
          enableReinitialize
          initialValues={{
            Zone: ediatbleData?.zone_id || '',
            Email: ediatbleData?.zic_email || '',
          }}
          validationSchema={Yup.object().shape({
            Zone: Yup.string().required('Zone is required'),
            Email: Yup.string().required('Email is required'),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
            try {
              handleSave(values);
              setEditTableData();
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
            <>
              <Form onSubmit={handleSubmit}>
                <div>
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
                              {getAllZone_State?.data.map((data, i) => (
                                <option key={i} value={data.zone}>
                                  {data.zone}
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
                        <div className="col-lg-4">
                          <Form.Label>Email:</Form.Label>
                        </div>
                        <div className="col-lg-8">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              type="text"
                              name="Email"
                              placeholder=""
                              value={values.Email}
                              isInvalid={Boolean(touched.Email && errors.Email)}
                              onBlur={handleBlur}
                              onChange={(e) => {
                                setFieldValue('Email', e.target.value);
                                setEmailValue(e.target.value);
                                handleChangeAd(e.target.value, 'Email');
                              }}
                              readOnly={false}
                              className="form-control"
                            />

                            {!!touched.Email && (
                              <Form.Control.Feedback type="invalid">
                                {errors.Email}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                          {adMode === 'Email' && (
                            <AdSearch
                              block={block}
                              userApiStart={isStart}
                              values={values.Email}
                              setBlock={setBlock}
                              setFieldValue={(val) => {
                                if (!val) return;
                                setFieldValue('Email', val);
                              }}
                            />
                          )}
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
                        onClick={() => {
                          setEditTableData();
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
                <GetFormikValue />
              </Form>
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ZIC_Model;
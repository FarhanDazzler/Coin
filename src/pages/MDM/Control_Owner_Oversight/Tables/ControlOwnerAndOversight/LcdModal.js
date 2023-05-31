import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormikContext, Formik, Field } from 'formik';
import { Alert, Form } from 'react-bootstrap';
import CustomModal from '../../../../../components/UI/CustomModal';
import Button from '../../../MDM_Tab_Buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  addOrgStructureAction,
  getParentEntityAction,
  updateOrgStructureAction,
} from '../../../../../redux/MDM/MDM_Action';
import { getParentEntitySelector } from '../../../../../redux/MDM/MDM_Selectors';
import { getUserFromAD } from '../../../../../redux/AzureAD/AD_Action';
import { getUserFromADSelector } from '../../../../../redux/AzureAD/AD_Selectors';
import moment from 'moment';
import useDebounce from '../../../../../hooks/useDebounce';
import MyStatefulEditor from '../../../../../components/FormInputs/RichTextEditor';
import { TextEditor } from '../../../../../components/FormInputs/RichTextEditor/RichTextEditor';
import { modifyControlOwnerAndOversight } from '../../../../../redux/MDM/MDM_Action';

const LcdModal = ({ setShowModal, assignTableData }) => {
  const dispatch = useDispatch();
  const [qId2Value, setQId2Value] = useState('');
  const q_id_2_debounce = useDebounce(qId2Value, 500);
  const [showModal, setShowModalRichText] = useState(false);
  // Handel Rich Text Editor POP up close
  const handleSubmitRichText = () => {
    setShowModalRichText('');
  };
  const [lcdValue, setLcdValue] = useState('');

  const handleSaveAssign = (value) => {
    const newState = assignTableData.map((obj) => {
      if (value.lcd !== '') {
        return { ...obj, local_control_description: value.lcd };
      }

      return { ...obj };
    });
    const payload = {
      control_instances: newState,
    };
    dispatch(modifyControlOwnerAndOversight(payload));
  };

  return (
    <>
      <div className="p-5 assign-modal">
        <Formik
          enableReinitialize
          initialValues={{
            lcd: '',
          }}
          validationSchema={Yup.object().shape({})}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
            try {
              console.log('values', values);
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
                  <Form.Label>Selected Control Id's</Form.Label>
                  <div className="selected-controls">
                    {assignTableData.map((data, i) => (
                      <div className="row">
                        <div className="col-md-12">
                          <div className="row mb-4">
                            <div
                              className="col-md-7"
                              style={{ fontSize: '0.875rem', fontWeight: '900' }}
                            >
                              <p>{data?.control_id_provider_entity}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <hr />

                  <div className="row">
                    {/*Rich text Editor call*/}
                    <div className="col-lg-12">
                      <div className="row mb-4">
                        <div className="col-lg-12">
                          <Form.Label>LCD</Form.Label>
                        </div>
                        <div className="col-lg-12">
                          <Form.Group className="input-group mb-3">
                            <TextEditor
                              setFieldValue={(val) => setFieldValue('lcd', val)}
                              value={values.lcd}
                            />
                          </Form.Group>
                        </div>
                      </div>
                    </div>
                    {/* <div className="col-lg-6">
                                                    <div className='row mb-4'>
                                                        <div className="col-lg-12">
                                                            <Form.Label>LCD</Form.Label>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <Form.Group className="input-group mb-3">
                                                               
                                                                <Form.Control
                                                                    type="text"
                                                                    name={`assignTableData[${i}].local_control_description`}
                                                                    placeholder=""
                                                                    value={values.assignTableData[i].local_control_description}

                                                                    onBlur={handleBlur}

                                                                    onChange={handleChange}
                                                                    readOnly={false}
                                                                    className="form-control"
                                                                />


                                                            </Form.Group>
                                                        </div>
                                                    </div>
                                                </div> */}
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
              </Form>
            </>
          )}
        </Formik>
      </div>
    </>
  );
};

export default LcdModal;

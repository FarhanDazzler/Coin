import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import Button from '../../../MDM_Tab_Buttons/Button';
import { useDispatch } from 'react-redux';
import useDebounce from '../../../../../hooks/useDebounce';
import { modifyControlOwnerAndOversight } from '../../../../../redux/MDM/MDM_Action';
import RichTextEditor from '@mantine/rte';

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
                          <RichTextEditor
                            value={values.lcd}
                            onChange={(val) => setFieldValue('lcd', val)}
                            placeholder="Provide Description here..."
                            controls={[
                              ['bold', 'italic', 'underline'],
                              ['unorderedList', 'h1', 'h2', 'h3'],
                              ['sup', 'sub'],
                              ['alignLeft', 'alignCenter', 'alignRight'],
                            ]}
                            radius="md"
                          />
                          {values.lcd.length > 5000 && (
                            <span className="error">
                              Description is not allowed more than 5000 characters
                            </span>
                          )}
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
                        <Button color="neutral" className="ml-4" disabled={values.lcd.length > 5000} onClick={handleSubmit}>
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

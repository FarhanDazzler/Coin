import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormikContext, Formik, Field } from 'formik';
import { Alert, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../MDM/MDM_Tab_Buttons/Button';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { Divider, Box } from '@mantine/core';
import { IconCalendarCheck } from '@tabler/icons-react';
import { Bell } from 'tabler-icons-react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { scheduleSurveyPage_1Selector } from '../../../redux/AssessmentBank/AssessmentBankSelectors';
import { ScheduleSurveyPage_1 } from '../../../redux/AssessmentBank/AssessmentBankAction';

const GetFormikFieldValue = ({ setPage1Value }) => {
  // Grab values and submitForm from context
  const dispatch = useDispatch();
  const { values } = useFormikContext();
  useEffect(() => {}, [values]);
  return null;
};

const Page1 = ({ handleNext }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [page1Value, setPage1Value] = useState();
  const scheduleSurveyPage_1_State = useSelector(scheduleSurveyPage_1Selector);

  const handleOnclickCancel = () => {
    history.push('/assessmentbank');
  };

  const handleSaveAdd = (value) => {
    //console.log(value);

    let payload = {
      Survey_Name: value.Survey_Name,
      Question_Bank: value.Question_Bank,
      Assessment_Cycle: value.Assessment_Cycle,
      Year: value.Year,
      KPI_From: value.KPI_From,
      KPI_To: value.KPI_To,
      Start_Date: value.Start_Date,
      Due_Date: value.Due_Date,
      Control_Owner_Reminder_1: value.Control_Owner_Reminder_1,
      Control_Owner_Reminder_2: value.Control_Owner_Reminder_2,
      Control_Oversight_Pending_Notification_1: value.Control_Oversight_Pending_Notification_1,
      Control_Oversight_Pending_Notification_2: value.Control_Oversight_Pending_Notification_2,
      Control_Oversight_Review_Notification_1: value.Control_Oversight_Review_Notification_1,
      Control_Oversight_Review_Notification_2: value.Control_Oversight_Review_Notification_2,
    };

    console.log(payload, 'Page 1 payload');
    dispatch(ScheduleSurveyPage_1(payload));
    console.log(scheduleSurveyPage_1_State, 'After submit from selector');
    handleNext();
  };

  // logic for Year picker
  const years = [];
  const currentYear = new Date().getFullYear();
  const startYear = 2022; // Change as needed
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }

  return (
    <div className="p-5">
      <h4 className="AssessmentBank-inputPage-title">Schedule Assessment - MICS</h4>
      <Formik
        enableReinitialize
        initialValues={{
          Survey_Name: scheduleSurveyPage_1_State?.Survey_Name || '',
          Question_Bank: scheduleSurveyPage_1_State?.Question_Bank || '',
          Assessment_Cycle: scheduleSurveyPage_1_State?.Assessment_Cycle || '',
          Year: scheduleSurveyPage_1_State?.Year || '',
          KPI_From: scheduleSurveyPage_1_State?.KPI_From || '',
          KPI_To: scheduleSurveyPage_1_State?.KPI_To || '',
          Start_Date: scheduleSurveyPage_1_State?.Start_Date || '',
          Due_Date: scheduleSurveyPage_1_State?.Due_Date || '',
          Control_Owner_Reminder_1: scheduleSurveyPage_1_State?.Control_Owner_Reminder_1 || '',
          Control_Owner_Reminder_2: scheduleSurveyPage_1_State?.Control_Owner_Reminder_2 || '',
          Control_Oversight_Pending_Notification_1:
            scheduleSurveyPage_1_State?.Control_Oversight_Pending_Notification_1 || '',
          Control_Oversight_Pending_Notification_2:
            scheduleSurveyPage_1_State?.Control_Oversight_Pending_Notification_2 || '',
          Control_Oversight_Review_Notification_1:
            scheduleSurveyPage_1_State?.Control_Oversight_Review_Notification_1 || '',
          Control_Oversight_Review_Notification_2:
            scheduleSurveyPage_1_State?.Control_Oversight_Review_Notification_2 || '',
        }}
        validationSchema={Yup.object().shape({
          Survey_Name: Yup.string().required('Survey Name is required'),
          Question_Bank: Yup.string().required('Question Bank is required'),
          Assessment_Cycle: Yup.string().required('Assessment Cycle is required'),
          Year: Yup.string().required('Year is required'),
          KPI_From: Yup.string().required('KPI From is required'),
          KPI_To: Yup.string().required('KPI To is required'),
          Start_Date: Yup.string().required('Start Date is required'),
          Due_Date: Yup.string().required('Due Date is required'),
          Control_Owner_Reminder_1: Yup.string().required('Control Owner Reminder 1 is required'),
          Control_Owner_Reminder_2: Yup.string().required('Control Owner Reminder 2 is required'),
          Control_Oversight_Pending_Notification_1: Yup.string().required(
            'Control Oversight Pending Notification 1 is required',
          ),
          Control_Oversight_Pending_Notification_2: Yup.string().required(
            'Control Oversight Pending Notification 2 is required',
          ),
          Control_Oversight_Review_Notification_1: Yup.string().required(
            'Control Oversight Review Notification 1 is required',
          ),
          Control_Oversight_Review_Notification_2: Yup.string().required(
            'Control Oversight Review Notification 2 is required',
          ),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            handleSaveAdd(values);
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
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-6">
                <div className="row mb-4">
                  <div className="col-lg-4">
                    <Form.Label>Survey Name</Form.Label>
                  </div>
                  <div className="col-lg-6">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        type="text"
                        name="Survey_Name"
                        placeholder=""
                        value={values.Survey_Name}
                        isInvalid={Boolean(touched.Survey_Name && errors.Survey_Name)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-control"
                      />

                      {!!touched.Survey_Name && (
                        <Form.Control.Feedback type="invalid">
                          {errors.Survey_Name}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="row mb-4">
                  <div className="col-lg-4">
                    <Form.Label>Question Bank</Form.Label>
                  </div>
                  <div className="col-lg-6">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        as="select"
                        name="Question_Bank"
                        placeholder=""
                        value={values.Question_Bank}
                        isInvalid={Boolean(touched.Question_Bank && errors.Question_Bank)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-select"
                      >
                        <option value="">Select Question_Bank</option>
                        <option value="Template1">Template1</option>
                        <option value="Template2">Template 2</option>
                      </Form.Control>

                      {!!touched.Question_Bank && (
                        <Form.Control.Feedback type="invalid">
                          {errors.Question_Bank}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="row mb-4">
                  <div className="col-lg-4">
                    <Form.Label>Assessment_Cycle</Form.Label>
                  </div>
                  <div className="col-lg-6">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        as="select"
                        name="Assessment_Cycle"
                        placeholder=""
                        value={values.Assessment_Cycle}
                        isInvalid={Boolean(touched.Assessment_Cycle && errors.Assessment_Cycle)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-select"
                      >
                        <option value="">Select Assessment Cycle</option>
                        <option value="AssessmentCycle1">Assessment Cycle 1</option>
                        <option value="AssessmentCycle2">Assessment Cycle 2</option>
                        <option value="AssessmentCycle3">Assessment Cycle 3</option>
                        <option value="AssessmentCycle4">Assessment Cycle 4</option>
                      </Form.Control>

                      {!!touched.Assessment_Cycle && (
                        <Form.Control.Feedback type="invalid">
                          {errors.Assessment_Cycle}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="row mb-4">
                  <div className="col-lg-4">
                    <Form.Label>Year</Form.Label>
                  </div>
                  <div className="col-lg-6">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        as="select"
                        name="Year"
                        placeholder=""
                        value={values.Year}
                        isInvalid={Boolean(touched.Year && errors.Year)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-select"
                      >
                        <option value="">Select a year</option>
                        {years.map((Year) => (
                          <option key={Year} value={Year}>
                            {Year}
                          </option>
                        ))}
                      </Form.Control>

                      {!!touched.Year && (
                        <Form.Control.Feedback type="invalid">{errors.Year}</Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>

              {/* <div className="col-lg-6">
                <div className="row mb-4">
                  <div className="col-lg-4">
                    <Form.Label>Year</Form.Label>
                  </div>
                  <div className="col-lg-6">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        type="date"
                        name="Year"
                        placeholder=""
                        value={values.Year}
                        isInvalid={Boolean(touched.Year && errors.Year)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-control"
                      />

                      {!!touched.Year && (
                        <Form.Control.Feedback type="invalid">{errors.Year}</Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>
            */}

              <div className="col-lg-6">
                <div className="row mb-4">
                  <div className="col-lg-4">
                    <Form.Label>KPI From</Form.Label>
                  </div>
                  <div className="col-lg-6">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        type="date"
                        name="KPI_From"
                        placeholder=""
                        value={values.KPI_From}
                        isInvalid={Boolean(touched.KPI_From && errors.KPI_From)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-control"
                      />

                      {!!touched.KPI_From && (
                        <Form.Control.Feedback type="invalid">
                          {errors.KPI_From}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="row mb-4">
                  <div className="col-lg-4">
                    <Form.Label>KPI To</Form.Label>
                  </div>
                  <div className="col-lg-6">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        type="date"
                        name="KPI_To"
                        placeholder=""
                        value={values.KPI_To}
                        isInvalid={Boolean(touched.KPI_To && errors.KPI_To)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-control"
                      />

                      {!!touched.KPI_To && (
                        <Form.Control.Feedback type="invalid">
                          {errors.KPI_To}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="row mb-4">
                  <div className="col-lg-4">
                    <Form.Label>Start Date</Form.Label>
                  </div>
                  <div className="col-lg-6">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        type="date"
                        name="Start_Date"
                        placeholder=""
                        value={values.Start_Date}
                        isInvalid={Boolean(touched.Start_Date && errors.Start_Date)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-control"
                      />

                      {!!touched.Start_Date && (
                        <Form.Control.Feedback type="invalid">
                          {errors.Start_Date}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="row mb-4">
                  <div className="col-lg-4">
                    <Form.Label>Due_Date</Form.Label>
                  </div>
                  <div className="col-lg-6">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        type="date"
                        name="Due_Date"
                        placeholder=""
                        value={values.Due_Date}
                        isInvalid={Boolean(touched.Due_Date && errors.Due_Date)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-control"
                      />

                      {!!touched.Due_Date && (
                        <Form.Control.Feedback type="invalid">
                          {errors.Due_Date}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div className="row">
                <Divider
                  className="divider"
                  size="md"
                  my="xs"
                  labelPosition="center"
                  label={
                    <>
                      <Box ml={5}>
                        <Form.Label>Control Owner:</Form.Label>
                      </Box>
                    </>
                  }
                />
              </div>

              <div className="col-lg-6">
                <div className="row mb-4">
                  <div className="col-lg-4">
                    <Form.Label>Reminder 1</Form.Label>
                  </div>
                  <div className="col-lg-6">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        type="date"
                        name="Control_Owner_Reminder_1"
                        placeholder=""
                        value={values.Control_Owner_Reminder_1}
                        isInvalid={Boolean(
                          touched.Control_Owner_Reminder_1 && errors.Control_Owner_Reminder_1,
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-control"
                      />

                      {!!touched.Control_Owner_Reminder_1 && (
                        <Form.Control.Feedback type="invalid">
                          {errors.Control_Owner_Reminder_1}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="row mb-4">
                  <div className="col-lg-4">
                    <Form.Label>Reminder 2</Form.Label>
                  </div>
                  <div className="col-lg-6">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        type="date"
                        name="Control_Owner_Reminder_2"
                        placeholder=""
                        value={values.Control_Owner_Reminder_2}
                        isInvalid={Boolean(
                          touched.Control_Owner_Reminder_2 && errors.Control_Owner_Reminder_2,
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-control"
                      />

                      {!!touched.Control_Owner_Reminder_2 && (
                        <Form.Control.Feedback type="invalid">
                          {errors.Control_Owner_Reminder_2}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>

              <div className="row">
                <Divider
                  className="divider"
                  size="md"
                  my="xs"
                  labelPosition="center"
                  label={
                    <>
                      <Box ml={5}>
                        <Form.Label>Control Oversight</Form.Label>
                      </Box>
                    </>
                  }
                />

                <div className="col-lg-6">
                  <div className="row mb-4">
                    <div className="row mb-4">
                      <Form.Label>Notification for Not Started Assessment :</Form.Label>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <Form.Label>First :</Form.Label>
                      </div>
                      <div className="col-lg-6">
                        <Form.Group className="input-group mb-3">
                          <Form.Control
                            type="date"
                            name="Control_Oversight_Pending_Notification_1"
                            placeholder=""
                            value={values.Control_Oversight_Pending_Notification_1}
                            isInvalid={Boolean(
                              touched.Control_Oversight_Pending_Notification_1 &&
                                errors.Control_Oversight_Pending_Notification_1,
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            readOnly={false}
                            className="form-control"
                          />

                          {!!touched.Control_Oversight_Pending_Notification_1 && (
                            <Form.Control.Feedback type="invalid">
                              {errors.Control_Oversight_Pending_Notification_1}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <Form.Label>Second :</Form.Label>
                      </div>
                      <div className="col-lg-6">
                        <Form.Group className="input-group mb-3">
                          <Form.Control
                            type="date"
                            name="Control_Oversight_Pending_Notification_2"
                            placeholder=""
                            value={values.Control_Oversight_Pending_Notification_2}
                            isInvalid={Boolean(
                              touched.Control_Oversight_Pending_Notification_2 &&
                                errors.Control_Oversight_Pending_Notification_2,
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            readOnly={false}
                            className="form-control"
                          />

                          {!!touched.Control_Oversight_Pending_Notification_2 && (
                            <Form.Control.Feedback type="invalid">
                              {errors.Control_Oversight_Pending_Notification_2}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="row mb-4">
                    <div className="row mb-4">
                      <Form.Label>Notification for Submmited Assessment :</Form.Label>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <Form.Label>First :</Form.Label>
                      </div>
                      <div className="col-lg-6">
                        <Form.Group className="input-group mb-3">
                          <Form.Control
                            type="date"
                            name="Control_Oversight_Review_Notification_1"
                            placeholder=""
                            value={values.Control_Oversight_Review_Notification_1}
                            isInvalid={Boolean(
                              touched.Control_Oversight_Review_Notification_1 &&
                                errors.Control_Oversight_Review_Notification_1,
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            readOnly={false}
                            className="form-control"
                          />

                          {!!touched.Control_Oversight_Review_Notification_1 && (
                            <Form.Control.Feedback type="invalid">
                              {errors.Control_Oversight_Review_Notification_1}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <Form.Label>Second :</Form.Label>
                      </div>
                      <div className="col-lg-6">
                        <Form.Group className="input-group mb-3">
                          <Form.Control
                            type="date"
                            name="Control_Oversight_Review_Notification_2"
                            placeholder=""
                            value={values.Control_Oversight_Review_Notification_2}
                            isInvalid={Boolean(
                              touched.Control_Oversight_Review_Notification_2 &&
                                errors.Control_Oversight_Review_Notification_2,
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            readOnly={false}
                            className="form-control"
                          />

                          {!!touched.Control_Oversight_Review_Notification_2 && (
                            <Form.Control.Feedback type="invalid">
                              {errors.Control_Oversight_Review_Notification_2}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-action-AssessmentBank">
              <div className="d-flex align-items-center justify-content-end">
                <div>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      handleOnclickCancel();
                      dispatch(ScheduleSurveyPage_1({}));
                    }}
                  >
                    Cancel
                  </Button>
                  <Button color="neutral" className="ml-4" onClick={handleSubmit}>
                    Next {'>'}
                  </Button>
                </div>
              </div>
            </div>
            <GetFormikFieldValue setPage1Value={setPage1Value} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Page1;

import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormikContext, Formik } from 'formik';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../MDM/MDM_Tab_Buttons/Button';
import { useHistory } from 'react-router-dom';
import { Divider, Box } from '@mantine/core';
import {
  scheduleSurveyPage_1Selector,
  getAssessmentCycleDataSelector,
} from '../../../redux/AssessmentBank/AssessmentBankSelectors';
import {
  ScheduleSurveyPage_1,
  getAssessmentCycleAction,
} from '../../../redux/AssessmentBank/AssessmentBankAction';
import moment from 'moment';
import { months } from '../../QuestionBank/CreateQuestions/constant';

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
  const getAssessmentCycleDataState = useSelector(getAssessmentCycleDataSelector);
  let kpiFromMonth = moment(getAssessmentCycleDataState?.data[1]?.kpi_from).format('M');
  let kpiFromYear = moment(getAssessmentCycleDataState?.data[1]?.kpi_from).format('YYYY');
  let kpiToMonth = moment(getAssessmentCycleDataState?.data[2]?.kpi_to).format('M');
  let kpiToYear = moment(getAssessmentCycleDataState?.data[2]?.kpi_to).format('YYYY');
  let kpiDay = moment('1').format('DD');
  console.log('today', kpiToMonth);
  const [kpiFromData, setKpiFromData] = useState({
    year: kpiFromYear,
    month: kpiFromMonth,
    day: kpiDay,
  });
  const [kpiFromMonthData, setKpiFromMonthData] = useState();
  const [kpiToData, setKpiToData] = useState({ year: kpiToYear, month: kpiToMonth, day: kpiDay });
  console.log('getAssessmentCycleDataState', getAssessmentCycleDataState);
  const [workingDays, setWorkingDays] = useState();
  useEffect(() => {
    dispatch(getAssessmentCycleAction());
  }, []);

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
      KPI_From_Year: value.KPI_From_Year,
      KPI_From_month: value.KPI_From_month,
      KPI_To_Month: value.KPI_To_Month,
      KPI_To_Year: value.KPI_To_Year,
      Start_Date: value.Start_Date,
      Due_Date: value.Due_Date,
      Control_Owner_Reminder_1: value.Control_Owner_Reminder_1,
      Control_Owner_Reminder_2: value.Control_Owner_Reminder_2,
      Control_Oversight_Pending_Notification_1: value.Control_Oversight_Pending_Notification_1,
      Control_Oversight_Pending_Notification_2: value.Control_Oversight_Pending_Notification_2,
      // Control_Oversight_Review_Notification_1: value.Control_Oversight_Review_Notification_1,
      // Control_Oversight_Review_Notification_2: value.Control_Oversight_Review_Notification_2,
    };

    console.log(payload, 'Page 1 payload');
    dispatch(ScheduleSurveyPage_1(payload));
    console.log(scheduleSurveyPage_1_State, 'After submit from selector');
    handleNext();
  };

  // logic for Year picker
  const years = [];
  const currentYear = new Date().getFullYear();
  const startYear = 2021; // Change as needed
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }

  return (
    <div className="p-5">
      <h4 className="AssessmentBank-inputPage-sub-title">Select Assessment Details</h4>
      <Formik
        enableReinitialize
        initialValues={{
          Survey_Name: scheduleSurveyPage_1_State?.Survey_Name || '',
          Question_Bank: scheduleSurveyPage_1_State?.Question_Bank || 'Template1',
          Assessment_Cycle:
            scheduleSurveyPage_1_State?.Assessment_Cycle ||
            getAssessmentCycleDataState?.data[0]?.assessmentCylce ||
            '',
          Year: scheduleSurveyPage_1_State?.Year || currentYear || '',
          KPI_From_Year: kpiFromYear || '',
          KPI_From_month: kpiFromMonth || '',
          KPI_To_Month: kpiToMonth || '',
          KPI_To_Year: kpiToYear || '',
          Start_Date:
            scheduleSurveyPage_1_State?.Start_Date ||
            getAssessmentCycleDataState?.data[3]?.start_date ||
            '',
          Due_Date:
            scheduleSurveyPage_1_State?.Due_Date ||
            getAssessmentCycleDataState?.data[4]?.end_date ||
            '',
          Control_Owner_Reminder_1:
            scheduleSurveyPage_1_State?.Control_Owner_Reminder_1 ||
            getAssessmentCycleDataState?.data[5]?.reminder1 ||
            '',
          Control_Owner_Reminder_2:
            scheduleSurveyPage_1_State?.Control_Owner_Reminder_2 ||
            getAssessmentCycleDataState?.data[6]?.reminder2 ||
            '',
          Control_Oversight_Pending_Notification_1:
            scheduleSurveyPage_1_State?.Control_Oversight_Pending_Notification_1 ||
            getAssessmentCycleDataState?.data[7]?.notification1 ||
            '',
          Control_Oversight_Pending_Notification_2:
            scheduleSurveyPage_1_State?.Control_Oversight_Pending_Notification_2 ||
            getAssessmentCycleDataState?.data[8]?.notification2 ||
            '',
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
          // KPI_From_Year: Yup.string().required('KPI From is required'),
          // KPI_To: Yup.string().required('KPI To is required'),
          Start_Date: Yup.string().required('Start Date is required'),
          Due_Date: Yup.string().required('Due Date is required'),
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
        }) => {
          const onChange = (e) => {
            const {
              target: { value },
            } = e;
            if (handleChange) {
              e.target.value = value.trimStart();
              handleChange(e);
            }
          };
          return (
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
                          onChange={onChange}
                          maxLength={255}
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
                      <Form.Label>Template</Form.Label>
                    </div>
                    <div className="col-lg-6">
                      <Form.Group className="input-group mb-3">
                        <Form.Control
                          as="select"
                          name="Question_Bank"
                          defaultValue={'Template1'}
                          placeholder=""
                          value={values.Question_Bank}
                          isInvalid={Boolean(touched.Question_Bank && errors.Question_Bank)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          readOnly={false}
                          className="form-select"
                        >
                          <option value="">Select Template</option>
                          <option value="Template1">Default Template</option>
                          <option value="Template2">Custom Template</option>
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
                      <Form.Label>Assessment Cycle</Form.Label>
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
                          <option value="Assessment Cycle 1">Assessment Cycle 1</option>
                          <option value="Assessment Cycle 2">Assessment Cycle 2</option>
                          <option value="Assessment Cycle 3">Assessment Cycle 3</option>
                          <option value="Assessment Cycle 4">Assessment Cycle 4</option>
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
                          <Form.Control.Feedback type="invalid">
                            {errors.Year}
                          </Form.Control.Feedback>
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
                        onChange={onChange}
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
                      <div className="row">
                        <div className="col-lg-6">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="KPI_From_month"
                              defaultValue={values.KPI_From_month}
                              placeholder=""
                              value={values.KPI_From_month}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              {months.map((data, i) => (
                                <option key={i} value={data.label}>
                                  {data.value}
                                </option>
                              ))}
                            </Form.Control>

                            {!!touched.KPI_From_month && (
                              <Form.Control.Feedback type="invalid">
                                {errors.KPI_From_month}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                        <div className="col-lg-6">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="KPI_From_Year"
                              defaultValue={values.KPI_From_Year}
                              placeholder=""
                              value={values.KPI_From_Year}
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

                            {!!touched.KPI_From_Year && (
                              <Form.Control.Feedback type="invalid">
                                {errors.KPI_From_Year}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="row mb-4">
                    <div className="col-lg-4">
                      <Form.Label>KPI To</Form.Label>
                    </div>
                    <div className="col-lg-6">
                      <div className="row">
                        <div className="col-lg-6">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="KPI_To_Month"
                              defaultValue={values.KPI_To_Month}
                              placeholder=""
                              value={values.KPI_To_Month}
                              onChange={handleChange}
                              readOnly={false}
                              className="form-select"
                            >
                              {months.map((data, i) => (
                                <option key={i} value={data.label}>
                                  {data.value}
                                </option>
                              ))}
                            </Form.Control>

                            {!!touched.KPI_To_Month && (
                              <Form.Control.Feedback type="invalid">
                                {errors.KPI_To_Month}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                        <div className="col-lg-6">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="KPI_To_Year"
                              defaultValue={values.KPI_To_Year}
                              placeholder=""
                              value={values.KPI_To_Year}
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

                            {!!touched.KPI_To_Year && (
                              <Form.Control.Feedback type="invalid">
                                {errors.KPI_To_Year}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </div>
                      </div>
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
                      <Form.Label>Due Date</Form.Label>
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
                      <Form.Label>Reminder - 1</Form.Label>
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
                          onChange={onChange}
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
                      <Form.Label>Reminder - 2</Form.Label>
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
                          onChange={onChange}
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
                </div>

                <div className="col-lg-6">
                  <div className="row mb-4">
                    <div className="col-lg-4">
                      <Form.Label>Notification - 1</Form.Label>
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
                          onChange={onChange}
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
                </div>
                <div className="col-lg-6">
                  <div className="row mb-4">
                    <div className="col-lg-4">
                      <Form.Label>Notification - 2</Form.Label>
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
                          onChange={onChange}
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

                {/* <div className="col-lg-6">
                  <div className="row mb-4">
                    <div className="row mb-4">
                      <Form.Label>Notification for Submmited Assessment :</Form.Label>
                    </div>
                    <div className="row mb-4">
                      <div className="col">
                        <Form.Label>Review Notification - 1</Form.Label>
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
                            onChange={onChange}
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
                        <Form.Label>Review Notification - 2</Form.Label>
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
                            onChange={onChange}
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
                </div> */}
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
          );
        }}
      </Formik>
    </div>
  );
};

export default Page1;

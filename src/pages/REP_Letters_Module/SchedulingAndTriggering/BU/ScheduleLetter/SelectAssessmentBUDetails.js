import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useMsal } from '@azure/msal-react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useFormikContext, Formik } from 'formik';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../MDM/MDM_Tab_Buttons/Button';
import { useHistory } from 'react-router-dom';
import { Divider, Box } from '@mantine/core';
import Table2 from '../../../../../components/UI/Table/Table2';
import { FloatRight } from 'tabler-icons-react';
import moment from 'moment';
import CustomModal from '../../../../../components/UI/CustomModal';
import Swal from 'sweetalert2';
// import for multi select filter
import { Group } from '@mantine/core';
import { MultiSelect } from '@mantine/core';
import '../../../../MDM/Control_Owner_Oversight/MultiSelectButtonStyles.scss';
import { months } from '../../../../QuestionBank/CreateQuestions/constant';

import ReviewLetterDetails from './ReviewLetterDetails';
const GetFormikFieldValue = () => {
  // Grab values and submitForm from context
  const dispatch = useDispatch();
  const { values } = useFormikContext();
  console.log('values', values?.Template);
  useEffect(() => {
    let payload = {
      Template: values.Template,
    };
    if (values.Template) {
    }
  }, [values.Template]);
  return null;
};

// Filter buttons
const FilterButtons = ({
  Zone,

  valueZone,

  setValueZone,
}) => {
  const [searchValue, onSearchChange] = useState('');
  console.log('searchValue', searchValue);
  return (
    <div>
      <Group spacing="xs">
        <MultiSelect
          className="mantine-MultiSelect-wrapper"
          data={Zone}
          label={<span className="mantine-MultiSelect-label">{'Zone'}</span>}
          placeholder={'Select your option'}
          searchable
          limit={20}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
          nothingFound="Nothing found"
          clearButtonLabel="Clear selection"
          clearable
          value={valueZone}
          onChange={(e) => {
            setValueZone(e);
          }}
          radius="xl"
          variant="filled"
          size="xs"
        />
      </Group>
    </div>
  );
};

const SelectAssessmentDetailsBU = ({ handleNext }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {}, []);

  const handleOnclickCancel = () => {
    history.push('/REP-Letters/scheduling-and-triggering');
  };

  const handleSaveAdd = (value) => {
    //console.log(value);
  };

  // logic for Year picker
  const years = [];
  const currentYear = new Date().getFullYear();
  const startYear = 2021; // Change as needed
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }

  return (
    <div className="holder">
      <div className="p-5">
        <h4 className="AssessmentBank-inputPage-sub-title">Select Letter Details</h4>
        <Formik
          enableReinitialize
          initialValues={{
            Template: '',
            Title: '',
            Assessment_Cycle: '',
            Year: currentYear || '',
            Start_Date: '',
            Due_Date: '',
            Recipient_Reminder_1: '',
            Recipient_Reminder_2: '',
          }}
          validationSchema={Yup.object().shape({
            Template: Yup.string().required('Template is required'),
            Title: Yup.string().required('Title is required'),
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
          }) => (
            <Form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="row mb-4">
                    <div className="col-lg-4">
                      <Form.Label>Title</Form.Label>
                    </div>
                    <div className="col-lg-6">
                      <Form.Group className="input-group mb-3">
                        <Form.Control
                          type="text"
                          name="Title"
                          placeholder=""
                          value={values.Title}
                          isInvalid={Boolean(touched.Title && errors.Title)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          readOnly={false}
                          className="form-control"
                        />

                        {!!touched.Title && (
                          <Form.Control.Feedback type="invalid">
                            {errors.Title}
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
                          name="Template"
                          placeholder=""
                          value={values.Template}
                          isInvalid={Boolean(touched.Template && errors.Template)}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          readOnly={false}
                          className="form-select"
                        >
                          <option value="">Select</option>
                          <option value="bu-letter">BU Letter</option>
                          <option value="zone-letter">Zone Letter</option>
                        </Form.Control>

                        {!!touched.Template && (
                          <Form.Control.Feedback type="invalid">
                            {errors.Template}
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
                          <Form.Label>Recipient</Form.Label>
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
                          name="Recipient_Reminder_1"
                          placeholder=""
                          value={values.Recipient_Reminder_1}
                          isInvalid={Boolean(
                            touched.Recipient_Reminder_1 && errors.Recipient_Reminder_1,
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          readOnly={false}
                          className="form-control"
                        />

                        {!!touched.Recipient_Reminder_1 && (
                          <Form.Control.Feedback type="invalid">
                            {errors.Recipient_Reminder_1}
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
                          name="Recipient_Reminder_2"
                          placeholder=""
                          value={values.Recipient_Reminder_2}
                          isInvalid={Boolean(
                            touched.Recipient_Reminder_2 && errors.Recipient_Reminder_2,
                          )}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          readOnly={false}
                          className="form-control"
                        />

                        {!!touched.Recipient_Reminder_2 && (
                          <Form.Control.Feedback type="invalid">
                            {errors.Recipient_Reminder_2}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
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
                      }}
                    >
                      Cancel
                    </Button>
                    <Button color="neutral" className="ml-4" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
              <GetFormikFieldValue />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SelectAssessmentDetailsBU;
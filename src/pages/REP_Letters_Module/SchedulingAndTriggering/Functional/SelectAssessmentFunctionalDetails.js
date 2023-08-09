import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormikContext, Formik } from 'formik';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../MDM/MDM_Tab_Buttons/Button';
import { useHistory } from 'react-router-dom';
import { Divider, Box } from '@mantine/core';
import Table2 from '../../../../components/UI/Table/Table2';
import { FloatRight } from 'tabler-icons-react';
import moment from 'moment';
import { months } from '../../../QuestionBank/CreateQuestions/constant';
import {
  getRlFunctionData,
  getRlFunctionalPage1Data,
} from '../../../../redux/REP_Letters/RL_SchedulingAndTriggering/RL_SchedulingAndTriggeringAction';
import {
  getFunctionalDropdowndataSelector,
  getFunctionalPage1dataSelector,
} from '../../../../redux/REP_Letters/RL_SchedulingAndTriggering/RL_SchedulingAndTriggeringSelectors';
const GetFormikFieldValue = ({ setFunctionValue }) => {
  // Grab values and submitForm from context
  const dispatch = useDispatch();
  const { values } = useFormikContext();
  console.log('values', values?.Function);
  useEffect(() => {
    let payload = {
      function: values.Function,
    };
    if (values.Function) {
      dispatch(getRlFunctionalPage1Data(payload));
    }
    setFunctionValue(values.Function);
  }, [values.Function]);
  return null;
};

const SelectAssessmentDetailsFunctional = ({ handleNext }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const getFunctionalDropdowndataState = useSelector(getFunctionalDropdowndataSelector);
  const getFunctionalPage1dataState = useSelector(getFunctionalPage1dataSelector);
  console.log('getFunctionalDropdowndataState', getFunctionalPage1dataState);
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [functionValue, setFunctionValue] = useState('');
  const [page1Data, setPage1Data] = useState({
    title: '',
    assessmentCylce: '',
    year: '',
    start_date: '',
    end_date: '',
    reminder1: '',
    reminder2: '',
  });

  useEffect(() => {
    if (getFunctionalPage1dataState?.data?.auto_fill_data) {
      setPage1Data({
        title: getFunctionalPage1dataState?.data?.auto_fill_data[1]?.title,
        assessmentCylce: getFunctionalPage1dataState?.data?.auto_fill_data[0]?.assessmentCylce,
        year: getFunctionalPage1dataState?.data?.auto_fill_data[2]?.year,
        start_date: getFunctionalPage1dataState?.data?.auto_fill_data[3]?.start_date,
        end_date: getFunctionalPage1dataState?.data?.auto_fill_data[4]?.end_date,
        reminder1: getFunctionalPage1dataState?.data?.auto_fill_data[5]?.reminder1,
        reminder2: getFunctionalPage1dataState?.data?.auto_fill_data[6]?.reminder2,
      });
    }
  }, [getFunctionalPage1dataState?.data]);
  useEffect(() => {
    dispatch(getRlFunctionData());
  }, []);
  const class_to_apply = (item) => {
    let className = '';
    if (item.toUpperCase() === 'ACTIVE') {
      className = 'badge badge-success';
    }
    if (item.toUpperCase() === 'INACTIVE') {
      className = 'badge badge-red';
    }
    return className;
  };

  const TABLE_COLUMNS = [
    {
      accessorKey: 'Zone',
      id: 'Zone',
      header: 'Zone',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 100,
    },
    {
      accessorKey: 'BU',
      id: 'BU',
      header: 'BU/Org Type',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'Functional',
      id: 'Functional',
      header: 'Functional',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'Applicability',
      id: 'Applicability',
      header: 'Applicability',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 100,
    },
    {
      accessorKey: 'Recipient',
      id: 'Recipient',
      header: 'Recipient',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 230,
    },
    {
      accessorKey: 'Recipient_Status',
      id: 'Recipient_Status',
      header: 'Recipient Status',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 150,
      Cell: (row) => {
        return (
          <span className={class_to_apply(row.row.original.Recipient_Status)}>
            {row.row.original.Recipient_Status === '' ? 'N/A' : row.row.original.Recipient_Status}
          </span>
        );
      },
    },
    {
      accessorKey: 'Title_Position',
      id: 'Title_Position',
      header: 'Title/Position',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 230,
    },
    {
      accessorKey: 'Zone_Control',
      id: 'Zone_Control',
      header: 'Zone Control',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 230,
    },
    {
      accessorKey: 'Zone_Control_Status',
      id: 'Zone_Control_Status',
      header: 'Zone Control Status',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 150,
      Cell: (row) => {
        return (
          <span className={class_to_apply(row.row.original.Zone_Control_Status)}>
            {row.row.original.Zone_Control_Status === ''
              ? 'N/A'
              : row.row.original.Zone_Control_Status}
          </span>
        );
      },
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    if (getFunctionalPage1dataState?.data?.functional_mdm_data) {
      setTableData(
        getFunctionalPage1dataState?.data?.functional_mdm_data.map((i, index) => {
          return {
            id: index,
            ...i,
          };
        }),
      );
    }
  }, [getFunctionalPage1dataState?.data?.functional_mdm_data]);
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
    <div className="p-5">
      <h4 className="AssessmentBank-inputPage-sub-title">Select Letter Details</h4>
      <Formik
        enableReinitialize
        initialValues={{
          Function: functionValue || '',
          Title: page1Data?.title || '',
          Assessment_Cycle: page1Data?.assessmentCylce || '',
          Year: page1Data?.year || currentYear || '',
          Start_Date: page1Data?.start_date || '',
          Due_Date: page1Data?.end_date || '',
          Recipient_Reminder_1: page1Data?.reminder1 || '',
          Recipient_Reminder_2: page1Data?.reminder2 || '',
        }}
        validationSchema={Yup.object().shape({
          Function: Yup.string().required('Function is required'),
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
                    <Form.Label>Function</Form.Label>
                  </div>
                  <div className="col-lg-6">
                    <Form.Group className="input-group mb-3">
                      <Form.Control
                        as="select"
                        name="Function"
                        placeholder=""
                        value={values.Function}
                        isInvalid={Boolean(touched.Function && errors.Function)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        readOnly={false}
                        className="form-select"
                      >
                        <option value="">Select</option>
                        {getFunctionalDropdowndataState?.data &&
                          getFunctionalDropdowndataState?.data.map((data, i) => (
                            <option key={i} value={data?.functions}>
                              {data?.functions}
                            </option>
                          ))}
                      </Form.Control>

                      {!!touched.Function && (
                        <Form.Control.Feedback type="invalid">
                          {errors.Function}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </div>
                </div>
              </div>

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
                        <Form.Control.Feedback type="invalid">{errors.Title}</Form.Control.Feedback>
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
                        <Form.Control.Feedback type="invalid">{errors.Year}</Form.Control.Feedback>
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

            {getFunctionalPage1dataState?.data?.functional_mdm_data?.length > 0 && (
              <div className="row" style={{ paddingTop: '24px' }}>
                <div className="col-12 col-lg-12">
                  <div className="mdm-table-button">
                    <div className="table-heading" style={{ justifyContent: 'space-between' }}>
                      <div>
                        <FloatRight size={24} strokeWidth={2} color={'#FFFFFF'} />
                        <span style={{ paddingLeft: '16px' }}>Functional MDM Table</span>
                      </div>
                    </div>
                  </div>
                  {/* <Table tableData={tableData} tableColumns={tableColumns} columns={tableColumns} /> */}
                  <Table2
                    tableData={tableData}
                    loading={getFunctionalPage1dataState.loading}
                    tableColumns={tableColumns}
                  />
                </div>
              </div>
            )}
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
            <GetFormikFieldValue setFunctionValue={setFunctionValue} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SelectAssessmentDetailsFunctional;

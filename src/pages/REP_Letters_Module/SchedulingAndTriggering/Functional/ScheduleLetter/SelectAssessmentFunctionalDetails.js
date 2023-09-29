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
import {
  getRlFunctionData,
  getRlFunctionalPage1Data,
} from '../../../../../redux/REP_Letters/RL_SchedulingAndTriggering/RL_SchedulingAndTriggeringAction';
import {
  getFunctionalDropdowndataSelector,
  getFunctionalPage1dataSelector,
  rlAddFunctionalAssessmentDataSelector,
} from '../../../../../redux/REP_Letters/RL_SchedulingAndTriggering/RL_SchedulingAndTriggeringSelectors';
import ReviewLetterDetails from './ReviewLetterDetails';
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

const SelectAssessmentDetailsFunctional = ({ handleNext }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { instance, accounts, inProgress } = useMsal();
  const [editTableIndex, setEditTableIndex] = useState([]);
  const getFunctionalDropdowndataState = useSelector(getFunctionalDropdowndataSelector);
  const getFunctionalPage1dataState = useSelector(getFunctionalPage1dataSelector);
  const rlAddFunctionalAssessmentDataState = useSelector(rlAddFunctionalAssessmentDataSelector);
  console.log('getFunctionalDropdowndataState', getFunctionalPage1dataState);
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [functionValue, setFunctionValue] = useState('');
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [finalPayload, setFinalPayload] = useState();
  // multi choice user input State for filters button
  const [valueZone, setValueZone] = useState([]);

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
    setOpenReviewModal(false);
  }, [rlAddFunctionalAssessmentDataState?.data]);
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
  const handleClose = () => {
    setOpenReviewModal(false);
  };
  // Arrays for showing data on filters
  const zoneArray = getFunctionalPage1dataState?.data?.functional_mdm_data?.map((i) => i.Zone);
  useEffect(() => {
    if (getFunctionalPage1dataState?.data?.functional_mdm_data) {
      const updateData = getFunctionalPage1dataState?.data?.functional_mdm_data?.filter((i) => {
        return valueZone?.length ? valueZone.includes(i.Zone) : true;
      });
      console.log('hi bebe', updateData);
      setTableData(updateData);
    }
  }, [valueZone, getFunctionalPage1dataState?.data?.functional_mdm_data]);
  // Function to remove duplicate value from array
  function removeDuplicates(key) {
    const allData = [...new Set(zoneArray)];
    return allData.filter((d) => !!d);
    // return [...new Set(arr)];
  }

  console.log('zoneArray', zoneArray);
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
      header: 'BU / Entity',
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

  const handleSaveAdd = (values) => {
    console.log(values);
    //code for selected item from table
    if (editTableIndex.length === 0) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'All Recipients Selected.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'gold',
        cancelButtonColor: 'black',
        confirmButtonText: 'Yes, submit it!',
      }).then((res) => {
        if (res.isConfirmed) {
          const cloneData = tableData?.map((data, i) => {
            const clone = (({ id, Functional, ...o }) => o)(data);
            return clone;
          });

          let payload = {
            Function: values.Function,
            Title: values.Title,
            Assessment_Cycle: values.Assessment_Cycle,
            Year: values.Year,
            Start_Date: values.Start_Date,
            Due_Date: values.Due_Date,
            Recipient_Reminder_1: values.Recipient_Reminder_1,
            Recipient_Reminder_2: values.Recipient_Reminder_2,
            SelectedDataFromTable: cloneData,
            Created_By: {
              Email: accounts[0]?.username,
              name: accounts[0]?.name ? accounts[0].name : '',
            },
          };
          console.log(payload, 'Page payload');
          setOpenReviewModal(true);
          setFinalPayload(payload);
        }
      });
    } else if (editTableIndex.length >= 1) {
      setOpenReviewModal(true);
      console.log(editTableIndex, 'editTableIndex');
      const data = tableData.filter((data, i) => editTableIndex.includes(data.id));
      const cloneData = data?.map((data, i) => {
        const clone = (({ id, Functional, ...o }) => o)(data);
        return clone;
      });
      let payload = {
        Function: values.Function,
        Title: values.Title,
        Assessment_Cycle: values.Assessment_Cycle,
        Year: values.Year,
        Start_Date: values.Start_Date,
        Due_Date: values.Due_Date,
        Recipient_Reminder_1: values.Recipient_Reminder_1,
        Recipient_Reminder_2: values.Recipient_Reminder_2,
        SelectedDataFromTable: cloneData,
        Created_By: {
          Email: accounts[0]?.username,
          name: accounts[0]?.name ? accounts[0].name : '',
        },
      };
      console.log(payload, 'Page payload');
      setFinalPayload(payload);
    }
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
                {functionValue && (
                  <>
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
                              maxLength={255}
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
                          <Form.Label>Assessment Cycle</Form.Label>
                        </div>
                        <div className="col-lg-6">
                          <Form.Group className="input-group mb-3">
                            <Form.Control
                              as="select"
                              name="Assessment_Cycle"
                              placeholder=""
                              value={values.Assessment_Cycle}
                              isInvalid={Boolean(
                                touched.Assessment_Cycle && errors.Assessment_Cycle,
                              )}
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
                  </>
                )}
              </div>

              {functionValue &&
                getFunctionalPage1dataState?.data?.functional_mdm_data?.length > 0 && (
                  <div className="row" style={{ paddingTop: '24px' }}>
                    <div className="col-12 col-lg-12">
                      <span>
                        <FilterButtons
                          Zone={removeDuplicates(zoneArray)}
                          valueZone={valueZone}
                          setValueZone={setValueZone}
                        />
                      </span>
                      <br />
                      <br />
                    </div>
                    <div className="col-12 col-lg-12">
                      <div className="mdm-table-button">
                        <div className="table-heading" style={{ justifyContent: 'space-between' }}>
                          <div>
                            <FloatRight size={24} strokeWidth={2} color={'#FFFFFF'} />
                            <span style={{ paddingLeft: '16px' }}>Functional Recipient Table</span>
                          </div>
                        </div>
                      </div>
                      <Table2
                        tableData={tableData}
                        loading={getFunctionalPage1dataState.loading}
                        tableColumns={tableColumns}
                        setEditTableIndex={setEditTableIndex}
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
                      Review
                    </Button>
                  </div>
                </div>
              </div>
              <GetFormikFieldValue setFunctionValue={setFunctionValue} />
            </Form>
          )}
        </Formik>
        <CustomModal
          bodyClassName="p-0"
          open={openReviewModal}
          title={
            <span>
              <VisibilityIcon className="mr-3" />
              Review
            </span>
          }
          width={1080}
          onClose={handleClose}
        >
          <ReviewLetterDetails finalPayload={finalPayload} onClose={handleClose} />
        </CustomModal>
      </div>
    </div>
  );
};

export default SelectAssessmentDetailsFunctional;

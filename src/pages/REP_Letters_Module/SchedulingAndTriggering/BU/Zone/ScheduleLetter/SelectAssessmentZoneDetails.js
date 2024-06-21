import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useMsal } from '@azure/msal-react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useFormikContext, Formik } from 'formik';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../../MDM/MDM_Tab_Buttons/Button';
import { useHistory } from 'react-router-dom';
import { Divider, Box } from '@mantine/core';
import Table2 from '../../../../../../components/UI/Table/Table2';
import { FloatRight } from 'tabler-icons-react';
import moment from 'moment';
import CustomModal from '../../../../../../components/UI/CustomModal';
import Swal from 'sweetalert2';
// import for multi select filter
import { Group } from '@mantine/core';
import { MultiSelect } from '@mantine/core';
import '../../../../../MDM/Control_Owner_Oversight/MultiSelectButtonStyles.scss';
import { months } from '../../../../../QuestionBank/CreateQuestions/constant';
import {
  getRlZonePage1Data,
  getRlAllZoneMdmData,
} from '../../../../../../redux/REP_Letters/RL_SchedulingAndTriggering/RL_SchedulingAndTriggeringAction';
import {
  getZonePage1dataSelector,
  rlAddZoneLetterDataSelector,
  getAllZoneMdmdataSelector,
} from '../../../../../../redux/REP_Letters/RL_SchedulingAndTriggering/RL_SchedulingAndTriggeringSelectors';
import { DotSpinner } from '@uiball/loaders';
import NoRecordPlaceholder from './NoDataPlaceHolder';
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

const SelectAssessmentDetailsZone = ({ handleNext }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [editTableIndex, setEditTableIndex] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const getBUPage1dataState = useSelector(getZonePage1dataSelector);
  const rlAddZoneLetterDataState = useSelector(rlAddZoneLetterDataSelector);
  const getAllZoneMdmdataState = useSelector(getAllZoneMdmdataSelector);
  const { instance, accounts, inProgress } = useMsal();
  const [finalPayload, setFinalPayload] = useState();

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
  }, [rlAddZoneLetterDataState?.data]);
  useEffect(() => {
    dispatch(getRlAllZoneMdmData());
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
      accessorKey: 'Disclosure_Processor',
      id: 'Disclosure_Processor',
      header: 'Processor',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 250,
    },
    {
      accessorKey: 'Zone_Control',
      id: 'Zone_Control',
      header: 'Head of Zone Control',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 250,
    },
    {
      accessorKey: 'Zone_VP',
      id: 'Zone_VP',
      header: 'Zone VP Finance',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 250,
    },

    {
      accessorKey: 'Excom_Member',
      id: 'Excom_Member',
      header: 'Excom Member',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 250,
    },
    {
      accessorKey: 'Zone_Legal_Representative',
      id: 'Zone_Legal_Representative',
      header: 'Zone Legal Representative',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 250,
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    if (getAllZoneMdmdataState?.data) {
      setTableData(
        getAllZoneMdmdataState?.data.map((i, index) => {
          return {
            id: index,
            ...i,
          };
        }),
      );
    }
  }, [getAllZoneMdmdataState?.data]);
  useEffect(() => {
    if (getBUPage1dataState?.data?.auto_fill_data) {
      setPage1Data({
        title: getBUPage1dataState?.data?.auto_fill_data[1]?.title,
        assessmentCylce: getBUPage1dataState?.data?.auto_fill_data[0]?.assessmentCylce,
        year: getBUPage1dataState?.data?.auto_fill_data[2]?.year,
        start_date: getBUPage1dataState?.data?.auto_fill_data[3]?.start_date,
        end_date: getBUPage1dataState?.data?.auto_fill_data[4]?.end_date,
        reminder1: getBUPage1dataState?.data?.auto_fill_data[5]?.reminder1,
        reminder2: getBUPage1dataState?.data?.auto_fill_data[6]?.reminder2,
      });
    }
  }, [getBUPage1dataState?.data]);

  useEffect(() => {
    dispatch(getRlZonePage1Data());
  }, []);

  const handleOnclickCancel = () => {
    history.push('/REP-Letters/scheduling-and-triggering');
  };

  const handleSaveAdd = (values) => {
    //console.log(value);
    console.log(values);
    //code for selected item from table
    if (editTableIndex.length === 0) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'All Signatories Selected.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'gold',
        cancelButtonColor: 'black',
        confirmButtonText: 'Yes, submit it!',
      }).then((res) => {
        if (res.isConfirmed) {
          const cloneData = tableData?.map((data, i) => {
            const clone = (({ id, ...o }) => o)(data);
            return clone;
          });

          let payload = {
            //Template: values.Template,
            Title: values.Title,
            Letter_Type: values.Template,
            Assessment_Cycle: values.Assessment_Cycle,
            Year: values.Year,
            Start_Date: values.Start_Date,
            Due_Date: values.Due_Date,
            Zone_VP_Reminder_1: values.Recipient_Reminder_1,
            Zone_VP_Reminder_2: values.Recipient_Reminder_2,
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
        const clone = (({ id, ...o }) => o)(data);
        return clone;
      });
      let payload = {
        //Template: values.Template,
        Title: values.Title,
        Letter_Type: values.Template,
        Assessment_Cycle: values.Assessment_Cycle,
        Year: values.Year,
        Start_Date: values.Start_Date,
        Due_Date: values.Due_Date,
        Zone_VP_Reminder_1: values.Recipient_Reminder_1,
        Zone_VP_Reminder_2: values.Recipient_Reminder_2,
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
  const handleClose = () => {
    setOpenReviewModal(false);
  };
  // logic for select all in multiselect filter button

  // logic for Year picker
  const years = [];
  const currentYear = new Date().getFullYear();
  const startYear = 2021; // Change as needed
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }
  return (
    <div className="holder shedule-letter">
      <div className="p-5">
        <h4 className="AssessmentBank-inputPage-sub-title">Select Letter Details</h4>
        <Formik
          enableReinitialize
          initialValues={{
            Template: 'Zone Letter',
            Title: page1Data?.title || '',
            Assessment_Cycle: page1Data?.assessmentCylce || '',
            Year: page1Data?.year || currentYear || '',
            Start_Date: page1Data?.start_date || '',
            Due_Date: page1Data?.end_date || '',
            Recipient_Reminder_1: page1Data?.reminder1 || '',
            Recipient_Reminder_2: page1Data?.reminder2 || '',
          }}
          validationSchema={Yup.object().shape({
            Template: Yup.string().required('Template is required'),
            Title: Yup.string().required('Title is required'),
            Assessment_Cycle: Yup.string().required('Assessment Cycle is required'),
            Year: Yup.string().required('Year is required'),
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
                      <Form.Label>Letter Type</Form.Label>
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
                          disabled={true}
                        >
                          <option value="">Select</option>
                          <option value="Zone Letter">Zone Letter</option>
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
                          min={values.Start_Date}
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
                          <Form.Label>Processor</Form.Label>
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
                          min={values.Start_Date}
                          max={values.Due_Date}
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
                          min={values.Start_Date}
                          max={values.Due_Date}
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
              <div className="row">
                <Divider
                  className="divider"
                  size="md"
                  my="xs"
                  labelPosition="center"
                  label={
                    <>
                      <Box ml={5}>
                        <Form.Label>Select Business Unit</Form.Label>
                      </Box>
                    </>
                  }
                />
              </div>

              {getAllZoneMdmdataState.loading ? (
                <div className="loader-animation">
                  <DotSpinner size={100} speed={0.9} color="#e3af32" />
                  <p className="loader-Desc ml-3">Please wait while Table Loading...</p>
                </div>
              ) : (
                <>
                  {getAllZoneMdmdataState?.data?.length == 0 ? (
                    <NoRecordPlaceholder />
                  ) : (
                    <>
                      {getAllZoneMdmdataState?.data?.length != 0 && (
                        <div className="row" style={{ paddingTop: '24px' }}>
                          <div className="col-12 col-lg-12">
                            <div className="mdm-table-button">
                              <div
                                className="table-heading"
                                style={{ justifyContent: 'space-between' }}
                              >
                                <div>
                                  <FloatRight size={24} strokeWidth={2} color={'#FFFFFF'} />
                                  <span style={{ paddingLeft: '16px' }}>Zone MDM Table</span>
                                </div>
                              </div>
                            </div>
                            <Table2
                              tableData={tableData}
                              loading={getAllZoneMdmdataState.loading}
                              tableColumns={tableColumns}
                              setEditTableIndex={setEditTableIndex}
                            />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </>
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
              <GetFormikFieldValue />
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

export default SelectAssessmentDetailsZone;

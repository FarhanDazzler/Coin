import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Alert, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../MDM/MDM_Tab_Buttons/Button';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { Select, Checkbox, Group, MultiSelect, Stack } from '@mantine/core';
import { useFormik } from 'formik';
import validator from 'validator';
import { Divider, Box } from '@mantine/core';
import { IconCalendarCheck } from '@tabler/icons-react';
import { getMegaProcessMicsFramework } from '../../../redux/MDM/MDM_Action';
import { getMegaProcessMicsFrameworkSelector } from '../../../redux/MDM/MDM_Selectors';
import {
  scheduleSurveyPage_1Selector,
  scheduleSurveyPage_2Selector,
  scheduleSurveyPage_3Selector,
  getAllZoneSelector,
  getAll_BU_FromZoneSelector,
  getAllEntityFromBUSelector,
  getAllProviderFromEntitySelector,
  getScheduleSurveyPage_2_tableSelector,
} from '../../../redux/AssessmentBank/AssessmentBankSelectors';
import {
  ScheduleSurveyPage_1,
  ScheduleSurveyPage_2,
  ScheduleSurveyPage_3,
  getAllZone,
  getAll_BU_FromZone,
  getAllEntityFromBU,
  getAllProviderFromEntity,
  getScheduleSurveyPage_2_table,
} from '../../../redux/AssessmentBank/AssessmentBankAction';

const Page3 = ({ handleNext, setStep }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  // states to store inputs from multi select buttons
  const [frequencyValue, setFrequencyValue] = useState([]);
  const [micsWeightValue, setMicsWeightValue] = useState([]);
  const [FCPAValue, setFCPAValue] = useState([]);
  const [abiKeyValue, setAbiKeyValue] = useState([]);
  const [megaProcessValue, setMegaProcessValue] = useState([]);
  const [automationValue, setAutomationValue] = useState([]);
  const [categoryValue, setCategoryValue] = useState([]);
  const [recommendedLevelValue, setRecommendedLevelValue] = useState([]);

  // getting Mega Process dropdown values from API
  const getMegaProcessMicsFrameworkState = useSelector(getMegaProcessMicsFrameworkSelector);

  // getting control IDs from page 2
  const scheduleSurveyPage_2_State = useSelector(scheduleSurveyPage_2Selector);

  useEffect(() => {
    dispatch(getMegaProcessMicsFramework());
  }, []);

  const selectObjectFormik = useFormik({
    initialValues: {
      selectTheProcedures: null,
      Frequency: [],
      mics_weight: [],
      FCPA: [],
      ABI_Key: [],
      Mega_Process: [],
      Automation: [],
      Category: [],
      Recommended_Level: [],
    },

    validate: (values) => {
      const errors = {};

      if (!values.selectTheProcedures) errors.selectTheProcedures = 'Please Select the procedures';

      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      if (values.selectTheProcedures === 'Select All Controls') {
        let payload = {
          selectTheProcedures: values.selectTheProcedures,
          Control_IDs: scheduleSurveyPage_2_State.ControlsTable,
        };
        console.log(payload, 'payload with Specific Controls');
        //dispatch(scheduleSurveyPage3Values(payload));
        setSubmitting(false);
        //handleNext();
      } else {
        let payload = {
          selectTheProcedures: values.selectTheProcedures,
          Control_IDs: scheduleSurveyPage_2_State.ControlsTable,
          Frequency: values.Frequency,
          mics_weight: values.mics_weight,
          FCPA: values.FCPA,
          ABI_Key: values.ABI_Key,
          Mega_Process: values.Mega_Process,
          Automation: values.Automation,
          Category: values.Category,
          Recommended_Level: values.Recommended_Level,
        };
        console.log(payload, 'payload without Specific Controls');
        //dispatch(scheduleSurveyPage3Values(payload));
        setSubmitting(false);
        //handleNext();
      }
    },
  });

  useEffect(() => {
    //dispatch(getMegaProcessPrefix(params));
  }, [selectObjectFormik?.values]);

  const handleOnclickCancel = () => {
    history.push('/assessmentbank');
  };

  return (
    <div className="p-5">
      <h4 className="AssessmentBank-inputPage-title">Select Object(s)/Specific controls</h4>

      <div className="row">
        <Divider
          className="divider"
          size="md"
          my="xs"
          labelPosition="center"
          label={
            <>
              <IconCalendarCheck size={16} />
              <Box ml={5}>
                <Form.Label>Select the procedures:</Form.Label>
              </Box>
            </>
          }
        />
      </div>
      <div className="row">
        <div className="col-lg-4" style={{ paddingTop: '5px' }}>
          <Form.Label>Procedures:</Form.Label>
        </div>
        <div className="col-lg-4">
          <Select
            name="selectTheProcedures"
            key="selectTheProcedures"
            label=""
            placeholder="Select the procedures:"
            data={['Select All Controls', 'Select Specific Controls']}
            searchable
            radius={'lg'}
            maxDropdownHeight={400}
            onChange={(e) => {
              console.log(e);
              selectObjectFormik.setFieldValue('selectTheProcedures', e);
              if (e === 'Select All Controls') {
                selectObjectFormik.handleSubmit();
              }
            }}
            value={selectObjectFormik.values.selectTheProcedures}
            error={selectObjectFormik.errors.selectTheProcedures}
            disabled={selectObjectFormik.isSubmitting}
          />
        </div>
      </div>

      {selectObjectFormik?.values.selectTheProcedures === 'Select Specific Controls' && (
        <>
          <div className="row">
            <Divider
              className="divider"
              size="md"
              my="xs"
              labelPosition="center"
              label={
                <>
                  <IconCalendarCheck size={16} />
                  <Box ml={5}>
                    <Form.Label>Select by Control Attributes:</Form.Label>
                  </Box>
                </>
              }
            />
          </div>

          <div className="row">
            <div className="col-lg-6">
              <MultiSelect
                className="mantine-MultiSelect-wrapper-AssessmentBank"
                data={[
                  'Annually',
                  'Semi-Annaually',
                  'Quaterly',
                  'Monthly',
                  'Weekly',
                  'Daily',
                  'Event Based',
                ]}
                label={<Form.Label className="mantine-MultiSelect-label">{'Frequency'}</Form.Label>}
                placeholder={'Select Frequency'}
                searchable
                limit={20}
                nothingFound="Nothing found"
                clearButtonLabel="Clear selection"
                clearable
                value={frequencyValue}
                onChange={(e) => {
                  selectObjectFormik.setFieldValue('Frequency', e);
                  setFrequencyValue(e);
                }}
                disabled={selectObjectFormik.isSubmitting}
                error={selectObjectFormik.errors.Frequency}
                radius="xl"
                variant="filled"
                size="xs"
              />
            </div>

            <div className="col-lg-6">
              <MultiSelect
                className="mantine-MultiSelect-wrapper-AssessmentBank"
                data={['1', '2', '10']}
                label={<Form.Label className="mantine-MultiSelect-label">{'Weighting'}</Form.Label>}
                placeholder={'Select Mics Weight'}
                searchable
                limit={20}
                nothingFound="Nothing found"
                clearButtonLabel="Clear selection"
                clearable
                value={micsWeightValue}
                onChange={(e) => {
                  selectObjectFormik.setFieldValue('mics_weight', e);
                  setMicsWeightValue(e);
                }}
                disabled={selectObjectFormik.isSubmitting}
                error={selectObjectFormik.errors.mics_weight}
                radius="xl"
                variant="filled"
                size="xs"
              />
            </div>

            <div className="col-lg-6">
              <MultiSelect
                className="mantine-MultiSelect-wrapper-AssessmentBank"
                data={['Yes', 'No']}
                label={<Form.Label className="mantine-MultiSelect-label">{'FCPA'}</Form.Label>}
                placeholder={'Select FCPA'}
                searchable
                limit={20}
                nothingFound="Nothing found"
                clearButtonLabel="Clear selection"
                clearable
                value={FCPAValue}
                onChange={(e) => {
                  selectObjectFormik.setFieldValue('FCPA', e);
                  setFCPAValue(e);
                }}
                disabled={selectObjectFormik.isSubmitting}
                error={selectObjectFormik.errors.FCPA}
                radius="xl"
                variant="filled"
                size="xs"
              />
            </div>

            <div className="col-lg-6">
              <MultiSelect
                className="mantine-MultiSelect-wrapper-AssessmentBank"
                data={['Key', 'Non Key']}
                label={<Form.Label className="mantine-MultiSelect-label">{'ABI Key'}</Form.Label>}
                placeholder={'Select ABI Key'}
                searchable
                limit={20}
                nothingFound="Nothing found"
                clearButtonLabel="Clear selection"
                clearable
                value={abiKeyValue}
                onChange={(e) => {
                  selectObjectFormik.setFieldValue('ABI_Key', e);
                  setAbiKeyValue(e);
                }}
                disabled={selectObjectFormik.isSubmitting}
                error={selectObjectFormik.errors.ABI_Key}
                radius="xl"
                variant="filled"
                size="xs"
              />
            </div>

            <div className="col-lg-6">
              <MultiSelect
                className="mantine-MultiSelect-wrapper-AssessmentBank"
                data={getMegaProcessMicsFrameworkState?.data?.map((i) => i.Megaprocess_Short) || []}
                label={
                  <Form.Label className="mantine-MultiSelect-label">{'Mega Process'}</Form.Label>
                }
                placeholder={'Select Mega Process'}
                searchable
                limit={20}
                nothingFound="Nothing found"
                clearButtonLabel="Clear selection"
                clearable
                value={megaProcessValue}
                onChange={(e) => {
                  selectObjectFormik.setFieldValue('Mega_Process', e);
                  setMegaProcessValue(e);
                }}
                disabled={selectObjectFormik.isSubmitting}
                error={selectObjectFormik.errors.Mega_Process}
                radius="xl"
                variant="filled"
                size="xs"
              />
            </div>

            <div className="col-lg-6">
              <MultiSelect
                className="mantine-MultiSelect-wrapper-AssessmentBank"
                data={['Automated', 'IT Dependent', 'Manual']}
                label={
                  <Form.Label className="mantine-MultiSelect-label">{'Automation'}</Form.Label>
                }
                placeholder={'Select Automation'}
                searchable
                limit={20}
                nothingFound="Nothing found"
                clearButtonLabel="Clear selection"
                clearable
                value={automationValue}
                onChange={(e) => {
                  selectObjectFormik.setFieldValue('Automation', e);
                  setAutomationValue(e);
                }}
                disabled={selectObjectFormik.isSubmitting}
                error={selectObjectFormik.errors.Automation}
                radius="xl"
                variant="filled"
                size="xs"
              />
            </div>

            <div className="col-lg-6">
              <MultiSelect
                className="mantine-MultiSelect-wrapper-AssessmentBank"
                data={['Non IT', 'IT']}
                label={<Form.Label className="mantine-MultiSelect-label">{'Category'}</Form.Label>}
                placeholder={'Select Category'}
                searchable
                limit={20}
                nothingFound="Nothing found"
                clearButtonLabel="Clear selection"
                clearable
                value={categoryValue}
                onChange={(e) => {
                  selectObjectFormik.setFieldValue('Category', e);
                  setCategoryValue(e);
                }}
                disabled={selectObjectFormik.isSubmitting}
                error={selectObjectFormik.errors.Category}
                radius="xl"
                variant="filled"
                size="xs"
              />
            </div>

            <div className="col-lg-6">
              <MultiSelect
                className="mantine-MultiSelect-wrapper-AssessmentBank"
                data={['BU HQ', 'Global HQ', 'NoCC', 'Site', 'Zone HQ', 'Zone Solutions']}
                label={
                  <Form.Label className="mantine-MultiSelect-label">
                    {'Recommended Level'}
                  </Form.Label>
                }
                placeholder={'Select Recommended Level'}
                searchable
                limit={20}
                nothingFound="Nothing found"
                clearButtonLabel="Clear selection"
                clearable
                value={recommendedLevelValue}
                onChange={(e) => {
                  selectObjectFormik.setFieldValue('Recommended_Level', e);
                  setRecommendedLevelValue(e);
                }}
                disabled={selectObjectFormik.isSubmitting}
                error={selectObjectFormik.errors.Recommended_Level}
                radius="xl"
                variant="filled"
                size="xs"
              />
            </div>
          </div>
        </>
      )}

      <div className="footer-action-AssessmentBank">
        <div className="d-flex align-items-center justify-content-end">
          <div>
            <Button variant="outlined" color="secondary" onClick={() => handleOnclickCancel()}>
              Cancel
            </Button>
            <Button
              color="neutral"
              className="ml-4"
              onClick={() => {
                setStep(2);
              }}
            >
              {'<'} Previous
            </Button>
            <Button
              color="neutral"
              className="ml-4"
              onClick={() => {
                selectObjectFormik.handleSubmit();
                //console.log(selectObjectFormik?.values);
              }}
            >
              Next {'>'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page3;

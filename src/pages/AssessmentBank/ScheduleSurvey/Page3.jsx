import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { FloatRight, TableOptions, ListCheck } from 'tabler-icons-react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../MDM/MDM_Tab_Buttons/Button';
import { useHistory } from 'react-router-dom';
import { MultiSelect } from '@mantine/core';
import { useFormik } from 'formik';
import { Divider, Box } from '@mantine/core';
import Table from '../../../components/UI/Table';
import Table2 from '../../../components/UI/Table/Table2';
import { getMegaProcessMicsFramework } from '../../../redux/MDM/MDM_Action';
import { getMegaProcessMicsFrameworkSelector } from '../../../redux/MDM/MDM_Selectors';
import {
  scheduleSurveyPage_3Selector,
  getAllZoneSelector,
  getAll_BU_FromZoneSelector,
  getAllEntityFromBUSelector,
  getAllProviderFromEntitySelector,
  getScheduleSurveyPage_2_tableSelector,
  getScheduleSurveyPage_3_tableSelector,
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
  getScheduleSurveyPage_3_table,
} from '../../../redux/AssessmentBank/AssessmentBankAction';

const Page3 = ({ handleNext, setStep }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [editTableIndex, setEditTableIndex] = useState([]);

  useEffect(() => {
    dispatch(getAllZone());
  }, []);

  const scheduleSurveyPage_3_State = useSelector(scheduleSurveyPage_3Selector);
  const getAllZone_State = useSelector(getAllZoneSelector);
  const getAll_BU_FromZone_State = useSelector(getAll_BU_FromZoneSelector);
  const getAllEntityFromBU_State = useSelector(getAllEntityFromBUSelector);
  const getAllProviderFromEntity_State = useSelector(getAllProviderFromEntitySelector);
  const getScheduleSurveyPage_2_table_State = useSelector(getScheduleSurveyPage_2_tableSelector);

  // states to store inputs from multi select buttons
  const [zoneValue, setZoneValue] = useState(scheduleSurveyPage_3_State?.Zone || []);
  const [buValue, setBUValue] = useState(scheduleSurveyPage_3_State?.BU || []);
  const [entityValue, setEntityValue] = useState(scheduleSurveyPage_3_State?.Entity || []);
  const [providerValue, setProviderValue] = useState(scheduleSurveyPage_3_State?.Provider || []);
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
  const getScheduleSurveyPage_3_table_State = useSelector(getScheduleSurveyPage_3_tableSelector);

  useEffect(() => {
    dispatch(getMegaProcessMicsFramework());
  }, []);

  const selectObjectFormik = useFormik({
    initialValues: {
      Zone: scheduleSurveyPage_3_State?.Zone || [],
      BU: scheduleSurveyPage_3_State?.BU || [],
      Entity: scheduleSurveyPage_3_State?.Entity || [],
      Provider: scheduleSurveyPage_3_State?.Provider || [],
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
      if (values.Zone && values.Zone.length === 0) errors.Zone = 'Zone is required';
      if (values.BU && values.BU.length === 0) errors.BU = 'BU is required';
      if (values.Entity && values.Entity.length === 0) errors.Entity = 'Entity is required';
      if (values.Provider && values.Provider.length === 0) errors.Provider = 'Provider is required';
      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      //code for selected item from table
      if (editTableIndex.length === 0) {
        Swal.fire({
          title: 'Are you sure?',
          text: 'All Control Instatnces Selected.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'gold',
          cancelButtonColor: 'black',
          confirmButtonText: 'Yes, submit it!',
        }).then((res) => {
          if (res.isConfirmed) {
            let payload = {
              Zone: values.Zone,
              BU: values.BU,
              Entity: values.Entity,
              Provider: values.Provider,
              Control_IDs: getScheduleSurveyPage_2_table_State.data,
              Control_IDs_fromPage_3: getScheduleSurveyPage_3_table_State.data[0].controlInstances,
              SelectedDataFromPage3: getScheduleSurveyPage_3_table_State.data[0].controlInstances,
            };
            console.log(payload, 'Page 3 payload');
            dispatch(ScheduleSurveyPage_3(payload));

            setSubmitting(false);
            handleNext();
          }
        });
      } else if (editTableIndex.length >= 1) {
        console.log(editTableIndex, 'editTableIndex');
        const data = tableData.filter((data, i) => editTableIndex.includes(data.id));

        let payload = {
          Zone: values.Zone,
          BU: values.BU,
          Entity: values.Entity,
          Provider: values.Provider,
          Control_IDs: getScheduleSurveyPage_2_table_State.data,
          Control_IDs_fromPage_3: getScheduleSurveyPage_3_table_State.data[0].controlInstances,
          SelectedDataFromPage3: data,
        };
        console.log(payload, 'Page 3 payload');
        dispatch(ScheduleSurveyPage_3(payload));

        setSubmitting(false);
        handleNext();
      }
    },
  });
  useEffect(() => {
    if (selectObjectFormik?.values.Zone.length > 0) {
      let params = {
        zones: selectObjectFormik?.values.Zone,
      };
      dispatch(getAll_BU_FromZone(params));
    }
    if (selectObjectFormik?.values.BU.length > 0) {
      let params = {
        bus: selectObjectFormik?.values.BU,
      };

      dispatch(getAllEntityFromBU(params));
    }
    if (selectObjectFormik?.values.Entity.length > 0) {
      let params = {
        entities: selectObjectFormik?.values.Entity,
      };
      dispatch(getAllProviderFromEntity(params));
    }
    if (selectObjectFormik?.values.Provider.length > 0) {
      let params = {
        controls: selectObjectFormik?.values.Provider,
      };
      dispatch(getScheduleSurveyPage_2_table(params));
    }
    if (getScheduleSurveyPage_2_table_State?.data) {
      let payload = {
        selectTheProcedures: 'Select Specific Controls',
        Control_IDs: getScheduleSurveyPage_2_table_State?.data,
        Frequency: selectObjectFormik?.values.Frequency,
        mics_weight: selectObjectFormik?.values.mics_weight,
        FCPA: selectObjectFormik?.values.FCPA,
        ABI_Key: selectObjectFormik?.values.ABI_Key,
        Mega_Process: selectObjectFormik?.values.Mega_Process,
        Automation: selectObjectFormik?.values.Automation,
        Category: selectObjectFormik?.values.Category,
        Recommended_Level: selectObjectFormik?.values.Recommended_Level,
      };
      dispatch(getScheduleSurveyPage_3_table(payload));
    }
  }, [selectObjectFormik?.values]);

  useEffect(() => {
    if (getScheduleSurveyPage_2_table_State?.data) {
      let payload = {
        selectTheProcedures: 'Select Specific Controls',
        Control_IDs: getScheduleSurveyPage_2_table_State?.data,
        Frequency: selectObjectFormik?.values.Frequency,
        mics_weight: selectObjectFormik?.values.mics_weight,
        FCPA: selectObjectFormik?.values.FCPA,
        ABI_Key: selectObjectFormik?.values.ABI_Key,
        Mega_Process: selectObjectFormik?.values.Mega_Process,
        Automation: selectObjectFormik?.values.Automation,
        Category: selectObjectFormik?.values.Category,
        Recommended_Level: selectObjectFormik?.values.Recommended_Level,
      };
      console.log(payload, 'API Payload with Specific Controls one time');
      dispatch(getScheduleSurveyPage_3_table(payload));
    }
  }, [getScheduleSurveyPage_2_table_State?.data]);

  const handleOnclickCancel = () => {
    history.push('/assessmentbank');
  };

  const TABLE_COLUMNS = [
    {
      accessorKey: 'zone',
      id: 'zone',
      header: 'Zone',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 90,
    },
    {
      accessorKey: 'Control_ID',
      id: 'Control_ID',
      header: 'Control ID',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 150,
    },
    {
      accessorKey: 'provider_entity',
      id: 'provider_entity',
      header: 'Provider Organization',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 250,
    },
    {
      accessorKey: 'receiver_entity',
      id: 'receiver_entity',
      header: 'Receiver Organization',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 250,
    },
    {
      accessorKey: 'control_id_provider_entity',
      id: 'control_id_provider_entity',
      header: 'Provider Organization + Control ID',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 300,
    },
    {
      accessorKey: 'cowner',
      id: 'cowner',
      header: 'Control Owner',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
    {
      accessorKey: 'coversight',
      id: 'coversight',
      header: 'Control Oversight',
      flex: 1,
      columnDefType: 'data',
      cellClassName: 'dashboardCell',
      size: 200,
    },
  ];
  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
  }, []);

  useEffect(() => {
    if (!getScheduleSurveyPage_3_table_State?.data[0]?.controlInstances) return;
    setTableData(
      getScheduleSurveyPage_3_table_State?.data[0]?.controlInstances.map((i, index) => {
        return {
          id: index,
          ...i,
        };
      }),
    );
  }, [getScheduleSurveyPage_3_table_State?.data[0]?.controlInstances]);

  // logic for select all in multiselect filter button
  const dropdownArrayZone = ['Select All', ...getAllZone_State?.data?.map((i) => i.zone)];

  const dropdownArrayBU = ['Select All', ...getAll_BU_FromZone_State?.data?.map((i) => i.BU)];

  const dropdownArrayEntity = [
    'Select All',
    ...getAllEntityFromBU_State?.data?.map((i) => i.country_entity),
  ];

  const dropdownArrayProvider = [
    'Select All',
    ...getAllProviderFromEntity_State?.data?.map((i) => i.Provider_Entity),
  ];

  return (
    <div className="p-5">
      <h4 className="AssessmentBank-inputPage-sub-title">Select Provider Organisation</h4>
      <div className="row">
        <div className="col-lg-6">
          <MultiSelect
            className="mantine-MultiSelect-wrapper-AssessmentBank"
            data={getAllZone_State?.data?.length ? dropdownArrayZone : []}
            label={<Form.Label className="mantine-MultiSelect-label">{'Zone'}</Form.Label>}
            placeholder={'Select Zone'}
            searchable
            limit={20}
            nothingFound="Nothing found"
            clearButtonLabel="Clear selection"
            clearable
            value={zoneValue}
            onChange={(e) => {
              if (e.includes('Select All')) {
                selectObjectFormik.setFieldValue(
                  'Zone',
                  getAllZone_State?.data?.map((i) => i.zone),
                );
                setZoneValue(getAllZone_State?.data?.map((i) => i.zone));
              } else {
                selectObjectFormik.setFieldValue('Zone', e);
                setZoneValue(e);
              }
            }}
            disabled={selectObjectFormik.isSubmitting}
            error={selectObjectFormik.errors.Zone}
            radius="xl"
            variant="filled"
            size="xs"
          />
        </div>

        {selectObjectFormik?.values.Zone.length > 0 && (
          <div className="col-lg-6">
            <MultiSelect
              className="mantine-MultiSelect-wrapper-AssessmentBank"
              data={getAll_BU_FromZone_State?.data?.length ? dropdownArrayBU : []}
              label={<Form.Label className="mantine-MultiSelect-label">{'BU'}</Form.Label>}
              placeholder={'Select BU'}
              searchable
              limit={20}
              nothingFound="Nothing found"
              clearButtonLabel="Clear selection"
              clearable
              value={buValue}
              onChange={(e) => {
                if (e.includes('Select All')) {
                  selectObjectFormik.setFieldValue(
                    'BU',
                    getAll_BU_FromZone_State?.data?.map((i) => i.BU),
                  );
                  setBUValue(getAll_BU_FromZone_State?.data?.map((i) => i.BU));
                } else {
                  selectObjectFormik.setFieldValue('BU', e);
                  setBUValue(e);
                }
              }}
              disabled={selectObjectFormik.isSubmitting}
              error={selectObjectFormik.errors.BU}
              radius="xl"
              variant="filled"
              size="xs"
            />
          </div>
        )}

        {selectObjectFormik?.values.BU.length > 0 && (
          <div className="col-lg-6">
            <MultiSelect
              className="mantine-MultiSelect-wrapper-AssessmentBank"
              data={getAllEntityFromBU_State?.data?.length ? dropdownArrayEntity : []}
              label={<Form.Label className="mantine-MultiSelect-label">{'Entity'}</Form.Label>}
              placeholder={'Select Entity'}
              searchable
              limit={20}
              nothingFound="Nothing found"
              clearButtonLabel="Clear selection"
              clearable
              value={entityValue}
              onChange={(e) => {
                if (e.includes('Select All')) {
                  selectObjectFormik.setFieldValue(
                    'Entity',
                    getAllEntityFromBU_State?.data?.map((i) => i.country_entity),
                  );
                  setEntityValue(getAllEntityFromBU_State?.data?.map((i) => i.country_entity));
                } else {
                  selectObjectFormik.setFieldValue('Entity', e);
                  setEntityValue(e);
                }
              }}
              disabled={selectObjectFormik.isSubmitting}
              error={selectObjectFormik.errors.Entity}
              radius="xl"
              variant="filled"
              size="xs"
            />
          </div>
        )}
        {selectObjectFormik?.values.Entity.length > 0 && (
          <div className="col-lg-6">
            <MultiSelect
              className="mantine-MultiSelect-wrapper-AssessmentBank"
              data={getAllProviderFromEntity_State?.data?.length ? dropdownArrayProvider : []}
              label={<Form.Label className="mantine-MultiSelect-label">{'Provider'}</Form.Label>}
              placeholder={'Select Provider'}
              searchable
              limit={20}
              nothingFound="Nothing found"
              clearButtonLabel="Clear selection"
              clearable
              value={providerValue}
              onChange={(e) => {
                if (e.includes('Select All')) {
                  selectObjectFormik.setFieldValue(
                    'Provider',
                    getAllProviderFromEntity_State?.data?.map((i) => i.Provider_Entity),
                  );
                  setProviderValue(
                    getAllProviderFromEntity_State?.data?.map((i) => i.Provider_Entity),
                  );
                } else {
                  selectObjectFormik.setFieldValue('Provider', e);
                  setProviderValue(e);
                }
                //console.log(e, 'Provider');
              }}
              disabled={selectObjectFormik.isSubmitting}
              error={selectObjectFormik.errors.Provider}
              radius="xl"
              variant="filled"
              size="xs"
            />
          </div>
        )}
      </div>

      {selectObjectFormik?.values.Provider.length > 0 && (
        <>
          <div className="row">
            <Divider
              className="divider"
              size="md"
              my="xs"
              labelPosition="center"
              label={
                <>
                  <ListCheck size={16} />
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

          <div className="row">
            <Divider
              className="divider"
              size="md"
              my="xs"
              labelPosition="center"
              label={
                <>
                  <TableOptions size={16} />
                  <Box ml={5}>
                    <Form.Label>Controls Table based on above selection:</Form.Label>
                  </Box>
                </>
              }
            />
          </div>

          <div className="row" style={{ paddingTop: '24px' }}>
            <div className="col-12 col-lg-12">
              <div className="mdm-table-button">
                <div className="table-heading" style={{ justifyContent: 'space-between' }}>
                  <div>
                    <FloatRight size={24} strokeWidth={2} color={'#FFFFFF'} />
                    <span style={{ paddingLeft: '16px' }}>Controls Table</span>
                  </div>
                </div>
              </div>
              <Table2
                tableData={tableData}
                loading={getScheduleSurveyPage_3_table_State.loading}
                tableColumns={tableColumns}
                setEditTableIndex={setEditTableIndex}
              />
            </div>
          </div>
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
                dispatch(getScheduleSurveyPage_3_table({}));
                dispatch(getScheduleSurveyPage_2_table({}));
                dispatch(ScheduleSurveyPage_3({}));
                dispatch(ScheduleSurveyPage_2({}));
                dispatch(ScheduleSurveyPage_1({}));
              }}
            >
              Cancel
            </Button>
            <Button
              color="neutral"
              className="ml-4"
              onClick={() => {
                setStep(1);
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

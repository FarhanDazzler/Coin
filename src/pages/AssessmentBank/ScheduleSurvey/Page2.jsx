import React, { useState, useEffect } from 'react';
import { FloatRight } from 'tabler-icons-react';
import * as Yup from 'yup';
import { Alert, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../MDM/MDM_Tab_Buttons/Button';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { Group, MultiSelect, Stack } from '@mantine/core';
import { useFormik } from 'formik';
import validator from 'validator';
import {
  scheduleSurveyPage_1Selector,
  scheduleSurveyPage_2Selector,
  getAllZoneSelector,
  getAll_BU_FromZoneSelector,
  getAllEntityFromBUSelector,
  getAllProviderFromEntitySelector,
  getScheduleSurveyPage_2_tableSelector,
} from '../../../redux/AssessmentBank/AssessmentBankSelectors';
import {
  ScheduleSurveyPage_1,
  ScheduleSurveyPage_2,
  getAllZone,
  getAll_BU_FromZone,
  getAllEntityFromBU,
  getAllProviderFromEntity,
  getScheduleSurveyPage_2_table,
} from '../../../redux/AssessmentBank/AssessmentBankAction';
import Table from '../../../components/UI/Table';

const Page2 = ({ handleNext, setStep }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [tableColumns, setTableColumns] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getAllZone());
  }, []);

  const scheduleSurveyPage_2_State = useSelector(scheduleSurveyPage_2Selector);
  const getAllZone_State = useSelector(getAllZoneSelector);
  const getAll_BU_FromZone_State = useSelector(getAll_BU_FromZoneSelector);
  const getAllEntityFromBU_State = useSelector(getAllEntityFromBUSelector);
  const getAllProviderFromEntity_State = useSelector(getAllProviderFromEntitySelector);
  const getScheduleSurveyPage_2_table_State = useSelector(getScheduleSurveyPage_2_tableSelector);

  // console.log(
  //   getAllZone_State?.data?.map((i) => i.zone),
  //   'zone from API',
  // );

  const zone = ['Naz', 'afr', 'test'];

  // states to store inputs from multi select buttons
  const [zoneValue, setZoneValue] = useState([]);
  const [buValue, setBUValue] = useState([]);
  const [entityValue, setEntityValue] = useState([]);
  const [providerValue, setProviderValue] = useState([]);

  const selectOrganisationFormik = useFormik({
    initialValues: {
      Zone: [],
      BU: [],
      Entity: [],
      Provider: [],
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
      let payload = {
        Zone: values.Zone,
        BU: values.BU,
        Entity: values.Entity,
        Provider: values.Provider,
        ControlsTable: getScheduleSurveyPage_2_table_State.data,
      };

      console.log(payload, 'page 2 values');
      dispatch(ScheduleSurveyPage_2(payload));

      setSubmitting(false);
      handleNext();
    },
  });

  useEffect(() => {
    if (selectOrganisationFormik?.values.Zone.length > 0) {
      let params = {
        zones: selectOrganisationFormik?.values.Zone,
      };
      dispatch(getAll_BU_FromZone(params));
    }
    if (selectOrganisationFormik?.values.BU.length > 0) {
      let params = {
        bus: selectOrganisationFormik?.values.BU,
      };

      dispatch(getAllEntityFromBU(params));
    }
    if (selectOrganisationFormik?.values.Entity.length > 0) {
      let params = {
        entities: selectOrganisationFormik?.values.Entity,
      };
      dispatch(getAllProviderFromEntity(params));
    }
    if (selectOrganisationFormik?.values.Provider.length > 0) {
      let params = {
        controls: selectOrganisationFormik?.values.Provider,
      };
      dispatch(getScheduleSurveyPage_2_table(params));
    }
  }, [selectOrganisationFormik?.values]);

  const handleOnclickCancel = () => {
    history.push('/assessmentbank');
  };

  // table code below

  const TABLE_COLUMNS = [
    {
      field: 'zone',
      headerName: 'Zone',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 100,
    },
    {
      field: 'provider_entity',
      headerName: 'Provider Organization',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'Control_ID',
      headerName: 'Control ID',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 200,
    },
    {
      field: 'control_id_provider_entity',
      headerName: 'Provider Organization + Control ID',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 300,
    },
    {
      field: 'cowner',
      headerName: 'Control Owner',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 250,
    },
    {
      field: 'coversight',
      headerName: 'Control Oversight',
      flex: 1,
      cellClassName: 'dashboardCell',
      minWidth: 250,
    },
  ];

  useEffect(() => {
    setTableColumns(TABLE_COLUMNS);
    setTableData(
      getScheduleSurveyPage_2_table_State.data.map((i, index) => {
        return {
          id: index,
          ...i,
        };
      }),
    );
  }, [getScheduleSurveyPage_2_table_State.data]);

  return (
    <div className="p-5">
      <h4 className="AssessmentBank-inputPage-title">Select Organisation</h4>
      <div className="row">
        <div className="col-lg-6">
          <MultiSelect
            className="mantine-MultiSelect-wrapper-AssessmentBank"
            data={getAllZone_State?.data?.map((i) => i.zone) || []}
            label={<Form.Label className="mantine-MultiSelect-label">{'Zone'}</Form.Label>}
            placeholder={'Select Zone'}
            searchable
            limit={20}
            nothingFound="Nothing found"
            clearButtonLabel="Clear selection"
            clearable
            value={zoneValue}
            onChange={(e) => {
              selectOrganisationFormik.setFieldValue('Zone', e);
              setZoneValue(e);
              //console.log(e, 'cowner filter');
            }}
            disabled={selectOrganisationFormik.isSubmitting}
            error={selectOrganisationFormik.errors.Zone}
            radius="xl"
            variant="filled"
            size="xs"
          />
        </div>

        {selectOrganisationFormik?.values.Zone.length > 0 && (
          <div className="col-lg-6">
            <MultiSelect
              className="mantine-MultiSelect-wrapper-AssessmentBank"
              data={getAll_BU_FromZone_State?.data?.map((i) => i.BU) || []}
              label={<Form.Label className="mantine-MultiSelect-label">{'BU'}</Form.Label>}
              placeholder={'Select BU'}
              searchable
              limit={20}
              nothingFound="Nothing found"
              clearButtonLabel="Clear selection"
              clearable
              value={buValue}
              onChange={(e) => {
                selectOrganisationFormik.setFieldValue('BU', e);
                setBUValue(e);
                //console.log(e, 'cowner filter');
              }}
              disabled={selectOrganisationFormik.isSubmitting}
              error={selectOrganisationFormik.errors.BU}
              radius="xl"
              variant="filled"
              size="xs"
            />
          </div>
        )}

        {selectOrganisationFormik?.values.BU.length > 0 && (
          <div className="col-lg-6">
            <MultiSelect
              className="mantine-MultiSelect-wrapper-AssessmentBank"
              data={getAllEntityFromBU_State?.data?.map((i) => i.country_entity) || []}
              label={<Form.Label className="mantine-MultiSelect-label">{'Entity'}</Form.Label>}
              placeholder={'Select Entity'}
              searchable
              limit={20}
              nothingFound="Nothing found"
              clearButtonLabel="Clear selection"
              clearable
              value={entityValue}
              onChange={(e) => {
                selectOrganisationFormik.setFieldValue('Entity', e);
                setEntityValue(e);
                //console.log(e, 'cowner filter');
              }}
              disabled={selectOrganisationFormik.isSubmitting}
              error={selectOrganisationFormik.errors.Entity}
              radius="xl"
              variant="filled"
              size="xs"
            />
          </div>
        )}
        {selectOrganisationFormik?.values.Entity.length > 0 && (
          <div className="col-lg-6">
            <MultiSelect
              className="mantine-MultiSelect-wrapper-AssessmentBank"
              data={getAllProviderFromEntity_State?.data?.map((i) => i.Provider_Entity) || []}
              label={<Form.Label className="mantine-MultiSelect-label">{'Provider'}</Form.Label>}
              placeholder={'Select Provider'}
              searchable
              limit={20}
              nothingFound="Nothing found"
              clearButtonLabel="Clear selection"
              clearable
              value={providerValue}
              onChange={(e) => {
                selectOrganisationFormik.setFieldValue('Provider', e);
                setProviderValue(e);
                //console.log(e, 'cowner filter');
              }}
              disabled={selectOrganisationFormik.isSubmitting}
              error={selectOrganisationFormik.errors.Provider}
              radius="xl"
              variant="filled"
              size="xs"
            />
          </div>
        )}
      </div>

      {selectOrganisationFormik?.values.Provider.length > 0 && (
        <div className="row" style={{ paddingTop: '24px' }}>
          <div className="col col-lg-12">
            <div className="mdm-table-button">
              <div className="table-heading" style={{ justifyContent: 'space-between' }}>
                <div>
                  <FloatRight size={24} strokeWidth={2} color={'#FFFFFF'} />
                  <span style={{ paddingLeft: '16px' }}>Controls Table</span>
                </div>
              </div>
            </div>
            <Table tableData={tableData} tableColumns={tableColumns} columns={tableColumns} />
          </div>
        </div>
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
                setStep(1);
              }}
            >
              {'<'} Previous
            </Button>
            <Button
              color="neutral"
              className="ml-4"
              onClick={() => {
                selectOrganisationFormik.handleSubmit();
                console.log(selectOrganisationFormik?.values);
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

export default Page2;

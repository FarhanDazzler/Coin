import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Alert, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../MDM/MDM_Tab_Buttons/Button';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { Group, MultiSelect, Stack } from '@mantine/core';
import { useFormik } from 'formik';
import validator from 'validator';

const Page2 = ({ handleNext, setStep }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [page1Value, setPage1Value] = useState();

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
      console.log(values, 'page 2 values');

      let payload = {
        Zone: values.Zone,
        BU: values.BU,
        Entity: values.Entity,
        Provider: values.Provider,
      };
      //dispatch(scheduleSurveyPage2Values(payload));
      setSubmitting(false);
    },
  });

  useEffect(() => {
    //dispatch(getMegaProcessPrefix(params));
    if (selectOrganisationFormik?.values.Zone.length > 0) {
      // let params = {
      //   parent: values.Parent_Process,
      // };
      //dispatch(getMegaProcessPrefix(params));
    } else if (selectOrganisationFormik?.values.BU.length > 0) {
      // let params = {
      //   parent: values.Parent_Process,
      // };
      //dispatch(getSubprocessPrefix(params));
    } else if (selectOrganisationFormik?.values.Entity.length > 0) {
      // let params = {
      //   parent: values.Parent_Process,
      // };
      //dispatch(getSubprocessPrefix(params));
    } else if (selectOrganisationFormik?.values.Provider.length > 0) {
      // let params = {
      //   parent: values.Parent_Process,
      // };
      //dispatch(getSubprocessPrefix(params));
    }
  }, [selectOrganisationFormik?.values]);

  const handleOnclickCancel = () => {
    history.push('/assessmentbank');
  };

  return (
    <div className="p-5">
      <h4 className="AssessmentBank-inputPage-title">Select Organisation</h4>
      <div className="row">
        <div className="col-lg-6">
          <MultiSelect
            className="mantine-MultiSelect-wrapper-AssessmentBank"
            data={zone}
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

        <div className="col-lg-6">
          <MultiSelect
            className="mantine-MultiSelect-wrapper-AssessmentBank"
            data={zone}
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

        <div className="col-lg-6">
          <MultiSelect
            className="mantine-MultiSelect-wrapper-AssessmentBank"
            data={zone}
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
        <div className="col-lg-6">
          <MultiSelect
            className="mantine-MultiSelect-wrapper-AssessmentBank"
            data={zone}
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
      </div>

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
                handleNext();
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

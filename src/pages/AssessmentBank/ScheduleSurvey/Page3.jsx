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

const Page3 = ({ handleNext, setStep }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [page1Value, setPage1Value] = useState();
  const [proceduresValue, setProceduresValue] = useState([]);

  const zone = ['Naz', 'afr', 'test'];

  const selectObjectFormik = useFormik({
    initialValues: {
      selectTheProcedures: null,
      Zone: [],
      BU: [],
      Entity: [],
      Provider: [],
    },

    validate: (values) => {
      const errors = {};

      if (!values.selectTheProcedures) errors.selectTheProcedures = 'Please Select the procedures';

      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      console.log(values, 'page 2 values');

      let payload = {
        selectTheProcedures: values.selectTheProcedures,
      };
      //dispatch(scheduleSurveyPage3Values(payload));
      setSubmitting(false);
      handleNext();
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
            }}
            value={selectObjectFormik.values.selectTheProcedures}
            error={selectObjectFormik.errors.selectTheProcedures}
            disabled={selectObjectFormik.isSubmitting}
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
                console.log(selectObjectFormik?.values);
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

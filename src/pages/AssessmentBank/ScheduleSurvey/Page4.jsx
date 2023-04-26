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
  scheduleSurveyPage_3Selector,
} from '../../../redux/AssessmentBank/AssessmentBankSelectors';

const Page4 = ({ handleNext, setStep }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const scheduleSurveyPage_1_State = useSelector(scheduleSurveyPage_1Selector);
  const scheduleSurveyPage_2_State = useSelector(scheduleSurveyPage_2Selector);
  const scheduleSurveyPage_3_State = useSelector(scheduleSurveyPage_3Selector);

  const handleOnclickCancel = () => {
    history.push('/assessmentbank');
  };

  const handleOnclickSubmit = () => {
    //history.push('/assessmentbank');
  };

  return (
    <div className="p-5">
      <h4 className="AssessmentBank-inputPage-title">Review & Confirm</h4>
      <div className="row">
        <div className="col-lg-6">
          <div className="row mb-4">
            <div className="col-lg-6">
              <span className="grey-text font-weight-bold">Survey Name:</span>
            </div>
            <div className="col-lg-6">{scheduleSurveyPage_1_State.Survey_Name}</div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="row mb-4">
            <div className="col-lg-6">
              <span className="grey-text font-weight-bold">Question Bank:</span>
            </div>
            <div className="col-lg-6">{scheduleSurveyPage_1_State.Question_Bank}</div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="row mb-4">
            <div className="col-lg-6">
              <span className="grey-text font-weight-bold">Assessment Cycle:</span>
            </div>
            <div className="col-lg-6">{scheduleSurveyPage_1_State.Assessment_Cycle}</div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="row mb-4">
            <div className="col-lg-6">
              <span className="grey-text font-weight-bold">Year:</span>
            </div>
            <div className="col-lg-6">{scheduleSurveyPage_1_State.Year}</div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="row mb-4">
            <div className="col-lg-6">
              <span className="grey-text font-weight-bold">KPI From:</span>
            </div>
            <div className="col-lg-6">{scheduleSurveyPage_1_State.KPI_From}</div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="row mb-4">
            <div className="col-lg-6">
              <span className="grey-text font-weight-bold">KPI To:</span>
            </div>
            <div className="col-lg-6">{scheduleSurveyPage_1_State.KPI_To}</div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="row mb-4">
            <div className="col-lg-6">
              <span className="grey-text font-weight-bold">Start Date:</span>
            </div>
            <div className="col-lg-6">{scheduleSurveyPage_1_State.Start_Date}</div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="row mb-4">
            <div className="col-lg-6">
              <span className="grey-text font-weight-bold">Due Date:</span>
            </div>
            <div className="col-lg-6">{scheduleSurveyPage_1_State.Due_Date}</div>
          </div>
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
                setStep(3);
              }}
            >
              {'<'} Previous
            </Button>
            <Button color="neutral" className="ml-4" onClick={() => handleOnclickSubmit()}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page4;

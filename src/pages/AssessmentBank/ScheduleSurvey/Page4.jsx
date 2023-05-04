import React, { useState, useEffect } from 'react';
import { MsalProvider, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { FloatRight, TableExport } from 'tabler-icons-react';
import * as Yup from 'yup';
import { Alert, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../MDM/MDM_Tab_Buttons/Button';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { Group, MultiSelect, Stack } from '@mantine/core';
import { useFormik } from 'formik';
import validator from 'validator';
import { Divider, Box } from '@mantine/core';
import Workbook from 'react-excel-workbook';
import '../AssessmentBankLandingPage.scss';
import {
  addAssessmentSchedulingAndTriggeringSelector,
  scheduleSurveyPage_1Selector,
  scheduleSurveyPage_2Selector,
  scheduleSurveyPage_3Selector,
} from '../../../redux/AssessmentBank/AssessmentBankSelectors';
import { addAssessmentSchedulingAndTriggering } from '../../../redux/AssessmentBank/AssessmentBankAction';

const Page4 = ({ handleNext, setStep }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { instance, accounts, inProgress } = useMsal();

  const scheduleSurveyPage_1_State = useSelector(scheduleSurveyPage_1Selector);
  const scheduleSurveyPage_2_State = useSelector(scheduleSurveyPage_2Selector);
  const scheduleSurveyPage_3_State = useSelector(scheduleSurveyPage_3Selector);

  const handleOnclickCancel = () => {
    history.push('/assessmentbank');
  };

  const handleOnclickSubmit = () => {
    let payload = {
      Survey_details: scheduleSurveyPage_1_State,
      Final_controls_instances: scheduleSurveyPage_3_State?.Control_IDs_fromPage_3,
      Created_By: {
        Email: accounts[0]?.username,
        name: accounts[0]?.name ? accounts[0].name : '',
      },
    };
    console.log(payload, 'Page 4 payload');
    dispatch(addAssessmentSchedulingAndTriggering(payload));
    history.push('/assessmentbank');
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

      <div className="row">
        <Divider
          className="divider"
          size="md"
          my="xs"
          labelPosition="center"
          label={
            <>
              <TableExport size={16} />
              <Box ml={5}>
                <Form.Label>View All Selected Instances:</Form.Label>
              </Box>
            </>
          }
        />
      </div>

      <div className="row">
        <Workbook
          filename="Control_IDs.xlsx"
          element={
            <>
              <span className="grey-text font-weight-bold">Instances:</span>
              <button className="export_excel_button">
                <strong>Export To Excel</strong>
              </button>
            </>
          }
        >
          <Workbook.Sheet
            data={scheduleSurveyPage_3_State?.Control_IDs_fromPage_3}
            name="Controls ID"
          >
            <Workbook.Column label="Zone" value="zone" />
            <Workbook.Column label="Control_ID" value="Control_ID" />
            <Workbook.Column label="provider_entity" value="provider_entity" />
            <Workbook.Column label="receiver_entity" value="receiver_entity" />
            <Workbook.Column
              label="control_id_provider_entity"
              value="control_id_provider_entity"
            />
            <Workbook.Column label="Control Owner" value="cowner" />
            <Workbook.Column label="Control Owner Status" value="cowner_status" />
            <Workbook.Column label="Control Oversight" value="coversight" />
            <Workbook.Column label="Control Oversight Status" value="coversight_status" />
          </Workbook.Sheet>
        </Workbook>
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

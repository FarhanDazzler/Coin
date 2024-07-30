import React, { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { useHistory } from 'react-router-dom';
import { TableExport } from 'tabler-icons-react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../../../MDM/MDM_Tab_Buttons/Button';
import { Divider, Box } from '@mantine/core';
import Workbook from 'react-excel-workbook';
import { months } from '../../../../../QuestionBank/CreateQuestions/constant';
import { addRlZoneLetterData } from '../../../../../../redux/REP_Letters/RL_SchedulingAndTriggering/RL_SchedulingAndTriggeringAction';

const ReviewLetterDetails = ({ finalPayload, onClose }) => {
  const history = useHistory();
  console.log('finalPayload', finalPayload);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(addRlZoneLetterData(finalPayload));
    history.push('/REP-Letters/scheduling-and-triggering');
  };

  return (
    <>
      <div className="p-5">
        <h4 className="AssessmentBank-inputPage-sub-title">Review & Confirm</h4>
        <div className="row">
          <div className="col-lg-6">
            <div className="row mb-4">
              <div className="col-lg-6">
                <span className="black-text font-weight-bold">Letter Type:</span>
              </div>
              <div className="col-lg-6">{finalPayload?.Letter_Type}</div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row mb-4">
              <div className="col-lg-6">
                <span className="black-text font-weight-bold">Title:</span>
              </div>
              <div className="col-lg-6">{finalPayload?.Title}</div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row mb-4">
              <div className="col-lg-6">
                <span className="black-text font-weight-bold">Assessment Cycle:</span>
              </div>
              <div className="col-lg-6">{finalPayload?.Assessment_Cycle}</div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row mb-4">
              <div className="col-lg-6">
                <span className="black-text font-weight-bold">Year:</span>
              </div>
              <div className="col-lg-6">{finalPayload?.Year}</div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row mb-4">
              <div className="col-lg-6">
                <span className="black-text font-weight-bold">Start Date:</span>
              </div>
              <div className="col-lg-6">{finalPayload?.Start_Date}</div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row mb-4">
              <div className="col-lg-6">
                <span className="black-text font-weight-bold">Due Date:</span>
              </div>
              <div className="col-lg-6">{finalPayload?.Due_Date}</div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row mb-4">
              <div className="col-lg-6">
                <span className="black-text font-weight-bold">Reminder - 1:</span>
              </div>
              <div className="col-lg-6">{finalPayload?.Zone_VP_Reminder_1}</div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row mb-4">
              <div className="col-lg-6">
                <span className="black-text font-weight-bold">Reminder - 2:</span>
              </div>
              <div className="col-lg-6">{finalPayload?.Zone_VP_Reminder_2}</div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row mb-4">
              <div className="col-lg-6">
                <span className="black-text font-weight-bold">Reminder - 3:</span>
              </div>
              <div className="col-lg-6">{finalPayload?.Zone_VP_Reminder_3}</div>
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
                  <Form.Label>View All Selected Signatories:</Form.Label>
                </Box>
              </>
            }
          />
        </div>

        <div className="d-flex align-items-center">
          <span className="black-text font-weight-bold">Instances:</span>
          <Workbook
            filename="Zone-Disclosure-Processor-List.xlsx"
            element={
              <>
                <button className="export_excel_button">
                  <strong>Export To Excel</strong>
                </button>
              </>
            }
          >
            <Workbook.Sheet
              data={finalPayload?.SelectedDataFromTable}
              name="Disclosure-Processor-List"
            >
              <Workbook.Column label="Zone" value="Zone" />
              <Workbook.Column label="Processor" value="Disclosure_Processor" />
              <Workbook.Column label="Excom Member" value="Excom_Member" />
              <Workbook.Column
                label="Zone Legal Representative"
                value="Zone_Legal_Representative"
              />
              <Workbook.Column label="Head of Zone Control" value="Zone_Control" />
              <Workbook.Column label="Zone VP Finance" value="Zone_VP" />
            </Workbook.Sheet>
          </Workbook>
        </div>

        <div className="footer-action-AssessmentBank">
          <div className="d-flex align-items-center justify-content-end">
            <div>
              <Button variant="outlined" color="secondary" onClick={onClose}>
                Cancel
              </Button>

              <Button color="neutral" className="ml-4" onClick={() => handleSubmit()}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewLetterDetails;

// this page contain full code for editing section 1 response of the letter.

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { DotSpinner } from '@uiball/loaders';
import { Divider, Group } from '@mantine/core';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import CollapseFrame from '../../../../../components/UI/CollapseFrame';
import Button from '../../../../../components/UI/Button';
import {
  get_BU_Questions,
  getInstructions,
} from '../../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
import {
  get_BU_QuestionsSelector,
  getInstructionsSelector,
} from '../../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankSelector';
import {
  addBUSubmitResponse,
  clearBUSubmitResponse,
  getBUSubmitResponse,
  clearGetBUScopeData,
  getBUScopeData,
} from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
import {
  getBUSubmitResponseSelector,
  getBUScopeDataSelector,
} from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';
import Section0 from './Section0';
import PageWrapper from '../../../../../components/wrappers/PageWrapper';

const months = [
  { value: 'January', label: 'January' },
  { value: 'February', label: 'February' },
  { value: 'March', label: 'March' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'June', label: 'June' },
  { value: 'July', label: 'July' },
  { value: 'August', label: 'August' },
  { value: 'September', label: 'September' },
  { value: 'October', label: 'October' },
  { value: 'November', label: 'November' },
  { value: 'December', label: 'December' },
];

const currentMonth = new Date().getMonth(); // Month index (0-11)
const filteredMonths = months.slice(currentMonth);

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 3 }, (_, index) => currentYear + index);

const EditSection1 = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const scopeData = props.location.state?.data?.scopeData;
  const letterType = props.location.state?.data?.letterType;

  const getBUSubmitResponseState = useSelector(getBUSubmitResponseSelector);
  const questionState = useSelector(get_BU_QuestionsSelector);
  const questions = questionState?.data;
  const instructionState = useSelector(getInstructionsSelector);
  const getBUScopeDataState = useSelector(getBUScopeDataSelector);

  const newFormat = [];
  const [responses, setResponses] = useState(
    getBUSubmitResponseState?.data?.override_response || {},
  );
  const [formErrors, setFormErrors] = useState({});
  const [characterCount, setCharacterCount] = useState(0);
  const maxCharacterLimit = 5000;

  useEffect(() => {
    const payloadGetInstructions = {
      module: letterType,
    };

    dispatch(getInstructions(payloadGetInstructions));

    const payloadGetBUScopeData = {
      id: scopeData?.id,
    };
    dispatch(getBUScopeData(payloadGetBUScopeData));

    let payloadGet_BU_Questions = {
      type: letterType,
    };
    dispatch(get_BU_Questions(payloadGet_BU_Questions));

    let payloadForGettingSubmittedResp = {
      assessment_id: scopeData?.id,
    };

    dispatch(getBUSubmitResponse(payloadForGettingSubmittedResp));
  }, []);

  const handleRadioChange = (questionId, index, response, comment = '', month = '', year = '') => {
    const newResponses = {
      ...responses,
      [questionId]: {
        questionNumber: index + 1,
        questionText: response.questionText,
        response: response.value,
        comment: response.value === 'Yes' ? '' : comment,
        //month: response.value === 'N/A' ? month : '',
        month: response.value === 'No' ? month || '' : '',
        year: response.value === 'No' ? year || '' : '',
      },
    };

    setResponses(newResponses);
    setFormErrors({
      ...formErrors,
      [questionId]: '',
    });
  };

  const handleCommentChange = (questionId, comment) => {
    if (comment.length <= maxCharacterLimit) {
      const updatedResponses = {
        ...responses,
        [questionId]: {
          ...responses[questionId],
          comment,
        },
      };
      setResponses(updatedResponses);
      setFormErrors({
        ...formErrors,
        [questionId]: '',
      });
      setCharacterCount(comment.length);
    } else {
      // Character limit exceeded
      setFormErrors({
        ...formErrors,
        [questionId]: 'Character limit exceeded (Max 2500 characters).',
      });
    }
  };

  const handleMonthChange = (questionId, month) => {
    const updatedResponses = {
      ...responses,
      [questionId]: {
        ...responses[questionId],
        month,
      },
    };
    setResponses(updatedResponses);
    setFormErrors({
      ...formErrors,
      [questionId]: '',
    });
  };

  const handleYearChange = (questionId, year) => {
    const updatedResponses = {
      ...responses,
      [questionId]: {
        ...responses[questionId],
        year,
      },
    };
    setResponses(updatedResponses);
    setFormErrors({
      ...formErrors,
      [questionId]: '',
    });
  };

  // clear all the states on page leave or refresh page or change url path or change module or change role
  useEffect(() => {
    return () => {
      dispatch(clearBUSubmitResponse());
      dispatch(clearGetBUScopeData());
    };
  }, []);

  useEffect(() => {
    if (getBUSubmitResponseState?.data?.override_response) {
      setResponses(getBUSubmitResponseState?.data?.override_response);
    }
  }, [getBUSubmitResponseState?.data]);

  const handleSubmit = () => {
    const newFormErrors = {};
    questions.forEach((question) => {
      const response = responses[question.id]?.response;
      const comment = responses[question.id]?.comment;
      const month = responses[question.id]?.month;
      const year = responses[question.id]?.year;
      if (!response) {
        newFormErrors[question.id] = 'Response is required.';
      } else if ((response === 'No' || response === 'N/A') && !comment) {
        newFormErrors[question.id] = 'Comment is required.';
      } else if (response === 'No' && !month) {
        newFormErrors[question.id] = 'Month is required.';
      } else if (response === 'No' && !year) {
        newFormErrors[question.id] = 'Year is required.';
      }
    });
    if (Object.keys(newFormErrors).length > 0) {
      setFormErrors(newFormErrors);
      toast.error('Please fill all the required fields.');
    } else {
      Swal.fire({
        title: 'You are about to re-submit the Representation letter responses.',
        // text: `${
        //   DraftResponseState?.data?.Attempt_no
        //     ? DraftResponseState?.data?.Attempt_no < 5
        //       ? 4 - DraftResponseState?.data?.Attempt_no
        //       : 0
        //     : DraftResponseState?.data?.Attempt_no === 0
        //     ? '4'
        //     : '5'
        // } save draft letter remaining`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'golden',
        cancelButtonColor: 'black',
        confirmButtonText: 'Yes, submit it',
      }).then((result) => {
        if (result.isConfirmed) {
          for (const key in responses) {
            if (responses.hasOwnProperty(key)) {
              const item = responses[key];
              const questionID = key;
              const { questionNumber, questionText, response, comment, month, year } = item;
              const newItem = {
                questionNumber,
                questionText,
                response,
                comment,
                month,
                year,
                questionID,
              };
              newFormat.push(newItem);
            }
          }
          const payload = {
            is_override: true,
            Assessment_ID: scopeData?.id,
            override_response: responses,
            Latest_response: newFormat?.sort((a, b) => a.questionNumber - b.questionNumber),
          };
          dispatch(addBUSubmitResponse(payload));
          // after api success clear the redux state
          dispatch(clearBUSubmitResponse());
          history.push('/');
        }
      });
    }
  };

  return (
    <PageWrapper>
      <div className="container-fluid custom-scroll-page">
        {instructionState.loading ||
        getBUScopeDataState.loading ||
        questionState.loading ||
        getBUSubmitResponseState.loading ? (
          <div className="loader-animation">
            <DotSpinner size={100} speed={0.9} color="#e3af32" />
            <p className="loader-Desc ml-3">Please wait while we are Loading letter for you</p>
          </div>
        ) : (
          <div className="col-lg-12">
            <Section0 scopeData={getBUScopeDataState?.data} letterType={letterType} />
            <CollapseFrame title="Section 1 : Edit Response" active>
              {questions?.map((question, index) => {
                const response = responses[question.id] || { response: '' };

                return (
                  <div key={question.id}>
                    <div className="renderBlockWrapper-rep-letter-form mt-5">
                      <div className="question-text-section">
                        <div className="question-number"> {index + 1}</div>
                        <div
                          className="question-text"
                          dangerouslySetInnerHTML={{ __html: question.text }}
                        />
                      </div>

                      <Divider color="gray" className="renderBlockWrapper_divider_form" size="xs" />
                      <div className="option-section">
                        <Group position="left" spacing="sm">
                          {['Yes', 'No', 'N/A'].map((value) => (
                            <label key={value}>
                              <input
                                type="radio"
                                value={value}
                                checked={response.response === value}
                                onChange={() =>
                                  handleRadioChange(question.id, index, {
                                    questionText: question.text,
                                    value,
                                  })
                                }
                              />
                              <label className="radio-option-label">{value}</label>
                            </label>
                          ))}
                        </Group>
                      </div>
                      {response.response !== 'No' ? (
                        <div>
                          <Form.Group className="mb-3" controlId={`comment-${question.id}`}>
                            <Form.Control
                              as="textarea"
                              placeholder="Enter your comment..."
                              required
                              onChange={(e) =>
                                handleCommentChange(question.id, e.target.value.trimStart())
                              }
                              name="comment"
                              value={response.comment || ''}
                              rows={4}
                            />
                          </Form.Group>
                        </div>
                      ) : (
                        <div>
                          <Form.Group className="mb-3" controlId={`comment-${question.id}`}>
                            <Form.Control
                              as="textarea"
                              placeholder="Enter your action plan..."
                              required
                              onChange={(e) =>
                                handleCommentChange(question.id, e.target.value.trimStart())
                              }
                              name="comment"
                              value={response.comment || ''}
                              rows={4}
                            />
                          </Form.Group>
                          <Form.Label className="mb-3">
                            Please select action plan month and year:{' '}
                          </Form.Label>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Form.Control
                              as="select"
                              name="Year"
                              placeholder="Please select Year"
                              required
                              value={response.year || ''}
                              onChange={(e) => handleYearChange(question.id, e.target.value)}
                              className="form-select"
                              style={{ width: '150px', marginRight: '10px' }}
                            >
                              <option value="">Select Year</option>
                              {years.map((year) => (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              ))}
                            </Form.Control>
                            {response.year == new Date().getFullYear() ? (
                              <Form.Group>
                                <Form.Control
                                  as="select"
                                  name="Month"
                                  placeholder="Please select Month"
                                  required
                                  value={response.month || ''}
                                  onChange={(e) => handleMonthChange(question.id, e.target.value)}
                                  className="form-select"
                                  style={{ width: '150px' }}
                                >
                                  <option value="">Select Month</option>
                                  {filteredMonths.map((month) => (
                                    <option key={month.value} value={month.value}>
                                      {month.label}
                                    </option>
                                  ))}
                                </Form.Control>
                              </Form.Group>
                            ) : (
                              <Form.Group>
                                <Form.Control
                                  as="select"
                                  name="Month"
                                  placeholder="Please select Month"
                                  required
                                  value={response.month || ''}
                                  onChange={(e) => handleMonthChange(question.id, e.target.value)}
                                  className="form-select"
                                  style={{ width: '150px' }}
                                >
                                  <option value="">Select Month</option>
                                  {months.map((month) => (
                                    <option key={month.value} value={month.value}>
                                      {month.label}
                                    </option>
                                  ))}
                                </Form.Control>
                              </Form.Group>
                            )}
                          </div>
                        </div>
                      )}
                      {formErrors[question.id] && (
                        <div className="error-message">{formErrors[question.id]}</div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div>
                <div className="rep-letter-form-bottom-btn">
                  <Button className="w-50" onClick={() => history.push('/')}>
                    Cancel
                  </Button>

                  <Button
                    color="neutral"
                    className="w-50"
                    id="submit-button"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </CollapseFrame>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default EditSection1;

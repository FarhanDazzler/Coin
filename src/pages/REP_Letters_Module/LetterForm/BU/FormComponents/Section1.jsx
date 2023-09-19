import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Divider, Group } from '@mantine/core';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import CollapseFrame from '../../../../../components/UI/CollapseFrame';
import Button from '../../../../../components/UI/Button';
// import {
//   getLatestFunctionDraftResponse,
//   addOrUpdateFunctionDraftResponse,
//   clearLatestFunctionDraftResponse,
//   addFunctionSubmitResponse,
//   clearFunctionSubmitResponse,
// } from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
// import {
//   addOrUpdateFunctionDraftResponseSelector,
//   getLatestFunctionDraftResponseSelector,
// } from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';

const Section1 = ({ questions, scopeData }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const newFormat = [];
  const [responses, setResponses] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [characterCount, setCharacterCount] = useState(0);
  const maxCharacterLimit = 5000;

  //   const DraftResponseState = useSelector(getLatestFunctionDraftResponseSelector);
  //   const addOrUpdateDraftResponseState = useSelector(addOrUpdateFunctionDraftResponseSelector);

  const handleRadioChange = (questionId, index, response, comment = '', month = '') => {
    const newResponses = {
      ...responses,
      [questionId]: {
        questionNumber: index + 1,
        questionText: response.questionText,
        response: response.value,
        comment: response.value === 'Yes' ? '' : comment,
        //month: response.value === 'NA' ? month : '',
        month: response.value === 'NA' ? month || '' : '',
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

  // clear all the states on page leave or refresh page or change url path or change module or change role
  //   useEffect(() => {
  //     return () => {
  //       dispatch(clearLatestFunctionDraftResponse());
  //       dispatch(clearFunctionSubmitResponse());
  //     };
  //   }, []);
  //
  //   useEffect(() => {
  //     if (DraftResponseState?.data?.Latest_response) {
  //       setResponses(DraftResponseState?.data?.Latest_response);
  //     }
  //   }, [DraftResponseState?.data]);

  const handleSaveDraft = () => {
    console.log('Submitted responses:', responses);
    // if (DraftResponseState?.data?.Attempt_no >= 5) {
    //   Swal.fire(`You don't have a limited`, '', 'error');
    //   return;
    // }
    // Swal.fire({
    //   title: `Do you want save as draft!`,
    //   text: `${
    //     DraftResponseState?.data?.Attempt_no
    //       ? DraftResponseState?.data?.Attempt_no < 5
    //         ? 4 - DraftResponseState?.data?.Attempt_no
    //         : 0
    //       : DraftResponseState?.data?.Attempt_no === 0
    //       ? '4'
    //       : '5'
    //   } save draft assessments remaining`,
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: 'golden',
    //   cancelButtonColor: 'black',
    //   confirmButtonText: `Save draft!`,
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     const payload = {
    //       Assessment_ID: scopeData?.id,
    //       Latest_response: responses,
    //     };
    //     //localStorage.setItem('storedResponses', JSON.stringify(responses));
    //     dispatch(addOrUpdateFunctionDraftResponse(payload));
    //     // after api success clear the redux state
    //     dispatch(clearLatestFunctionDraftResponse());
    //     history.push('/');
    //   }
    // });
  };

  const handleSubmit = () => {
    // const newFormErrors = {};
    // questions.forEach((question) => {
    //   const response = responses[question.id]?.response;
    //   const comment = responses[question.id]?.comment;
    //   if (!response) {
    //     newFormErrors[question.id] = 'Response is required.';
    //   } else if ((response === 'No' || response === 'NA') && !comment) {
    //     newFormErrors[question.id] = 'Comment is required.';
    //   } else if (response === 'NA' && !month) {
    //     newFormErrors[question.id] = 'month is required.';
    //   }
    // });
    // if (Object.keys(newFormErrors).length > 0) {
    //   setFormErrors(newFormErrors);
    //   toast.error('Please fill all the required fields.');
    // } else {
    //   Swal.fire({
    //     title: 'Do you want Submit Letter!',
    //     text: `${
    //       DraftResponseState?.data?.Attempt_no
    //         ? DraftResponseState?.data?.Attempt_no < 5
    //           ? 4 - DraftResponseState?.data?.Attempt_no
    //           : 0
    //         : DraftResponseState?.data?.Attempt_no === 0
    //         ? '4'
    //         : '5'
    //     } save draft assessments remaining`,
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: 'golden',
    //     cancelButtonColor: 'black',
    //     confirmButtonText: 'Yes, submit it!',
    //     showDenyButton: !(DraftResponseState?.data?.Attempt_no >= 5),
    //     denyButtonText: 'Save draft!',
    //     denyButtonColor: 'silver',
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       for (const key in responses) {
    //         if (responses.hasOwnProperty(key)) {
    //           const item = responses[key];
    //           const questionID = key;
    //           const { questionNumber, questionText, response, comment } = item;
    //           const newItem = {
    //             questionNumber,
    //             questionText,
    //             response,
    //             comment,
    //             questionID,
    //           };
    //           newFormat.push(newItem);
    //         }
    //       }
    //       const payload = {
    //         Assessment_ID: scopeData?.id,
    //         Latest_response: newFormat?.sort((a, b) => a.questionNumber - b.questionNumber),
    //       };
    //       //localStorage.setItem('storedResponses', JSON.stringify(responses));
    //       dispatch(addFunctionSubmitResponse(payload));
    //       // after api success clear the redux state
    //       dispatch(clearFunctionSubmitResponse());
    //       history.push('/');
    //       //console.log('Submitted responses:', responses);
    //       //localStorage.setItem('storedResponses', JSON.stringify(responses));
    //     }
    //     if (result.isDenied) {
    //       if (DraftResponseState?.data?.Attempt_no >= 5) {
    //         Swal.fire(`You don't have a limit`, '', 'error');
    //         return;
    //       }
    //       const payload = {
    //         Assessment_ID: scopeData?.id,
    //         Latest_response: responses,
    //       };
    //       //localStorage.setItem('storedResponses', JSON.stringify(responses));
    //       dispatch(addOrUpdateFunctionDraftResponse(payload));
    //       // after api success clear the redux state
    //       dispatch(clearLatestFunctionDraftResponse());
    //       history.push('/');
    //     }
    //   });
    // }
  };

  return (
    <CollapseFrame title="Section 1 : Please give your responses" active>
      {questions?.map((question, index) => {
        const response = responses[question.id] || { response: '' };

        return (
          <div key={question.id}>
            <div className="renderBlockWrapper mt-5">
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
                  {['Yes', 'No', 'NA'].map((value) => (
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
              {response.response !== 'NA' ? (
                <div>
                  <Form.Group className="mb-3" controlId={`comment-${question.id}`}>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter your comment..."
                      required
                      onChange={(e) => handleCommentChange(question.id, e.target.value)}
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
                      placeholder="Enter your comment..."
                      required
                      onChange={(e) => handleCommentChange(question.id, e.target.value)}
                      name="comment"
                      value={response.comment || ''}
                      rows={4}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="mb-3">Please select month: </Form.Label>
                    <Form.Control
                      as="select"
                      name="Month"
                      placeholder="Please select Month"
                      required
                      value={response.month || ''}
                      onChange={(e) => handleMonthChange(question.id, e.target.value)}
                      className="form-select"
                      style={{ width: '300px' }}
                    >
                      <option value="">Select</option>
                      <option value="January">January</option>
                      <option value="February">February</option>
                    </Form.Control>
                  </Form.Group>
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
          <Button className="w-30" onClick={() => history.push('/')}>
            Cancel
          </Button>
          <Button className="w-30" onClick={handleSaveDraft}>
            Save as Draft
          </Button>
          <Button color="neutral" className="w-30" id="submit-button" onClick={handleSubmit}>
            Submit
          </Button>
        </div>

        <div className="save-draft-btn-wrapper">
          <Button id="save-draft-btn-rep-letter" onClick={handleSaveDraft}>
            Save as Draft
          </Button>
        </div>
      </div>
    </CollapseFrame>
  );
};

export default Section1;

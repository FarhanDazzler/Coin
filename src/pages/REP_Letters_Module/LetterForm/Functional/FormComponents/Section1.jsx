import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Divider, Group } from '@mantine/core';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import CollapseFrame from '../../../../../components/UI/CollapseFrame';
import Button from '../../../../../components/UI/Button';
import {
  getLatestFunctionDraftResponse,
  addOrUpdateFunctionDraftResponse,
  clearLatestFunctionDraftResponse,
  addFunctionSubmitResponse,
  clearFunctionSubmitResponse,
} from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
import {
  addOrUpdateFunctionDraftResponseSelector,
  getLatestFunctionDraftResponseSelector,
} from '../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';

const Section1 = ({ questions, scopeData }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const newFormat = [];
  const [responses, setResponses] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [characterCount, setCharacterCount] = useState(0);
  const maxCharacterLimit = 5000;

  const DraftResponseState = useSelector(getLatestFunctionDraftResponseSelector);
  const addOrUpdateDraftResponseState = useSelector(addOrUpdateFunctionDraftResponseSelector);

  const handleRadioChange = (questionId, index, response, comment = '') => {
    const newResponses = {
      ...responses,
      [questionId]: {
        questionNumber: index + 1,
        questionText: response.questionText,
        response: response.value,
        comment: response.value === 'Yes' ? '' : comment,
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

  // clear all the states on page leave or refresh page or change url path or change module or change role
  useEffect(() => {
    return () => {
      dispatch(clearLatestFunctionDraftResponse());
      dispatch(clearFunctionSubmitResponse());
    };
  }, []);

  useEffect(() => {
    if (DraftResponseState?.data?.Latest_response) {
      setResponses(DraftResponseState?.data?.Latest_response);
    }
  }, [DraftResponseState?.data]);

  const handleSaveDraft = () => {
    if (DraftResponseState?.data?.Attempt_no >= 5) {
      Swal.fire(`You don't have a limited`, '', 'error');
      return;
    }
    Swal.fire({
      title: `Do you want save as draft!`,
      text: `${
        DraftResponseState?.data?.Attempt_no
          ? DraftResponseState?.data?.Attempt_no < 5
            ? 4 - DraftResponseState?.data?.Attempt_no
            : 0
          : DraftResponseState?.data?.Attempt_no === 0
          ? '4'
          : '5'
      } save draft letter remaining`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'golden',
      cancelButtonColor: 'black',
      confirmButtonText: `Save draft`,
    }).then((result) => {
      if (result.isConfirmed) {
        const payload = {
          Assessment_ID: scopeData?.id,
          Latest_response: responses,
        };
        //localStorage.setItem('storedResponses', JSON.stringify(responses));
        dispatch(addOrUpdateFunctionDraftResponse(payload));
        // after api success clear the redux state
        dispatch(clearLatestFunctionDraftResponse());
        history.push('/');
      }
    });
  };

  const handleSubmit = () => {
    const newFormErrors = {};

    questions.forEach((question) => {
      const response = responses[question.id]?.response;
      const comment = responses[question.id]?.comment;

      if (!response) {
        newFormErrors[question.id] = 'Response is required.';
      } else if ((response === 'No' || response === 'NA') && !comment) {
        newFormErrors[question.id] = 'Comment is required.';
      }
    });

    if (Object.keys(newFormErrors).length > 0) {
      setFormErrors(newFormErrors);
      toast.error('Please fill all the required fields.');
    } else {
      Swal.fire({
        title: 'You are about to submit the Representation letter.',
        text: `${
          DraftResponseState?.data?.Attempt_no
            ? DraftResponseState?.data?.Attempt_no < 5
              ? 4 - DraftResponseState?.data?.Attempt_no
              : 0
            : DraftResponseState?.data?.Attempt_no === 0
            ? '4'
            : '5'
        } save draft letter remaining`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'golden',
        cancelButtonColor: 'black',
        confirmButtonText: 'Yes, submit it',
        showDenyButton: !(DraftResponseState?.data?.Attempt_no >= 5),
        denyButtonText: 'Save draft',
        denyButtonColor: 'black',
      }).then((result) => {
        if (result.isConfirmed) {
          for (const key in responses) {
            if (responses.hasOwnProperty(key)) {
              const item = responses[key];
              const questionID = key;
              const { questionNumber, questionText, response, comment } = item;

              const newItem = {
                questionNumber,
                questionText,
                response,
                comment,
                questionID,
              };
              newFormat.push(newItem);
            }
          }
          const payload = {
            Assessment_ID: scopeData?.id,
            Latest_response: newFormat?.sort((a, b) => a.questionNumber - b.questionNumber),
          };
          //localStorage.setItem('storedResponses', JSON.stringify(responses));
          dispatch(addFunctionSubmitResponse(payload));
          // after api success clear the redux state
          dispatch(clearFunctionSubmitResponse());
          history.push('/');

          //console.log('Submitted responses:', responses);
          //localStorage.setItem('storedResponses', JSON.stringify(responses));
        }
        if (result.isDenied) {
          if (DraftResponseState?.data?.Attempt_no >= 5) {
            Swal.fire(`You don't have a limit`, '', 'error');
            return;
          }
          const payload = {
            Assessment_ID: scopeData?.id,
            Latest_response: responses,
          };
          //localStorage.setItem('storedResponses', JSON.stringify(responses));
          dispatch(addOrUpdateFunctionDraftResponse(payload));
          // after api success clear the redux state
          dispatch(clearLatestFunctionDraftResponse());
          history.push('/');
        }
      });
    }
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
                  {['Yes', 'No'].map((value) => (
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
              {response.response && (
                <div>
                  <Form.Group className="mb-3" controlId={`comment-${question.id}`}>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter your comment..."
                      required
                      onChange={(e) => handleCommentChange(question.id, e.target.value)}
                      name="comment"
                      value={response.comment || ''}
                      rows={2}
                    />
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
        {/* <button onClick={() => history.push('/')}>Cancel</button>
        <button onClick={handleSaveDraft}>Save Draft</button>
        <button onClick={handleSubmit}>Submit</button> */}
      </div>
    </CollapseFrame>
  );
};

export default Section1;

// old un-optimized code pls don't delete this code. Its only for reference .
// Here logic is same but number of lines are less

// import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import { Form } from 'react-bootstrap';
// import { Divider, Group } from '@mantine/core';
// import { toast } from 'react-toastify';
// import CollapseFrame from '../../../../../components/UI/CollapseFrame';

// const Section1 = ({ questions, scopeData }) => {
//   const history = useHistory();
//   const [responses, setResponses] = useState({});
//   const [formErrors, setFormErrors] = useState({});

//   const handleRadioChange = (questionId, questionText, value) => {
//     setResponses({
//       ...responses,
//       [questionId]: {
//         questionText: questionText,
//         response: value,
//         comment: value === 'Yes' ? '' : responses[questionId]?.comment || '',
//       },
//     });

//     setFormErrors({
//       ...formErrors,
//       [questionId]: '',
//     });
//   };

//   const handleCommentChange = (questionId, comment) => {
//     setResponses({
//       ...responses,
//       [questionId]: {
//         ...responses[questionId],
//         comment,
//       },
//     });

//     setFormErrors({
//       ...formErrors,
//       [questionId]: '',
//     });
//   };

//   useEffect(() => {
//     const storedResponses = localStorage.getItem('storedResponses');
//     if (storedResponses) {
//       setResponses(JSON.parse(storedResponses));
//     }
//   }, []);

//   const handleDraft = () => {
//     // Implement your submission logic here
//     // Save the submitted responses to local storage
//     localStorage.setItem('storedResponses', JSON.stringify(responses));
//     console.log('Submitted responses:', responses);
//   };

//   const handleSubmit = () => {
//     let hasErrors = false;
//     const newFormErrors = {};

//     questions.forEach((question) => {
//       const response = responses[question.id]?.response;
//       const comment = responses[question.id]?.comment;

//       if (!response) {
//         newFormErrors[question.id] = 'Response is required.';
//         hasErrors = true;
//       }

//       if ((response === 'No' || response === 'NA') && !comment) {
//         newFormErrors[question.id] = 'Comment is required.';
//         hasErrors = true;
//       }
//     });

//     if (hasErrors) {
//       setFormErrors(newFormErrors);
//       toast.error('Please fill all the required fields.');
//       return;
//     }

//     localStorage.setItem('storedResponses', JSON.stringify(responses));
//     console.log('Submitted responses:', responses);
//   };

//   return (
//     <CollapseFrame title="Section 1 : Please give your responses" active>
//       {questions?.map((question, index) => (
//         <div key={question.id}>
//           <div className="renderBlockWrapper mt-5">
//             <div className="question-text-section">
//               <div className="question-number"> {index + 1}</div>
//               <div className="question-text">
//                 <p
//                   className="left-aligned-text"
//                   dangerouslySetInnerHTML={{
//                     __html: question.text,
//                   }}
//                 />
//               </div>
//             </div>

//             <Divider color="gray" className="renderBlockWrapper_divider_form" size="xs" />
//             <div className="option-section">
//               <Group position="left" spacing="sm">
//                 <label>
//                   <input
//                     type="radio"
//                     value="Yes"
//                     checked={responses[question.id]?.response === 'Yes'}
//                     onChange={() => handleRadioChange(question.id, question.text, 'Yes')}
//                   />
//                   <label className="radio-option-label">Yes</label>
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     value="No"
//                     checked={responses[question.id]?.response === 'No'}
//                     onChange={() => handleRadioChange(question.id, question.text, 'No')}
//                   />
//                   <label className="radio-option-label">No</label>
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     value="NA"
//                     checked={responses[question.id]?.response === 'NA'}
//                     onChange={() => handleRadioChange(question.id, question.text, 'NA')}
//                   />
//                   <label className="radio-option-label">NA (Not Applicable)</label>
//                 </label>
//               </Group>
//             </div>
//             {responses[question.id]?.response && (
//               <div>
//                 <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
//                   {/* <Form.Label className="mt-5">Comment :</Form.Label> */}
//                   <Form.Control
//                     as="textarea"
//                     placeholder="Enter your comment..."
//                     required
//                     onChange={(e) => handleCommentChange(question.id, e.target.value)}
//                     name="comment"
//                     value={responses[question.id]?.comment || ''}
//                     rows={1}
//                   />
//                 </Form.Group>
//               </div>
//             )}
//             {formErrors[question.id] && (
//               <div className="error-message">{formErrors[question.id]}</div>
//             )}
//           </div>
//         </div>
//       ))}
//       <div>
//         <button onClick={() => history.push('/')}>Cancel</button>
//         <button onClick={handleDraft}>Save Draft</button>
//         <button onClick={handleSubmit}>Submit</button>
//       </div>
//     </CollapseFrame>
//   );
// };

// export default Section1;

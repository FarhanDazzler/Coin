import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Divider, Group } from '@mantine/core';
import { toast } from 'react-toastify';
import CollapseFrame from '../../../../../components/UI/CollapseFrame';

const Section1 = ({ questions, scopeData }) => {
  const history = useHistory();
  const [responses, setResponses] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleRadioChange = (questionId, questionText, value) => {
    setResponses({
      ...responses,
      [questionId]: {
        questionText: questionText,
        response: value,
        comment: value === 'Yes' ? '' : responses[questionId]?.comment || '',
      },
    });

    setFormErrors({
      ...formErrors,
      [questionId]: '',
    });
  };

  const handleCommentChange = (questionId, comment) => {
    setResponses({
      ...responses,
      [questionId]: {
        ...responses[questionId],
        comment,
      },
    });

    setFormErrors({
      ...formErrors,
      [questionId]: '',
    });
  };

  useEffect(() => {
    const storedResponses = localStorage.getItem('storedResponses');
    if (storedResponses) {
      setResponses(JSON.parse(storedResponses));
    }
  }, []);

  const handleDraft = () => {
    // Implement your submission logic here
    // Save the submitted responses to local storage
    localStorage.setItem('storedResponses', JSON.stringify(responses));
    console.log('Submitted responses:', responses);
  };

  const handleSubmit = () => {
    let hasErrors = false;
    const newFormErrors = {};

    questions.forEach((question) => {
      const response = responses[question.id]?.response;
      const comment = responses[question.id]?.comment;

      if (!response) {
        newFormErrors[question.id] = 'Response is required.';
        hasErrors = true;
      }

      if ((response === 'No' || response === 'NA') && !comment) {
        newFormErrors[question.id] = 'Comment is required.';
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setFormErrors(newFormErrors);
      toast.error('Please fill all the required fields.');
      return;
    }

    localStorage.setItem('storedResponses', JSON.stringify(responses));
    console.log('Submitted responses:', responses);
  };

  return (
    <CollapseFrame title="Section 1 : Please give your responses" active>
      {questions?.map((question, index) => (
        <div key={question.id}>
          <div className="renderBlockWrapper mt-5">
            <div className="question-text-section">
              <div className="question-number"> {index + 1}</div>
              <div className="question-text">
                <p
                  className="left-aligned-text"
                  dangerouslySetInnerHTML={{
                    __html: question.text,
                  }}
                />
              </div>
            </div>

            <Divider color="gray" className="renderBlockWrapper_divider_form" size="xs" />
            <div className="option-section">
              <Group position="left" spacing="sm">
                <label>
                  <input
                    type="radio"
                    value="Yes"
                    checked={responses[question.id]?.response === 'Yes'}
                    onChange={() => handleRadioChange(question.id, question.text, 'Yes')}
                  />
                  <label className="radio-option-label">Yes</label>
                </label>
                <label>
                  <input
                    type="radio"
                    value="No"
                    checked={responses[question.id]?.response === 'No'}
                    onChange={() => handleRadioChange(question.id, question.text, 'No')}
                  />
                  <label className="radio-option-label">No</label>
                </label>
                <label>
                  <input
                    type="radio"
                    value="NA"
                    checked={responses[question.id]?.response === 'NA'}
                    onChange={() => handleRadioChange(question.id, question.text, 'NA')}
                  />
                  <label className="radio-option-label">NA (Not Applicable)</label>
                </label>
              </Group>
            </div>
            {responses[question.id]?.response && (
              <div>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  {/* <Form.Label className="mt-5">Comment :</Form.Label> */}
                  <Form.Control
                    as="textarea"
                    placeholder="Enter your comment..."
                    required
                    onChange={(e) => handleCommentChange(question.id, e.target.value)}
                    name="comment"
                    value={responses[question.id]?.comment || ''}
                    rows={1}
                  />
                </Form.Group>
              </div>
            )}
            {formErrors[question.id] && (
              <div className="error-message">{formErrors[question.id]}</div>
            )}
          </div>
        </div>
      ))}
      <div>
        <button onClick={() => history.push('/')}>Cancel</button>
        <button onClick={handleDraft}>Save Draft</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </CollapseFrame>
  );
};

export default Section1;

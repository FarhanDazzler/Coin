import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import CollapseFrame from '../../../../../components/UI/CollapseFrame';

const Section1 = ({ questions }) => {
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
        newFormErrors[question.id] = 'Comment is required for No/NA responses.';
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setFormErrors(newFormErrors);
      return;
    }

    localStorage.setItem('storedResponses', JSON.stringify(responses));
    console.log('Submitted responses:', responses);
  };

  return (
    <CollapseFrame title="Section 1 : Please give your responses" active>
      {questions?.map((question) => (
        <div key={question.id}>
          <div className="renderBlockWrapper mt-5">
            <p
              className="left-aligned-text"
              dangerouslySetInnerHTML={{
                __html: question.text,
              }}
            />
            <div>
              <label>
                <input
                  type="radio"
                  value="Yes"
                  checked={responses[question.id]?.response === 'Yes'}
                  onChange={() => handleRadioChange(question.id, question.text, 'Yes')}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  value="No"
                  checked={responses[question.id]?.response === 'No'}
                  onChange={() => handleRadioChange(question.id, question.text, 'No')}
                />
                No
              </label>
              <label>
                <input
                  type="radio"
                  value="NA"
                  checked={responses[question.id]?.response === 'NA'}
                  onChange={() => handleRadioChange(question.id, question.text, 'NA')}
                />
                NA
              </label>
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
                {/* <textarea
                    required
                    placeholder="Enter your comment..."
                    value={responses[question.id]?.comment || ''}
                    onChange={(e) => handleCommentChange(question.id, e.target.value)}
                  /> */}
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

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Section1 = ({ questions }) => {
  const history = useHistory();
  const [responses, setResponses] = useState({}); // To store user responses

  const handleRadioChange = (questionId, questionText, value) => {
    setResponses({
      ...responses,
      [questionId]: {
        questionText: questionText,
        response: value,
        comment: '',
      },
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
  };

  // Load stored responses from local storage when the component mounts
  useEffect(() => {
    const storedResponses = localStorage.getItem('storedResponses');
    if (storedResponses) {
      setResponses(JSON.parse(storedResponses));
    }
  }, []);

  const handleSubmit = () => {
    // Implement your submission logic here
    // Save the submitted responses to local storage
    localStorage.setItem('storedResponses', JSON.stringify(responses));
    console.log('Submitted responses:', responses);
  };

  return (
    <div>
      {questions?.map((question) => (
        <div key={question.id}>
          <div className="renderBlockWrapper mt-5">
            <p
              className="left-aligned-text"
              dangerouslySetInnerHTML={{
                __html: question.text,
              }}
            />
            {/* <p>{question.text}</p> */}
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
            {(responses[question.id]?.response === 'No' ||
              responses[question.id]?.response === 'NA') && (
              <div>
                <textarea
                  required
                  placeholder="Enter your comment..."
                  value={responses[question.id]?.comment || ''}
                  onChange={(e) => handleCommentChange(question.id, e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
      ))}
      <div>
        <button onClick={() => history.push('/')}>Cancel</button>
        <button onClick={handleSubmit}>Save Draft</button>
        <button
        //onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Section1;

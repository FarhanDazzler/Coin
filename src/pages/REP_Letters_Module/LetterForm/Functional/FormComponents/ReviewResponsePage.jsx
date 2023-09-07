import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Divider, Group } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import CollapseFrame from '../../../../../components/UI/CollapseFrame';
import Button from '../../../../../components/UI/Button';

const ReviewResponsePage = ({ submittedResponses }) => {
  const history = useHistory();

  return (
    <CollapseFrame title="Section 1 : Please give your responses" active>
      {Object.keys(submittedResponses).map((questionId, index) => {
        const response = submittedResponses[questionId];

        return (
          <div key={questionId}>
            <div className="renderBlockWrapper mt-5">
              <div className="question-text-section">
                <div className="question-number"> {index + 1}</div>
                <div className="question-text">
                  <p
                    className="left-aligned-text"
                    dangerouslySetInnerHTML={{
                      __html: response.questionText,
                    }}
                  />
                </div>
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
                        readonly
                      />
                      <label className="radio-option-label">{value}</label>
                    </label>
                  ))}
                </Group>
              </div>
              {response.comment && (
                <div>
                  <Form.Group className="mb-3" controlId={`comment-${questionId}`}>
                    <Form.Control
                      as="textarea"
                      placeholder="Enter your comment..."
                      required
                      name="comment"
                      value={response.comment || ''}
                      rows={3}
                      readonly
                    />
                  </Form.Group>
                </div>
              )}
            </div>
          </div>
        );
      })}
      <div>
        <div className="rep-letter-form-bottom-btn">
          <Button
            color="neutral"
            className="w-100"
            id="submit-button"
            onClick={() => history.push('/')}
          >
            GO Back to Home Page
          </Button>
        </div>
      </div>
    </CollapseFrame>
  );
};

export default ReviewResponsePage;

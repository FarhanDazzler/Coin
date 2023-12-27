import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Divider, Group } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import CollapseFrame from '../../../../../components/UI/CollapseFrame';
import Button from '../../../../../components/UI/Button';

const ReviewResponsePage = ({ submittedResponses = [] }) => {
  const history = useHistory();

  return (
    <CollapseFrame title="Section 1 : Please give your responses" active>
      {submittedResponses?.map((item, index) => (
        <div key={item.questionID}>
          <div className="renderBlockWrapper-rep-letter-form mt-5">
            <div className="question-text-section">
              <div className="question-number"> {item.questionNumber}</div>
              <div
                className="question-text"
                dangerouslySetInnerHTML={{ __html: item.questionText }}
              />
            </div>

            <Divider color="gray" className="renderBlockWrapper_divider_form" size="xs" />
            <div className="option-section">
              <Group position="left" spacing="sm">
                {['Yes', 'No'].map((value) => (
                  <label key={value}>
                    <input type="radio" value={value} checked={item.response === value} readOnly />
                    <label className="radio-option-label">{value}</label>
                  </label>
                ))}
              </Group>
            </div>
            {item.comment && (
              <div>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    placeholder="Enter your comment..."
                    required
                    name="comment"
                    value={item.comment || ''}
                    rows={3}
                    readOnly
                  />
                </Form.Group>
              </div>
            )}
          </div>
        </div>
      ))}
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

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { Divider, Group } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import ClosedCollapseFrame from '../../../../../../components/UI/CollapseFrame/ClosedCollapseFrame';
import Button from '../../../../../../components/UI/Button';

const ReviewSection1 = ({ submittedResponses = [] }) => {
  const history = useHistory();

  return (
    <ClosedCollapseFrame title="Section 1 : Zone Representation Letter" active>
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
                {['Yes', 'No', 'N/A'].map((value) => (
                  <label key={value}>
                    <input type="radio" value={value} checked={item.response === value} readOnly />
                    <label className="radio-option-label">
                      {value === 'Yes'
                        ? 'I have nothing to disclose'
                        : value === 'No'
                        ? 'I want to disclose'
                        : value}
                    </label>
                  </label>
                ))}
              </Group>
            </div>
            {item.response !== 'No'
              ? item.comment && (
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
                )
              : item.comment && (
                  <div>
                    <Form.Group className="mb-3">
                      <Form.Control
                        as="textarea"
                        placeholder="Enter your action plan..."
                        required
                        name="comment"
                        value={item.comment || ''}
                        rows={3}
                        readOnly
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="mb-3">
                        Please select month:{' '}
                        <span className="golden-text">
                          {item.month} / {item.year}
                        </span>
                      </Form.Label>
                    </Form.Group>
                  </div>
                )}
          </div>
        </div>
      ))}
      {/* <div>
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
      </div> */}
    </ClosedCollapseFrame>
  );
};

export default ReviewSection1;

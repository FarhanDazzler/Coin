import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useMsal } from '@azure/msal-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Divider, Group, SimpleGrid, Text } from '@mantine/core';
import CollapseFrame from '../../../../../../components/UI/CollapseFrame';
import Button from '../../../../../../components/UI/Button';
import ActionLogChatTimeline from './ActionLogChatTimeline';
import '../../../LetterFormStyle.scss';
import {
  approveBUSection3Response,
  clearGetBUSection3Response,
} from '../../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
import { getBUSection3ResponseSelector } from '../../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';

const ApprovalPageSection3 = ({ scopeData }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { accounts } = useMsal();

  const getBUSection3ResponseState = useSelector(getBUSection3ResponseSelector);
  const [comment, setComment] = useState('');

  // clear all the states on page leave or refresh page or change url path or change module or change role
  useEffect(() => {
    return () => {
      dispatch(clearGetBUSection3Response());
      console.log('clearing section 3 response');
    };
  }, []);

  const handleApprove = () => {
    const payload = {
      assessment_id: scopeData?.id,
      comment: comment,
      created_by: accounts[0]?.username,
      is_approved: true,
    };

    dispatch(approveBUSection3Response(payload));
    dispatch(clearGetBUSection3Response());
    history.push('/');
  };

  const handleReject = () => {
    if (!comment) {
      toast.error('Please provide comment for Rejection.');
      return;
    } else {
      const payload = {
        assessment_id: scopeData?.id,
        comment: comment,
        created_by: accounts[0]?.username,
        is_approved: false,
      };

      dispatch(approveBUSection3Response(payload));
      dispatch(clearGetBUSection3Response());
      history.push('/');
    }
  };

  return (
    <CollapseFrame title="Section 3 : RBA" active>
      <Col xs={12} md={12}>
        <Card className="bu-letter-section3 mt-5">
          <Card.Body>
            <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Col>
                <h5>
                  Is the RBA applicable -{' '}
                  <span className="golden-text">
                    {getBUSection3ResponseState?.data?.is_rba_applicable === 'true' ? 'Yes' : 'No'}
                  </span>{' '}
                </h5>
              </Col>
            </Row>
            {getBUSection3ResponseState?.data?.is_rba_applicable === 'true' && (
              <>
                <Row>
                  <h5>
                    Kindly consolidate all relevant RBA proof documents into a single, polished PDF
                    file. Merge all proofs into a unified document and attach it accordingly. If
                    necessary, feel free to include comments to provide explanations regarding the
                    content.
                  </h5>
                </Row>

                <Row className=" mt-5">
                  <Col>
                    <h5>
                      {' '}
                      <span className="golden-text">RBA file attached by Disclosure Processor</span>
                    </h5>
                  </Col>
                  <Col>
                    <Button
                      startIcon={<PictureAsPdfIcon />}
                      onClick={() => {
                        const pdfUrl = getBUSection3ResponseState?.data?.rba_attachment_url;
                        window.open(pdfUrl, '_blank');
                      }}
                    >
                      RBA Attachment
                    </Button>
                  </Col>
                </Row>
              </>
            )}
            {getBUSection3ResponseState?.data?.comment_response && (
              <Row>
                <Group position="apart">
                  <SimpleGrid cols={1}>
                    <Text size="lg" weight={700} color="#ffffff" align="left">{`Chat Logs`}</Text>
                  </SimpleGrid>
                </Group>
                <Divider color="gray" className="section3-divider" size="xs" />
                <ActionLogChatTimeline
                  comments={getBUSection3ResponseState?.data?.comment_response}
                />
              </Row>
            )}
            <Row>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label className="mt-5">Comment :</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Please provide your comment..."
                  required
                  onChange={(e) => setComment(e.target.value)}
                  name="Comment"
                  maxLength={5000}
                  rows={3}
                />
              </Form.Group>
              {/* form error message */}
            </Row>

            <div className="d-flex align-items-center justify-content-end">
              <div>
                <Button
                  //variant="outlined"
                  color="secondary"
                  onClick={() => history.push('/')}
                >
                  Cancel
                </Button>
                <Button className="ml-4" color="secondary" onClick={handleReject}>
                  Reject
                </Button>
                <Button color="neutral" className="ml-4" onClick={handleApprove} id="submit-button">
                  Approve
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </CollapseFrame>
  );
};

export default ApprovalPageSection3;

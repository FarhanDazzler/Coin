import React, { useEffect, useState } from 'react';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Divider, Group, SimpleGrid, Text } from '@mantine/core';
import CollapseFrame from '../../../../../../components/UI/CollapseFrame';
import Button from '../../../../../../components/UI/Button';
import ActionLogChatTimeline from '../Section3/ActionLogChatTimeline';
import '../../../LetterFormStyle.scss';
import { clearGetBUSection3Response } from '../../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
import { getBUSection3ResponseSelector } from '../../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';

const ReviewSection3 = () => {
  const dispatch = useDispatch();

  const getBUSection3ResponseState = useSelector(getBUSection3ResponseSelector);

  // clear all the states on page leave or refresh page or change url path or change module or change role
  useEffect(() => {
    return () => {
      dispatch(clearGetBUSection3Response());
      console.log('clearing section 3 response');
    };
  }, []);

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
          </Card.Body>
        </Card>
      </Col>
    </CollapseFrame>
  );
};

export default ReviewSection3;

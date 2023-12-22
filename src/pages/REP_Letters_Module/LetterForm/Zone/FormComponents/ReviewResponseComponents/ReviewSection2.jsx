import React, { useEffect, useState } from 'react';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Divider, Group, SimpleGrid, Text } from '@mantine/core';
import ClosedCollapseFrame from '../../../../../../components/UI/CollapseFrame/ClosedCollapseFrame';
import Button from '../../../../../../components/UI/Button';
import '../../../LetterFormStyle.scss';
import { getBUZoneSection2SignatureResponseSelector } from '../../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';

const ReviewSection2 = (props) => {
  const dispatch = useDispatch();

  const getBUSection2SignatureResponseState = useSelector(getBUZoneSection2SignatureResponseSelector);
  return (
    <ClosedCollapseFrame title="Section 2 : Signatures" active>
      <div className="renderBlockWrapper mt-5">
        <div className="renderBlockWrapper-control-actions-wrapper pb-5 pt-4">
          <div>
            <div className="renderBlockWrapper_content">
              <p>
                <b>
                  As a{' '}
                  {localStorage.getItem('selected_Role') === 'Local Internal Control'
                    ? 'Local Internal Control'
                    : `${localStorage.getItem('selected_Role')} - Signatory`}
                </b>
              </p>
            </div>
            <div className="renderBlockWrapper_content">
              <p>
                Review the Uploaded approval email from the respective signatories/authenticators
              </p>
            </div>
            {getBUSection2SignatureResponseState?.data?.signatures?.fd?.submitted ||
            getBUSection2SignatureResponseState?.data?.signatures?.buh?.submitted ||
            getBUSection2SignatureResponseState?.data?.signatures?.zc?.submitted ||
            getBUSection2SignatureResponseState?.data?.signatures?.zv?.submitted ? (
              <>
                <Divider
                  className="renderBlockWrapper_divider"
                  size="md"
                  my="xs"
                  labelPosition="center"
                />
                <div className="existing-attachment-review">
                  <p>
                    <b>Review Signed Responses</b>
                  </p>
                  <br />
                  <div className="row">
                    {getBUSection2SignatureResponseState?.data?.signatures?.fd?.submitted &&
                    getBUSection2SignatureResponseState?.data?.signatures?.fd?.finame ? (
                      <div className="col-lg-12">
                        <p>
                          <b>Finance Director</b>
                        </p>
                        <div className="rep-letter-form-bottom-btn">
                          <h5>
                            Approval Email attached by Local Internal Control For Finance Director
                          </h5>

                          <Button
                            startIcon={<PictureAsPdfIcon />}
                            onClick={() => {
                              const pdfUrl =
                                getBUSection2SignatureResponseState?.data?.signatures?.fd?.sas_url;
                              window.open(pdfUrl, '_blank');
                            }}
                          >
                            Email Attachment
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {getBUSection2SignatureResponseState?.data?.signatures?.fd?.submitted ===
                          true &&
                          getBUSection2SignatureResponseState?.data?.signatures?.fd?.finame ===
                            '' && (
                            <div className="col-lg-12 auto-auth">
                              <p>
                                <b>Finance Director</b>
                              </p>
                              <h5>Finance Director has Approved by Auto Authenticator</h5>
                              {getBUSection2SignatureResponseState?.data?.signatures?.fd
                                ?.comment && (
                                <h6>
                                  <b>Comments:</b>{' '}
                                  {
                                    getBUSection2SignatureResponseState?.data?.signatures?.fd
                                      ?.comment
                                  }
                                </h6>
                              )}
                            </div>
                          )}
                      </>
                    )}
                    {getBUSection2SignatureResponseState?.data?.signatures?.zv?.submitted &&
                    getBUSection2SignatureResponseState?.data?.signatures?.zv?.finame ? (
                      <div className="col-lg-12">
                        <p>
                          <b>Zone VP</b>
                        </p>
                        <div className="rep-letter-form-bottom-btn">
                          <h5>Approval Email attached by Local Internal Control For Zone VP</h5>

                          <Button
                            startIcon={<PictureAsPdfIcon />}
                            onClick={() => {
                              const pdfUrl =
                                getBUSection2SignatureResponseState?.data?.signatures?.zv?.sas_url;
                              window.open(pdfUrl, '_blank');
                            }}
                          >
                            Email Attachment
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {getBUSection2SignatureResponseState?.data?.signatures?.zv?.submitted ===
                          true &&
                          getBUSection2SignatureResponseState?.data?.signatures?.zv?.finame ===
                            '' && (
                            <div className="col-lg-12 auto-auth">
                              <p>
                                <b>Zone VP</b>
                              </p>
                              <h5>Zone VP has Approved by Auto Authenticator</h5>
                              {getBUSection2SignatureResponseState?.data?.signatures?.zv
                                ?.comment && (
                                <h6>
                                  <b>Comments:</b>{' '}
                                  {
                                    getBUSection2SignatureResponseState?.data?.signatures?.zv
                                      ?.comment
                                  }
                                </h6>
                              )}
                            </div>
                          )}
                      </>
                    )}
                    {getBUSection2SignatureResponseState?.data?.signatures?.buh?.submitted &&
                    getBUSection2SignatureResponseState?.data?.signatures?.buh?.finame ? (
                      <div className="col-lg-12">
                        <p>
                          <b>BU Head</b>
                        </p>
                        <div className="rep-letter-form-bottom-btn">
                          <h5>Approval Email attached by Local Internal Control For BU Head</h5>

                          <Button
                            startIcon={<PictureAsPdfIcon />}
                            onClick={() => {
                              const pdfUrl =
                                getBUSection2SignatureResponseState?.data?.signatures?.buh?.sas_url;
                              window.open(pdfUrl, '_blank');
                            }}
                          >
                            Email Attachment
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {getBUSection2SignatureResponseState?.data?.signatures?.buh?.submitted ===
                          true &&
                          getBUSection2SignatureResponseState?.data?.signatures?.buh?.finame ===
                            '' && (
                            <div className="col-lg-12 auto-auth">
                              <p>
                                <b>BU Head</b>
                              </p>
                              <h5>BU Head has Approved by Auto Authenticator</h5>
                              {getBUSection2SignatureResponseState?.data?.signatures?.buh
                                ?.comment && (
                                <h6>
                                  <b>Comments:</b>{' '}
                                  {
                                    getBUSection2SignatureResponseState?.data?.signatures?.buh
                                      ?.comment
                                  }
                                </h6>
                              )}
                            </div>
                          )}
                      </>
                    )}
                    {getBUSection2SignatureResponseState?.data?.signatures?.zc?.submitted &&
                    getBUSection2SignatureResponseState?.data?.signatures?.zc?.finame ? (
                      <div className="col-lg-12">
                        <p>
                          <b>Zone Control</b>
                        </p>
                        <div className="rep-letter-form-bottom-btn">
                          <h5>
                            Approval Email attached by Local Internal Control For Zone Control
                          </h5>

                          <Button
                            startIcon={<PictureAsPdfIcon />}
                            onClick={() => {
                              const pdfUrl =
                                getBUSection2SignatureResponseState?.data?.signatures?.zc?.sas_url;
                              window.open(pdfUrl, '_blank');
                            }}
                          >
                            Email Attachment
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {getBUSection2SignatureResponseState?.data?.signatures?.zc?.submitted ===
                          true &&
                          getBUSection2SignatureResponseState?.data?.signatures?.zc?.finame ===
                            '' && (
                            <div className="col-lg-12 auto-auth">
                              <p>
                                <b>Zone Control</b>
                              </p>
                              <h5>Zone Control has Approved by Auto Authenticator</h5>
                              {getBUSection2SignatureResponseState?.data?.signatures?.zc
                                ?.comment && (
                                <h6>
                                  <b>Comments:</b>{' '}
                                  {
                                    getBUSection2SignatureResponseState?.data?.signatures?.zc
                                      ?.comment
                                  }
                                </h6>
                              )}
                            </div>
                          )}
                      </>
                    )}
                  </div>
                </div>
              </>
            ) : (
              ''
            )}
          </div>
        </div>

        <div id="lastShow" />
      </div>
    </ClosedCollapseFrame>
  );
};

export default ReviewSection2;

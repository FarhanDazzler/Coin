import React, { useEffect, useState } from 'react';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Divider, Group, SimpleGrid, Text } from '@mantine/core';
import ClosedCollapseFrame from '../../../../../../components/UI/CollapseFrame/ClosedCollapseFrame';
import Button from '../../../../../../components/UI/Button';
import ActionLogChatTimeline from '../Section3/ActionLogChatTimeline';
import '../../../LetterFormStyle.scss';
import { clearGetBUSection3Response } from '../../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageAction';
import { getBUSection2SignatureResponseSelector } from '../../../../../../redux/REP_Letters/RL_HomePage/RL_HomePageSelector';

const ReviewSection2 = (props) => {
  const dispatch = useDispatch();

  const getBUSection2SignatureResponseState = useSelector(getBUSection2SignatureResponseSelector);
  return (
    <ClosedCollapseFrame title="Section 2 : Signatures" active>
      <div className="renderBlockWrapper-rep-letter-form mt-5">
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
                        <p className="golden-text">
                          <b>Finance Director :</b>
                        </p>
                        <div className="rep-letter-form-bottom-btn">
                          <h6>
                            E-mail approval of{' '}
                            <span className="golden-text">
                              {
                                getBUSection2SignatureResponseState?.data?.signatures?.fd
                                  ?.submitted_for
                              }
                            </span>{' '}
                            uploaded by{' '}
                            <span className="golden-text">
                              {' '}
                              {
                                getBUSection2SignatureResponseState?.data?.signatures?.fd
                                  ?.submitted_by
                              }
                            </span>{' '}
                            on{' '}
                            <span className="golden-text">
                              {
                                getBUSection2SignatureResponseState?.data?.signatures?.fd
                                  ?.submitted_at
                              }
                            </span>{' '}
                            (User Object ID:{' '}
                            <span className="golden-text">
                              {
                                getBUSection2SignatureResponseState?.data?.signatures?.fd
                                  ?.submitted_by_oid
                              }
                            </span>
                            )
                          </h6>

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
                                <b className="golden-text">Finance Director :</b>
                              </p>
                              <h6>
                                “I hereby certify that the above representation letter reflects my
                                understanding of the accuracy of the financial reporting package and
                                the effectiveness of the internal controls and financial reporting
                                controls of Cognos Company Code.” - Signed by{' '}
                                <span className="golden-text">
                                  {
                                    getBUSection2SignatureResponseState?.data?.signatures?.fd
                                      ?.submitted_by
                                  }
                                </span>{' '}
                                on{' '}
                                <span className="golden-text">
                                  {
                                    getBUSection2SignatureResponseState?.data?.signatures?.fd
                                      ?.submitted_at
                                  }
                                </span>{' '}
                                via Application Authenticator from IP Address{' '}
                                <span className="golden-text">
                                  {getBUSection2SignatureResponseState?.data?.signatures?.fd?.ip}
                                </span>{' '}
                                and location{' '}
                                <span className="golden-text">
                                  {getBUSection2SignatureResponseState?.data?.signatures?.fd
                                    ?.location == 'Latitude: , Longitude: ' ||
                                  getBUSection2SignatureResponseState?.data?.signatures?.fd
                                    ?.location == 'User denied Geolocation'
                                    ? 'was not available'
                                    : getBUSection2SignatureResponseState?.data?.signatures?.fd
                                        ?.location}
                                </span>{' '}
                                (User Object ID:{' '}
                                <span className="golden-text">
                                  {
                                    getBUSection2SignatureResponseState?.data?.signatures?.fd
                                      ?.submitted_by_oid
                                  }
                                </span>
                                )
                              </h6>
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
                    <Divider className="renderBlockWrapper_divider" size="xs" />
                    {getBUSection2SignatureResponseState?.data?.signatures?.zv?.submitted &&
                    getBUSection2SignatureResponseState?.data?.signatures?.zv?.finame ? (
                      <div className="col-lg-12">
                        <p className="golden-text">
                          <b>Zone VP :</b>
                        </p>
                        <div className="rep-letter-form-bottom-btn">
                          <h6>
                            E-mail approval of{' '}
                            <span className="golden-text">
                              {
                                getBUSection2SignatureResponseState?.data?.signatures?.zv
                                  ?.submitted_for
                              }
                            </span>{' '}
                            uploaded by{' '}
                            <span className="golden-text">
                              {' '}
                              {
                                getBUSection2SignatureResponseState?.data?.signatures?.zv
                                  ?.submitted_by
                              }
                            </span>{' '}
                            on{' '}
                            <span className="golden-text">
                              {
                                getBUSection2SignatureResponseState?.data?.signatures?.zv
                                  ?.submitted_at
                              }
                            </span>{' '}
                            (User Object ID:{' '}
                            <span className="golden-text">
                              {
                                getBUSection2SignatureResponseState?.data?.signatures?.zv
                                  ?.submitted_by_oid
                              }
                            </span>
                            )
                          </h6>

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
                              <p className="golden-text">
                                <b>Zone VP :</b>
                              </p>
                              <h6>
                                “I hereby certify that the above representation letter reflects my
                                understanding of the accuracy of the financial reporting package and
                                the effectiveness of the internal controls and financial reporting
                                controls of Cognos Company Code.” - Signed by{' '}
                                <span className="golden-text">
                                  {
                                    getBUSection2SignatureResponseState?.data?.signatures?.zv
                                      ?.submitted_by
                                  }
                                </span>{' '}
                                on{' '}
                                <span className="golden-text">
                                  {
                                    getBUSection2SignatureResponseState?.data?.signatures?.zv
                                      ?.submitted_at
                                  }
                                </span>{' '}
                                via Application Authenticator from IP Address{' '}
                                <span className="golden-text">
                                  {getBUSection2SignatureResponseState?.data?.signatures?.zv?.ip}
                                </span>{' '}
                                and location{' '}
                                <span className="golden-text">
                                  {getBUSection2SignatureResponseState?.data?.signatures?.zv
                                    ?.location == 'Latitude: , Longitude: ' ||
                                  getBUSection2SignatureResponseState?.data?.signatures?.zv
                                    ?.location == 'User denied Geolocation'
                                    ? 'was not available'
                                    : getBUSection2SignatureResponseState?.data?.signatures?.zv
                                        ?.location}
                                </span>{' '}
                                (User Object ID:{' '}
                                <span className="golden-text">
                                  {
                                    getBUSection2SignatureResponseState?.data?.signatures?.zv
                                      ?.submitted_by_oid
                                  }
                                </span>
                                )
                              </h6>
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
                    <Divider className="renderBlockWrapper_divider" size="xs" />
                    {getBUSection2SignatureResponseState?.data?.signatures?.buh?.submitted &&
                    getBUSection2SignatureResponseState?.data?.signatures?.buh?.finame ? (
                      <div className="col-lg-12">
                        <p className="golden-text">
                          <b>BU Head :</b>
                        </p>
                        <div className="rep-letter-form-bottom-btn">
                          <h6>
                            E-mail approval of{' '}
                            <span className="golden-text">
                              {
                                getBUSection2SignatureResponseState?.data?.signatures?.buh
                                  ?.submitted_for
                              }
                            </span>{' '}
                            uploaded by{' '}
                            <span className="golden-text">
                              {' '}
                              {
                                getBUSection2SignatureResponseState?.data?.signatures?.buh
                                  ?.submitted_by
                              }
                            </span>{' '}
                            on{' '}
                            <span className="golden-text">
                              {
                                getBUSection2SignatureResponseState?.data?.signatures?.buh
                                  ?.submitted_at
                              }
                            </span>{' '}
                            (User Object ID:{' '}
                            <span className="golden-text">
                              {
                                getBUSection2SignatureResponseState?.data?.signatures?.buh
                                  ?.submitted_by_oid
                              }
                            </span>
                            )
                          </h6>

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
                              <p className="golden-text">
                                <b>BU Head :</b>
                              </p>
                              <h6>
                                “I hereby certify that the above representation letter reflects my
                                understanding of the accuracy of the financial reporting package and
                                the effectiveness of the internal controls and financial reporting
                                controls of Cognos Company Code.” - Signed by{' '}
                                <span className="golden-text">
                                  {
                                    getBUSection2SignatureResponseState?.data?.signatures?.buh
                                      ?.submitted_by
                                  }
                                </span>{' '}
                                on{' '}
                                <span className="golden-text">
                                  {
                                    getBUSection2SignatureResponseState?.data?.signatures?.buh
                                      ?.submitted_at
                                  }
                                </span>{' '}
                                via Application Authenticator from IP Address{' '}
                                <span className="golden-text">
                                  {getBUSection2SignatureResponseState?.data?.signatures?.buh?.ip}
                                </span>{' '}
                                and location{' '}
                                <span className="golden-text">
                                  {getBUSection2SignatureResponseState?.data?.signatures?.buh
                                    ?.location == 'Latitude: , Longitude: ' ||
                                  getBUSection2SignatureResponseState?.data?.signatures?.buh
                                    ?.location == 'User denied Geolocation'
                                    ? 'was not available'
                                    : getBUSection2SignatureResponseState?.data?.signatures?.buh
                                        ?.location}
                                </span>{' '}
                                (User Object ID:{' '}
                                <span className="golden-text">
                                  {
                                    getBUSection2SignatureResponseState?.data?.signatures?.buh
                                      ?.submitted_by_oid
                                  }
                                </span>
                                )
                              </h6>
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
                    <Divider className="renderBlockWrapper_divider" size="xs" />
                    {getBUSection2SignatureResponseState?.data?.signatures?.zc?.submitted &&
                    getBUSection2SignatureResponseState?.data?.signatures?.zc?.finame ? (
                      <div className="col-lg-12">
                        <p className="golden-text">
                          <b>Zone Control :</b>
                        </p>
                        <div className="rep-letter-form-bottom-btn">
                          <h6>
                            E-mail approval of{' '}
                            <span className="golden-text">
                              {
                                getBUSection2SignatureResponseState?.data?.signatures?.zc
                                  ?.submitted_for
                              }
                            </span>{' '}
                            uploaded by{' '}
                            <span className="golden-text">
                              {' '}
                              {
                                getBUSection2SignatureResponseState?.data?.signatures?.zc
                                  ?.submitted_by
                              }
                            </span>{' '}
                            on{' '}
                            <span className="golden-text">
                              {
                                getBUSection2SignatureResponseState?.data?.signatures?.zc
                                  ?.submitted_at
                              }
                            </span>{' '}
                            (User Object ID:{' '}
                            <span className="golden-text">
                              {
                                getBUSection2SignatureResponseState?.data?.signatures?.zc
                                  ?.submitted_by_oid
                              }
                            </span>
                            )
                          </h6>

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
                              <p className="golden-text">
                                <b>Zone Control :</b>
                              </p>
                              <h6>
                                “I hereby certify that the above representation letter reflects my
                                understanding of the accuracy of the financial reporting package and
                                the effectiveness of the internal controls and financial reporting
                                controls of Cognos Company Code.” - Signed by{' '}
                                <span className="golden-text">
                                  {
                                    getBUSection2SignatureResponseState?.data?.signatures?.zc
                                      ?.submitted_by
                                  }
                                </span>{' '}
                                on{' '}
                                <span className="golden-text">
                                  {
                                    getBUSection2SignatureResponseState?.data?.signatures?.zc
                                      ?.submitted_at
                                  }
                                </span>{' '}
                                via Application Authenticator from IP Address{' '}
                                <span className="golden-text">
                                  {getBUSection2SignatureResponseState?.data?.signatures?.zc?.ip}
                                </span>{' '}
                                and location{' '}
                                <span className="golden-text">
                                  {getBUSection2SignatureResponseState?.data?.signatures?.zc
                                    ?.location == 'Latitude: , Longitude: ' ||
                                  getBUSection2SignatureResponseState?.data?.signatures?.zc
                                    ?.location == 'User denied Geolocation'
                                    ? 'was not available'
                                    : getBUSection2SignatureResponseState?.data?.signatures?.zc
                                        ?.location}
                                </span>{' '}
                                (User Object ID:{' '}
                                <span className="golden-text">
                                  {
                                    getBUSection2SignatureResponseState?.data?.signatures?.zc
                                      ?.submitted_by_oid
                                  }
                                </span>
                                )
                              </h6>
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

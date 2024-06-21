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

  const getBUSection2SignatureResponseState = useSelector(
    getBUZoneSection2SignatureResponseSelector,
  );
  return (
    <ClosedCollapseFrame title="Section 2 : Signatures" active>
      <div className="renderBlockWrapper-rep-letter-form mt-5">
        <div className="renderBlockWrapper-control-actions-wrapper pb-5 pt-4">
          <div>
            <div className="renderBlockWrapper_content">
              <p>
                <b>
                  As a{' '}
                  {localStorage.getItem('selected_Role') === 'Processor'
                    ? 'Processor'
                    : `${localStorage.getItem('selected_Role')} - Signatory`}
                </b>
              </p>
            </div>
            <div className="renderBlockWrapper_content">
              <p>
                Review the Uploaded approval email from the respective signatories/authenticators
              </p>
            </div>
            {getBUSection2SignatureResponseState?.data?.signatures?.zlr?.submitted ||
            getBUSection2SignatureResponseState?.data?.signatures?.exc?.submitted ||
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
                    {getBUSection2SignatureResponseState?.data?.signatures?.zlr?.submitted &&
                    getBUSection2SignatureResponseState?.data?.signatures?.zlr?.finame ? (
                      <div className="col-lg-12">
                        <p className="golden-text">
                          <b>Zone Legal Representative :</b>
                        </p>
                        <div className="rep-letter-form-bottom-btn">
                          <h6>
                            E-mail approval of{' '}
                            <span className="golden-text">
                              {
                                getBUSection2SignatureResponseState?.data?.signatures?.zlr
                                  ?.submitted_for
                              }
                            </span>{' '}
                            uploaded by{' '}
                            <span className="golden-text">
                              {' '}
                              {
                                getBUSection2SignatureResponseState?.data?.signatures?.zlr
                                  ?.submitted_by
                              }
                            </span>{' '}
                            on{' '}
                            <span className="golden-text">
                              {
                                getBUSection2SignatureResponseState?.data?.signatures?.zlr
                                  ?.submitted_at
                              }
                            </span>{' '}
                            (User Object ID:{' '}
                            <span className="golden-text">
                              {
                                getBUSection2SignatureResponseState?.data?.signatures?.zlr
                                  ?.submitted_by_oid
                              }
                            </span>
                            )
                          </h6>

                          <Button
                            startIcon={<PictureAsPdfIcon />}
                            onClick={() => {
                              const pdfUrl =
                                getBUSection2SignatureResponseState?.data?.signatures?.zlr?.sas_url;
                              window.open(pdfUrl, '_blank');
                            }}
                          >
                            Email Attachment
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {getBUSection2SignatureResponseState?.data?.signatures?.zlr?.submitted ===
                          true &&
                          getBUSection2SignatureResponseState?.data?.signatures?.zlr?.finame ===
                            '' && (
                            <div className="col-lg-12 auto-auth">
                              <p className="golden-text">
                                <b>Zone Legal Representative :</b>
                              </p>
                              <h6>
                                “I hereby certify that the above representation letter reflects my
                                understanding of the accuracy of the financial reporting package and
                                the effectiveness of the internal controls and financial reporting
                                controls of Cognos Company Code.” - Signed by{' '}
                                <span className="golden-text">
                                  {
                                    getBUSection2SignatureResponseState?.data?.signatures?.zlr
                                      ?.submitted_by
                                  }
                                </span>{' '}
                                on{' '}
                                <span className="golden-text">
                                  {
                                    getBUSection2SignatureResponseState?.data?.signatures?.zlr
                                      ?.submitted_at
                                  }
                                </span>{' '}
                                via Application Authenticator from IP Address{' '}
                                <span className="golden-text">
                                  {getBUSection2SignatureResponseState?.data?.signatures?.zlr?.ip}
                                </span>{' '}
                                and location{' '}
                                <span className="golden-text">
                                  {getBUSection2SignatureResponseState?.data?.signatures?.zlr
                                    ?.location == 'Latitude: , Longitude: ' ||
                                  getBUSection2SignatureResponseState?.data?.signatures?.zlr
                                    ?.location == 'User denied Geolocation'
                                    ? 'was not available'
                                    : getBUSection2SignatureResponseState?.data?.signatures?.zlr
                                        ?.location}
                                </span>{' '}
                                (User Object ID:{' '}
                                <span className="golden-text">
                                  {
                                    getBUSection2SignatureResponseState?.data?.signatures?.zlr
                                      ?.submitted_by_oid
                                  }
                                </span>
                                )
                              </h6>
                              {getBUSection2SignatureResponseState?.data?.signatures?.zlr
                                ?.comment && (
                                <h6>
                                  <b>Comments:</b>{' '}
                                  {
                                    getBUSection2SignatureResponseState?.data?.signatures?.zlr
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
                        <Divider className="renderBlockWrapper_divider" size="xs" />
                        <p className="golden-text">
                          <b>Zone VP Finance :</b>
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
                              <Divider className="renderBlockWrapper_divider" size="xs" />
                              <p className="golden-text">
                                <b>Zone VP Finance :</b>
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
                                  {}
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
                    {getBUSection2SignatureResponseState?.data?.signatures?.exc?.submitted &&
                    getBUSection2SignatureResponseState?.data?.signatures?.exc?.finame ? (
                      <div className="col-lg-12">
                        <Divider className="renderBlockWrapper_divider" size="xs" />
                        <p className="golden-text">
                          <b>Excom Member :</b>
                        </p>
                        <div className="rep-letter-form-bottom-btn">
                          <h6>
                            E-mail approval of{' '}
                            <span className="golden-text">
                              {
                                getBUSection2SignatureResponseState?.data?.signatures?.exc
                                  ?.submitted_for
                              }
                            </span>{' '}
                            uploaded by{' '}
                            <span className="golden-text">
                              {' '}
                              {
                                getBUSection2SignatureResponseState?.data?.signatures?.exc
                                  ?.submitted_by
                              }
                            </span>{' '}
                            on{' '}
                            <span className="golden-text">
                              {
                                getBUSection2SignatureResponseState?.data?.signatures?.exc
                                  ?.submitted_at
                              }
                            </span>{' '}
                            (User Object ID:{' '}
                            <span className="golden-text">
                              {
                                getBUSection2SignatureResponseState?.data?.signatures?.exc
                                  ?.submitted_by_oid
                              }
                            </span>
                            )
                          </h6>

                          <Button
                            startIcon={<PictureAsPdfIcon />}
                            onClick={() => {
                              const pdfUrl =
                                getBUSection2SignatureResponseState?.data?.signatures?.exc?.sas_url;
                              window.open(pdfUrl, '_blank');
                            }}
                          >
                            Email Attachment
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {getBUSection2SignatureResponseState?.data?.signatures?.exc?.submitted ===
                          true &&
                          getBUSection2SignatureResponseState?.data?.signatures?.exc?.finame ===
                            '' && (
                            <div className="col-lg-12 auto-auth">
                              <Divider className="renderBlockWrapper_divider" size="xs" />
                              <p className="golden-text">
                                <b>Excom Member :</b>
                              </p>
                              <h6>
                                “I hereby certify that the above representation letter reflects my
                                understanding of the accuracy of the financial reporting package and
                                the effectiveness of the internal controls and financial reporting
                                controls of Cognos Company Code.” - Signed by{' '}
                                <span className="golden-text">
                                  {
                                    getBUSection2SignatureResponseState?.data?.signatures?.exc
                                      ?.submitted_by
                                  }
                                </span>{' '}
                                on{' '}
                                <span className="golden-text">
                                  {
                                    getBUSection2SignatureResponseState?.data?.signatures?.exc
                                      ?.submitted_at
                                  }
                                </span>{' '}
                                via Application Authenticator from IP Address{' '}
                                <span className="golden-text">
                                  {getBUSection2SignatureResponseState?.data?.signatures?.exc?.ip}
                                </span>{' '}
                                and location{' '}
                                <span className="golden-text">
                                  {getBUSection2SignatureResponseState?.data?.signatures?.exc
                                    ?.location == 'Latitude: , Longitude: ' ||
                                  getBUSection2SignatureResponseState?.data?.signatures?.exc
                                    ?.location == 'User denied Geolocation'
                                    ? 'was not available'
                                    : getBUSection2SignatureResponseState?.data?.signatures?.exc
                                        ?.location}
                                </span>{' '}
                                (User Object ID:{' '}
                                <span className="golden-text">
                                  {
                                    getBUSection2SignatureResponseState?.data?.signatures?.exc
                                      ?.submitted_by_oid
                                  }
                                </span>
                                )
                              </h6>
                              {getBUSection2SignatureResponseState?.data?.signatures?.exc
                                ?.comment && (
                                <h6>
                                  <b>Comments:</b>{' '}
                                  {
                                    getBUSection2SignatureResponseState?.data?.signatures?.exc
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
                        <Divider className="renderBlockWrapper_divider" size="xs" />
                        <p className="golden-text">
                          <b>Head of Zone Control :</b>
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
                              <Divider className="renderBlockWrapper_divider" size="xs" />
                              <p className="golden-text">
                                <b>Head of Zone Control :</b>
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

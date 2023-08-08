import React, { useState, useEffect, useCallback } from 'react';
import * as Yup from 'yup';
import { useFormikContext, Formik } from 'formik';
import { Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import '../RepLetterQuestionBank.scss';
import Button from '../../../../MDM/MDM_Tab_Buttons/Button';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { RichTextEditor } from '@mantine/rte';
import './Instructions.scss';
import { modifyInstructions } from '../../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
import {
  getInstructionsSelector,
  modifyInstructionsSelector,
} from '../../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankSelector';

const Instructions = ({ setShowModal, modalType }) => {
  const dispatch = useDispatch();
  const { Formik } = formik;

  const getInstructionsState = useSelector(getInstructionsSelector);
  const modifyInstructionVal = useSelector(modifyInstructionsSelector);

  var formdata = new FormData();

  const handleSave = (value, resetForm) => {
    if (value.isFileAttached === 'Both') {
      formdata.append('id', getInstructionsState?.data[0]?.id);
      formdata.append('isFileAttached', true);
      formdata.append('fileType', 'Both');
      formdata.append('openingFile', value.OpeningFile);
      formdata.append('closingFile', value.ClosingFile);
      formdata.append('instructions', value.Instructions);
      formdata.append('module', modalType);
    } else if (value.isFileAttached === 'Opening') {
      formdata.append('id', getInstructionsState?.data[0]?.id);
      formdata.append('isFileAttached', true);
      formdata.append('fileType', 'OpeningFile');
      formdata.append('openingFile', value.OpeningFile);
      //formdata.append('closingFile', null);
      formdata.append('instructions', value.Instructions);
      formdata.append('module', modalType);
    } else if (value.isFileAttached === 'Closing') {
      formdata.append('id', getInstructionsState?.data[0]?.id);
      formdata.append('isFileAttached', true);
      formdata.append('fileType', 'ClosingFile');
      //formdata.append('openingFile', null);
      formdata.append('closingFile', value.ClosingFile);
      formdata.append('instructions', value.Instructions);
      formdata.append('module', modalType);
    } else {
      formdata.append('id', getInstructionsState?.data[0]?.id);
      formdata.append('isFileAttached', false);
      formdata.append('instructions', value.Instructions);
      formdata.append('module', modalType);
    }

    dispatch(
      modifyInstructions({
        formdata,
        event: {
          onSuccess: () => {
            resetForm();
          },
        },
      }),
    );
  };

  return (
    <div className="p-5">
      <Formik
        enableReinitialize
        initialValues={{
          Instructions: getInstructionsState?.data[0]?.instructions || '',
          OpeningNotesFile: null,
          ClosingInstructionFile: null,
        }}
        validationSchema={Yup.object().shape({
          Instructions: Yup.string().required('Instructions is required'),
          isFileAttached: Yup.string().required('Please select do you want to re-upload Files?'),
          OpeningFile: Yup.mixed().when('isFileAttached', {
            is: (value) => ['Both', 'Opening'].includes(value),
            then: Yup.mixed().required('Opening Instructions is required'),
          }),
          ClosingFile: Yup.mixed().when('isFileAttached', {
            is: (value) => ['Both', 'Closing'].includes(value),
            then: Yup.mixed().required('Closing Instructions is required'),
          }),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            handleSave(values, resetForm);
            //history.push('/master-data-management/mics-framework');
          } catch (error) {
            const message = error.message || 'Something went wrong';
            setStatus({ success: false });
            setErrors({ submit: message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-12">
                <div className="row mb-4">
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label className="mt-5">Instructions :</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Instructions"
                      required
                      onChange={handleChange}
                      isInvalid={!!errors.Instructions}
                      name="Instructions"
                      value={values.Instructions}
                      rows={3}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.Instructions}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {/* <Form.Label className="mt-5">Instructions :</Form.Label>
                  <RichTextEditor
                    value={values.Instructions}
                    onChange={(val) => setFieldValue('Instructions', val)}
                    placeholder="Provide Instructions here..."
                    controls={[
                      ['bold', 'italic', 'underline'],
                      ['unorderedList', 'h1', 'h2', 'h3'],
                      ['sup', 'sub'],
                      ['alignLeft', 'alignCenter', 'alignRight'],
                    ]}
                    radius="md"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.Instructions}
                  </Form.Control.Feedback>
                  {values.Instructions.length > 5000 && (
                    <span className="error">
                      Instructions are not allowed more than 5000 characters
                    </span>
                  )} */}
                </div>
              </div>
              {(getInstructionsState?.data[0]?.opening_file_sass_token.length > 0 ||
                getInstructionsState?.data[0]?.closing_file_sass_token.length > 0) && (
                <div className="row">
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <h5>
                        There is an existing Opening Notes / Closing Instructions files, Do you want
                        to reupload? (PFD File Only)
                      </h5>
                    </div>
                    <div className="row">
                      {getInstructionsState?.data[0]?.opening_file_sass_token.length > 0 && (
                        <div className="col">
                          <Button
                            variant="outlined"
                            color="secondary"
                            className="ml-4"
                            startIcon={<PictureAsPdfIcon />}
                            onClick={() => {
                              const pdfUrl = getInstructionsState?.data[0]?.opening_file_sass_token;
                              window.open(pdfUrl, '_blank');
                              //window.open(getInstructionsState?.data[0]?.opening_file_sass_token);
                            }}
                          >
                            Opening Instructions
                          </Button>
                        </div>
                      )}
                      {getInstructionsState?.data[0]?.closing_file_sass_token.length > 0 && (
                        <div className="col">
                          <Button
                            variant="outlined"
                            color="secondary"
                            className="ml-4"
                            startIcon={<PictureAsPdfIcon />}
                            onClick={() => {
                              const pdfUrl = getInstructionsState?.data[0]?.closing_file_sass_token;
                              window.open(pdfUrl, '_blank');
                              //window.open(getInstructionsState?.data[0]?.closing_file_sass_token);
                            }}
                          >
                            Closing Instructions
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <Form.Group className="input-group mb-3">
                        <Form.Control
                          as="select"
                          name="isFileAttached"
                          placeholder=""
                          value={values.isFileAttached}
                          isInvalid={!!errors.isFileAttached}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          readOnly={false}
                          className="form-select"
                        >
                          <option value="">Re - Upload</option>
                          <option value="Both">Both files</option>
                          <option value="Opening">Only Opening Instructions</option>
                          <option value="Closing">Only Closing Instructions</option>
                          <option value="No">No</option>
                        </Form.Control>

                        <Form.Control.Feedback type="invalid">
                          {errors.isFileAttached}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                  </div>
                </div>
              )}
              {values.isFileAttached === 'Both' && (
                <div className="row mb-4">
                  <div className="col-lg-4">
                    <Form.Group className="position-relative mb-3">
                      <Form.Label className="mt-5">Opening Instructions :</Form.Label>
                      <Form.Control
                        type="file"
                        required
                        accept=".pdf"
                        name="OpeningFile"
                        //onChange={handleChange}
                        onChange={(event) => {
                          setFieldValue('OpeningFile', event.currentTarget.files[0]);
                        }}
                        isInvalid={!!errors.OpeningFile}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.OpeningFile}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-lg-4">
                    <Form.Group className="position-relative mb-3">
                      <Form.Label className="mt-5">Closing Instructions :</Form.Label>
                      <Form.Control
                        type="file"
                        required
                        accept=".pdf"
                        name="ClosingFile"
                        //onChange={handleChange}
                        onChange={(event) => {
                          setFieldValue('ClosingFile', event.currentTarget.files[0]);
                        }}
                        isInvalid={!!errors.ClosingFile}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.ClosingFile}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>
              )}
              {values.isFileAttached === 'Opening' && (
                <div className="row mb-4">
                  <div className="col-lg-4">
                    <Form.Group className="position-relative mb-3">
                      <Form.Label className="mt-5">Opening Instructions :</Form.Label>
                      <Form.Control
                        type="file"
                        required
                        accept=".pdf"
                        name="OpeningFile"
                        //onChange={handleChange}
                        onChange={(event) => {
                          setFieldValue('OpeningFile', event.currentTarget.files[0]);
                        }}
                        isInvalid={!!errors.OpeningFile}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.OpeningFile}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>
              )}
              {values.isFileAttached === 'Closing' && (
                <div className="row mb-4">
                  <div className="col-lg-4">
                    <Form.Group className="position-relative mb-3">
                      <Form.Label className="mt-5">Closing Instructions :</Form.Label>
                      <Form.Control
                        type="file"
                        required
                        accept=".pdf"
                        name="ClosingFile"
                        //onChange={handleChange}
                        onChange={(event) => {
                          setFieldValue('ClosingFile', event.currentTarget.files[0]);
                        }}
                        isInvalid={!!errors.ClosingFile}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.ClosingFile}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>
              )}
            </div>

            <div className="footer-action">
              <div className="d-flex align-items-center justify-content-end">
                <div>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      setShowModal(false);
                    }}
                    disabled={modifyInstructionVal.loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="neutral"
                    className="ml-4"
                    onClick={handleSubmit}
                    loading={modifyInstructionVal.loading}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Instructions;

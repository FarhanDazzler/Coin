import React, { useState } from 'react';
import * as Yup from 'yup';
import { Form } from 'react-bootstrap';
import * as formik from 'formik';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import '../RepLetterQuestionBank.scss';
import Button from '../../../../MDM/MDM_Tab_Buttons/Button';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import './Instructions.scss';
import CustomModal from '../../../../../components/UI/CustomModal';
import { modifyFunctionalInstructions } from '../../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
import {
  getFunctionalInstructionsSelector,
  modifyFunctionalInstructionsSelector,
} from '../../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankSelector';

const FunctionalInstructions = ({ setShowModal, modalType }) => {
  const dispatch = useDispatch();
  const { Formik } = formik;

  const [ShowVideoModal, setShowVideoModal] = useState(false);
  const getInstructionsState = useSelector(getFunctionalInstructionsSelector);
  const modifyInstructionVal = useSelector(modifyFunctionalInstructionsSelector);

  var formdata = new FormData();

  const handleSave = (value, resetForm) => {
    if (value.isFileAttached === 'Yes') {
      formdata.append('id', getInstructionsState?.data[0]?.id);
      formdata.append('isFileAttached', true);
      formdata.append('video', value.Video);
      formdata.append('instructions', value.Instructions);
    } else {
      formdata.append('id', getInstructionsState?.data[0]?.id);
      formdata.append('isFileAttached', false);
      formdata.append('instructions', value.Instructions);
    }

    dispatch(
      modifyFunctionalInstructions({
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
          Video: null,
        }}
        validationSchema={Yup.object().shape({
          Instructions: Yup.string().required('Instructions is required'),
          isFileAttached: Yup.string().required('Please select do you want to re-upload Video?'),
          Video: Yup.mixed().when('isFileAttached', {
            is: (value) => ['Yes'].includes(value),
            then: Yup.mixed().required('Instructions Video is required'),
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
                </div>
              </div>
              {getInstructionsState?.data[0]?.url.length > 0 && (
                <div className="row">
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <h5>There is an existing Instructions Video, Do you want to reupload?</h5>
                    </div>
                    <div>
                      <Button
                        variant="outlined"
                        color="secondary"
                        className="ml-4"
                        startIcon={<PlayCircleOutlineIcon />}
                        onClick={(e) => {
                          setShowVideoModal(true);
                        }}
                      >
                        Video
                      </Button>
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
                          <option value="Yes">Yes</option>
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
              {values.isFileAttached === 'Yes' && (
                <div className="row mb-4">
                  <div className="col-lg-4">
                    <Form.Group className="position-relative mb-3">
                      <Form.Label className="mt-5">Instructions Video :</Form.Label>
                      <Form.Control
                        type="file"
                        required
                        accept=".mp4, .mov, .avi, .mkv"
                        name="Video"
                        //onChange={handleChange}
                        onChange={(event) => {
                          setFieldValue('Video', event.currentTarget.files[0]);
                        }}
                        isInvalid={!!errors.Video}
                      />
                      <Form.Control.Feedback type="invalid">{errors.Video}</Form.Control.Feedback>
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
      <CustomModal
        className="add-org"
        open={ShowVideoModal}
        onClose={() => {
          setShowVideoModal(false);
        }}
        width={800}
        title={'Instructions Video'}
        bodyClassName="p-0"
      >
        <video width="800" height="500" controls className="p-2">
          <source src={getInstructionsState?.data[0]?.sass_token} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </CustomModal>
    </div>
  );
};

export default FunctionalInstructions;

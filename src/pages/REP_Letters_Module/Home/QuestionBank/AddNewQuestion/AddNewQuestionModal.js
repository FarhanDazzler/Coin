import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../../../../../components/UI/Button';
import {
  add_BU_Questions,
  edit_BU_Questions,
  add_Function_Questions,
  edit_Function_Questions,
} from '../../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
import {} from '../../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankSelector';
import RichTextEditor from '@mantine/rte';

const AddNewQuestionModal = ({
  isEdit,
  editableData,
  setEditableData,
  setShowModal,
  modalType,
  functionType,
  functionName,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="p-5">
      <Formik
        initialValues={{ questionText: isEdit == true ? editableData?.questionText : '' }}
        validationSchema={Yup.object().shape({
          questionText: Yup.string()
            .min(10, 'Question text should be minimum of 10 characters')
            .required('Question text is required'),
        })}
        onSubmit={(values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            if (modalType === 'BU') {
              if (isEdit === true) {
                const payload = {
                  id: editableData.questionID,
                  text: values.questionText,
                };
                dispatch(edit_BU_Questions(payload));
              } else {
                const payload = {
                  text: values.questionText,
                  type: 'BU',
                };
                dispatch(add_BU_Questions(payload));
              }
            } else if (modalType === 'Zone') {
              if (isEdit === true) {
                const payload = {
                  id: editableData.questionID,
                  text: values.questionText,
                };
                dispatch(edit_BU_Questions(payload));
              } else {
                const payload = {
                  text: values.questionText,
                  type: 'Zone',
                };
                dispatch(add_BU_Questions(payload));
              }
            } else {
              if (isEdit === true) {
                const payload = {
                  Type: functionType,
                  Name: functionName,
                  id: editableData.questionID,
                  text: values.questionText,
                };
                dispatch(edit_Function_Questions(payload));
              } else {
                const payload = {
                  Type: functionType,
                  Name: functionName,
                  text: values.questionText,
                };
                dispatch(add_Function_Questions(payload));
              }
            }
          } catch (error) {
            const message = error.message || 'Something went wrong';
            setStatus({ success: false });
            setErrors({ submit: message });
            setSubmitting(false);
          }
        }}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <div className="row">
              <div className="col-lg-12">
                <div className="row mb-4">
                  <div className="col-lg-5">
                    <label htmlFor="questionText">Question Text :</label>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-lg-12">
                    <RichTextEditor
                      value={values.questionText}
                      onChange={(val) => setFieldValue('questionText', val)}
                      placeholder="Provide Question Text here..."
                      controls={[
                        ['bold', 'italic', 'underline'],
                        ['unorderedList', 'h1', 'h2', 'h3'],
                        ['sup', 'sub'],
                        ['alignLeft', 'alignCenter', 'alignRight'],
                      ]}
                      radius="md"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="footer-action">
              <div className="d-flex align-items-center justify-content-end">
                <div>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      setShowModal(false);
                      setEditableData({});
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" color="neutral" className="ml-4">
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

export default AddNewQuestionModal;

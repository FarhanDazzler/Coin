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
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from '@tiptap/extension-placeholder';

const AddNewQuestionModal = ({
  isEdit,
  editableData,
  setEditableData,
  setShowModal,
  modalType,
  functionType,
}) => {
  const dispatch = useDispatch();
  const Editor = (values, setFieldValue) => {
    return useEditor({
      extensions: [
        StarterKit,
        Underline,
        Superscript,
        SubScript,
        Highlight,
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        Placeholder.configure({ placeholder: 'Provide question text here...' }),
      ],
      content: values.Instructions,
      onUpdate({ editor }) {
        setFieldValue('questionText', editor.getText());
      },
    });
  };

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
                console.log(values.questionText)
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
                  id: editableData.questionID,
                  text: values.questionText,
                };
                dispatch(edit_Function_Questions(payload));
              } else {
                const payload = {
                  Type: functionType,
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
                    <RichTextEditor editor={Editor(values, setFieldValue)}>
                      <RichTextEditor.Toolbar sticky>
                        <RichTextEditor.ControlsGroup>
                          <RichTextEditor.Bold />
                          <RichTextEditor.Italic />
                          <RichTextEditor.Underline />
                        </RichTextEditor.ControlsGroup>

                        <RichTextEditor.ControlsGroup>
                          <RichTextEditor.H1 />
                          <RichTextEditor.H2 />
                          <RichTextEditor.H3 />
                        </RichTextEditor.ControlsGroup>

                        <RichTextEditor.ControlsGroup>
                          <RichTextEditor.BulletList />
                          <RichTextEditor.Subscript />
                          <RichTextEditor.Superscript />
                        </RichTextEditor.ControlsGroup>

                        <RichTextEditor.ControlsGroup>
                          <RichTextEditor.AlignLeft />
                          <RichTextEditor.AlignCenter />
                          <RichTextEditor.AlignRight />
                        </RichTextEditor.ControlsGroup>
                      </RichTextEditor.Toolbar>

                      <RichTextEditor.Content />
                    </RichTextEditor>
                    {values.questionText.length > 5000 && (
                      <span className="error">
                        Question Text is not allowed more than 5000 characters
                      </span>
                    )}
                    {values.questionText.match(/<([a-zA-Z0-9]+)\s*>(\s*<br>\s*|\s*)*<\/\1>/) && (
                      <span className="error">
                        Blank spaces or empty Question Text are not allowed
                      </span>
                    )}
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
                  <Button
                    type="submit"
                    color="neutral"
                    disabled={
                      values.questionText.length >= 5000 ||
                      values.questionText.match(/<([a-zA-Z0-9]+)\s*>(\s*<br>\s*|\s*)*<\/\1>/)
                    }
                    className="ml-4"
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

export default AddNewQuestionModal;

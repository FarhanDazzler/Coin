import React, { useState, useCallback, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormikContext, Formik } from 'formik';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import '../RepLetterQuestionBank.scss';
import Button from '../../../../MDM/MDM_Tab_Buttons/Button';
import { TextEditor } from '../../../../../components/FormInputs/RichTextEditor/RichTextEditor';

const Instructions = ({ setShowModal, editTableData, modalType }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [files, setFiles] = useState([]);
  const [invalidFiles, setInvalidFiles] = useState([]);
  //const allowedExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv', 'webm'];
  const allowedExtensions = ['mp4', 'jpg', 'jpeg', 'png'];

  const handleFileSelect = useCallback(
    (event) => {
      const fileList = event.target.files;
      const updatedFiles = [...files];
      const updatedInvalidFiles = [...invalidFiles];

      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const extension = file.name.split('.').pop().toLowerCase();

        if (allowedExtensions.includes(extension)) {
          if (!updatedFiles.find((f) => f.name === file.name)) {
            updatedFiles.push({
              name: file.name,
              category: '',
            });
          }
        } else {
          updatedInvalidFiles.push(file);
        }
      }

      setFiles(updatedFiles);
      setInvalidFiles(updatedInvalidFiles);
    },
    [files, invalidFiles, allowedExtensions],
  );

  const handleDelete = useCallback(
    (fileName) => {
      const updatedFiles = files.filter((file) => file.name !== fileName);
      setFiles(updatedFiles);
    },
    [files],
  );

  const handleSave = (value) => {
    let payload = {
      Module: modalType,
      id: editTableData?.id,
      Instructions: value.Instructions,
    };
    console.log(payload, 'payload');

    //dispatch(addMicsFramework(payload));
  };

  return (
    <div className="p-5">
      <Formik
        enableReinitialize
        initialValues={{
          Instructions: editTableData?.Instructions || '',
        }}
        validationSchema={Yup.object().shape({
          Instructions: Yup.string().required('Instructions is required'),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
          try {
            handleSave(values);
            resetForm();
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
              {/*Rich text Editor call*/}
              <div className="col-lg-12">
                <div className="row mb-8">
                  <h5 className="mt-5">Instructions :</h5>

                  <TextEditor
                    setFieldValue={(val) => setFieldValue('Instructions', val)}
                    value={values.Instructions}
                  />
                  {values.Instructions.length > 5000 && (
                    <span className="error">
                      Instructions are not allowed more than 5000 characters
                    </span>
                  )}
                </div>
              </div>

              <div className="upload-files-container">
                <h5>Video:</h5>
                <div>
                  <input type="file" multiple={true} onChange={handleFileSelect} />
                </div>
                <p>{files.length} files selected</p>
                {invalidFiles.length > 0 && (
                  <p className="error-message">{invalidFiles.length} invalid files selected</p>
                )}
                {files.length > 0 && (
                  <div className="selected-controls">
                    <table className="table table-bordered">
                      <thead className="thead-light">
                        <tr>
                          <th>Action</th>
                          <th>Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {files.map((file, index) => (
                          <tr key={`${file.name}-${index}`}>
                            <td>
                              <Button
                                variant="outlined"
                                color="secondary"
                                startIcon={
                                  <DeleteIcon size={30} strokeWidth={1.5} color={'#ffc800'} />
                                }
                                onClick={() => {
                                  handleDelete(file.name);
                                }}
                              >
                                Delete
                              </Button>
                            </td>
                            <td>{file.name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
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
                    }}
                  >
                    Cancel
                  </Button>
                  <Button color="neutral" className="ml-4" onClick={handleSubmit}>
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

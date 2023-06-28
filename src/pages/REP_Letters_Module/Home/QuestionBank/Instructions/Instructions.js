import React, { useState, useEffect, useCallback } from 'react';
import * as Yup from 'yup';
import { useFormikContext, Formik } from 'formik';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../RepLetterQuestionBank.scss';
import Button from '../../../../MDM/MDM_Tab_Buttons/Button';
import { TextEditor } from '../../../../../components/FormInputs/RichTextEditor/RichTextEditor';
import { useDropzone } from 'react-dropzone';
import { Group, Text, Image, SimpleGrid } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import DeleteIcon from '@mui/icons-material/Delete';
import { relativeTimeRounding } from 'moment';
import './Instructions.scss';
import { useMemo } from 'react';

const Instructions = ({ setShowModal, editTableData, modalType }) => {
  const dispatch = useDispatch();

  var formdata = new FormData();

  // Code for File Drop Zone
  // state to store files
  const [files, setFiles] = useState([]);

  // Function to detele file on the basis of file name
  const handleDeleteFile = useCallback(
    (fileName) => {
      const updatedFiles = files.filter((file) => file.name !== fileName);
      setFiles(updatedFiles);
    },
    [files],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    fileRejections,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      'image/*': [],
    },
    // Specify the file types you want to accept
    multiple: true, // Allow multiple file selection
    //maxFiles:2
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
  });

  // Function to preview files (Thumbnail)
  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <div className="previews-block">
        <Image
          key={index}
          src={imageUrl}
          imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        />
        <DeleteIcon
          className="previews-cancel-icon"
          size={30}
          strokeWidth={1.5}
          color={'#ffc800'}
          onClick={() => {
            handleDeleteFile(file.name);
          }}
        />
      </div>
    );
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  // Code for changing background color of dropzone
  const style = useMemo(
    () => ({
      ...(isDragActive ? { backgroundColor: '#ffc800' } : {}),
      ...(isDragAccept ? { backgroundColor: '#508A3B' } : {}),
      ...(isDragReject ? { backgroundColor: '#b11f24' } : {}),
    }),
    [isDragActive, isDragReject, isDragAccept],
  );

  // code for changing text of dropzone with icons nad text color
  const messageWithIconAndColor = useMemo(() => {
    if (fileRejections.length > 0) {
      const { errors } = fileRejections[0];
      return (
        <Group position="center" spacing="xl" style={{ minHeight: '220px', pointerEvents: 'none' }}>
          <IconX size="3.2rem" strokeWidth={2} color="#b11f24" />
          <div className="dropzone-message-text" style={{ color: '#b11f24' }}>
            <Text size="xl" inline>
              {' '}
              {errors[0].message}{' '}
            </Text>
          </div>
        </Group>
      );
    }
    if (files.length > 0) {
      return (
        <Group position="center" spacing="xl" style={{ minHeight: '220px', pointerEvents: 'none' }}>
          <IconPhoto size="3.2rem" strokeWidth={2} color="#ffff" />
          <div className="dropzone-message-text" style={{ color: '#ffff' }}>
            <Text size="xl" inline>
              {' '}
              {`${files.length} file${files.length > 1 ? 's' : ''} selected`}
            </Text>
          </div>
        </Group>
      );
    }
    return (
      <Group position="center" spacing="xl" style={{ minHeight: '220px', pointerEvents: 'none' }}>
        <IconUpload size="3.2rem" strokeWidth={2} color="#ffc800" />
        <div className="dropzone-message-text" style={{ color: '#ffc800' }}>
          <Text size="xl" inline>
            {' '}
            Drag and drop some files here, or click to select files
          </Text>
        </div>
      </Group>
    );
  }, [files, fileRejections]);

  // code for changing text of dropzone with icons nad text color and background color

  const handleSave = (value) => {
    formdata.append('video', files);
    formdata.append('Instructions', value.Instructions);
    formdata.append('Module', modalType);

    // code for json stringify formdata
    var object = {};
    formdata.forEach(function (value, key) {
      object[key] = value;
    });
    var json = JSON.stringify(object);
    console.log(json, 'json');
    var parsed = JSON.parse(json);
    console.log(parsed, 'parsed');
    console.log(formdata, 'payload');
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
              <div className="row mb-8">
                url
                <video width="240" height="180" controls>
                  <source
                    src="https://acoegrcstorageprod.blob.core.windows.net/poc/MOYO Chatbot DEMO.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                SAS token
                <video width="240" height="180" controls>
                  <source
                    src="https://acoegrcstorageprod.blob.core.windows.net/poc/MOYO%20Chatbot%20DEMO.mp4?sp=r&st=2023-06-28T12:05:59Z&se=2023-06-28T20:05:59Z&spr=https&sv=2022-11-02&sr=b&sig=QBDBXqS97PaAZfy%2F6WZVY7uNeqgjC9ydVqOKHXXWyUs%3D"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="col-lg-12">
                <div className="row mb-8">
                  <Form.Label className="mt-5">Instructions :</Form.Label>

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

              <div className="col-lg-12">
                <div className="row mt-2">
                  <Form.Label className="mt-2">Instructions Video :</Form.Label>
                </div>
                <div className="row mb-4">
                  <section className="container">
                    <div className="dropZoneContainer" style={style}>
                      <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        {messageWithIconAndColor}
                      </div>
                    </div>
                    <SimpleGrid
                      cols={4}
                      breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                      mt={previews.length > 0 ? 'xl' : 0}
                    >
                      {previews}
                    </SimpleGrid>
                  </section>
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

import React, { useState, useEffect, useCallback } from 'react';
import * as Yup from 'yup';
import { useFormikContext, Formik } from 'formik';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../RepLetterQuestionBank.scss';
import Button from '../../../../MDM/MDM_Tab_Buttons/Button';
import { TextEditor } from '../../../../../components/FormInputs/RichTextEditor/RichTextEditor';
import { Dropzone } from '@mantine/dropzone';
import { Group, Text, Image, SimpleGrid } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import DeleteIcon from '@mui/icons-material/Delete';
import { relativeTimeRounding } from 'moment';
import './Instructions.scss';

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
              {/*Rich text Editor call*/}
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
                  <Dropzone
                    maxFiles={10}
                    //maxSize={1}
                    //multiple
                    onDrop={(files) => {
                      setFiles(files);
                      console.log('accepted files', files);
                    }}
                    onReject={(files) => console.log('rejected files', files)}
                    accept={{
                      'image/*': [], // All images
                      'video/*': ['.mp4', '.avi'], // All videos
                    }}
                    sx={(theme) => ({
                      minHeight: '120px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      border: 0,
                      backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],

                      '&[data-accept]': {
                        color: theme.white,
                        backgroundColor: theme.colors.blue[6],
                      },

                      '&[data-reject]': {
                        color: theme.white,
                        backgroundColor: theme.colors.red[6],
                      },
                    })}
                  >
                    <Group
                      position="center"
                      spacing="xl"
                      style={{ minHeight: '220px', pointerEvents: 'none' }}
                    >
                      <Dropzone.Accept>
                        <IconUpload size="3.2rem" stroke={1.5} color={'#e3af32'} />
                      </Dropzone.Accept>
                      <Dropzone.Reject>
                        <IconX size="3.2rem" stroke={1.5} color={'#e3af32'} />
                      </Dropzone.Reject>
                      <Dropzone.Idle>
                        <IconPhoto size="3.2rem" stroke={1.5} />
                      </Dropzone.Idle>

                      <div>
                        <Text size="xl" inline>
                          Drag file here or click to select files
                        </Text>
                        {/*<Text size="sm" color="dimmed" inline mt={7}>
                      Attach as many files as you like, each file should not exceed 5mb
              </Text>*/}
                      </div>
                    </Group>
                  </Dropzone>
                  <SimpleGrid
                    cols={4}
                    breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                    mt={previews.length > 0 ? 'xl' : 0}
                  >
                    {previews}
                  </SimpleGrid>
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

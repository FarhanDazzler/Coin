// import React, { useState, useEffect, useCallback } from 'react';
// import * as Yup from 'yup';
// import { useFormikContext, Formik } from 'formik';
// import { Form } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
// import '../RepLetterQuestionBank.scss';
// import Button from '../../../../MDM/MDM_Tab_Buttons/Button';
// import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
// import { useDropzone } from 'react-dropzone';
// import { Group, Text, Image, SimpleGrid } from '@mantine/core';
// import { RichTextEditor } from '@mantine/rte';
// import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
// import DeleteIcon from '@mui/icons-material/Delete';
// import './Instructions.scss';
// import { useMemo } from 'react';
// import CustomModal from '../../../../../components/UI/CustomModal';
// import { modifyInstructions } from '../../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankAction';
// import {
//   getInstructionsSelector,
//   modifyInstructionsSelector,
// } from '../../../../../redux/REP_Letters/RL_QuestionBank/RL_QuestionBankSelector';

// const Instructions = ({ setShowModal, modalType }) => {
//   const dispatch = useDispatch();

//   const [ShowVideoModal, setShowVideoModal] = useState(false);
//   const getInstructionsState = useSelector(getInstructionsSelector);
//   const modifyInstructionVal = useSelector(modifyInstructionsSelector);
//   var formdata = new FormData();

//   // Code for File Drop Zone
//   // state to store files
//   const [files, setFiles] = useState([]);

//   // Function to detele file on the basis of file name
//   const handleDeleteFile = useCallback(
//     (fileName) => {
//       const updatedFiles = files.filter((file) => file.name !== fileName);
//       setFiles(updatedFiles);
//     },
//     [files],
//   );

//   const {
//     getRootProps,
//     getInputProps,
//     isDragActive,
//     acceptedFiles,
//     fileRejections,
//     isDragAccept,
//     isDragReject,
//   } = useDropzone({
//     // accept: {
//     //   'image/*': [],
//     // },
//     accept: {
//       'video/mp4': [],
//     },
//     // Specify the file types you want to accept
//     //multiple: true, // Allow multiple file selection
//     multiple: false,
//     //maxFiles:1
//     onDrop: (acceptedFiles) => {
//       setFiles([...files, ...acceptedFiles]);
//     },
//   });

//   // Function to preview files (Thumbnail)
//   const previews = files.map((file, index) => {
//     const imageUrl = URL.createObjectURL(file);
//     return (
//       <div className="previews-block" key={index}>
//         <VideoLibraryIcon />
//         <span className="upload-image-file-name">{file.name}</span>

//         <DeleteIcon
//           className="previews-cancel-icon"
//           size={30}
//           strokeWidth={1.5}
//           color={'#ffc800'}
//           onClick={() => {
//             handleDeleteFile(file.name);
//           }}
//         />
//       </div>
//     );
//   });

//   useEffect(() => {
//     // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
//     return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
//   }, []);

//   // Code for changing background color of dropzone
//   const style = useMemo(
//     () => ({
//       ...(isDragActive ? { backgroundColor: '#ffc800' } : {}),
//       ...(isDragAccept ? { backgroundColor: '#508A3B' } : {}),
//       ...(isDragReject ? { backgroundColor: '#b11f24' } : {}),
//     }),
//     [isDragActive, isDragReject, isDragAccept],
//   );

//   // code for changing text of dropzone with icons nad text color
//   const messageWithIconAndColor = useMemo(() => {
//     if (fileRejections.length > 0) {
//       const { errors } = fileRejections[0];
//       return (
//         <Group position="center" spacing="xl" style={{ minHeight: '220px', pointerEvents: 'none' }}>
//           <IconX size="3.2rem" strokeWidth={2} color="#b11f24" />
//           <div className="dropzone-message-text" style={{ color: '#b11f24' }}>
//             <Text size="xl" inline>
//               {' '}
//               {errors[0].message}{' '}
//             </Text>
//           </div>
//         </Group>
//       );
//     }
//     if (files.length > 0) {
//       return (
//         <Group position="center" spacing="xl" style={{ minHeight: '220px', pointerEvents: 'none' }}>
//           <IconPhoto size="3.2rem" strokeWidth={2} color="#ffff" />
//           <div className="dropzone-message-text" style={{ color: '#ffff' }}>
//             <Text size="xl" inline>
//               {' '}
//               {`${files.length} file${files.length > 1 ? 's' : ''} selected`}
//             </Text>
//           </div>
//         </Group>
//       );
//     }
//     return (
//       <Group position="center" spacing="xl" style={{ minHeight: '220px', pointerEvents: 'none' }}>
//         <IconUpload size="3.2rem" strokeWidth={2} color="#ffc800" />
//         <div className="dropzone-message-text" style={{ color: '#ffc800' }}>
//           <Text size="xl" inline>
//             {' '}
//             Drag and drop some files here, or click to select files
//           </Text>
//         </div>
//       </Group>
//     );
//   }, [files, fileRejections]);

//   // code for changing text of dropzone with icons nad text color and background color

//   const handleSave = (value, resetForm) => {
//     if (value.isAttached === 'Yes') {
//       formdata.append('id', getInstructionsState?.data[0]?.id);
//       formdata.append('isVideoAttached', true);
//       formdata.append('video', files[0]);
//       formdata.append('instructions', value.Instructions);
//       formdata.append('module', modalType);
//     } else {
//       formdata.append('id', getInstructionsState?.data[0]?.id);
//       formdata.append('isVideoAttached', false);
//       formdata.append('instructions', value.Instructions);
//       formdata.append('module', modalType);
//     }

//     dispatch(
//       modifyInstructions({
//         formdata,
//         event: {
//           onSuccess: () => {
//             resetForm();
//           },
//         },
//       }),
//     );
//   };

//   return (
//     <div className="p-5">
//       <Formik
//         enableReinitialize
//         initialValues={{
//           Instructions: getInstructionsState?.data[0]?.instructions || '',
//         }}
//         validationSchema={Yup.object().shape({
//           Instructions: Yup.string().required('Instructions is required'),
//           isAttached: Yup.string().required('Please select do you want to re-upload video?'),
//         })}
//         onSubmit={async (values, { setErrors, setStatus, setSubmitting, resetForm }) => {
//           try {
//             handleSave(values, resetForm);
//             //history.push('/master-data-management/mics-framework');
//           } catch (error) {
//             const message = error.message || 'Something went wrong';
//             setStatus({ success: false });
//             setErrors({ submit: message });
//             setSubmitting(false);
//           }
//         }}
//       >
//         {({
//           errors,
//           handleBlur,
//           handleChange,
//           handleSubmit,
//           isSubmitting,
//           touched,
//           values,
//           setFieldValue,
//         }) => (
//           <Form onSubmit={handleSubmit}>
//             <div className="row">
//               <div className="col-lg-12">
//                 <div className="row mb-8">
//                   <Form.Label className="mt-5">Instructions :</Form.Label>
//                   <RichTextEditor
//                     value={values.Instructions}
//                     onChange={(val) => setFieldValue('Instructions', val)}
//                     placeholder="Provide Instructions here..."
//                     controls={[
//                       ['bold', 'italic', 'underline'],
//                       ['unorderedList', 'h1', 'h2', 'h3'],
//                       ['sup', 'sub'],
//                       ['alignLeft', 'alignCenter', 'alignRight'],
//                     ]}
//                     radius="md"
//                   />
//                   {values.Instructions.length > 5000 && (
//                     <span className="error">
//                       Instructions are not allowed more than 5000 characters
//                     </span>
//                   )}
//                 </div>
//               </div>
//               {getInstructionsState?.data[0]?.url.length > 0 && (
//                 <div className="row">
//                   <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                     <div>
//                       <h5>There is an existing video, Do you want to reupload?</h5>
//                     </div>
//                     <div>
//                       <Button
//                         variant="outlined"
//                         color="secondary"
//                         className="ml-4"
//                         startIcon={<PlayCircleOutlineIcon />}
//                         onClick={(e) => {
//                           setShowVideoModal(true);
//                         }}
//                       >
//                         Video
//                       </Button>
//                     </div>
//                   </div>
//                   <div className="row mb-4">
//                     <div className="col-lg-4">
//                       <Form.Group className="input-group mb-3">
//                         <Form.Control
//                           as="select"
//                           name="isAttached"
//                           placeholder=""
//                           value={values.isAttached}
//                           isInvalid={Boolean(touched.isAttached && errors.isAttached)}
//                           onBlur={handleBlur}
//                           onChange={handleChange}
//                           readOnly={false}
//                           className="form-select"
//                         >
//                           <option value="">Re - Upload</option>
//                           <option value="Yes">Yes</option>
//                           <option value="No">No</option>
//                         </Form.Control>

//                         {!!touched.isAttached && (
//                           <Form.Control.Feedback type="invalid">
//                             {errors.isAttached}
//                           </Form.Control.Feedback>
//                         )}
//                       </Form.Group>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {values.isAttached === 'Yes' && (
//                 <div className="col-lg-12">
//                   <div className="row mt-2">
//                     <Form.Label className="mt-2">Instructions Video :</Form.Label>
//                   </div>
//                   <div className="row mb-4">
//                     <section className="container">
//                       <div className="dropZoneContainer" style={style}>
//                         <div {...getRootProps({ className: 'dropzone' })}>
//                           <input {...getInputProps()} />
//                           {messageWithIconAndColor}
//                         </div>
//                       </div>
//                       <SimpleGrid
//                         cols={4}
//                         breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
//                         mt={previews.length > 0 ? 'xl' : 0}
//                       >
//                         {previews}
//                       </SimpleGrid>
//                     </section>
//                   </div>
//                 </div>
//               )}

//               {getInstructionsState?.data[0]?.url.length == 0 && (
//                 <div className="col-lg-12">
//                   <div className="row mt-2">
//                     <Form.Label className="mt-2">Instructions Video :</Form.Label>
//                   </div>
//                   <div className="row mb-4">
//                     <section className="container">
//                       <div className="dropZoneContainer" style={style}>
//                         <div {...getRootProps({ className: 'dropzone' })}>
//                           <input {...getInputProps()} />
//                           {messageWithIconAndColor}
//                         </div>
//                       </div>
//                       <SimpleGrid
//                         cols={4}
//                         breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
//                         mt={previews.length > 0 ? 'xl' : 0}
//                       >
//                         {previews}
//                       </SimpleGrid>
//                     </section>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="footer-action">
//               <div className="d-flex align-items-center justify-content-end">
//                 <div>
//                   <Button
//                     variant="outlined"
//                     color="secondary"
//                     onClick={() => {
//                       setShowModal(false);
//                     }}
//                     disabled={modifyInstructionVal.loading}
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     color="neutral"
//                     className="ml-4"
//                     onClick={handleSubmit}
//                     loading={modifyInstructionVal.loading}
//                   >
//                     Confirm
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </Form>
//         )}
//       </Formik>
//       <CustomModal
//         className="add-org"
//         open={ShowVideoModal}
//         onClose={() => {
//           setShowVideoModal(false);
//         }}
//         width={800}
//         title={'Instructions Video'}
//         bodyClassName="p-0"
//       >
//         <video width="800" height="500" controls className="p-2">
//           <source src={getInstructionsState?.data[0]?.sass_token} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       </CustomModal>
//     </div>
//   );
// };

// export default Instructions;

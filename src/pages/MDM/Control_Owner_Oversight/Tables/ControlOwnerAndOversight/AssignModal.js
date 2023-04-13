import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormikContext, Formik, Field } from 'formik';
import { Alert, Form } from 'react-bootstrap';
import CustomModal from '../../../../../components/UI/CustomModal';
import Button from '../../../MDM_Tab_Buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addOrgStructureAction, getParentEntityAction, updateOrgStructureAction } from '../../../../../redux/MDM/MDM_Action';
import { getParentEntitySelector } from '../../../../../redux/MDM/MDM_Selectors';
import { getUserFromAD } from '../../../../../redux/AzureAD/AD_Action';
import { getUserFromADSelector } from '../../../../../redux/AzureAD/AD_Selectors';
import moment from 'moment';
import useDebounce from '../../../../../hooks/useDebounce';
import MyStatefulEditor from '../../../../../components/FormInputs/RichTextEditor';

const AssignModal = ({ setShowModal, assignTableData }) => {
    const dispatch = useDispatch();
    const [qId2Value, setQId2Value] = useState('');
    const q_id_2_debounce = useDebounce(qId2Value, 500);
    const [showModal, setShowModalRichText] = useState(false);
    // Handel Rich Text Editor POP up close
    const handleSubmitRichText = () => {
        setShowModalRichText('');
    };
    const [lcdValue, setLcdValue] = useState('');

    const onChangeMicsL1Desc = (value) => {
        switch (showModal) {
            case 'local_control_description':
                return setLcdValue(value);
        }
    };
    useEffect(() => {
        dispatch(getUserFromAD({ username: qId2Value }));
    }, [q_id_2_debounce]);
    const stateAzureAd = useSelector(getUserFromADSelector)
    console.log(stateAzureAd)
    console.log(assignTableData)
    const handleSaveAssign = (value) => {
        console.log(value);

    }
    let today = moment().format('YYYY-MM-DD');
    let validToDate = "9999-12-31"
    console.log(validToDate);
    return (
        <>
            {
                assignTableData.map((data, i) => (
                    <div className="p-5 assign-modal">
                        <div className="row">
                            <div className="col-md-6">
                                <div className='row mb-4'>
                                    <div className="col-md-5">
                                        <Form.Label>Control Id</Form.Label>
                                    </div>
                                    <div className="col-md-7">
                                        <p>{data?.Control_ID}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className='row mb-4'>
                                    <div className="col-md-5">
                                        <Form.Label>Zone</Form.Label>
                                    </div>
                                    <div className="col-md-7">
                                        <p>{data?.zone}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className='row mb-4'>
                                    <div className="col-md-5">
                                        <Form.Label>Provider Entity</Form.Label>
                                    </div>
                                    <div className="col-md-7">
                                        <p>{data?.provider_entity}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />

                        <Formik
                            enableReinitialize
                            initialValues={{

                                cowner: data?.cowner ? data?.cowner : '',
                                coversight: data?.coversight ? data?.coversight : '',
                                local_control_description: data?.local_control_description ? data?.local_control_description : lcdValue ? lcdValue : '',
                                validFrom: data?.Valid_from ? data?.Valid_from : today ? today : '',
                                validTo: data?.Valid_to ? data?.Valid_to : validToDate ? validToDate : ''

                            }}
                            validationSchema={Yup.object().shape({

                                cowner: Yup.string()
                                    .required('cowner is required'),
                                coversight: Yup.string()
                                    .required('coversight is required'),
                                validFrom: Yup.string()
                                    .required('Valid Date is required'),
                                validTo: Yup.string()
                                    .required('Valid Date is required'),
                                local_control_description: Yup.string()
                                    .required('LCD is required'),
                            })}
                            onSubmit={async (
                                values,
                                { setErrors, setStatus, setSubmitting, resetForm }
                            ) => {
                                try {
                                    handleSaveAssign(values);

                                    // resetForm();
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
                                        <MyStatefulEditor
                                            markup=""
                                            onChange={onChangeMicsL1Desc}
                                            setShowModal={setShowModalRichText}
                                            showModal={showModal}
                                            handleSubmit={handleSubmitRichText}
                                        />
                                        <div className="col-lg-6">
                                            <div className='row mb-4'>
                                                <div className="col-lg-5">
                                                    <Form.Label>LCD</Form.Label>
                                                </div>
                                                <div className="col-lg-7">
                                                    <Form.Group className="input-group mb-3">

                                                        <Form.Control
                                                            type="text"
                                                            name="local_control_description"
                                                            placeholder=""
                                                            value={values.local_control_description}
                                                            isInvalid={Boolean(
                                                                touched.local_control_description && errors.local_control_description
                                                            )}
                                                            onBlur={handleBlur}
                                                            onClick={(data) => {
                                                                setShowModalRichText('local_control_description');
                                                            }}
                                                            onChange={handleChange}
                                                            readOnly={false}
                                                            className="form-control"
                                                        />

                                                        {!!touched.local_control_description && (
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.local_control_description}
                                                            </Form.Control.Feedback>
                                                        )}
                                                    </Form.Group>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className='row mb-4'>
                                                <div className="col-lg-5">
                                                    <Form.Label>Control Owner</Form.Label>
                                                </div>
                                                <div className="col-lg-7">
                                                    <Form.Group className="input-group mb-3">
                                                        <Form.Control
                                                            type="text"
                                                            name="cowner"
                                                            placeholder="cowner"
                                                            value={values.cowner}
                                                            isInvalid={Boolean(
                                                                touched.cowner && errors.cowner
                                                            )}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            readOnly={false}
                                                            className="form-control"
                                                        />
                                                            

                                                        {!!touched.cowner && (
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.cowner}
                                                            </Form.Control.Feedback>
                                                        )}

                                                    </Form.Group>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className='row mb-4'>
                                                <div className="col-lg-5">
                                                    <Form.Label>Control Oversight</Form.Label>
                                                </div>
                                                <div className="col-lg-7">
                                                    <Form.Group className="input-group mb-3">

                                                        <Form.Control
                                                            type="text"
                                                            name="coversight"
                                                            placeholder=""
                                                            value={values.coversight}
                                                            isInvalid={Boolean(
                                                                touched.coversight && errors.coversight
                                                            )}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            readOnly={false}
                                                            className="form-control"
                                                        />

                                                        {!!touched.coversight && (
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.coversight}
                                                            </Form.Control.Feedback>
                                                        )}
                                                    </Form.Group>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className='row mb-4'>
                                                <div className="col-lg-5">
                                                    <Form.Label>Valid From</Form.Label>
                                                </div>
                                                <div className="col-lg-7">
                                                    <Form.Group className="input-group mb-3">

                                                        <Form.Control
                                                            type="date"
                                                            name="validFrom"
                                                            placeholder=""
                                                            value={values.validFrom}
                                                            isInvalid={Boolean(
                                                                touched.validFrom && errors.validFrom
                                                            )}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            readOnly={true}
                                                            className="form-control"
                                                        />

                                                        {!!touched.validFrom && (
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.validFrom}
                                                            </Form.Control.Feedback>
                                                        )}
                                                    </Form.Group>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className='row mb-4'>
                                                <div className="col-lg-5">
                                                    <Form.Label>Valid To</Form.Label>
                                                </div>
                                                <div className="col-lg-7">
                                                    <Form.Group className="input-group mb-3">

                                                        <Form.Control
                                                            type="date"
                                                            name="validTo"
                                                            placeholder=""
                                                            value={values.validTo}
                                                            isInvalid={Boolean(
                                                                touched.validTo && errors.validTo
                                                            )}
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            readOnly={true}
                                                            className="form-control"
                                                        />

                                                        {!!touched.validTo && (
                                                            <Form.Control.Feedback type="invalid">
                                                                {errors.validTo}
                                                            </Form.Control.Feedback>
                                                        )}
                                                    </Form.Group>
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                    <div className="footer-action">
                                        <div className="d-flex align-items-center justify-content-end">

                                            <div>
                                                <Button variant="outlined" color="secondary" onClick={() => setShowModal(false)}>
                                                    Cancel
                                                </Button>
                                                <Button
                                                    color="neutral"
                                                    className="ml-4"
                                                    onClick={handleSubmit}

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
                ))
            }
        </>

    )
}

export default AssignModal;
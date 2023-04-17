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
import { TextEditor } from '../../../../../components/FormInputs/RichTextEditor/RichTextEditor';
import { modifyControlOwnerAndOversight } from '../../../../../redux/MDM/MDM_Action';
import InputWidthSelect from '../../../../../components/UI/InputWidthSelect/InputWidthSelect';
import AdSearch from './AdSearch';
import { isEmailValidADSelector } from '../../../../../redux/AzureAD/AD_Selectors';

const GetParentEntityValue = ({ setCownerValue }) => {
    // Grab values and submitForm from context
    const { values } = useFormikContext();
    useEffect(() => {
        
    }, [values]);
    return null;
};

const AssignModal = ({ setShowModal, assignTableData }) => {
    const dispatch = useDispatch();
    const [cownerValue, setCownerValue] = useState('');
    const [coversightValue, setCoversightValue] = useState('');
    const [adMode, setAdMode] = useState("");
    const isEmailValidADState = useSelector(isEmailValidADSelector);
    const cownerValue_debounce = useDebounce(cownerValue, 500);
    const coversightValue_debounce = useDebounce(coversightValue, 500);
    const [showModal, setShowModalRichText] = useState(false);
    // Handel Rich Text Editor POP up close
    const handleSubmitRichText = () => {
        setShowModalRichText('');
    };
    const [lcdValue, setLcdValue] = useState('');
    const [isStart, setIsStart] = useState(false);
    const [block, setBlock] = useState()
    useEffect(() => {

    }, [isEmailValidADState.data])
    useEffect(() => {
        dispatch(getUserFromAD({ username: cownerValue }));
    }, [cownerValue_debounce]);
    useEffect(() => {
        dispatch(getUserFromAD({ username: coversightValue }));
    }, [coversightValue_debounce]);
    const userFromAD = useSelector(getUserFromADSelector);

    useEffect(() => {
        if (userFromAD.loading) return;
        const apiUserData = userFromAD.data || [];
       
        const userData = apiUserData.map((d) => ({ value: d.mail, label: d.displayName }));
        const updateAnsObj = { dropDownOption: userData, loading: false }
        setBlock(updateAnsObj)

    }, [userFromAD.data]);
    const handleSaveAssign = (value) => {
        const payload = {
            "control_instances": value?.assignTableData
        }
        dispatch(modifyControlOwnerAndOversight(payload));


    }
    const handleChangeAd = (value, mode) => {
        if (mode === "cowner") {
            setAdMode("cowner")
        } else {
            setAdMode("coversight")
        }
        setBlock({ dropDownOption: [], loading: true })
    }
    return (
        <>
            <div className="p-5 assign-modal">
                <Formik
                    enableReinitialize
                    initialValues={{

                        assignTableData

                    }}
                    validationSchema={Yup.object().shape({
                        // assignTableData: Yup.array()
                        //     .of(
                        //         Yup.object().shape({
                        //             local_control_description: Yup.string().required('LCD Required'),
                        //             cowner: Yup.string().required('cowner Required'),
                        //         })
                        //     )

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
                        <>
                            <Form onSubmit={handleSubmit}>
                                {
                                    assignTableData.map((data, i) => (
                                        <div key={i}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className='row mb-4'>
                                                        <div className="col-md-3">
                                                            <Form.Label>Control Id:</Form.Label>
                                                        </div>
                                                        <div className="col-md-7 yellow-gradient-text" style={{ fontSize: "0.875rem", fontWeight: "900" }}>
                                                            <p>{data?.control_id_provider_entity}</p>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                            <hr />

                                            <div className="row">
                                                {/*Rich text Editor call*/}
                                                <div className="col-lg-12">
                                                    <div className='row mb-4'>
                                                        <div className="col-lg-12">
                                                            <Form.Label>LCD</Form.Label>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <Form.Group className="input-group mb-3">
                                                                <TextEditor
                                                                    setFieldValue={(val) => setFieldValue(`assignTableData[${i}].local_control_description`, val)}
                                                                    value={values.assignTableData[i].local_control_description}
                                                                />
                                                            </Form.Group>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div className='row mb-4'>
                                                        <div className="col-lg-4">
                                                            <Form.Label>Control Owner</Form.Label>
                                                        </div>
                                                        <div className="col-lg-8">
                                                            <Form.Group className="input-group mb-3">
                                                                <Form.Control
                                                                    type="text"
                                                                    name={`assignTableData[${i}].cowner`}
                                                                    placeholder="cowner"
                                                                    value={values.assignTableData[i].cowner}
                                                                    isInvalid={Boolean(
                                                                        touched.cowner && errors.cowner
                                                                    )}
                                                                    onBlur={handleBlur}
                                                                    //setFieldValue={(val) => setFieldValue(`assignTableData[${i}].cowner`, val)}
                                                                    onChange={(e) => {
                                                                        setFieldValue(`assignTableData[${i}].cowner`, e.target.value)
                                                                        setCownerValue(e.target.value)
                                                                        handleChangeAd(e.target.value, 'cowner')
                                                                    }}
                                                                    readOnly={false}
                                                                    className="form-control"
                                                                />


                                                                {!!touched.cowner && (
                                                                    <Form.Control.Feedback type="invalid">
                                                                        {errors.cowner}
                                                                    </Form.Control.Feedback>
                                                                )}

                                                            </Form.Group>
                                                            {
                                                                adMode === "cowner" &&
                                                                <AdSearch

                                                                    block={block}
                                                                    userApiStart={isStart}
                                                                    values={values.assignTableData[i].cowner}
                                                                    setBlock={setBlock}
                                                                    setFieldValue={(val) => {
                                                                        if(!val) return
                                                                        setFieldValue(`assignTableData[${i}].cowner`, val)
                                                                    }}
                                                                />
                                                            }



                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div className='row mb-4'>
                                                        <div className="col-lg-4">
                                                            <Form.Label>Control Oversight</Form.Label>
                                                        </div>
                                                        <div className="col-lg-8">
                                                            <Form.Group className="input-group mb-3">

                                                                <Form.Control
                                                                    type="text"
                                                                    name={`assignTableData[${i}].coversight`}
                                                                    placeholder=""
                                                                    value={values.assignTableData[i].coversight}
                                                                    isInvalid={Boolean(
                                                                        touched.coversight && errors.coversight
                                                                    )}
                                                                    onBlur={handleBlur}
                                                                    onChange={(e) => {
                                                                        setFieldValue(`assignTableData[${i}].coversight`, e.target.value)
                                                                        setCoversightValue(e.target.value)
                                                                        handleChangeAd(e.target.value, 'coversight')
                                                                    }}
                                                                    readOnly={false}
                                                                    className="form-control"
                                                                />

                                                                {!!touched.coversight && (
                                                                    <Form.Control.Feedback type="invalid">
                                                                        {errors.coversight}
                                                                    </Form.Control.Feedback>
                                                                )}
                                                            </Form.Group>
                                                            {
                                                                adMode === "coversight" && 
                                                                <AdSearch
                                                                
                                                                block={block}
                                                                userApiStart={isStart}
                                                                values={values.assignTableData[i].coversight}
                                                                setBlock={setBlock}
                                                                setFieldValue={(val) => {
                                                                    if(!val) return
                                                                    setFieldValue(`assignTableData[${i}].coversight`, val)
                                                                }}
                                                            />
                                                            }
                                                            
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>

                                        </div>

                                    ))
                                }
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
                                {/* <GetParentEntityValue setCownerValue={setCownerValue} /> */}
                            </Form>
                        </>

                    )}
                </Formik>
            </div>
        </>

    )
}

export default AssignModal;
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Field } from 'formik';
import { Alert, Form } from 'react-bootstrap';
import CustomModal from '../../../../../components/UI/CustomModal';
import Button from '../../../MDM_Tab_Buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addOrgStructureAction } from '../../../../../redux/MDM/MDM_Action';
import moment from 'moment';

const OrgStructureModal = ({ setShowModal }) => {
    const dispatch = useDispatch();
    const [isProviderValue, setIsProviderValue] = useState("");
    const [isReceiverValue, setIsReceiverValue] = useState("");
    const [categoryValue, setCategoryValue] = useState("");
    const orgTypeData = [
        {
            value: "Zone",
            label: "Zone"
        },
        {
            value: "BU",
            label: "BU"
        },
        {
            value: "Country",
            label: "Country"
        },
        {
            value: "Cognos",
            label: "Cognos"
        },
        {
            value: "SAP",
            label: "SAP"
        },
        {
            value: "Plant",
            label: "Plant"
        },
    ]

    const parentEntityData = [
        {
            value: "Global",
            label: "Global"
        },
        {
            value: "AFR",
            label: "AFR"
        },
        {
            value: "EUR",
            label: "EUR"
        },
        {
            value: "AFR - South East Africa",
            label: "AFR - South East Africa"
        },
        {
            value: "EUR - BNFL",
            label: "EUR - BNFL"
        },
        {
            value: "Mozambique",
            label: "Mozambique"
        },
        {
            value: "France",
            label: "France"
        },
        {
            value: "CE_MZ3812",
            label: "CE_MZ3812"
        },
        {
            value: "CE_FR0001",
            label: "CE_FR0001"
        },
        {
            value: "SC_Syspro_MZ",
            label: "SC_Syspro_MZ"
        },
        {
            value: "SC_ERP_FR11",
            label: "SC_ERP_FR11"
        },
        {
            value: "EUR - Service Centers",
            label: "EUR - Service Centers"
        },

    ]


    const handleSaveAdd = (value) => {
        console.log(value);

        let payload = {
            "Org_type": value.orgType,
            "Org_name": value.Org_name,
            "parent_entity": value.parentEntity,
            "isReceiver": isReceiverValue,
            "isProvider": isProviderValue,
            "Category": value.orgType === "Zone" ? categoryValue : value.Category,
            "Valid_from": value.validFrom,
            "Valid_to": value.validTo
        }
        if (value.orgType === "BU" || value.orgType === "Country"
            && value.parentEntity.slice(0, 2) === "SC") {
                payload.isProvider = "Yes"
            setIsReceiverValue("No");
            setIsProviderValue("Yes")
        } else if (value.orgType === "Zone") {
            setCategoryValue("N/A");
            setIsProviderValue("N/A");
            setIsReceiverValue("N/A");
        } else if (value.parentEntity && value.parentEntity.slice(0, 2) !== "SC") {
            setIsReceiverValue("Yes");
            setIsProviderValue("Yes")
        }
        dispatch(addOrgStructureAction(payload))
    }
    let today = moment().format('YYYY-MM-DD');
    let validToDate = "9999-12-31"
    console.log(validToDate);
    return (
        <div className="p-5">
            <Formik
                enableReinitialize
                initialValues={{
                    orgType: '',
                    parentEntity: '',
                    isReceiver: '',
                    isProvider: '',
                    Category: '',
                    Org_name: '',
                    validFrom: today ? today : '',
                    validTo: validToDate ? validToDate : ''
                }}
                validationSchema={Yup.object().shape({
                    orgType: Yup.string()
                        .required('Organization Type is required'),
                    parentEntity: Yup.string()
                        .required('Parent Entity is required'),
                    // isReceiver: Yup.string()
                    //     .required('isReceiver is required'),
                    // isProvider: Yup.string()
                    //     .required('isProvider is required'),
                    // Category: Yup.string()
                    //     .required('Category is required'),
                    validFrom: Yup.string()
                        .required('Valid Date is required'),
                    validTo: Yup.string()
                        .required('Valid Date is required'),
                    Org_name: Yup.string()
                        .required('Organization Name is required'),
                })}
                onSubmit={async (
                    values,
                    { setErrors, setStatus, setSubmitting, resetForm }
                ) => {
                    try {
                        handleSaveAdd(values);
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
                            <div className="col-lg-6">
                                <div className='row mb-4'>
                                    <div className="col-lg-5">
                                        <Form.Label>Organization Name</Form.Label>
                                    </div>
                                    <div className="col-lg-7">
                                        <Form.Group className="input-group mb-3">

                                            <Form.Control
                                                type="text"
                                                name="Org_name"
                                                placeholder=""
                                                value={values.Org_name}
                                                isInvalid={Boolean(
                                                    touched.Org_name && errors.Org_name
                                                )}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                readOnly={false}
                                                className="form-control"
                                            />

                                            {!!touched.Org_name && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.Org_name}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className='row mb-4'>
                                    <div className="col-lg-5">
                                        <Form.Label>Organization Type</Form.Label>
                                    </div>
                                    <div className="col-lg-7">
                                        <Form.Group className="input-group mb-3">

                                            <Form.Control
                                                as="select"
                                                name="orgType"
                                                placeholder=""
                                                value={values.orgType}
                                                isInvalid={Boolean(
                                                    touched.orgType && errors.orgType
                                                )}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                readOnly={false}
                                                className="form-select"
                                            >
                                                <option value="">Select Organization Type</option>
                                                {
                                                    orgTypeData.map((data, i) => (
                                                        <option value={data?.value} key={i}>
                                                            {data?.label}
                                                        </option>
                                                    ))
                                                }

                                            </Form.Control>

                                            {!!touched.orgType && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.orgType}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className='row mb-4'>
                                    <div className="col-lg-5">
                                        <Form.Label>Parent Entity</Form.Label>
                                    </div>
                                    <div className="col-lg-7">
                                        <Form.Group className="input-group mb-3">

                                            <Form.Control
                                                as="select"
                                                name="parentEntity"
                                                placeholder=""
                                                value={values.parentEntity}
                                                isInvalid={Boolean(
                                                    touched.parentEntity && errors.parentEntity
                                                )}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                readOnly={false}
                                                className="form-select"
                                            >
                                                <option value="">Select Parent Entity</option>
                                                {
                                                    parentEntityData.map((data, i) => (
                                                        <option value={data?.value} key={i}>
                                                            {data?.label}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                            {values.parentEntity}

                                            {!!touched.parentEntity && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.parentEntity}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className='row mb-4'>
                                    <div className="col-lg-5">
                                        <Form.Label>isReceiver</Form.Label>
                                    </div>
                                    <div className="col-lg-7">
                                        <Form.Group className="input-group mb-3">
                                            <Form.Control
                                                type="text"
                                                name="isReceiver"
                                                placeholder="Select Receiver"
                                                value={
                                                    values.orgType === "BU" || values.orgType === "Country"
                                                        && values.parentEntity.slice(0, 2) === "SC" ?
                                                        "No" :
                                                        values.orgType === "Zone" ?
                                                            "N/A"
                                                            : values.parentEntity && values.parentEntity.slice(0, 2) !== "SC" ?
                                                                "Yes" :
                                                                ""


                                                }
                                                isInvalid={Boolean(
                                                    touched.isReceiver && errors.isReceiver
                                                )}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                readOnly={true}
                                                className="form-control"
                                            />

                                            <span>{values.isReceiver}</span>

                                            {!!touched.isReceiver && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.isReceiver}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className='row mb-4'>
                                    <div className="col-lg-5">
                                        <Form.Label>isProvider</Form.Label>
                                    </div>
                                    <div className="col-lg-7">
                                        <Form.Group className="input-group mb-3">
                                            <Form.Control
                                                type="text"
                                                name="isProvider"
                                                placeholder=""
                                                value={
                                                    values.orgType === "BU" ||
                                                        values.orgType === "Country" && values.parentEntity.slice(0, 2) === "SC" ?
                                                        "Yes" :
                                                        values.orgType === "Zone" ?
                                                            "N/A"
                                                            : values.parentEntity && values.parentEntity.slice(0, 2) !== "SC" ?
                                                                "Yes" :
                                                                ""
                                                }
                                                isInvalid={Boolean(
                                                    touched.isProvider && errors.isProvider
                                                )}
                                                onBlur={handleBlur}
                                                onChange={(e) => setIsProviderValue(e.target.value)}
                                                readOnly={false}
                                                className="form-control"
                                            />


                                            {!!touched.isProvider && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.isProvider}
                                                </Form.Control.Feedback>
                                            )}

                                        </Form.Group>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <div className='row mb-4'>
                                    <div className="col-lg-5">
                                        <Form.Label>Category</Form.Label>
                                    </div>
                                    <div className="col-lg-7">
                                        <Form.Group className="input-group mb-3">

                                            <Form.Control
                                                as="select"
                                                name="Category"
                                                placeholder=""
                                                value={values.Category}
                                                isInvalid={Boolean(
                                                    touched.Category && errors.Category
                                                )}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                readOnly={false}
                                                className="form-select"
                                            >

                                                {
                                                    values.orgType === "Zone" ?
                                                        <option value="N/A">N/A</option> :
                                                        <>
                                                            <option value="">Select Category</option>
                                                            <option value="Off-Shore">Off-Shore</option>
                                                            <option value="On-Shore">On-Shore</option>
                                                            <option value="N/A">N/A</option>
                                                        </>
                                                }

                                            </Form.Control>

                                            {!!touched.Category && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.Category}
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
                                                readOnly={false}
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
                                                readOnly={false}
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
    )
}

export default OrgStructureModal;
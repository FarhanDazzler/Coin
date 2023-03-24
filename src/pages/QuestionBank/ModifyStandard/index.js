import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import './ModifyStandard.scss';
import CustomModal from '../../../components/UI/CustomModal';
import QuestionsWithAction from '../../../components/UI/QuestionsWithAction';
import info from './../../../assets/images/Info-Circle.svg'
// import Button from '../../../components/UI/Button';
import { Button } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { names } from '../CreateQuestions/constant';
import {
    addSection3Questions,
    deleteSection3Questions,
    getSection3Questions,
    updateSection3Questions,
} from '../../../redux/Questions/QuestionsAction';
import { questionSelector } from '../../../redux/Questions/QuestionsSelectors';
import { Loader } from 'semantic-ui-react';
import Swal from 'sweetalert2';
import { getSection1QuestionDataAction } from '../../../redux/QuestionBank/QuestionBankAction';
import AddSection1Questions from './AddSection1Question';


const ModifyStandard = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const section1Questions = useSelector((state) => state?.section1QuestionData?.section1GetQuestion?.data)
    const AddQuestionSuccess = useSelector((state) => state?.section1QuestionData?.section1AddQuestion)
    console.log(AddQuestionSuccess);
    console.log(section1Questions);
    const [section1QuestionsData, setection1QuestionsData] = useState([])
    const [template_ID, setTemplate_ID] = useState("Standard");
    const [showAddQuestion, setShowAddQuestion] = useState(false);
    const [template2_id, setTemplate2_ID] = useState("");
    const [selectContrilId, setSelectControlId] = useState(false);
    const [valueType, setValueType] = useState()

    const handleChange = (event) => {
        setTemplate_ID(event.target.value);
        
    };

    useEffect(() => {
        let payload = {
            controlId: template_ID
        }
        dispatch(getSection1QuestionDataAction(payload))
    }, [template_ID, AddQuestionSuccess])
    useEffect(() => {
        if (section1Questions.length > 0) {
            console.log("hh", section1Questions);
            setection1QuestionsData(section1Questions);
        } else {
            setection1QuestionsData([])
        }

    }, [section1Questions, template_ID])

    const TemplateOptions = [
        { label: 'Template1', value: 'Standard' },
        { label: 'Template2', value: 'ATR_ACCR_01a' },

    ];
    useEffect(() => {
        if(AddQuestionSuccess?.success){
            console.log("success")
            setShowAddQuestion(false);
        }
    }, [AddQuestionSuccess])

    const handleAddQuestionClose = () => {
        setShowAddQuestion(false);
    }
    const handleChangeRenderBlock = (value, data) => {
        if (value === 'delete') {
          console.log(data);
          setValueType('delete')
        }else if(value === 'edit'){
            setValueType('edit')
        }else {
            setValueType();
        }
       
      };

    return (
        <div>
            <CustomModal
                className='modify-standard'
                open={open}
                title={
                    <span>

                        Modify Questions for Existing MICS
                    </span>
                }
                width={1080}
                onClose={handleClose}
            >
                <div className='buttons'>
                    <Button
                        styles={(theme) => ({
                            root: {
                                backgroundColor: '#F2C94C',
                            },
                        })}>
                        Standard
                    </Button>
                    <span>&nbsp; &nbsp; &nbsp; </span>
                    <Button variant="default">
                        MICS-Specific
                    </Button>
                </div>
                <div className="select-light row">
                    <div className="col-md-3">
                        <Form.Group className="input-group mb-3">
                            <Form.Control
                                as="select"
                                name="template"
                                placeholder=""
                                value={template_ID}
                                className="form-select"
                                onChange={handleChange}
                            >
                                <option value="Standard">Template1</option>
                                <option value="ATR_ACCR_01a">Template2</option>
                            </Form.Control>
                        </Form.Group>
                    </div>

                    {
                        selectContrilId ?
                            <div className="col-md-3">
                                <Form.Group className="input-group mb-3">
                                    <Form.Control
                                        as="select"
                                        name="template"
                                        placeholder="Select Control Id"
                                        value={template_ID}
                                        className="form-select"
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Control ID</option>
                                        {
                                            names.map((data, i) => (
                                                <option key={i} value={data.value}>{data.label}</option>
                                            ))
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </div>
                            : ""
                    }
                </div>
                <div className='note'>
                    <p><span><img src={info} /></span>Any modifications to Standard Questions will reflect in all Assessments & Surveys.</p>
                </div>

                <div className="questions-list-main-wrapper">

                    <div className="pt-5">
                        {section1QuestionsData.map((data, i) => (
                            <QuestionsWithAction number={i + 1} text={data.question_text} withAction={true} active={true} data={data} handleChange={handleChangeRenderBlock} />
                        ))}
                        {
                            section1QuestionsData.length == 0 && (
                                <p>No Question Found</p>
                            )
                        }
                    </div>




                    <div className='d-flex align-items-center justify-content-between'>
                        <div>
                            <Button
                                color="secondary"
                                variant="default"
                                onClick={() => setShowAddQuestion(true)}
                            >
                                Add Question
                            </Button>

                        </div>
                        <div className="d-flex align-items-center justify-content-end">
                            <Button variant='subtle' onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button
                                color="secondary"
                                variant="default"
                                className="ml-2"

                            >
                                Save as Draft
                            </Button>
                        </div>
                    </div>
                </div>
            </CustomModal>
            <AddSection1Questions controlId={template_ID} open={showAddQuestion} handleClose={handleAddQuestionClose} />
        </div>
    );
};

export default ModifyStandard;

import React, { useState, useEffect } from "react";
import CustomModal from '../../../components/UI/CustomModal';
import { Button } from '@mantine/core';
import { Form } from 'react-bootstrap';
import './ModifyStandard.scss';
import { addSection1OptionDataAction, addSection1QuestionDataAction } from "../../../redux/QuestionBank/QuestionBankAction";
import { useDispatch, useSelector } from 'react-redux';


const AddSection1Questions = ({ open, handleClose, type, controlId }) => {
    
    const dispatch = useDispatch();
    const [questionText, setQuestionText] = useState("")
    const [questionType, setQuestionType] = useState()
    const [createOptions, setCreateOptions] = useState([
        {
            q_id: '',
            option_value: "",
            child_question: "",
            is_Terminating: null
        }
    ])
    useEffect(() => {
        setQuestionText("");
        setQuestionType();
    }, [open])
  
    console.log(createOptions);
    const handleAddSubmit = () => {
        let payload = {
            Control_ID: controlId,
            question_text: questionText,
            question_type: questionType,
            parent_qid: 0
        }
        dispatch(addSection1QuestionDataAction(payload));
    }
    const handleEditSubmitQuestion = () => {
       
    }
    const QuestionType = [
        { label: 'Radio', value: 'Radio' },
        { label: 'Text', value: 'Free Text' },
        { label: 'Dropdown', value: 'Dropdown'}
    ]
    return (
        <div>
            <CustomModal
                className='modify-standard create-question'
                title={
                    <div className="d-flex align-items-center ">
                        Add Question
                    </div>
                }
                open={open}
                onClose={handleClose}
                width={900}
            >
                

                        <div className="row">
                            <div className="col-md-9">
                                <label>Question</label>
                                <Form.Group className="input-group mb-3">
                                    <Form.Control
                                        type="text"
                                        name=""
                                        placeholder="Question Text"
                                        className="form-control"
                                        value={questionText}
                                        onChange={(e) => setQuestionText(e.target.value)}
                                    />


                                </Form.Group>
                            </div>
                            <div className="col-md-3">
                                <label>&nbsp;</label>
                                <Form.Group className="input-group mb-3">
                                    <Form.Control
                                        as="select"
                                        name=""
                                        placeholder=""
                                        className="form-select"
                                        onChange={(e) => setQuestionType(e.target.value)}
                                    >
                                        <option value="">Select Question Type</option>
                                        {
                                            QuestionType.map((data, i) => (
                                                <option value={data?.value} key={i}>
                                                    {data?.label}
                                                </option>
                                            ))
                                        }

                                    </Form.Control>

                                </Form.Group>
                            </div>

                        </div>
                      
                {/* Radio Options */}
                {/* {
                    questionType === "Radio" && (
                        <div className="radio">
                            {
                                createOptions.map((data, i) => (
                                    <>
                                        <div className="row">
                                            <div className="col-md-4">

                                                <Form.Group className="input-group mb-3">
                                                    <Form.Control
                                                        type="text"
                                                        name="option_value"
                                                        placeholder={"Option " + (i + 1)}
                                                        className="form-control"
                                                        value={data.option_value}
                                                        onChange={(e) => handleOptionsChange(i, e)}
                                                    />


                                                </Form.Group>
                                            </div>
                                            {
                                                data.option_value && (
                                                    <div className="col-md-3">
                                                        <Form.Group className="input-group mb-3">
                                                            <Form.Control
                                                                as="select"
                                                                name="is_Terminating"
                                                                placeholder=""
                                                                className="form-select"
                                                                value={data.is_Terminating}
                                                                onChange={(e) => handleOptionsChange(i, e)}
                                                            >
                                                                <option value="">Is Terminating</option>
                                                                <option value="0">No</option>
                                                                <option value="1">Yes</option>

                                                            </Form.Control>

                                                        </Form.Group>
                                                    </div>
                                                )

                                            }

                                            {
                                                data.is_Terminating == 0 && (
                                                    <div className="col-md-3">
                                                        <Form.Group className="input-group mb-3">
                                                            <Form.Control
                                                                as="select"
                                                                name="child_question"
                                                                placeholder=""
                                                                className="form-select"
                                                                value={data.child_question}
                                                                onChange={(e) => handleOptionsChange(i, e)}
                                                            >
                                                                <option value="">Child Question</option>
                                                                <option value="0">Child Question 1</option>
                                                                <option value="1">Child Question 2</option>

                                                            </Form.Control>

                                                        </Form.Group>
                                                    </div>
                                                )
                                            }
                                            <div className="col-md-1">
                                                {
                                                    i ?
                                                        <span className="remove" onClick={() => handleRemoveRadioOption(i)}>X</span>
                                                        : null
                                                }
                                            </div>


                                        </div>


                                    </>


                                ))
                            }
                            <Button disabled={createOptions.length == 4 ? true : false} onClick={() => handleAddRadioOption()}>Add Options</Button>
                        </div>
                    )
                } */}


                <div className="position-absolute">
                    <div className='d-flex align-items-center justify-content-end'>


                        <Button variant='subtle' onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            color="secondary"
                            variant="default"
                            className="ml-2"
                            disabled={!questionText || !questionType}
                            onClick={() => handleAddSubmit()}
                        >
                            Add
                        </Button>
                    </div>
                </div>


            </CustomModal>

        </div>
    )
}

export default AddSection1Questions;
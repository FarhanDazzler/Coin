import React, { useEffect, useState } from 'react';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { Form } from 'react-bootstrap';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import './ModifyStandard.scss';
import { levels, names, questions, tableHeader } from './../CreateQuestions/constant';
import { ReactComponent as ExportExcel } from '../../../assets/images/ExportExcel.svg';
import { ReactComponent as UploadFile } from '../../../assets/images/UploadFile.svg';
import blockType from '../../../components/RenderBlock/constant';
import { getFormatQuestions, getQuestionsFormatData } from '../../../utils/helper';
import CustomModal from '../../../components/UI/CustomModal';
import Select from '../../../components/UI/Select/Select';
import CollapseFrame from '../../../components/UI/CollapseFrame';
import QuestionsWithAction from '../../../components/UI/QuestionsWithAction';
import info from './../../../assets/images/Info-Circle.svg'
// import Button from '../../../components/UI/Button';
import { Button } from '@mantine/core';
import RenderBlock from '../../../components/RenderBlock';
import { useDispatch, useSelector } from 'react-redux';
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 340,
        },
    },
};

const ModifyStandard = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const section1Questions = useSelector((state) => state?.section1QuestionData?.data)
    console.log(section1Questions);
    const [section1QuestionsData, setection1QuestionsData] = useState([])
    const [section1, setSection1] = useState(questions);
    console.log(section1);
    const [template_ID, setTemplate_ID] = useState("Standard");
    const [showAddQuestion, setShowAddQuestion] = useState(false);
    const [level, setLevel] = useState(['L1']);
    const [isEdit, setIsEdit] = useState(false);
    const questionData = useSelector(questionSelector);
    const [section3, setSection3] = useState([]);
    const handleChange = (event) => {
        setTemplate_ID(event.target.value);
    };

    useEffect(() => {
        let payload = {
            controlId: template_ID
        }
        dispatch(getSection1QuestionDataAction(payload))
    }, [template_ID])
    useEffect(() => {
        if (section1Questions.length > 0) {
            console.log("hh", section1Questions);
            setection1QuestionsData(section1Questions);
        }else{
            setection1QuestionsData([])
        }

    }, [section1Questions, template_ID])
    useEffect(() => {
        if (section3.length > 0) {
            setShowAddQuestion(false);
        } else {
            setShowAddQuestion(true);
        }
    }, [section3]);
    const TemplateOptions = [
        { label: 'Template1', value: 'Standard' },
        { label: 'Template2', value: 'ATR_ACCR_01a' },

    ];


    useEffect(() => {
        const div = document.getElementById('loader');
        if (div) div.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [questionData.loading]);

    useEffect(() => {
        if (questionData.data.length > 0) {
            const apiQuestion = getQuestionsFormatData(questionData.data);
            setSection3(getFormatQuestions(apiQuestion, 'isQuestionEdit'));
            return;
        }
        setSection3([]);
    }, [questionData.data]);


    const handleSaveQuestion = (saveWithCloseModal = true) => {
        if (section3.length > 0) {
            const payload = {
                Header_Question: section3[0].label,
                Inner_Questions: JSON.stringify(section3[0].innerOptions),
                Level: level[0],
                Control_ID: template_ID[0],
            };
            if (questionData.data.length > 0) {
                dispatch(updateSection3Questions(payload));
            } else {
                dispatch(addSection3Questions(payload));
            }
            setIsEdit(false);
            if (saveWithCloseModal) handleClose();
        }
    };

    const handleAddQuestion = () => {
        const payload = {
            Control_ID: template_ID[0],
            Header_Question: 'Header question title',
            Inner_Questions: '',
            Level: level[0],
        };
        // dispatch(addSection3Questions(payload));
        setIsEdit(true);
        const newDataQuestion = getQuestionsFormatData([payload]);
        setSection3(getFormatQuestions(newDataQuestion, 'isQuestionEdit'));
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
                <div className="select-light">
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
                <div className='note'>
                    <p><span><img src={info} /></span>Any modifications to Standard Questions will reflect in all Assessments & Surveys.</p>
                </div>

                <div className="questions-list-main-wrapper">

                    <div className="pt-5">
                        {section1QuestionsData.map((data, i) => (
                            <QuestionsWithAction number={i + 1} text={data.question_text} withAction={true} active={true} />
                        ))}
                        {
                            section1QuestionsData.length == 0 && (
                                <p>No Question Found</p>
                            )
                        }
                    </div>




                    <div>
                        <div>

                            <Button
                                color="secondary"
                                variant="default"
                                onClick={handleAddQuestion}

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
        </div>
    );
};

export default ModifyStandard;

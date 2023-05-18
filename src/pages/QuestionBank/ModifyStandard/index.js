import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import './ModifyStandard.scss';
import CustomModal from '../../../components/UI/CustomModal';
import QuestionsWithAction from '../../../components/UI/QuestionsWithAction';
import info from './../../../assets/images/Info-Circle.svg';
// import Button from '../../../components/UI/Button';
// import { Button } from '@mantine/core';
import Button from '../../../components/UI/Button';
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
import {
  getSection1QuestionDataAction,
  deleteSection1OptionDataAction,
  deleteSection1QuestionDataAction,
} from '../../../redux/QuestionBank/QuestionBankAction';
import AddSection1Questions from './AddSection1Question';
import { deleteSection1Questions } from '../../../redux/Questions/QuestionsAction';
import MICSSpecific from '../ModifyMICSQuestions/MICSSpecific';
import { getRepositoryOfControlIDSelector } from '../../../redux/Questions/QuestionsSelectors';
import Select from 'react-select'

const ModifyStandard = ({ open, handleClose, type = '' }) => {
  const [activeType, setActiveType] = useState(type);
  const repositoryOfControlID = useSelector(getRepositoryOfControlIDSelector);
  const [controlIDList, setControlIDList] = useState([])
  useEffect(() => {
    if (repositoryOfControlID?.data.length !== 0) {
      console.log("hi buddy", repositoryOfControlID);
      let controlidArray = [];
      repositoryOfControlID?.data.map((data) => {
        controlidArray.push({ 'label': data.Control_ID, 'value': data.Control_ID });
      })
      console.log("controlidArray", controlidArray);
      setControlIDList(controlidArray);

    }
  }, [repositoryOfControlID])

  const dispatch = useDispatch();
  const section1Questions = useSelector(
    (state) => state?.section1QuestionData?.section1GetQuestion?.data,
  );
  const AddQuestionSuccess = useSelector(
    (state) => state?.section1QuestionData?.section1AddQuestion,
  );
  const DeleteQuestionSuccess = useSelector(
    (state) => state?.section1QuestionData?.section1DeleteQuestion,
  );
  const UpdateQuestionSuccess = useSelector(
    (state) => state?.section1QuestionData?.section1EditQuestion,
  );
  const AddOptionSuccess = useSelector((state) => state?.section1QuestionData?.section1AddOption);
  const DeleteOptionSuccess = useSelector(
    (state) => state?.section1QuestionData?.section1DeleteOption,
  );
  const UpdateOptionSuccess = useSelector(
    (state) => state?.section1QuestionData?.section1EditOption,
  );
  console.log(AddQuestionSuccess);
  console.log(section1Questions);
  const [section1QuestionsData, setection1QuestionsData] = useState([]);
  const [controlIDOption, setControlIDOption] = useState()
  const [template_ID, setTemplate_ID] = useState('Standard');
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [template2_id, setTemplate2_ID] = useState('');
  const [finalTemplate_id, setFinalTemplate_ID] = useState('Standard');
  const [selectContrilId, setSelectControlId] = useState(false);
  const [valueType, setValueType] = useState();
  const handleSetType = (selectType) => {
    setActiveType(selectType);
  };
  useEffect(() => {
    setActiveType(type);
  }, [type]);
  const handleChange = (event) => {
    setTemplate_ID(event.target.value);
    if (event.target.value === 'Standard') {
      setFinalTemplate_ID(event.target.value);
      setSelectControlId(false);
      setTemplate2_ID('');
      setControlIDOption('');
    } else {
      setFinalTemplate_ID('e');
      setSelectControlId(true);
    }
  };
  const handleChangeControlId = (e) => {
    setControlIDOption(e);
    console.log("e", e);
    setTemplate2_ID(e.value);
    if (e.value !== 'Standard') {
      setFinalTemplate_ID(e.value);
    }
  };
  const handleDeleteQuestion = (data) => {
    console.log('delete data', data);
    if (data.options?.length != 0) {
      data.options.forEach(({ option_id }, i) => {
        dispatch(deleteSection1OptionDataAction({ option_id: option_id }));
      });
    }
    dispatch(deleteSection1QuestionDataAction({ q_id: data?.q_id.toString() }));
  };
  useEffect(() => {
    let payload = {
      controlId: finalTemplate_id,
    };
    dispatch(getSection1QuestionDataAction(payload));
  }, [
    finalTemplate_id,
    AddQuestionSuccess,
    DeleteQuestionSuccess,
    UpdateQuestionSuccess,
    AddOptionSuccess,
    UpdateOptionSuccess,
  ]);
  useEffect(() => {
    if (section1Questions.length > 0) {
      console.log('hh', section1Questions);
      setection1QuestionsData(section1Questions);
    } else {
      setection1QuestionsData([]);
    }
  }, [section1Questions, template_ID]);

  const TemplateOptions = [
    { label: 'Default Template', value: 'Standard' },
    { label: 'Custom Template', value: '' },
  ];
  useEffect(() => {
    if (AddQuestionSuccess?.success) {
      console.log('success');
      setShowAddQuestion(false);
    }
  }, [AddQuestionSuccess]);

  const handleAddQuestionClose = () => {
    setShowAddQuestion(false);
  };

  return (
    <div>
      <CustomModal
        className="modify-standard"
        open={open}
        title={<span>Modify Questions for Existing MICS</span>}
        width={1080}
        onClose={handleClose}
      >
        <div className="buttons">
          <Button
            className="mx-3"
            color={activeType === 'Standard' ? 'neutral' : 'silver'}
            onClick={() => handleSetType('Standard')}
          >
            Standard
          </Button>
          <Button
            className="mx-3"
            color={activeType === 'MICS-Specific' ? 'neutral' : 'silver'}
            onClick={() => handleSetType('MICS-Specific')}
          >
            MICS-Specific
          </Button>
        </div>

        {activeType === 'Standard' && (
          <>
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
                    {TemplateOptions.map((data, i) => (
                      <option value={data?.value} key={i}>
                        {data?.label}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </div>

              {selectContrilId ? (
                <div className="col-md-3">
                  <Form.Group className='input-group mb-3'>
                    <div style={{ width: '300px' }}>
                      <Select
                        maxMenuHeight={200}
                        placeholder="Control ID * "
                        value={controlIDOption}
                        defaultValue={controlIDOption}
                        onChange={(e) => handleChangeControlId(e)}
                        className='l-input'
                        //MenuProps={MenuProps}
                        //inputProps={{ 'aria-label': 'Without label' }}
                        options={controlIDList}
                      />
                    </div>

                  </Form.Group>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="note">
              <p>
                <span>
                  <img src={info} />
                </span>
                Any modifications to Standard Questions will reflect in all Assessments & Surveys.
              </p>
            </div>
            <div className="questions-list-main-wrapper">
              <div className="pt-5">
                {section1QuestionsData.map((data, i) => (
                  <QuestionsWithAction
                    templateType={template_ID}
                    number={i + 1}
                    text={data.question_text}
                    withAction={true}
                    active={true}
                    block={data}
                    handleDelete={handleDeleteQuestion}
                    allQuestions={section1Questions}
                  />
                ))}
                {
                  finalTemplate_id === 'e' ? <p style={{ textAlign: "center", marginBottom: "50px" }}>Select Control ID to get Questions</p> :
                    section1QuestionsData.length == 0 && <p style={{ textAlign: "center", marginBottom: "50px" }}>No Question Found</p>
                }

              </div>

              <div className="d-flex align-items-center justify-content-between">
                <div>
                 
                      <Button color="silver" disabled={finalTemplate_id === 'e'} className="mx-3" onClick={() => setShowAddQuestion(true)}>
                        Add Question
                      </Button>
                  

                </div>
                <div className="d-flex align-items-center justify-content-end">
                  <Button variant="subtle" onClick={handleClose}>
                    Cancel
                  </Button>
                  {/* <Button
                    color="silver"
                    // className="mx-3"
                    className="ml-2"
                  >
                    Save as Draft
                  </Button> */}
                </div>
              </div>
            </div>
          </>
        )}
        {activeType === 'MICS-Specific' && <MICSSpecific handleClose={handleClose} />}
      </CustomModal>
      <AddSection1Questions
        controlId={finalTemplate_id}
        open={showAddQuestion}
        handleClose={handleAddQuestionClose}
      />
    </div>
  );
};

export default ModifyStandard;

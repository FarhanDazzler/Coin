import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import './TableStyle.scss';
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
import ControlidMICSSpecific from './ControlidMICSSpecific';

const ControlidTableModal = ({ open, handleClose, type = 'Standard', selectedControlId }) => {
  const [activeType, setActiveType] = useState(type);

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
    setFinalTemplate_ID(event.target.value);
    // if (event.target.value === 'Standard') {
    //   setFinalTemplate_ID(event.target.value);
    // //   setSelectControlId(false);
    // //   setTemplate2_ID('');
    // } else {
    // //   setSelectControlId(true);
    // }
  };
  const handleChangeControlId = (e) => {
    setTemplate2_ID(e.target.value);
    if (e.target.value !== 'Standard') {
      setFinalTemplate_ID(e.target.value);
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
    { label: 'Template1', value: 'Standard' },
    { label: 'Template2', value: selectContrilId },
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
                    value={finalTemplate_id}
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

              
            </div>
            
            <div className="questions-list-main-wrapper">
              <div className="pt-5">
                {section1QuestionsData.map((data, i) => (
                  <QuestionsWithAction
                    templateType={template_ID}
                    number={i + 1}
                    text={data.question_text}
                    withAction={false}
                    active={true}
                    block={data}
                    
                    allQuestions={section1Questions}
                  />
                ))}
                {section1QuestionsData.length == 0 && <p>No Question Found</p>}
              </div>

              <div className="d-flex align-items-center justify-content-between">
                <div>
                 
                </div>
                <div className="d-flex align-items-center justify-content-end">
                  <Button color="silver"
                    className="ml-2" onClick={handleClose}>
                    Ok
                  </Button>
                 
                </div>
              </div>
            </div>
          </>
        )}
        {activeType === 'MICS-Specific' && <ControlidMICSSpecific selectedControlId={selectedControlId} handleClose={handleClose} />}
      
    </div>
  );
};

export default ControlidTableModal;

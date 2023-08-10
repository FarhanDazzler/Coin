import React, { useEffect, useState } from 'react';
import Button from '../../../components/UI/Button';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import info from '../../../assets/images/Info-Circle.svg';
import QuestionsWithAction from '../../../components/UI/QuestionsWithAction';
import { useDispatch, useSelector } from 'react-redux';
import { getRepositoryOfControlIDSelector } from '../../../redux/Questions/QuestionsSelectors';
import { getSection1QuestionDataAction } from '../../../redux/QuestionBank/QuestionBankAction';
import AddSection1Questions from '../../QuestionBank/ModifyStandard/AddSection1Question';
import MICSSpecific from '../../QuestionBank/ModifyMICSQuestions/MICSSpecific';
import MICSSpecificChangeLanguage from './MICSSpecificChangeLanguage';
import PageWrapper from '../../../components/wrappers/PageWrapper';

const ModifyStandardChangeLang = ({ open, handleClose }) => {
  const [activeType, setActiveType] = useState('Standard');
  const repositoryOfControlID = useSelector(getRepositoryOfControlIDSelector);
  const [controlIDList, setControlIDList] = useState([]);
  useEffect(() => {
    if (repositoryOfControlID?.data.length !== 0) {
      let controlidArray = [];
      repositoryOfControlID?.data.map((data) => {
        controlidArray.push({ label: data.Control_ID, value: data.Control_ID });
      });
      setControlIDList(controlidArray);
    }
  }, [repositoryOfControlID]);

  const dispatch = useDispatch();
  const section1Questions = useSelector(
    (state) => state?.section1QuestionData?.section1GetQuestion?.data,
  );
  const AddQuestionSuccess = useSelector(
    (state) => state?.section1QuestionData?.section1AddQuestion,
  );

  const UpdateQuestionSuccess = useSelector(
    (state) => state?.section1QuestionData?.section1EditQuestion,
  );
  const AddOptionSuccess = useSelector((state) => state?.section1QuestionData?.section1AddOption);

  const UpdateOptionSuccess = useSelector(
    (state) => state?.section1QuestionData?.section1EditOption,
  );

  const section1EditQuestionTranslation = useSelector(
    (state) => state?.section1QuestionData?.section1EditQuestionTranslation,
  );

  console.log('section1EditQuestionTranslation', section1EditQuestionTranslation);

  const Question1UpdateState = useSelector((state) => state?.questions?.question1Update);
  const Question1OptionsUpdateState = useSelector((state) => state?.questions?.question1Option);
  const [section1QuestionsData, setSection1QuestionsData] = useState([]);
  const [controlIDOption, setControlIDOption] = useState();
  const [template_ID, setTemplate_ID] = useState('Standard');
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [finalTemplate_id, setFinalTemplate_ID] = useState('Standard');
  const [selectContrilId, setSelectControlId] = useState(false);
  const handleSetType = (selectType) => {
    setActiveType(selectType);
  };

  const handleChange = (event) => {
    setTemplate_ID(event.target.value);
    if (event.target.value === 'Standard') {
      setFinalTemplate_ID(event.target.value);
      setSelectControlId(false);
      setControlIDOption('');
    } else {
      setFinalTemplate_ID('e');
      setSelectControlId(true);
    }
  };
  const handleChangeControlId = (e) => {
    setControlIDOption(e);
    if (e.value !== 'Standard') {
      setFinalTemplate_ID(e.value);
    }
  };

  useEffect(() => {
    let payload = {
      controlId: finalTemplate_id,
    };
    dispatch(getSection1QuestionDataAction(payload));
  }, [
    finalTemplate_id,
    AddQuestionSuccess,
    UpdateQuestionSuccess,
    AddOptionSuccess,
    UpdateOptionSuccess,
    Question1UpdateState,
    Question1OptionsUpdateState,
    section1EditQuestionTranslation.callAPi,
  ]);
  useEffect(() => {
    if (section1Questions.length > 0) {
      setSection1QuestionsData(section1Questions);
    } else {
      setSection1QuestionsData([]);
    }
  }, [section1Questions, template_ID]);

  const TemplateOptions = [
    { label: 'Default Template', value: 'Standard' },
    { label: 'Custom Template', value: '' },
  ];
  useEffect(() => {
    if (AddQuestionSuccess?.success) {
      setShowAddQuestion(false);
    }
  }, [AddQuestionSuccess]);

  const handleAddQuestionClose = () => {
    setShowAddQuestion(false);
  };

  return (
    <div>
      <PageWrapper>
       <div className='py-5'>
       <div className="container py-5 langage-bg text-left">
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
                    <Form.Group className="input-group mb-3">
                      <div style={{ width: '300px' }}>
                        <Select
                          maxMenuHeight={200}
                          placeholder="Control ID * "
                          value={controlIDOption}
                          defaultValue={controlIDOption}
                          onChange={(e) => handleChangeControlId(e)}
                          className="l-input"
                          //MenuProps={MenuProps}
                          //inputProps={{ 'aria-label': 'Without label' }}
                          options={controlIDList}
                        />
                      </div>
                    </Form.Group>
                  </div>
                ) : (
                  ''
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
                      allQuestions={section1Questions}
                      isChangeLang
                      section1QuestionsData={section1QuestionsData}
                      setSection1QuestionsData={setSection1QuestionsData}
                    />
                  ))}
                  {finalTemplate_id === 'e' ? (
                    <p style={{ textAlign: 'center', marginBottom: '50px' }}>
                      Select Control ID to get Questions
                    </p>
                  ) : (
                    section1QuestionsData.length == 0 && (
                      <p style={{ textAlign: 'center', marginBottom: '50px' }}>No Question Found</p>
                    )
                  )}
                </div>
              </div>
            </>
          )}
          {activeType === 'MICS-Specific' && <MICSSpecificChangeLanguage />}
        </div>
       </div>
        <AddSection1Questions
          controlId={finalTemplate_id}
          open={showAddQuestion}
          handleClose={handleAddQuestionClose}
        />
      </PageWrapper>
    </div>
  );
};

export default ModifyStandardChangeLang;

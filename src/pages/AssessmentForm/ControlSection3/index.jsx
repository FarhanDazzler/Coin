import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { question3Selector } from '../../../redux/Questions/QuestionsSelectors';
import { Loader } from '@mantine/core';
import { Form } from 'react-bootstrap';
import RenderBlock from '../../../components/RenderBlock';
import RenderBlockWrapper from '../../../components/RenderBlock/RenderBlockWrapper';
import CollapseFrame from '../../../components/UI/CollapseFrame';
import {
  getFormatQuestions,
  getLanguageFormat,
  getQuestionsFormatData,
  isJsonString,
} from '../../../utils/helper';
import { useTranslation } from 'react-i18next';
import Radio from '../../../components/UI/Radio';

const ControlSection3 = ({
  activeData = {},
  setTerminating,
  ans,
  setAns,
  showNoQuestionAns,
  setShowNoQuestionAns,
  setStartEdit,
  isModal,
  L1AndL2NoQuestionsAns,
  setL1AndL2NoQuestionsAns,
}) => {
  const Control_ID = activeData?.control_id;
  const questionData = useSelector(question3Selector);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const languageVal = i18n.language;
  const [language, setLanguage] = useState(languageVal);
  const [render, setRender] = useState(false);
  const [questionL1, setQuestionL1] = useState([]);
  const [questionL2, setQuestionL2] = useState([]);
  const [questionL3, setQuestionL3] = useState([]);
  const [showNoQuestion, setShowNoQuestion] = useState(false);

  const L1InnerQuestion = isJsonString(questionData.Level?.L1?.Inner_Questions || '[]')
    ? JSON.parse(questionData.Level?.L1?.Inner_Questions || '[]')
    : [];
  const L2InnerQuestion = isJsonString(questionData.Level?.L2?.Inner_Questions || '[]')
    ? JSON.parse(questionData.Level?.L2?.Inner_Questions || '[]')
    : [];
  const L3InnerQuestion = isJsonString(questionData.Level?.L3?.Inner_Questions || '[]')
    ? JSON.parse(questionData.Level?.L3?.Inner_Questions || '[]')
    : [];

  const isSameLang = useMemo(() => {
    return languageVal === language;
  }, [language, languageVal]);
  const [lastAns, setLastAns] = useState('');

  // Convert api data to chart readable structure
  const setSelectedQuestionAns = (question, ansObj) => {
    return question.map((q1) => {
      const updateInnerQ = q1.renderOption.map((innerQ) => {
        if (ansObj[innerQ.q_id]) {
          return { ...innerQ, value: ansObj[innerQ.q_id] };
        }
        return { ...innerQ };
      });
      return {
        ...q1,
        renderOption: updateInnerQ,
      };
    });
  };

  const handleChange = (inputValue, block, parentBlock) => {
    const value = inputValue.trimStart();
    setStartEdit(true);
    setLastAns(value);
    const noQueAns = value.includes('yes');
    setShowNoQuestionAns('');
    setL1AndL2NoQuestionsAns({
      failingDue: null,
      reasonsForFailing: null,
    });
    let updateAns = { ...ans };
    if (noQueAns) {
      setShowNoQuestion(false);
      updateAns.noQueAns = false;
      if (ans?.L1AndL2NoQuestionsAns && ans?.L1AndL2NoQuestionsAns?.failingDue) {
        updateAns.L1AndL2NoQuestionsAns = { failingDue: null, reasonsForFailing: null };
      }
    }
    if (parentBlock) {
      // Store data for selected level block value
      updateAns[parentBlock.Level] = { ...updateAns[parentBlock.Level], [block.q_id]: value };
    } else {
      updateAns[block.q_id] = value;
    }
    if (['L1', 'L2'].includes(parentBlock.Level)) {
      if (parentBlock.Level === 'L1' && updateAns['L2']) delete updateAns['L2'];
      if (updateAns['L3']) delete updateAns['L3'];
      setTerminating(false);
    }

    setAns(updateAns);
  };

  const handleChangeNoQuestion = (val) => {
    setShowNoQuestionAns(val);
  };

  useEffect(() => {
    if (showNoQuestion) {
      setShowNoQuestionAns('');
      // if user select any option then automatically scroll bottom
      const div = document.getElementById('noOptionInput');
      if (div) div.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showNoQuestion]);

  useEffect(() => {
    setTerminating(showNoQuestionAns.length > 0);
  }, [showNoQuestionAns]);

  useEffect(() => {
    setTerminating(L1AndL2NoQuestionsAns.failingDue && L1AndL2NoQuestionsAns.reasonsForFailing);
  }, [L1AndL2NoQuestionsAns]);

  useEffect(() => {
    if (questionL1.length > 0 && ans.L1) {
      const updateAnsL1 = setSelectedQuestionAns(questionL1, ans.L1);
      setQuestionL1(updateAnsL1);
    }
    if (questionL2.length > 0 && ans.L2) {
      const updateAnsL2 = setSelectedQuestionAns(questionL2, ans.L2);
      setQuestionL2(updateAnsL2);
    }
    if (questionL3.length > 0 && ans.L3) {
      const updateAnsL3 = setSelectedQuestionAns(questionL3, ans.L3);
      updateAnsL3.forEach((l3) => {
        l3?.renderOption?.forEach((option) => {
          if (option.value) {
            setTerminating(true);
          }
        });
      });
      setQuestionL3(updateAnsL3);
    }
  }, [ans, render, questionData]);

  useEffect(() => {
    if (!lastAns) return;

    const updateAns = {};
    if (ans.L1 && questionData.Level?.L1) {
      const ansObjectL1 = Object.keys(ans.L1);
      // Check condition for selected ans and all question length same or not
      if (ansObjectL1.length === questionL1[0]?.innerOptions?.length) {
        let allYesFilterData1 = Object.keys(ans.L1).filter((key) => {
          return ans.L1[key].includes('yes');
        });

        updateAns.L1 = ans.L1;
        setAns(updateAns);
        setTerminating(false);
        if (ansObjectL1.length !== allYesFilterData1.length) {
          setQuestionL2([]);
          setQuestionL3([]);
          setShowNoQuestion(true);
          return;
        } else {
          setShowNoQuestion(false);
        }
      } else {
        if (ans.L1) {
          updateAns.L1 = ans.L1;
          setAns(updateAns);
        }
      }
    }
    //Same for section 2
    if (ans.L2 && questionData.Level?.L2) {
      const ansObjectL2 = Object.keys(ans.L2);
      if (ansObjectL2.length === questionL2[0]?.innerOptions?.length) {
        let allYesFilterData2 = Object.keys(ans.L2).filter((key) => {
          return ans.L2[key].includes('yes');
        });

        updateAns.L2 = ans.L2;
        setAns(updateAns);
        setTerminating(false);
        if (ansObjectL2.length !== allYesFilterData2.length) {
          setQuestionL3([]);
          setShowNoQuestion(true);
          return;
        } else {
          setShowNoQuestion(false);
        }
      } else {
        if (ans.L2) {
          updateAns.L2 = ans.L2;
          setAns(updateAns);
        }
        updateAns.L2 = ans.L2;
        setAns(updateAns);
      }
    }
    //Same for section 3
    if (ans.L3) {
      const ansObjectL3 = Object.keys(ans.L3);
      if (ansObjectL3.length === questionL3[0]?.innerOptions?.length) {
        let allYesFilterData3 = Object.keys(ans.L3).filter((key) => {
          return ans.L3[key].includes('yes');
        });
        if (ansObjectL3.length === allYesFilterData3.length) {
          setShowNoQuestion(false);
        }
        setTerminating(true);
      }
      updateAns.L3 = ans.L3;
      setAns(updateAns);
    }
    if (ans.noQueAns) {
      setShowNoQuestion(true);
    } else {
      setShowNoQuestion(false);
    }
  }, [lastAns]);

  useEffect(() => {
    setTimeout(() => {
      setRender(!render);
      if (questionData.Level?.L1) {
        //getQuestionsFormatData function getting api questions and getting new formeted array
        const apiQuestionL1 = getQuestionsFormatData([questionData.Level?.L1]);
        if (!(questionL1.length > 0) || !isSameLang) {
          const questionsVal = getFormatQuestions(apiQuestionL1, null, 'L1');
          const data = getLanguageFormat(questionsVal, languageVal, null, true);
          if (ans.L1) {
            const updateAnsL1 = setSelectedQuestionAns(data, ans.L1);
            setQuestionL1(updateAnsL1);
          } else {
            setQuestionL1(data);
          }
          setLanguage(languageVal);
        }
      }

      const isLevel1NoInnerQuestion = questionData.Level?.L1 && !L1InnerQuestion.length;
      const isLevel2NoInnerQuestion =
        !!questionData.Level?.L1 && !!questionData.Level?.L2 && !L2InnerQuestion.length;

      const section1Condition = !!ans.L1 && !JSON.stringify(ans.L1).includes('no');

      if (L1InnerQuestion.length > 0 && !ans.L1) return;

      if ((!!questionData.Level?.L2 && section1Condition) || isLevel1NoInnerQuestion) {
        const apiQuestionL2 = getQuestionsFormatData([questionData.Level?.L2]);
        if (!(questionL2.length > 0) || !isSameLang || isLevel1NoInnerQuestion) {
          const questionsVal2 = getFormatQuestions(apiQuestionL2, null, 'L2');
          const data2 = getLanguageFormat(questionsVal2, languageVal, null, true);

          if (ans.L2) {
            const updateAnsL2 = setSelectedQuestionAns(data2, ans.L2);
            setQuestionL2(updateAnsL2);
          } else {
            setQuestionL2(data2);
          }
        }
      }

      if (L2InnerQuestion.length > 0 && !ans.L2) return;

      if (
        (!!questionData.Level?.L3 && !!ans.L2 && !JSON.stringify(ans.L2).includes('no')) ||
        isLevel2NoInnerQuestion
      ) {
        const apiQuestionL3 = getQuestionsFormatData([questionData.Level?.L3]);
        if (
          !(questionL3.length > 0) ||
          !isSameLang ||
          isLevel1NoInnerQuestion ||
          isLevel2NoInnerQuestion
        ) {
          const questionsVal3 = getFormatQuestions(apiQuestionL3, null, 'L3');
          const data3 = getLanguageFormat(questionsVal3, languageVal, null, true);

          if (ans.L3) {
            const updateAnsL3 = setSelectedQuestionAns(data3, ans.L3);
            setQuestionL3(updateAnsL3);
          } else {
            if (!showNoQuestion) {
              setQuestionL3(data3);
            } else {
              setQuestionL3([]);
            }
          }
        } else {
          if (
            apiQuestionL3 &&
            ans?.L3 &&
            apiQuestionL3[0]?.innerOptions?.length === Object.keys(ans?.L3).length
          ) {
            setTerminating(true);
          }
        }
      }
    }, 100);
  }, [questionData.Level, ans, languageVal]);

  useEffect(() => {
    if (questionData.loadingLevel) {
      const div = document.getElementById('section3');
      if (div) div.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [questionData.loadingLevel]);

  const isEmptySection = !(questionL1.length > 0) && !(questionL2.length > 0) && !questionL3.length;
  useEffect(() => {
    setTimeout(() => {
      const ansLength = Object.keys(ans?.L3 || {}).length;

      if (
        (isEmptySection && !questionData.loadingLevel) ||
        (ansLength > 0 && questionL3[0]?.innerOptions?.length === ansLength) ||
        showNoQuestionAns
      ) {
        setTerminating(true);
      } else {
        setTerminating(false);
      }
    }, 10);
  }, [questionL1.length, questionData.loadingLevel, ans.L3]);

  const isL1NoAnsSelect = ans?.L1 ? JSON.stringify(ans?.L1).includes('_no') : false;
  const isL2NoAnsSelect = ans?.L2 ? JSON.stringify(ans?.L2).includes('_no') : false;

  useEffect(() => {
    if (questionL3.length > 0 && !isL1NoAnsSelect && !isL2NoAnsSelect) {
      setTerminating(!(L3InnerQuestion.length > 0));
    }
  }, [L3InnerQuestion, isL1NoAnsSelect, isL2NoAnsSelect, questionL3]);

  useEffect(() => {
    if (!(showNoQuestion || isL1NoAnsSelect || isL2NoAnsSelect)) {
      setL1AndL2NoQuestionsAns({ failingDue: null, reasonsForFailing: null });
    }
  }, [showNoQuestion, isL1NoAnsSelect, isL2NoAnsSelect]);

  const handleChangeFailingFirstOption = (value) => {
    setL1AndL2NoQuestionsAns({
      failingDue: value,
      reasonsForFailing: null,
    });
    setShowNoQuestionAns('');
  };

  const handleChangeFailingResponseOption = (value) => {
    setL1AndL2NoQuestionsAns({ ...L1AndL2NoQuestionsAns, reasonsForFailing: value });
    setShowNoQuestionAns('');
  };

  const controlFailingQuestion = {
    options: [
      {
        value: 'Yes',
        label: t('selfAssessment.assessmentForm.Section3_failing_question_failingDue_Yes'),
      },
      {
        value: 'No',
        label: t('selfAssessment.assessmentForm.Section3_failing_question_failingDue_No'),
      },
    ],
    label: t('selfAssessment.assessmentForm.Section3_failing_question_failingDue'),
    value: L1AndL2NoQuestionsAns.failingDue,
    handleChange: handleChangeFailingFirstOption,
    disabled: !isModal,
  };

  const controlFailingResponse = {
    options: [
      {
        value:
          'Process is in place, but control is failing due to new KPI(s) not yet being tracked',
        label: t(
          'selfAssessment.assessmentForm.Section3_failing_question_failingDue_yes_subQuestion_option1',
        ),
      },
      {
        value:
          'Process is in place, but control is failing due to new KPI(s) not meeting threshold',
        label: t(
          'selfAssessment.assessmentForm.Section3_failing_question_failingDue_yes_subQuestion_option2',
        ),
      },
      {
        value: 'Process is not in place due to new control requirements',
        label: t(
          'selfAssessment.assessmentForm.Section3_failing_question_failingDue_yes_subQuestion_option3',
        ),
      },
      {
        value: 'Existing Process or KPI(s) failed',
        label: t(
          'selfAssessment.assessmentForm.Section3_failing_question_failingDue_yes_subQuestion_option4',
        ),
      },
    ],
    handleChange: handleChangeFailingResponseOption,
    value: L1AndL2NoQuestionsAns.reasonsForFailing,
    label: t('selfAssessment.assessmentForm.Section3_failing_question_failingDue_yes_subQuestion'),
    disabled: !isModal,
  };

  if (isEmptySection) return <div />;

  return (
    <div>
      <CollapseFrame title={t('selfAssessment.assessmentForm.section3_MICS')} active>
        <div className="mt-5" id="section3">
          <>
            {questionL1.length > 0 && questionL1[0]?.Control_ID && (
              <RenderBlock blocks={questionL1} isModal={isModal} handleChange={handleChange} />
            )}
            {questionL2.length > 0 && questionL2[0]?.Control_ID && !isL1NoAnsSelect && (
              <RenderBlock blocks={questionL2} isModal={isModal} handleChange={handleChange} />
            )}
            {questionL3.length > 0 &&
              questionL3[0]?.Control_ID &&
              !isL1NoAnsSelect &&
              !isL2NoAnsSelect && (
                <RenderBlock blocks={questionL3} isModal={isModal} handleChange={handleChange} />
              )}
          </>

          {!(questionL1.length > 0 && questionL1[0]?.Control_ID) &&
            !(questionL2.length > 0 && questionL2[0]?.Control_ID && !isL1NoAnsSelect) &&
            !(
              questionL3.length > 0 &&
              questionL3[0]?.Control_ID &&
              !isL1NoAnsSelect &&
              !isL2NoAnsSelect
            ) && (
              <div className="mt-5 mb-5 pt-5 text-center">
                <h1 className="table-modal-title"> No section 3 data available</h1>
              </div>
            )}

          {(showNoQuestion || isL1NoAnsSelect || isL2NoAnsSelect) && (
            <>
              {(isL1NoAnsSelect || isL2NoAnsSelect) && (
                <>
                  <RenderBlockWrapper id="noOptionInput">
                    <Radio {...controlFailingQuestion} />
                  </RenderBlockWrapper>

                  {L1AndL2NoQuestionsAns.failingDue &&
                    L1AndL2NoQuestionsAns.failingDue === 'Yes' && (
                      <RenderBlockWrapper id="noOptionInput">
                        <Radio {...controlFailingResponse} />
                      </RenderBlockWrapper>
                    )}
                </>
              )}

              {((questionL3.length > 0 && !isL1NoAnsSelect && !isL2NoAnsSelect) ||
                L1AndL2NoQuestionsAns.failingDue === 'No') && (
                <RenderBlockWrapper id="noOptionInput">
                  <Form.Label>
                    {t('selfAssessment.assessmentForm.section3FailedText')}{' '}
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Group className="input-group mb-3">
                    <Form.Control
                      type="textarea"
                      name=""
                      rows={3}
                      as="textarea"
                      placeholder=""
                      className="form-control"
                      maxLength="2500"
                      value={showNoQuestionAns}
                      onChange={(e) => handleChangeNoQuestion(e.target.value.trimStart())}
                      disabled={!isModal}
                    />
                  </Form.Group>
                </RenderBlockWrapper>
              )}
            </>
          )}

          {(questionData.loadingLevel || questionData.loading) && (
            <div className="d-flex w-100 justify-content-center pt-4" id="loader">
              <Loader color="#e7c55d" />
            </div>
          )}
        </div>
      </CollapseFrame>
    </div>
  );
};

export default ControlSection3;

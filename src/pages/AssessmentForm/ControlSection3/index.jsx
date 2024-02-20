import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { question3Selector } from '../../../redux/Questions/QuestionsSelectors';
import { Loader } from 'semantic-ui-react';
import { useHistory, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import RenderBlock from '../../../components/RenderBlock';
import RenderBlockWrapper from '../../../components/RenderBlock/RenderBlockWrapper';
import { getSection3Questions } from '../../../redux/Questions/QuestionsAction';
import CollapseFrame from '../../../components/UI/CollapseFrame';
import {
  getFormatQuestions,
  getLanguageFormat,
  getQuestionsFormatData,
  isJsonString,
} from '../../../utils/helper';
import { useTranslation } from 'react-i18next';

const ControlSection3 = ({
  setTerminating,
  ans,
  setAns,
  showNoQuestionAns,
  setShowNoQuestionAns,
  setStartEdit,
  isModal,
  loadingLevel,
  setLoadingLevel,
  loadingRef,
}) => {
  const history = useHistory();
  const { Assessment_id = '' } = useParams();
  const query = new URLSearchParams(history.location.search);
  const Control_ID = Assessment_id || query.get('Control_ID');
  const questionData = useSelector(question3Selector);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const languageVal = i18n.language;
  const [language, setLanguage] = useState(languageVal);
  const [render, setRender] = useState(false);
  const [questionL1, setQuestionL1] = useState([]);
  const [questionL2, setQuestionL2] = useState([]);
  const [questionL3, setQuestionL3] = useState([]);
  const [question2Api, setQuestion2Api] = useState(false);
  const [question3Api, setQuestion3Api] = useState(false);
  const [showNoQuestion, setShowNoQuestion] = useState(false);
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

  const handleChange = (value, block, parentBlock) => {
    setStartEdit(true);
    setLastAns(value);
    const noQueAns = value.includes('yes');
    let updateAns = { ...ans };
    if (noQueAns) {
      updateAns.noQueAns = false;
    }
    if (parentBlock) {
      // Store data for selected level block value
      updateAns[parentBlock.Level] = { ...updateAns[parentBlock.Level], [block.q_id]: value };
    } else {
      updateAns[block.q_id] = value;
    }
    setAns(updateAns);
  };

  const handleChangeNoQuestion = (val) => {
    setShowNoQuestionAns(val);
  };

  useEffect(() => {
    dispatch(getSection3Questions({ Level: 'L1', Control_ID: Control_ID }));
  }, []);

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
      setQuestionL3(updateAnsL3);
    }
  }, [ans, render, questionData]);

  useEffect(() => {
    if (question2Api) return;
    // Check condition for section 1 and selected question not inner question
    const isFirstSectionWithNoQuestion =
      isJsonString(questionData.Level?.L1?.Inner_Questions) &&
      !JSON.parse(questionData.Level?.L1?.Inner_Questions).length;

    //Check if first section any one 'No' option selected then not section 2 api call make
    if (isFirstSectionWithNoQuestion) {
      if (!loadingRef?.current?.L2) {
        setLoadingLevel({ ...loadingLevel, L2: true });
        dispatch(
          getSection3Questions({
            Level: 'L2',
            Control_ID: Control_ID,
            events: {
              onSuccess: () => {
                setTimeout(() => {
                  setLoadingLevel({ ...loadingLevel, L2: false });
                }, 1500);
              },
            },
          }),
        );
      }
      setQuestion2Api(true);
    }

    //Same for s3
    if (question3Api) return;
    const isSecondSectionWithNoQuestion =
      isJsonString(questionData.Level?.L2?.Inner_Questions) &&
      !JSON.parse(questionData.Level?.L2?.Inner_Questions).length;
    if (isSecondSectionWithNoQuestion) {
      dispatch(getSection3Questions({ Level: 'L3', Control_ID: Control_ID }));
      setQuestion3Api(true);
    }
  }, [questionData.Level]);

  useEffect(() => {
    setTimeout(() => {
      const updateAns = {};
      if (ans.L1 && questionData.Level?.L1) {
        const ansObjectL1 = Object.keys(ans.L1);
        // Check condition for selected ans and all question length same or not
        if (ansObjectL1.length === questionL1[0]?.innerOptions?.length) {
          let allYesFilterData1 = Object.keys(ans.L1).filter((key) => {
            return ans.L1[key].includes('yes');
          });

          if (ansObjectL1.length === allYesFilterData1.length && !questionL2.length) {
            dispatch(getSection3Questions({ Level: 'L2', Control_ID: Control_ID }));
          }
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
          if (ansObjectL2.length === allYesFilterData2.length && !questionL3.length) {
            dispatch(getSection3Questions({ Level: 'L3', Control_ID: Control_ID }));
          }
          updateAns.L2 = ans.L2;
          setAns(updateAns);
          setTerminating(false);
          if (ansObjectL2.length !== allYesFilterData2.length) {
            setQuestionL3([]);
            setShowNoQuestion(true);
            // setTerminating(true);
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
            setTerminating(true);
            setShowNoQuestion(false);
          } else {
            setTerminating(true);
          }
        }
        updateAns.L3 = ans.L3;
        setAns(updateAns);
      }
      if (ans.noQueAns) {
        setShowNoQuestion(true);
      } else {
        setShowNoQuestion(false);
      }
    }, 300);
  }, [lastAns]);

  useEffect(() => {
    setTimeout(() => {
      setRender(!render);
      if (questionData.Level?.L1) {
        //getQuestionsFormatData function getting api questions and getting new formeted array
        const apiQuestionL1 = getQuestionsFormatData([questionData.Level?.L1]);
        if (!questionL1.length > 0 || !isSameLang) {
          const questionsVal = getFormatQuestions(apiQuestionL1, null, 'L1');
          const data = getLanguageFormat(questionsVal, languageVal, null, true);
          if (ans.L1) {
            const updateAnsL1 = setSelectedQuestionAns(data, ans.L1);
            setQuestionL1(updateAnsL1);
            if (!question2Api) {
              dispatch(getSection3Questions({ Level: 'L2', Control_ID: Control_ID }));
              setQuestion2Api(true);
            }
          } else {
            setQuestionL1(data);
          }
          setLanguage(languageVal);
        }
      }
      const L1InnerQuestion = isJsonString(questionData.Level?.L1?.Inner_Questions || '[]')
        ? JSON.parse(questionData.Level?.L1?.Inner_Questions || '[]')
        : [];
      const L2InnerQuestion = isJsonString(questionData.Level?.L2?.Inner_Questions || '[]')
        ? JSON.parse(questionData.Level?.L2?.Inner_Questions || '[]')
        : [];
      const L3InnerQuestion = isJsonString(questionData.Level?.L3?.Inner_Questions || '[]')
        ? JSON.parse(questionData.Level?.L3?.Inner_Questions || '[]')
        : [];

      const isLevel1NoInnerQuestion = questionData.Level?.L1 && !L1InnerQuestion.length;
      const isLevel2NoInnerQuestion =
        !!questionData.Level?.L1 && !!questionData.Level?.L2 && !L2InnerQuestion.length;

      if (
        (!!questionData.Level?.L2 && !!ans.L1 && !JSON.stringify(ans.L1).includes('no')) ||
        isLevel1NoInnerQuestion
      ) {
        const apiQuestionL2 = getQuestionsFormatData([questionData.Level?.L2]);
        if (!(questionL2.length > 0) || !isSameLang || isLevel1NoInnerQuestion) {
          const questionsVal2 = getFormatQuestions(apiQuestionL2, null, 'L2');
          const data2 = getLanguageFormat(questionsVal2, languageVal, null, true);

          if (ans.L2) {
            const updateAnsL2 = setSelectedQuestionAns(data2, ans.L2);
            setQuestionL2(updateAnsL2);
            if (!question3Api) {
              if (!loadingRef?.current?.L3) {
                setLoadingLevel({ ...loadingLevel, L3: true });
                dispatch(
                  getSection3Questions({
                    Level: 'L3',
                    Control_ID: Control_ID,
                    events: {
                      onSuccess: () => {
                        setTimeout(() => {
                          setLoadingLevel({ ...loadingLevel, L3: false });
                        }, 1500);
                      },
                    },
                  }),
                );
              }
              setQuestion3Api(true);
            }
          } else {
            setQuestionL2(data2);
          }
        }
      }

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

          if (!(L3InnerQuestion.length > 0)) {
            setTerminating(true);
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
    }, 600);
  }, [questionData.Level, ans, languageVal]);

  useEffect(() => {
    if (questionData.loadingLevel) {
      const div = document.getElementById('section3');
      if (div) div.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [questionData.loadingLevel]);

  const isEmptySection = !questionL1.length > 0 && !questionL2.length > 0 && !questionL3.length;
  useEffect(() => {
    setTimeout(() => {
      const ansLength = Object.keys(ans?.L3 || {}).length;

      if (
        (isEmptySection && !questionData.loadingLevel) ||
        (ansLength > 0 && questionL3[0]?.innerOptions?.length === ansLength)
      ) {
        setTerminating(true);
      } else {
        setTerminating(false);
      }
    }, 10);
  }, [questionL1.length, questionData.loadingLevel, ans.L3]);

  if (isEmptySection) return <div />;

  const isL1NoAnsSelect = ans?.L1 ? JSON.stringify(ans?.L1).includes('_no') : false;
  const isL2NoAnsSelect = ans?.L2 ? JSON.stringify(ans?.L2).includes('_no') : false;

  return (
    <div>
      <CollapseFrame title={t('selfAssessment.assessmentForm.section3_MICS')} active>
        <div className="mt-5" id="section3">
          <>
            {questionL1.length > 0 && (
              <RenderBlock blocks={questionL1} isModal={isModal} handleChange={handleChange} />
            )}
            {questionL2.length > 0 && !isL1NoAnsSelect && (
              <RenderBlock blocks={questionL2} isModal={isModal} handleChange={handleChange} />
            )}
            {questionL3.length > 0 && !isL1NoAnsSelect && !isL2NoAnsSelect && (
              <RenderBlock blocks={questionL3} isModal={isModal} handleChange={handleChange} />
            )}
          </>

          {showNoQuestion && (
            <RenderBlockWrapper id="noOptionInput">
              <Form.Label>
                {t('selfAssessment.assessmentForm.section3FailedText')}{' '}
                <span className="text-danger">*</span>
              </Form.Label>
              <Form.Group className="input-group mb-3">
                <Form.Control
                  type="text"
                  name=""
                  placeholder=""
                  className="form-control"
                  maxLength="2500"
                  value={showNoQuestionAns}
                  onChange={(e) => handleChangeNoQuestion(e.target.value)}
                  disabled={!isModal}
                />
              </Form.Group>
            </RenderBlockWrapper>
          )}

          {questionData.loadingLevel && (
            <div className="d-flex w-100 justify-content-center pt-4" id="loader">
              <Loader />
            </div>
          )}
        </div>
      </CollapseFrame>
    </div>
  );
};

export default ControlSection3;
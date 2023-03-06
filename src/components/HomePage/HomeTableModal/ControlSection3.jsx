import React, { useEffect, useState } from 'react';
import CollapseFrame from '../../UI/CollapseFrame';
import { useDispatch, useSelector } from 'react-redux';
import { getFormatQuestions, getQuestionsFormatData } from '../../../utils/helper';
import RenderBlock from '../../RenderBlock';
import { questionSelector } from '../../../redux/Questions/QuestionsSelectors';
import { Loader } from 'semantic-ui-react';
import { getSection3Questions } from '../../../redux/Questions/QuestionsAction';
import { useHistory } from 'react-router-dom';
import Input from '../../UI/Input';
import RenderBlockWrapper from '../../RenderBlock/RenderBlockWrapper';

const ControlSection3 = ({
  setTerminating,
  ans,
  setAns,
  showNoQuestionAns,
  setShowNoQuestionAns,
}) => {
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const Control_ID = query.get('Control_ID');
  const questionData = useSelector(questionSelector);
  const dispatch = useDispatch();
  const [questionL1, setQuestionL1] = useState([]);
  const [questionL2, setQuestionL2] = useState([]);
  const [questionL3, setQuestionL3] = useState([]);
  const [showNoQuestion, setShowNoQuestion] = useState(false);

  const [lastAns, setLastAns] = useState('');
  const handleChange = (value, block, parentBlock) => {
    setLastAns(value);
    let updateAns = { ...ans };
    if (parentBlock) {
      updateAns[parentBlock.Level] = { ...updateAns[parentBlock.Level], [block.q_id]: value };
    } else {
      updateAns[block.q_id] = value;
    }
    setAns(updateAns);
  };

  const handleChangeNoQuestion = (val) => setShowNoQuestionAns(val);

  useEffect(() => {
    dispatch(getSection3Questions({ Level: 'L1', Control_ID: Control_ID }));
  }, []);

  useEffect(() => {
    if (showNoQuestion) {
      setShowNoQuestionAns('');
      const div = document.getElementById('noOptionInput');
      if (div) div.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showNoQuestion]);

  useEffect(() => {
    setTerminating(showNoQuestionAns.length > 0);
  }, [showNoQuestionAns]);

  useEffect(() => {
    const updateAns = {};
    if (ans.L1) {
      const ansObjectL1 = Object.keys(ans.L1);
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
      }
    }
    if (ans.L2) {
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
          return;
        } else {
          setShowNoQuestion(false);
        }
      }
    }
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
          setShowNoQuestion(true);
        }
      }
      updateAns.L3 = ans.L3;
      setAns(updateAns);
    }
  }, [lastAns]);

  useEffect(() => {
    if (questionData.Level?.L1) {
      const apiQuestionL1 = getQuestionsFormatData(questionData.Level?.L1);
      setQuestionL1(getFormatQuestions(apiQuestionL1, null, 'L1'));
    }
    if (questionData.Level?.L2 && ans.L1) {
      const apiQuestionL2 = getQuestionsFormatData(questionData.Level?.L2);
      setQuestionL2(getFormatQuestions(apiQuestionL2, null, 'L2'));
    }
    if (questionData.Level?.L3 && ans.L2) {
      const apiQuestionL3 = getQuestionsFormatData(questionData.Level?.L3);
      setQuestionL3(getFormatQuestions(apiQuestionL3, null, 'L3'));
    }
  }, [questionData.Level]);

  useEffect(() => {
    if (questionData.loading) {
      const div = document.getElementById('section3');
      if (div) div.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [questionData.loading]);

  return (
    <div>
      <CollapseFrame title="Section 3 : MICS SPECIFIC" active>
        <div className="mt-5" id="section3">
          <>
            {questionL1.length > 0 && (
              <RenderBlock blocks={questionL1} handleChange={handleChange} />
            )}
            {questionL2.length > 0 && (
              <RenderBlock blocks={questionL2} handleChange={handleChange} />
            )}
            {questionL3.length > 0 && (
              <RenderBlock blocks={questionL3} handleChange={handleChange} />
            )}
          </>

          {showNoQuestion && (
            <RenderBlockWrapper id="noOptionInput">
              <Input
                autoFocus
                formControlProps={{ className: 'input-wrapper full-input' }}
                label="Based on above response, action plans needs to be created on the failed control. Request you to elaborate the action Plan?
(Hint: Action plan is a time bound proposition designed to remediate the control breakdown with the objective of ensuring MICS compliance)"
                value={showNoQuestionAns}
                handleChange={handleChangeNoQuestion}
              />
            </RenderBlockWrapper>
          )}
          {questionData.loading && (
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

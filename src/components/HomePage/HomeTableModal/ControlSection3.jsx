import React, { useEffect, useState } from 'react';
import CollapseFrame from '../../UI/CollapseFrame';
import { useDispatch, useSelector } from 'react-redux';
import { getFormatQuestions, getQuestionsFormatData, handleSelectAns } from '../../../utils/helper';
import RenderBlock from '../../RenderBlock';
import { questionSelector } from '../../../redux/Questions/QuestionsSelectors';
import { Loader } from 'semantic-ui-react';
import { getSection3Questions } from '../../../redux/Questions/QuestionsAction';
import { useHistory } from 'react-router-dom';

const ControlSection3 = ({ setTerminating }) => {
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const Control_ID = query.get('Control_ID');
  const questionData = useSelector(questionSelector);
  const dispatch = useDispatch();
  const [questionL1, setQuestionL1] = useState([]);
  const [questionL2, setQuestionL2] = useState([]);
  const [questionL3, setQuestionL3] = useState([]);
  const [ans, setAns] = useState({});
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

  useEffect(() => {
    if (ans.L1) {
      const ansObjectL1 = Object.keys(ans.L1);
      if (ansObjectL1.length === questionL1[0]?.innerOptions?.length) {
        let allYesFilterData = Object.keys(ans.L1).filter((key) => {
          return ans.L1[key].includes('yes');
        });
        if (ansObjectL1.length === allYesFilterData.length && !questionL2.length) {
          dispatch(getSection3Questions({ Level: 'L2', Control_ID: Control_ID }));
        }
      }
    }
    if (ans.L2) {
      const ansObjectL2 = Object.keys(ans.L2);
      if (ansObjectL2.length === questionL2[0]?.innerOptions?.length) {
        let allYesFilterData = Object.keys(ans.L2).filter((key) => {
          return ans.L2[key].includes('yes');
        });
        if (ansObjectL2.length === allYesFilterData.length && !questionL3.length) {
          dispatch(getSection3Questions({ Level: 'L3', Control_ID: Control_ID }));
        }
      }
    }
  }, [lastAns]);

  useEffect(() => {
    if (questionData.Level?.L1) {
      const apiQuestionL1 = getQuestionsFormatData(questionData.Level?.L1);
      setQuestionL1(getFormatQuestions(apiQuestionL1, null, 'L1'));
    }
    if (questionData.Level?.L2) {
      const apiQuestionL2 = getQuestionsFormatData(questionData.Level?.L2);
      setQuestionL2(getFormatQuestions(apiQuestionL2, null, 'L2'));
    }
    if (questionData.Level?.L3) {
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

import React, { useEffect, useState } from 'react';
import CollapseFrame from '../../UI/CollapseFrame';
import { useSelector } from 'react-redux';
import { getQuestionsSelector } from '../../../redux/Assessments/AssessmentSelectors';
import { getFormatQuestions, handleSelectAns, tempData } from '../../../utils/helper';
import RenderBlock from '../../RenderBlock';

const ControlSection3 = ({ setTerminating }) => {
  const getQuestions = useSelector(getQuestionsSelector);
  const [data, setData] = useState([]);
  const [question, setQuestion] = useState([]);
  const [ans, setAns] = useState({});
  const [lastAns, setLastAns] = useState('');
  const [firstQuestions, setFirstQuestions] = useState([]);
  const handleChange = (value, block, parentBlock) => {
    setLastAns(value);
    let updateAns = { ...ans };
    if (parentBlock) {
      updateAns[parentBlock.q_id] = { ...updateAns[parentBlock.q_id], [block.q_id]: value };
    } else {
      updateAns[block.q_id] = value;
    }
    setAns(updateAns);
  };

  // useEffect(() => {
  //   if (getQuestions?.data?.length > 0) {
  //     const formatQuestionsData = getFormatQuestions(getQuestions?.data);
  //     const allData = formatQuestionsData.slice(10, formatQuestionsData.length);
  //     setData(allData);
  //     const showData = allData.slice(3, allData.length).filter((d) => d.show);
  //     setQuestion(showData);
  //
  //     const firstOptions = allData.slice(0, 3);
  //     setFirstQuestions(firstOptions);
  //   }
  // }, [getQuestions.data]);

  useEffect(() => {
    const formatQuestionsData = getFormatQuestions(tempData);
    setData(formatQuestionsData);
    setQuestion([formatQuestionsData[0]]);
    console.log('formatQuestionsData', formatQuestionsData);
  }, []);

  useEffect(() => {
    if (Object.keys(ans).length > 0) {
      const { newQuestionList, newAnsList, isTerminating } = handleSelectAns({
        question,
        ans,
        data,
      });
      setTerminating(isTerminating);
      setAns(newAnsList);
      setQuestion(newQuestionList);
    }
  }, [lastAns]);

  return (
    <div>
      <CollapseFrame title="Section 3 : MICS SPECIFIC" active>
        <div className="mt-5">
          <RenderBlock blocks={question} handleChange={handleChange} />
        </div>
      </CollapseFrame>
    </div>
  );
};

export default ControlSection3;

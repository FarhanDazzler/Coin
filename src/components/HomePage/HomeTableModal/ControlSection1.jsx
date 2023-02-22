import React, { useEffect, useState } from 'react';
import CollapseFrame from '../../UI/CollapseFrame';
import RenderBlock from '../../RenderBlock';
import { useSelector } from 'react-redux';
import { getQuestionsSelector } from '../../../redux/Assessments/AssessmentSelectors';
import { getFormatQuestions, handleSelectAns } from '../../../utils/helper';

const ControlSection1 = ({ setShowMoreSection, setTerminating }) => {
  const getQuestions = useSelector(getQuestionsSelector);
  const [data, setData] = useState([]);
  const [question, setQuestion] = useState([]);
  const [ans, setAns] = useState({});
  const [lastAns, setLastAns] = useState('');

  const handleChange = (value, block) => {
    setLastAns(value);
    setAns({ ...ans, [block.q_id]: value });
  };

  useEffect(() => {
    if (getQuestions?.data?.length > 0) {
      const allData = getFormatQuestions(getQuestions?.data);
      setData(allData.slice(0, 10));
      const showData = allData.slice(0, 10).filter((d) => d.show);
      setQuestion(showData);
    }
  }, [getQuestions.data]);

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
      setShowMoreSection(newQuestionList.length === Object.keys(newAnsList).length);
    }
  }, [lastAns]);

  return (
    <div>
      <CollapseFrame title="Section 1 : Standard" active>
        <div className="mt-5">
          <RenderBlock blocks={question} handleChange={handleChange} />
          {/*<Table />*/}
        </div>
      </CollapseFrame>
    </div>
  );
};

export default ControlSection1;

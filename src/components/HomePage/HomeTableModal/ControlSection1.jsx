import React, { useEffect, useState } from 'react';
import CollapseFrame from '../../UI/CollapseFrame';
import RenderBlock from '../../RenderBlock';
import { useSelector } from 'react-redux';
import { getQuestionsSelector } from '../../../redux/Assessments/AssessmentSelectors';
import { getFormatQuestions, handleSelectAns } from '../../../utils/helper';
import blockType from '../../RenderBlock/constant';

const ControlSection1 = ({ setShowMoreSection, setTerminating, ans, setAns }) => {
  const getQuestions = useSelector(getQuestionsSelector);
  const [data, setData] = useState([]);

  const handleChange = (value, block) => {
    let updateCurrentAns = ans.map((q) => {
      if (q.q_id === block.q_id) {
        return { ...q, value };
      }
      return { ...q };
    });

    switch (true) {
      case block.question_type === blockType.TEXT:
        if (block.options[0].is_Terminating === 1) {
          setTerminating(true);
          return;
        }
        setTerminating(false);
        break;
      case block.question_type === blockType.RADIO:
      case block.question_type === blockType.DROPDOWN:
        const matchQuestion = block.question_options.find((o) => o.option_id === value);
        if (matchQuestion.is_Terminating) {
          setTerminating(true);
          return;
        }
        setTerminating(false);
        break;
      default:
        setTerminating(false);
    }

    if (block.value) {
      const findSelectedIndex = updateCurrentAns.findIndex((data) => data.q_id === block.q_id);
      if (findSelectedIndex !== -1) {
        updateCurrentAns = updateCurrentAns.filter((d, i) => i <= findSelectedIndex);
      }
    }

    const matchQuestion =
      block.question_type === blockType.TEXT
        ? block.options[0]
        : block.question_options.find((o) => o.option_id === value);
    const selectChildQuestionId = matchQuestion?.child_question;

    const selectedChildQuestion = data.find((d) => d.q_id === selectChildQuestionId);

    if (selectedChildQuestion) {
      setShowMoreSection(false);
      setAns([...updateCurrentAns, selectedChildQuestion]);
    } else {
      setShowMoreSection(true);
      setAns(updateCurrentAns);
    }

    if (selectChildQuestionId === 0) {
      setShowMoreSection(true);
    }
  };

  useEffect(() => {
    if (getQuestions?.data?.length > 0) {
      const allData = getFormatQuestions(getQuestions?.data);
      setData(allData);
      const showData = allData.filter((d) => d.show);
      setAns(showData);
    }
  }, [getQuestions.data]);

  // useEffect(() => {
  //   if (Object.keys(ans).length > 0) {
  //     const { newQuestionList, newAnsList, isTerminating } = handleSelectAns({
  //       ans,
  //       ans,
  //       data,
  //     });
  //     setTerminating(isTerminating);
  //     setAns(newAnsList);
  //     setAns(newQuestionList);
  //     if (newQuestionList.length > 2) {
  //       setShowMoreSection(newQuestionList.length === Object.keys(newAnsList).length);
  //     } else {
  //       setShowMoreSection(false);
  //     }
  //   }
  // }, [lastAns]);

  useEffect(() => {
    setTimeout(() => {
      const div = document.getElementById('lastShow');
      if (div) div.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    }, 200);
  }, [ans.length]);

  return (
    <div>
      <CollapseFrame title="Section 1 : Standard" active>
        <div className="mt-5">
          <RenderBlock blocks={ans} handleChange={handleChange} />
          <div id="lastShow" />
          {/*<Table />*/}
        </div>
      </CollapseFrame>
    </div>
  );
};

export default ControlSection1;

import React, { useEffect, useState } from 'react';
import CollapseFrame from '../../UI/CollapseFrame';
import RenderBlock from '../../RenderBlock';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionsSelector } from '../../../redux/Assessments/AssessmentSelectors';
import { getFormatQuestions, handleSelectAns, validateEmail } from '../../../utils/helper';
import blockType from '../../RenderBlock/constant';
import useDebounce from '../../../hooks/useDebounce';
import { getUserFromAD } from '../../../redux/AzureAD/AD_Action';
import { getUserFromADSelector } from '../../../redux/AzureAD/AD_Selectors';

const ControlSection1 = ({ setShowMoreSection, setTerminating, ans, setAns }) => {
  const getQuestions = useSelector(getQuestionsSelector);
  const [data, setData] = useState([]);
  const [qId2Value, setQId2Value] = useState('');
  const q_id_2_debounce = useDebounce(qId2Value, 500);
  const [isStart, setIsStart] = useState(false);
  const dispatch = useDispatch();
  const userFromAD = useSelector(getUserFromADSelector);

  useEffect(() => {
    if (isStart) dispatch(getUserFromAD({ username: qId2Value }));
  }, [q_id_2_debounce]);

  useEffect(() => {
    if (userFromAD.loading) return;
    const apiUserData = userFromAD.data || [];
    const userData = apiUserData.map((d) => ({ value: d.mail, label: d.displayName }));
    const updateAnsObj = ans.map((val) => {
      if (val.q_id === 2) {
        return { ...val, dropDownOption: userData, loading: false };
      }
      return { ...val };
    });
    setAns(updateAnsObj);
  }, [userFromAD.data]);

  const handleChange = (value, block) => {
    if (block.q_id === 2) {
      setIsStart(true);
      setQId2Value(value);
    }
    let updateCurrentAns = ans.map((q) => {
      if (q.q_id === block.q_id) {
        if (block.q_id === 2 && !block.optionSelect) {
          q.loading = true;
          setTerminating(false);
        }
        return { ...q, value, selectVal: value };
      }
      return { ...q };
    });
    switch (true) {
      case block.question_type === blockType.TEXT:
        if (block.options[0].is_Terminating === 1) {
          setTerminating(true);
          setAns(updateCurrentAns);
          return;
        }
        setTerminating(false);
        break;

      case block.question_type === blockType.EMAIL_WIDTH_SELECT:
        if (block.options[0].is_Terminating === 1) {
          if (validateEmail(value)) {
            userFromAD.data.forEach((element) => {
              if (element.mail === value) setTerminating(true);
            });
          }
          setAns(updateCurrentAns);
          return;
        }
        setTerminating(false);
        break;

      case block.question_type === blockType.RADIO:
      case block.question_type === blockType.DROPDOWN:
        const matchQuestion = block.question_options.find((o) => o.option_id === value);
        if (matchQuestion.is_Terminating) {
          setTerminating(true);
          setAns(updateCurrentAns);
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

    const matchQuestion = [blockType.TEXT, blockType.EMAIL_WIDTH_SELECT].includes(
      block.question_type,
    )
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
      const allData = getFormatQuestions(getQuestions?.data, false, null, true);
      setData(allData);
      const showData = allData.filter((d) => d.show);
      setAns(showData);
    }
  }, [getQuestions.data]);

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
          <RenderBlock blocks={ans} handleChange={handleChange} userApiStart={isStart} />
          <div id="lastShow" />
          {/*<Table />*/}
        </div>
      </CollapseFrame>
    </div>
  );
};

export default ControlSection1;

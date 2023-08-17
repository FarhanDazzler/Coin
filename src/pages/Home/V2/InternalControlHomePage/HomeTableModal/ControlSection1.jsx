import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionsSelector } from '../../../../../redux/Assessments/AssessmentSelectors';
import { getFormatQuestions, getLanguageFormat, validateEmail } from '../../../../../utils/helper';
import { getUserFromAD } from '../../../../../redux/AzureAD/AD_Action';
import { getUserFromADSelector } from '../../../../../redux/AzureAD/AD_Selectors';
import useDebounce from '../../../../../hooks/useDebounce';
import blockType from '../../../../../components/RenderBlock/constant';
import RenderBlock from '../../../../../components/RenderBlock';
import CollapseFrame from '../../../../../components/UI/CollapseFrame';
import { useTranslation } from 'react-i18next';

const ControlSection1 = ({
  setShowMoreSection,
  setTerminating,
  ans,
  setAns,
  setStartEdit,
  isModal,
  language,
}) => {
  const { t } = useTranslation();
  const getQuestions = useSelector(getQuestionsSelector);
  const [data, setData] = useState([]);
  const [qId2Value, setQId2Value] = useState('');
  const q_id_2_debounce = useDebounce(qId2Value, 500);
  const [isStart, setIsStart] = useState(false);
  const dispatch = useDispatch();
  const userFromAD = useSelector(getUserFromADSelector);
  const isValidEmail = validateEmail(qId2Value);

  useEffect(() => {
    if (isStart) {
      dispatch(getUserFromAD({ username: qId2Value, isValidEmail }));
    }
  }, [q_id_2_debounce]);

  useEffect(() => {
    if (userFromAD.loading) return;
    let userData = [];
    if (userFromAD.emailCheck) {
      setTerminating(true);
    } else {
      const apiUserData = userFromAD.data || [];
      userData = apiUserData.map((d) => ({ value: d.mail, label: d.displayName }));
    }
    const updateAnsObj = ans.map((val) => {
      if (val.question_type === blockType.IS_AD) {
        return {
          ...val,
          dropDownOption: userData,
          emailCheck: userFromAD.emailCheck,
          loading: false,
        };
      }
      return { ...val };
    });
    setAns(updateAnsObj);
  }, [userFromAD.data]);

  const handleChange = (value, block) => {
    if (block.question_type === blockType.IS_AD) {
      setIsStart(true);
      setQId2Value(value);
    }
    setStartEdit(true);
    let updateCurrentAns = ans.map((q) => {
      if (q.q_id === block.q_id) {
        if (block.question_type === blockType.IS_AD && !block.optionSelect) {
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
      case block.question_type === blockType.IS_AD:
        if (block.options[0].is_Terminating === 1) {
          if (validateEmail(value)) {
            userFromAD.data.forEach((element) => {
              if (element.mail === value) {
                setTerminating(true);
              }
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

    const matchQuestion = [blockType.TEXT, blockType.EMAIL_WIDTH_SELECT, blockType.IS_AD].includes(
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
      const updateLang = getLanguageFormat(allData, language, null);
      setData(updateLang);
      const showData = updateLang.filter((d) => d.show);
      setAns(showData);
    }
  }, [getQuestions.data, language]);

  useEffect(() => {
    setTimeout(() => {
      const div = document.getElementById('lastShow');
      if (div) div.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    }, 200);
  }, [ans.length]);

  return (
    <div>
      <CollapseFrame title={t('selfAssessment.assessmentForm.section1_Standard')} active>
        <div className="mt-5">
          <RenderBlock
            blocks={ans}
            isModal={isModal}
            handleChange={handleChange}
            userApiStart={isStart}
          />
          <div id="lastShow" />
        </div>
      </CollapseFrame>
    </div>
  );
};

export default ControlSection1;

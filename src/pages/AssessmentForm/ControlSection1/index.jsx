import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLatestDraftSelector,
  getQuestionsSelector,
  getResponseSelector,
} from '../../../redux/Assessments/AssessmentSelectors';
import {
  getFormatQuestions,
  getLanguageFormat,
  getUniqueListBy,
  replaceWordInString,
  validateEmail,
} from '../../../utils/helper';
import { getUserFromAD } from '../../../redux/AzureAD/AD_Action';
import { getUserFromADSelector } from '../../../redux/AzureAD/AD_Selectors';
import useDebounce from '../../../hooks/useDebounce';
import blockType from '../../../components/RenderBlock/constant';
import RenderBlock from '../../../components/RenderBlock';
import CollapseFrame from '../../../components/UI/CollapseFrame';
import { useTranslation } from 'react-i18next';
import { getControlDataSelector } from '../../../redux/ControlData/ControlDataSelectors';

const ControlSection1 = ({
  setShowMoreSection,
  setTerminating,
  ans: selectedAns,
  setAns,
  setStartEdit,
  isModal,
  language,
  isDisabled,
  setAnsSection3,
}) => {
  const getControlData = useSelector(getControlDataSelector);

  const ans = useMemo(() => {
    if (!selectedAns || !selectedAns.length) return [];
    return selectedAns.map((d) => {
      return {
        ...d,
        label: replaceWordInString(
          d.label,
          '(({{LCD}}))',
          getControlData?.data?.lcd || 'LCD not found',
        ),
      };
    });
  }, [selectedAns, getControlData.data]);

  const { t } = useTranslation();
  const getQuestions = useSelector(getQuestionsSelector);
  const [data, setData] = useState([]);
  const [qId2Value, setQId2Value] = useState('');
  const q_id_2_debounce = useDebounce(qId2Value, 500);
  const [isStart, setIsStart] = useState(false);
  const dispatch = useDispatch();
  const userFromAD = useSelector(getUserFromADSelector);
  const isValidEmail = validateEmail(qId2Value);
  const latestDraftData = useSelector(getLatestDraftSelector);
  const getResponse = useSelector(getResponseSelector);

  const responseData = !getResponse?.data?.Latest_Response ? latestDraftData : getResponse;

  // Call the API for checking if the user is in AD
  // Dependency is debounce, is user has finished typing the only hit the API
  useEffect(() => {
    if (isStart) {
      dispatch(getUserFromAD({ username: qId2Value, isValidEmail }));
    }
  }, [q_id_2_debounce]);

  useEffect(() => {
    // If user is available then store in userData array with email and display name
    if (userFromAD.loading) return;
    let userData = [];
    if (userFromAD.emailCheck) {
      setTerminating(true);
    } else {
      const apiUserData = userFromAD.data || [];
      userData = apiUserData.map((d) => ({ value: d.mail, label: d.displayName }));
    }
    // Checking if userData is there then use it to fill the dropdown
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
    // setting the options
    setAns(updateAnsObj);
  }, [userFromAD.data]);

  const handleChange = (value, block) => {
    if (value === block.value) return;
    setAnsSection3({});
    // Check if IS_AD question then run this condition
    // All logic for IS_AD question

    // Block contains all the data about the question and options
    // Value contains the answer selected
    if (block.question_type === blockType.IS_AD) {
      setIsStart(true);
      setQId2Value(value);
    }
    setStartEdit(true);

    // Updating the answer
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

    //Check condition to store data like , TEXT, EMAIL_WIDTH_SELECT. IS_AD, EMAIL_WIDTH_SELECT, RADIO, DROPDOWN all input on change here
    switch (true) {
      case block.question_type === blockType.TEXT:
        if (block.options[0]?.is_Terminating === 1) {
          setTerminating(true);
          // dispatch(updateLastAccess({ s1: updateCurrentAns }));
          setAns(getUniqueListBy(updateCurrentAns, 'q_id'));
          return;
        }
        setTerminating(false);
        break;

      case block.question_type === blockType.EMAIL_WIDTH_SELECT:
      case block.question_type === blockType.IS_AD:
        if (block.options[0]?.is_Terminating === 1) {
          if (validateEmail(value)) {
            userFromAD.data.forEach((element) => {
              if (element.mail === value) {
                setTerminating(true);
              }
            });
          }
          setAns(getUniqueListBy(updateCurrentAns, 'q_id'));
          return;
        }
        setTerminating(false);
        break;

      case block.question_type === blockType.RADIO:
      case block.question_type === blockType.DROPDOWN:
        const matchQuestion = block.question_options?.find((o) => o.option_id === value);
        if (matchQuestion.is_Terminating) {
          setTerminating(true);
          setAns(getUniqueListBy(updateCurrentAns, 'q_id'));
          return;
        }
        setTerminating(false);
        break;
      default:
        setTerminating(false);
    }

    // if ans present, check the index of the question
    const findSelectedIndex = updateCurrentAns.findIndex((data) => data.q_id === block.q_id);
    if (findSelectedIndex !== -1) {
      // if question found, update the ans
      updateCurrentAns = updateCurrentAns.filter((d, i) => i <= findSelectedIndex);
    }

    const matchQuestion = [blockType.TEXT, blockType.EMAIL_WIDTH_SELECT, blockType.IS_AD].includes(
      block.question_type,
    )
      ? block.options[0]
      : block.question_options?.find((o) => o.option_id === value);
    const selectChildQuestionId = matchQuestion?.child_question;

    const selectedChildQuestion = data?.find((d) => d.q_id === selectChildQuestionId);

    if (selectedChildQuestion && value) {
      setShowMoreSection(false);
      setAns(getUniqueListBy([...updateCurrentAns, selectedChildQuestion], 'q_id'));
    } else {
      setShowMoreSection(true);
      setAns(getUniqueListBy(updateCurrentAns, 'q_id'));
    }

    if (selectChildQuestionId === 0) {
      setShowMoreSection(true);
    }

    if (!value) setShowMoreSection(false);
  };

  useEffect(() => {
    // Check if get section 1 question api success then store this question in local state
    if (getQuestions?.data?.length > 0) {
      const allData = getFormatQuestions(getQuestions?.data, false, null, true);
      const updateLang = getLanguageFormat(allData, language, null);
      setData(updateLang);
    }

    // Check is user not any draft data then store first question store
    if (
      getQuestions?.data?.length > 0 &&
      !(responseData?.data?.Latest_Response ?? responseData?.data?.Latest_response)
    ) {
      const allData = getFormatQuestions(getQuestions?.data, false, null, true);
      const updateLang = getLanguageFormat(allData, language, null);
      const showData = updateLang.filter((d) => d.show);
      setAns(getUniqueListBy(showData, 'q_id'));
    }

    // If user save draft or review form open then save ans data
    if (responseData?.data?.Latest_Response || responseData?.data?.Latest_response) {
      const apiRes = responseData?.data?.Latest_Response || responseData?.data?.Latest_response;
      if (apiRes?.s1?.length > 0) setAns(apiRes.s1 || []);
    }
  }, [getQuestions.data, language, responseData?.data]);

  useEffect(() => {
    setTimeout(() => {
      // When user select any question ans then show next option  and scroll to display which place render new options
      const div = document.getElementById('lastShow');
      if (div) div.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
    }, 200);
  }, [ans.length]);

  return (
    <div>
      <CollapseFrame
        title={t('selfAssessment.assessmentForm.section1_Standard')}
        active
        isDisabled={isDisabled}
      >
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

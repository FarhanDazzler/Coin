import React, { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { question1EditLoadingListSelector } from '../../../redux/Questions/QuestionsSelectors';
import {
  addSection1OptionQuestions,
  deleteSection1QuestionsOption,
  getSection1Questions,
  updateOptionSection1Questions,
  updateSection1Questions,
} from '../../../redux/Questions/QuestionsAction';
import blockType from '../../RenderBlock/constant';
import { v4 as uuidv4 } from 'uuid';
import CustomModal from '../CustomModal';
import { Form } from 'react-bootstrap';
import { TranslateType } from '../../../pages/QuestionBank/ModifyStandard/AddSection1Question';
import { Loader } from '@mantine/core';
import Button from '../Button';
import EditSection1QuestionChangeLangDesign from './EditSection1QuestionChangeLangDesign';
import { getSection1QuestionTranslationDataAction } from '../../../redux/QuestionBank/QuestionBankAction';

const EditSection1QuestionChangeLang = ({
  showEditModal,
  block: apiBlock = {},
  setShowEditModal,
  allQuestions,
  isChangeLang,
}) => {
  const dispatch = useDispatch();
  const [block, setBlock] = useState(apiBlock);
  const [question, setQuestion] = useState();
  const [questionOptions, setQuestionOptions] = useState([]);
  const [options, setOptions] = useState([]);
  const [freeTextChildQId, setFreeTextChildQId] = useState('');
  const question1EditLoadingList = useSelector(question1EditLoadingListSelector);
  const [isFailedFreeText, setIsFailedFreeText] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const section1GetQuestionTranslation = useSelector(
    (state) => state?.section1QuestionData?.section1GetQuestionTranslation,
  );
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('English');
  console.log('block');

  useEffect(() => {
    if (questionOptions.length > 0) setFreeTextChildQId(questionOptions[0].child_question);
  }, [questionOptions]);

  useEffect(() => {
    setLoading(section1GetQuestionTranslation.loading);
  }, [section1GetQuestionTranslation.loading]);

  useEffect(() => {
    if (saveLoading && question1EditLoadingList.length === 0) {
      dispatch(getSection1Questions({ Control_ID: 'Standard', disabledLoading: true }));
      setSaveLoading(false);
      setShowEditModal(false);
    }
  }, [question1EditLoadingList]);

  const handleChangeQuestion = (value) => {
    setQuestion(value);
  };

  useEffect(() => {
    if (
      [blockType.TEXT, blockType.IS_AD].includes(apiBlock.question_type) &&
      apiBlock.options?.length > 0
    ) {
      setIsFailedFreeText(!!apiBlock.options[0]?.is_Failing);
    }
  }, [apiBlock.options]);

  // useEffect(() => {
  //   dispatch(getSection1QuestionTranslationDataAction([block?.q_id, language]));
  // }, [block?.q_id, language]);

  useEffect(() => {
    setBlock(apiBlock);
  }, [apiBlock]);

  useEffect(() => {
    if (block.hasOwnProperty('options')) {
      setQuestionOptions(block.options);
    }
  }, [block.options]);

  useEffect(() => {
    if (block.hasOwnProperty('question_text')) {
      setQuestion(block.question_text);
    }
  }, [block.question_text]);

  const handleChangeOption = (val, opBlock) => {
    const updateOp = questionOptions.map((qOp) => {
      if (qOp.option_id === opBlock.option_id) {
        return { ...qOp, option_value: val, isEdit: true };
      }
      return { ...qOp };
    });

    setQuestionOptions(updateOp);
  };

  const handleSaveQuestion = () => {
    let isApiCall = false;
    if (apiBlock.question_text !== question || apiBlock.question_type !== block.question_type) {
      isApiCall = true;
      const is_AD = block.question_type === 'Is AD';
      dispatch(
        updateSection1Questions({
          q_id: apiBlock.q_id,
          Control_ID: apiBlock.Control_ID,
          question_text: question,
          question_type: block.question_type,
          is_AD: is_AD ? 1 : 0,
          loadingId: `${uuidv4()}-updateSection1Questions`,
        }),
      );
    }

    if ([blockType.TEXT, blockType.IS_AD].includes(block.question_type)) {
      const payload = {
        q_id: apiBlock.q_id,
        child_question: freeTextChildQId,
        is_Terminating: 0,
        option_value: '',
        is_Failing: isFailedFreeText,
      };
      if (freeTextChildQId === 'is_Terminating') {
        payload.child_question = 0;
        payload.is_Terminating = 1;
      }
      if (block.options.length > 0 && !block.options[0].isNew) {
        payload.option_id = block.options[0].option_id;
        if (block.options[0].child_question !== freeTextChildQId) {
          isApiCall = true;
          dispatch(
            updateOptionSection1Questions({
              editArray: [{ ...payload }],
              loadingId: `${uuidv4()}-updateOptionSection1Questions`,
            }),
          );
        }
      } else {
        isApiCall = true;
        dispatch(
          addSection1OptionQuestions({
            addArray: [{ ...payload }],
            loadingId: `${uuidv4()}-addSection1OptionQuestions`,
          }),
        );
      }
    }

    if (block.question_type !== apiBlock.question_type) {
      if (block.question_type === blockType.TEXT) {
        block.options.shift();
        block.options.forEach(({ option_id }, i) => {
          isApiCall = true;
          dispatch(
            deleteSection1QuestionsOption({
              option_id,
              loadingId: `${uuidv4()}-deleteSection1QuestionsOption--${i}`,
            }),
          );
        });
      }
    }

    const editArray = questionOptions
      .filter((q) => q.isEdit && !q.isNew)
      ?.map((b_val) => {
        const payload = {
          q_id: apiBlock.q_id,
          option_id: b_val.option_id,
          option_value: b_val.option_value,
          child_question: b_val.child_question,
          is_Terminating: 0,
          is_Failing: b_val.is_Failing,
        };
        if (b_val.child_question === 'is_Terminating') {
          payload.child_question = 0;
          payload.is_Terminating = 1;
        }
        return payload;
      });
    if (editArray.length > 0) {
      isApiCall = true;
      dispatch(
        updateOptionSection1Questions({
          editArray,
          loadingId: `${uuidv4()}-updateOptionSection1Questions`,
        }),
      );
    }

    const addArray = questionOptions
      .filter((q) => q.isNew)
      ?.map((b_val) => {
        const payload = {
          q_id: apiBlock.q_id,
          option_value: b_val.option_value,
          child_question: b_val.child_question,
          is_Terminating: 0,
          is_Failing: b_val.is_Failing,
        };
        if (b_val.child_question === 'is_Terminating') {
          payload.child_question = 0;
          payload.is_Terminating = 1;
        }

        return payload;
      });
    if (addArray.length > 0) {
      isApiCall = true;
      dispatch(
        addSection1OptionQuestions({
          addArray,
          loadingId: `${uuidv4()}-addSection1OptionQuestions`,
        }),
      );
    }
    if (isApiCall) {
      setSaveLoading(true);
    } else {
      setShowEditModal(false);
    }
  };

  useEffect(() => {
    if (allQuestions.length > 0) {
      const op = allQuestions
        ?.map((allQ, i) => {
          return { label: `${i + 1}. ${allQ.question_text}`, value: allQ.q_id };
        })
        ?.filter((q) => q.value !== block.q_id);
      setOptions([
        ...op,
        { label: 'End of survey', value: 'is_Terminating' },
        { label: 'End of section', value: 0 },
      ]);
    }
  }, [allQuestions]);

  return (
    <CustomModal
      open={showEditModal === block.q_id}
      onClose={() => setShowEditModal(false)}
      width={1200}
      title="Change Question Language"
      bodyClassName="p-0"
    >
      <div>
        <div className="d-flex">
          <div className="p-5 w-full">
            <div style={{ height: 50 }} />
            <EditSection1QuestionChangeLangDesign
              question={question}
              block={block}
              freeTextChildQId={freeTextChildQId}
              questionOptions={questionOptions}
              options={options}
            />
          </div>

          <div className="p-5 w-full">
            <div className="d-flex justify-content-end">
              <Form.Group className="input-group mb-3" style={{ maxWidth: 193 }}>
                <Form.Control
                  as="select"
                  name=""
                  placeholder=""
                  className="form-select"
                  onChange={(val) => setLanguage(val)}
                  value={language}
                >
                  <option value="" disabled>
                    Select language
                  </option>
                  {TranslateType.map((data, i) => (
                    <option value={data?.value} key={i}>
                      {data?.label}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </div>
            {loading ? (
              <div className="question-loader">
                <Loader />
              </div>
            ) : (
              <EditSection1QuestionChangeLangDesign
                question={question}
                block={block}
                handleChangeQuestion={handleChangeQuestion}
                freeTextChildQId={freeTextChildQId}
                setFreeTextChildQId={setFreeTextChildQId}
                questionOptions={questionOptions}
                handleChangeOption={handleChangeOption}
                options={options}
              />
            )}
          </div>
        </div>

        <div className="footer-action">
          <div className="d-flex align-items-center justify-content-between">
            <div />
            <div>
              <Button variant="outlined" color="secondary" onClick={() => setShowEditModal(null)}>
                Cancel
              </Button>
              <Button
                disabled={saveLoading}
                color="neutral"
                className="ml-4"
                onClick={handleSaveQuestion}
              >
                {saveLoading ? <Loader size={22} /> : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};
export default memo(EditSection1QuestionChangeLang);

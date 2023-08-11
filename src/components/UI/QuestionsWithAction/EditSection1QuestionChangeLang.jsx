import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { question1EditLoadingListSelector } from '../../../redux/Questions/QuestionsSelectors';
import { getSection1Questions } from '../../../redux/Questions/QuestionsAction';
import blockType from '../../RenderBlock/constant';
import CustomModal from '../CustomModal';
import { Form } from 'react-bootstrap';
import { TranslateType } from '../../../pages/QuestionBank/ModifyStandard/AddSection1Question';
import { Loader } from '@mantine/core';
import Button from '../Button';
import EditSection1QuestionChangeLangDesign from './EditSection1QuestionChangeLangDesign';
import {
  editSection1QuestionTranslationDataAction,
  getSection1QuestionTranslationDataAction,
} from '../../../redux/QuestionBank/QuestionBankAction';
import { languageToTextKey } from '../../../utils/helper';

const EditSection1QuestionChangeLang = ({
  showEditModal,
  block: apiBlock = {},
  setShowEditModal,
  allQuestions,
  number,
  section1QuestionsData,
  setSection1QuestionsData,
}) => {
  const dispatch = useDispatch();
  const [block, setBlock] = useState(apiBlock);
  const [blockLang, setBlockLang] = useState(apiBlock);
  const [question, setQuestion] = useState();
  const [questionLang, setQuestionLang] = useState();
  const [questionOptions, setQuestionOptions] = useState([]);
  const [questionOptionsLang, setQuestionOptionsLang] = useState([]);
  const [options, setOptions] = useState([]);
  const [freeTextChildQId, setFreeTextChildQId] = useState('');
  const question1EditLoadingList = useSelector(question1EditLoadingListSelector);
  const [saveLoading, setSaveLoading] = useState(false);
  const section1GetQuestionTranslation = useSelector(
    (state) => state?.section1QuestionData?.section1GetQuestionTranslation,
  );
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('');
  const [isChange, setIsChange] = useState(false);

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
    setIsChange(true);
    setQuestionLang(value);
  };

  useEffect(() => {
    dispatch(getSection1QuestionTranslationDataAction([block?.q_id, language]));
  }, [block?.q_id, language]);

  useEffect(() => {
    const questionKey = languageToTextKey(language) + 'question_text';
    const obj = { ...apiBlock, question_text: apiBlock[questionKey] };
    setQuestionLang(apiBlock[questionKey]);
    setBlockLang(obj);
    const optionKey = languageToTextKey(language) + 'option_value';
    setQuestionOptionsLang(apiBlock.options.map((d) => ({ ...d, option_value: d[optionKey] })));
  }, [apiBlock, section1GetQuestionTranslation.data]);

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
    setIsChange(true);
    const updateOp = questionOptionsLang.map((qOp) => {
      if (qOp.option_id === opBlock.option_id) {
        return { ...qOp, option_value: val, isEdit: true };
      }
      return { ...qOp };
    });
    setQuestionOptionsLang(updateOp);
  };

  const handleSaveQuestion = () => {
    const questionKey = languageToTextKey(language) + 'question_text';
    if (isChange) {
      const payload = {
        question: {
          q_id: block.q_id,
          language: language,
          Control_ID: block.Control_ID,
          [questionKey]: questionLang,
        },
      };
      const optionKey = languageToTextKey(language) + 'option_value';
      if ([blockType.RADIO, blockType.DROPDOWN].includes(block.question_type)) {
        payload.options = questionOptionsLang.map((data) => {
          return {
            option_id: data.option_id,
            language: language,
            [optionKey]: data.option_value,
            q_id: data.q_id,
          };
        });
      }
      dispatch(editSection1QuestionTranslationDataAction(payload));
    }
    setShowEditModal(false);
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
          <div className="p-5 w-50 border-right">
            <h3 className="text-str">Q.{number} in English</h3>
            <EditSection1QuestionChangeLangDesign
              question={question}
              block={block}
              freeTextChildQId={freeTextChildQId}
              questionOptions={questionOptions}
              options={options}
            />
          </div>

          <div className="p-5 w-50">
            <div className="d-flex justify-content-end">
              <Form.Group className="input-group mb-3" style={{ maxWidth: 193 }}>
                <Form.Control
                  as="select"
                  name=""
                  placeholder=""
                  className="form-select"
                  onChange={({ target: { value } }) => {
                    setLanguage(value);
                  }}
                  value={language}
                >
                  <option value="" disabled>
                    Select Language
                  </option>
                  {TranslateType.map((data, i) => (
                    <option value={data?.value} key={i}>
                      {data?.label}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </div>
            {language ? (
              <>
                {loading ? (
                  <div className="question-loader">
                    <Loader />
                  </div>
                ) : (
                  <EditSection1QuestionChangeLangDesign
                    question={questionLang}
                    block={blockLang}
                    handleChangeQuestion={handleChangeQuestion}
                    freeTextChildQId={freeTextChildQId}
                    questionOptions={questionOptionsLang}
                    handleChangeOption={handleChangeOption}
                    options={options}
                    questionText="Provide question translation in the selected language"
                    questionOptionText="Provide option translation in the selected language"
                  />
                )}{' '}
              </>
            ) : (
              <div className="no-data-placeholder">
                <p>Select Language</p>
              </div>
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

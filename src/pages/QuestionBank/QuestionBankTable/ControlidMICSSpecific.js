import React, { useEffect, useState } from 'react';
import Radio from '../../../components/UI/Radio';
import Button from '../../../components/UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { question3Selector } from '../../../redux/Questions/QuestionsSelectors';
import { getSection3Questions } from '../../../redux/Questions/QuestionsAction';
import { getFormatQuestions, getQuestionsFormatData } from '../../../utils/helper';
import FormLabel from '@mui/material/FormLabel';

const ControlidMICSSpecific = ({ handleClose, selectedControlId }) => {
  const dispatch = useDispatch();
  const [section3, setSection3] = useState([]);
  const questionData = useSelector(question3Selector);
  useEffect(() => {
    dispatch(getSection3Questions({ Level: '', Control_ID: selectedControlId }));
  }, [selectedControlId]);
  console.log(section3.length);

  useEffect(() => {
    if (questionData.data.length > 0) {
      const apiQuestion = getQuestionsFormatData(questionData.data);
      setSection3(getFormatQuestions(apiQuestion, 'isQuestionEdit'));
      return;
    }
    setSection3([]);
  }, [questionData.data]);

  return (
    <div className="w-100">
      <div className="pt-5">
        <div className="pt-5 px-4 ">
          {section3.map((data, i) => (
            <div className="radio-multi-wrapper renderBlockWrapper">
              <div className="radio-wrapper">
                <div className="d-flex align-items-center w-100 justify-content-between">
                  <FormLabel>
                    {data.question_text} {`(Level - ${data.Level})`}
                  </FormLabel>
                </div>
              </div>
              <div className="first-three-options mt-3">
                {data.renderOption.map((firstOption, i) => {
                  return (
                    <div className="mb-2" key={i}>
                      <Radio
                        disabled={true}
                        block={firstOption}
                        formControlProps={{ className: 'radio-wrapper side-by-side-radio-wrapper' }}
                        radioGroupProps={{
                          className: 'side-by-side-radio',
                        }}
                        formLabelProps={{ className: 'side-by-side-radio-label' }}
                        label={firstOption.label}
                        options={firstOption.options}
                        value={firstOption.value}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          {section3.length == 0 && <p>No Question Found</p>}
        </div>
      </div>
      <div>
        <div className="d-flex align-items-center justify-content-end">
          <Button color="silver" className="ml-2" onClick={handleClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ControlidMICSSpecific;

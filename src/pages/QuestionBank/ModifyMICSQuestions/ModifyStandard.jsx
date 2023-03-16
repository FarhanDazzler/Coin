import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import QuestionsWithAction from '../../../components/UI/QuestionsWithAction';
import { questions } from '../CreateQuestions/constant';
import { useDispatch, useSelector } from 'react-redux';
import { getSection1Questions } from '../../../redux/Questions/QuestionsAction';
import { question1Selector } from '../../../redux/Questions/QuestionsSelectors';
import { Loader } from 'semantic-ui-react';

const ModifyStandard = () => {
  const dispatch = useDispatch();
  const question1Info = useSelector(question1Selector);
  const [section1, setSection1] = useState(questions);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getSection1Questions({ Control_ID: 'Standard' }));
  }, []);

  const handleDelete = ({ q_id }) => {
    const deleteUpdateArray = section1.filter((val) => val.q_id !== q_id);
    setSection1(deleteUpdateArray);
  };

  useEffect(() => {
    const editQuestionDate = question1Info.data.map((data) => {
      return data;
    });

    setSection1(editQuestionDate);
  }, [question1Info.data]);

  useEffect(() => {
    setLoading(question1Info.loading);
  }, [question1Info.loading]);

  if (loading) {
    return (
      <div className="p-9 d-flex align-items-center justify-content-center mt-7 mb-7">
        <Loader />
      </div>
    );
  }
  return (
    <div className={'pt-5'}>
      <Alert severity="info" className="warningAlert">
        Any modifications to Standard Questions will reflect in all assessments & surveys.
      </Alert>

      <div className="pt-5">
        {section1.map((data, i) => (
          <QuestionsWithAction
            key={data.q_id}
            block={data}
            number={i + 1}
            text={data.question_text}
            withAction
            active
            handleDelete={handleDelete}
            allQuestions={section1}
            // handleSave={handleSave}
          />
        ))}
      </div>
    </div>
  );
};

export default ModifyStandard;

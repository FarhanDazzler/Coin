import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRepositoryOfControlIDSelector,
  question3Selector,
} from '../../../redux/Questions/QuestionsSelectors';
import {
  addSection3Questions,
  addSection3QuestionsChangeLang,
  deleteSection3Questions,
  getSection3Questions,
  updateSection3Questions,
} from '../../../redux/Questions/QuestionsAction';
import Swal from 'sweetalert2';
import {
  getFormatQuestions,
  getQuestionsFormatData,
  getQuestionsWithLangFormatData,
  languageToTextKey,
} from '../../../utils/helper';
import blockType from '../../../components/RenderBlock/constant';
import Section3MICSSpecific from '../../QuestionBank/Section3MICSSpecific';
import FormControl from '@mui/material/FormControl';
import Select from 'react-select';
import Button from '../../../components/UI/Button';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 340,
    },
  },
};

const MICSSpecificChangeLanguage = () => {
  const dispatch = useDispatch();
  const [level, setLevel] = useState(['L1']);
  const [section3, setSection3] = useState([]);
  const questionData = useSelector(question3Selector);
  const [control_ID, setControl_ID] = useState(['']);
  const [isEdit, setIsEdit] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [controlIDList, setControlIDList] = useState([]);
  const repositoryOfControlID = useSelector(getRepositoryOfControlIDSelector);

  useEffect(() => {
    if (repositoryOfControlID?.data.length !== 0) {
      let controlidArray = [];
      repositoryOfControlID?.data.map((data) => {
        controlidArray.push({ label: data.Control_ID, value: data.Control_ID });
      });
      setControlIDList(controlidArray);
    }
  }, [repositoryOfControlID]);

  useEffect(() => {
    if (level[0] && control_ID.value)
      dispatch(getSection3Questions({ Level: level[0], Control_ID: control_ID.value }));
  }, [level, control_ID]);

  const handleChangeLevel = (event) => {
    const {
      target: { value },
    } = event;
    if (isEdit) {
      Swal.fire({
        icon: 'info',
        html: 'There are some changes available? do you want to discard changes?',
        confirmButtonText: 'Yes',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          setControl_ID(typeof value === 'string' ? value.split(',') : value);
        }
      });
      return;
    }
    setLevel(typeof value === 'string' ? value.split(',') : value);
  };

  const handleChange = (value) => {
    if (isEdit) {
      Swal.fire({
        icon: 'info',
        html: 'There are some changes available? do you want to discard changes?',
        confirmButtonText: 'Yes',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          setControl_ID(typeof value === 'string' ? value.split(',') : value);
        }
      });
      return;
    }
    setControl_ID(typeof value === 'string' ? value.split(',') : value);
  };

  const handleChangeRenderBlock = (value, innerBlock, block) => {
    if (value === 'delete') {
      const updateSection3 = section3.filter((section) => section.Control_ID !== block.Control_ID);
      setSection3(updateSection3);
      if (questionData.data.length > 0)
        dispatch(deleteSection3Questions({ Control_ID: control_ID.value, Level: level[0] }));
      return;
    }
    setIsEdit(true);
    switch (block.question_type) {
      case blockType.RADIO_MULTI:
        const updateRadioMultiData = section3.map((val) => {
          if (val.q_id === block.q_id) {
            return { ...val, ...value, Header_Question: value.label };
          }
          return { ...val };
        });
        const formatData = getFormatQuestions(updateRadioMultiData, 'isQuestionEdit');
        setSection3(formatData);
        const payload = formatData.map((d) => {
          const keyQuestion = languageToTextKey(value.language) + 'Header_Question';
          const keyOption = languageToTextKey(value.language) + 'Inner_Questions';
          return {
            language: value.language,
            Level: value.Level,
            Control_ID: value.Control_ID,
            [keyQuestion]: d[keyQuestion],
            [keyOption]: JSON.stringify(d.innerOptions),
          };
        });
        dispatch(addSection3QuestionsChangeLang(payload));
        return;
    }
  };

  useEffect(() => {
    if (Object.keys(questionData?.data || {})?.length > 0) {
      const apiQuestion = getQuestionsWithLangFormatData(questionData.data, true);
      setSection3(getFormatQuestions(apiQuestion, 'isQuestionEdit'));
      return;
    }
    setSection3([]);
  }, [questionData.data]);

  useEffect(() => {
    if (section3.length > 0) {
      setShowAddQuestion(false);
    } else {
      setShowAddQuestion(true);
    }
  }, [section3]);

  return (
    <div className="w-100">
      <div className="pt-5">
        <Section3MICSSpecific
          level={level}
          handleChangeLevel={handleChangeLevel}
          section3={section3}
          handleChangeRenderBlock={handleChangeRenderBlock}
          inputCenter
          isChangeLang
          moreOptions={
            <div className="select-light mr-4">
              <FormControl sx={{ width: 300 }}>
                <Select
                  className="controlIdSelect"
                  maxMenuHeight={200}
                  placeholder="Control ID * "
                  value={control_ID}
                  onChange={handleChange}
                  MenuProps={MenuProps}
                  inputProps={{ 'aria-label': 'Without label' }}
                  options={controlIDList}
                />
              </FormControl>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default MICSSpecificChangeLanguage;

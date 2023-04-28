import React, { useEffect, useState } from 'react';
import Section3MICSSpecific from '../Section3MICSSpecific';
import FormControl from '@mui/material/FormControl';
import Select from '../../../components/UI/Select/Select';
import { names } from '../CreateQuestions/constant';
import Button from '../../../components/UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { question3Selector } from '../../../redux/Questions/QuestionsSelectors';
import {
  addSection3Questions,
  deleteSection3Questions,
  getSection3Questions,
  updateSection3Questions,
} from '../../../redux/Questions/QuestionsAction';
import Swal from 'sweetalert2';
import { getFormatQuestions, getQuestionsFormatData } from '../../../utils/helper';
import blockType from '../../../components/RenderBlock/constant';

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

const ControlidMICSSpecific = ({ handleClose, selectedControlId }) => {
  const dispatch = useDispatch();
  const [level, setLevel] = useState(['L1']);
  const [section3, setSection3] = useState([]);
  const questionData = useSelector(question3Selector);
  const [control_ID, setControl_ID] = useState(['']);
  const [isEdit, setIsEdit] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const selectedControlIdOption = [
    { label:selectedControlId, value: selectedControlId }
  ];
  useEffect(() => {
      dispatch(getSection3Questions({ Level: level[0], Control_ID: selectedControlId }));
  }, [level, selectedControlId]);

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

  const handleChange = (event) => {
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
    setControl_ID(typeof value === 'string' ? value.split(',') : value);
  };

  const handleAddQuestion = () => {
    const payload = {
      Control_ID: control_ID[0],
      Header_Question: 'Header question title',
      Inner_Questions: '',
      Level: level[0],
    };
    // dispatch(addSection3Questions(payload));
    setIsEdit(true);
    const newDataQuestion = getQuestionsFormatData([payload]);
    setSection3(getFormatQuestions(newDataQuestion, 'isQuestionEdit'));
  };

  const handleSaveQuestion = (saveWithCloseModal = true) => {
    if (section3.length > 0 && isEdit) {
      const payload = {
        Header_Question: section3[0].label,
        Inner_Questions: JSON.stringify(section3[0].innerOptions),
        Level: level[0],
        Control_ID: control_ID[0],
      };
      if (questionData.data.length > 0) {
        dispatch(updateSection3Questions(payload));
      } else {
        dispatch(addSection3Questions(payload));
      }
      setIsEdit(false);
      if (saveWithCloseModal) handleClose();
    }
  };

  const handleChangeRenderBlock = (value, innerBlock, block) => {
    if (value === 'delete') {
      const updateSection3 = section3.filter((section) => section.Control_ID !== block.Control_ID);
      setSection3(updateSection3);
      if (questionData.data.length > 0)
        dispatch(deleteSection3Questions({ Control_ID: control_ID[0], Level: level[0] }));
      return;
    }
    setIsEdit(false);
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
        return;
    }
  };

  useEffect(() => {
    if (questionData.data.length > 0) {
      const apiQuestion = getQuestionsFormatData(questionData.data);
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
          moreOptions={
            <div className="select-light mr-4">
              <FormControl sx={{ width: 300 }}>
                <Select
                  placeholder="Control ID * "
                  value={selectedControlId}
                  onChange={handleChange}
                  MenuProps={MenuProps}
                  inputProps={{ 'aria-label': 'Without label' }}
                  options={selectedControlIdOption}
                />
              </FormControl>
            </div>
          }
        />
      </div>
        <div>
          <div>
            
          </div>
          <div className="d-flex align-items-center justify-content-end">
            <Button className="ml-2" color="secondary" onClick={handleClose}>
              Ok
            </Button>
            
          </div>
        </div>
      
    </div>
  );
};

export default ControlidMICSSpecific;

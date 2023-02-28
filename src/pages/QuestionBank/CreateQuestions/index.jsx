import React, { useEffect, useState } from 'react';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import FormControl from '@mui/material/FormControl';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import './createQuestionsStyles.scss';
import { levels, names, questions, tableHeader } from './constant';
import { ReactComponent as ExportExcel } from '../../../assets/images/ExportExcel.svg';
import { ReactComponent as UploadFile } from '../../../assets/images/UploadFile.svg';
import blockType from '../../../components/RenderBlock/constant';
import { getFormatQuestions, getQuestionsFormatData } from '../../../utils/helper';
import CustomModal from '../../../components/UI/CustomModal';
import Select from '../../../components/UI/Select/Select';
import CollapseFrame from '../../../components/UI/CollapseFrame';
import QuestionsWithAction from '../../../components/UI/QuestionsWithAction';
import Button from '../../../components/UI/Button';
import RenderBlock from '../../../components/RenderBlock';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSection3Questions,
  deleteSection3Questions,
  getSection3Questions,
  updateSection3Questions,
} from '../../../redux/Questions/QuestionsAction';
import { questionSelector } from '../../../redux/Questions/QuestionsSelectors';
import { Loader } from 'semantic-ui-react';

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

const CreateQuestions = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [section1, setSection1] = useState(questions);
  const [control_ID, setControl_ID] = useState(['']);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [level, setLevel] = useState(['L1']);
  const questionData = useSelector(questionSelector);
  const [section3, setSection3] = useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setControl_ID(typeof value === 'string' ? value.split(',') : value);
  };

  const handleChangeLevel = (event) => {
    const {
      target: { value },
    } = event;
    setLevel(typeof value === 'string' ? value.split(',') : value);
  };

  useEffect(() => {
    const div = document.getElementById('loader');
    if (div) div.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [questionData.loading]);

  useEffect(() => {
    if (questionData.data.length > 0) {
      const apiQuestion = getQuestionsFormatData(questionData.data);
      setSection3(getFormatQuestions(apiQuestion, 'isQuestionEdit'));
      setShowAddQuestion(false);
      return;
    }
    setSection3([]);
    setShowAddQuestion(true);
  }, [questionData.data]);

  useEffect(() => {
    if (control_ID[0] && level[0]) {
      dispatch(getSection3Questions({ Level: level[0], Control_ID: control_ID[0] }));
    }
  }, [control_ID, level]);

  const handleChangeRenderBlock = (value, innerBlock, block) => {
    if (value === 'delete') {
      const updateSection3 = section3.filter((section) => section.Control_ID !== block.Control_ID);
      setSection3(updateSection3);
      dispatch(deleteSection3Questions({ Control_ID: control_ID[0], Level: level[0] }));
      if (updateSection3.length === 0) {
        setShowAddQuestion(true);
      }
      return;
    }
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

  const handleSaveQuestion = () => {
    if (section3.length > 0) {
      const payload = {
        Header_Question: section3[0].label,
        Inner_Questions: JSON.stringify(section3[0].innerOptions),
        Level: level[0],
        Control_ID: control_ID[0],
      };
      dispatch(updateSection3Questions(payload));
      handleClose();
    }
  };

  const handleAddQuestion = () => {
    const payload = {
      Control_ID: control_ID[0],
      Header_Question: 'Header question title',
      Inner_Questions: '',
      Level: level[0],
    };
    dispatch(addSection3Questions(payload));

    const newDataQuestion = getQuestionsFormatData([payload]);
    setSection3(getFormatQuestions(newDataQuestion, 'isQuestionEdit'));
  };

  return (
    <div>
      <CustomModal
        open={open}
        title={
          <span>
            <AccessTimeOutlinedIcon className="mr-3" />
            Create Questions for New MICS
          </span>
        }
        width={1080}
        onClose={handleClose}
      >
        <div className="select-light">
          <FormControl sx={{ width: 300 }}>
            <Select
              placeholder="Control ID * "
              value={control_ID}
              onChange={handleChange}
              MenuProps={MenuProps}
              inputProps={{ 'aria-label': 'Without label' }}
              options={names}
            />
          </FormControl>
        </div>

        <div className="questions-list-main-wrapper">
          <CollapseFrame
            title="Section 1 : Standard "
            centerText={
              <p className="d-flex m-0 align-items-center">
                <InfoOutlinedIcon className="mr-1" /> Standard questions will be common and included
                in all new surveys
              </p>
            }
          >
            <div className="pt-5">
              {section1.map((data, i) => (
                <QuestionsWithAction number={i + 1} text={data.question} />
              ))}
            </div>
          </CollapseFrame>

          <CollapseFrame title="Section 2 : KPI ">
            <div className="pt-5 px-4" style={{ opacity: 0.5 }}>
              <div className="d-flex w-100 align-items-center justify-content-between">
                <p className="mb-0 table-section-title">Excel File Upload and Download</p>
                <div className="d-flex align-items-center">
                  <Button color="success" startIcon={<ExportExcel />} className="button-radius-8">
                    Export to Excel
                  </Button>
                  <Button
                    color="silver"
                    startIcon={<UploadFile />}
                    className="ml-3 button-radius-8"
                  >
                    Export to Excel
                  </Button>
                </div>
              </div>

              <div className="table-view-wrapper">
                <div className="d-flex align-items-center">
                  {tableHeader.map((val) => (
                    <div className="table-header-cell">{val}</div>
                  ))}
                </div>
              </div>
            </div>
          </CollapseFrame>

          <CollapseFrame title="Section 3 : MICS-Specific" active>
            <div className="pt-5 px-4">
              <div className="select-light">
                <FormControl sx={{ width: 300 }}>
                  <Select
                    value={level}
                    onChange={handleChangeLevel}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>Placeholder</em>;
                      }
                      return selected.join(', ');
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                    options={levels}
                  />
                </FormControl>
              </div>

              <div className="pt-5">
                {questionData.loading ? (
                  <div className="d-flex w-100 justify-content-center pt-4" id="loader">
                    <Loader />
                  </div>
                ) : (
                  <div className="d-flex align-items-center">
                    <RenderBlock blocks={section3} handleChange={handleChangeRenderBlock} />
                  </div>
                )}
              </div>
            </div>
          </CollapseFrame>

          <div>
            <div>
              {showAddQuestion && !questionData.loading && (
                <Button
                  color="secondary"
                  className="ml-2"
                  onClick={handleAddQuestion}
                  disabled={!control_ID[0]}
                >
                  Add Question
                </Button>
              )}
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <Button variant="text" color="secondary" onClikc={handleClose}>
                Cancel
              </Button>
              <Button
                color="secondary"
                className="ml-2"
                disabled={!control_ID[0]}
                onClick={handleSaveQuestion}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default CreateQuestions;

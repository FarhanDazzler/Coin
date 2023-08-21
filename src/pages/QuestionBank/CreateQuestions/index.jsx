import React, { useEffect, useState } from 'react';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import './createQuestionsStyles.scss';
import { questions, tableHeader } from './constant';
import { ReactComponent as ExportExcel } from '../../../assets/images/ExportExcel.svg';
import { ReactComponent as UploadFile } from '../../../assets/images/UploadFile.svg';
import blockType from '../../../components/RenderBlock/constant';
import { getFormatQuestions, getQuestionsFormatData } from '../../../utils/helper';
import CustomModal from '../../../components/UI/CustomModal';
//import Select from '../../../components/UI/Select/Select';
import CollapseFrame from '../../../components/UI/CollapseFrame';
import QuestionsWithAction from '../../../components/UI/QuestionsWithAction';
import Button from '../../../components/UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSection3Questions,
  deleteSection3Questions,
  getSection3Questions,
  updateSection3Questions,
} from '../../../redux/Questions/QuestionsAction';
import { question3Selector } from '../../../redux/Questions/QuestionsSelectors';
import Swal from 'sweetalert2';
import Section3MICSSpecific from '../Section3MICSSpecific';
import {
  getRepositoryOfControlIDSelector,
  getControlNameFromControlIDSelector,
} from '../../../redux/Questions/QuestionsSelectors';
import Select from 'react-select';
import { Form } from 'react-bootstrap';
import { getControlNameFromControlId } from '../../../redux/Questions/QuestionsAction';
import { useMsal } from '@azure/msal-react';
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
  const { accounts } = useMsal();
  const dispatch = useDispatch();
  const [section1, setSection1] = useState(questions);
  const [control_ID, setControl_ID] = useState(['']);
  const [controlIDOption, setControlIDOption] = useState();
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [level, setLevel] = useState(['L1']);
  const [isEdit, setIsEdit] = useState(false);
  const questionData = useSelector(question3Selector);
  const [section3, setSection3] = useState([]);
  const [controlIDList, setControlIDList] = useState([]);
  const [activeData, setActiveData] = useState([]);
  const repositoryOfControlID = useSelector(getRepositoryOfControlIDSelector);
  const controlNameFromControlIDState = useSelector(getControlNameFromControlIDSelector);

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
    if (control_ID[0]) {
      let payload = {
        ControlID: control_ID[0],
      };

      dispatch(getControlNameFromControlId(payload));
    }
  }, [control_ID[0]]);
  const handleChange = (event) => {
    const value = event.value;
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
    setControlIDOption(event);
  };

  useEffect(() => {
    if (section3.length > 0) {
      setShowAddQuestion(false);
    } else {
      setShowAddQuestion(true);
    }
  }, [section3]);

  const handleChangeLevel = (event) => {
    const {
      target: { value },
    } = event;
    if (isEdit) {
      Swal.fire({
        icon: 'info',
        html: 'There are some changes available? do you want to discard changes',
        showCancelButton: true,
        confirmButtonText: 'Yes',
      }).then((result) => {
        if (result.isConfirmed) {
          setLevel(typeof value === 'string' ? value.split(',') : value);
        }
      });
      return;
    }
    setLevel(typeof value === 'string' ? value.split(',') : value);
  };

  useEffect(() => {
    const div = document.getElementById('loader');
    if (div) div.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [questionData.loading]);

  useEffect(() => {
    if (Object.keys(questionData.data)?.length > 0) {
      const apiQuestion = getQuestionsFormatData(questionData.data);
      const currentData = apiQuestion.filter((d) => d.Level === level[0]);
      setActiveData(currentData);
      setSection3(getFormatQuestions(currentData, 'isQuestionEdit'));
      return;
    }
    setSection3([]);
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
      if (Object.keys(questionData.data)?.length > 0)
        dispatch(deleteSection3Questions({ Control_ID: control_ID[0], Level: level[0] }));
      if (updateSection3.length === 0) {
        setShowAddQuestion(true);
      }
      return;
    }
    setIsEdit(true);
    switch (block.question_type) {
      case blockType.RADIO_MULTI:
        const updateRadioMultiData = section3.map((val) => {
          const isIdMatch = val.q_id ? val.q_id === block.q_id : false;
          const isLevelMatch = val.Level ? val.Level === block.Level : false;
          if (isIdMatch || isLevelMatch) {
            return { ...val, ...value, Header_Question: value.label };
          }
          return { ...val };
        });
        const formatData = getFormatQuestions(updateRadioMultiData, 'isQuestionEdit');
        setSection3(formatData);
        return;
    }
  };

  const handleSaveQuestion = (saveWithCloseModal = true) => {
    if (section3.length > 0) {
      const payload = {
        Header_Question: section3[0].label,
        Inner_Questions: JSON.stringify(section3[0].innerOptions),
        Level: level[0],
        Control_ID: control_ID[0],
      };
      if (activeData?.length) {
        dispatch(updateSection3Questions(payload));
      } else {
        dispatch(addSection3Questions(payload));
      }
      setIsEdit(false);
      if (saveWithCloseModal) {
        setActiveData([])
        handleClose();}
    }
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

  return (
    <div>
      <CustomModal
        className="create-question-custom-modal"
        bodyClassName="create-question-popup"
        open={open}
        title={
          <span>
            <AccessTimeOutlinedIcon className="mr-3" />
            Create Questions for New MICS
          </span>
        }
        width={1080}
        onClose={handleClose}
        controlNameFromID={
          control_ID[0] ? controlNameFromControlIDState?.data[0]?.Control_name : ''
        }
      >
        <div className="select-light">
          <Form.Group className="input-group mb-3">
            <div style={{ width: '300px' }}>
              <Select
                maxMenuHeight={200}
                placeholder="Control ID * "
                value={controlIDOption}
                defaultValue={controlIDOption}
                onChange={handleChange}
                className="l-input"
                //MenuProps={MenuProps}
                //inputProps={{ 'aria-label': 'Without label' }}
                options={controlIDList}
              />
            </div>
          </Form.Group>
        </div>
        {control_ID[0] !== '' && (
          <div className="questions-list-main-wrapper">
            <CollapseFrame
              title="Section 1 : Standard "
              centerText={
                <p className="d-flex m-0 align-items-center">
                  <InfoOutlinedIcon className="mr-1" /> Standard questions will be common and
                  included in all new surveys
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
              <Section3MICSSpecific
                level={level}
                handleChangeLevel={handleChangeLevel}
                section3={section3}
                handleChangeRenderBlock={handleChangeRenderBlock}
              />
            </CollapseFrame>
            <div>
              <div>
                {showAddQuestion && !questionData.loading && (
                  <Button
                    color="secondary"
                    className="ml-2"
                    onClick={() => handleAddQuestion()}
                    disabled={!control_ID[0]}
                  >
                    Add Question
                  </Button>
                )}
              </div>
              <div className="d-flex align-items-center justify-content-end">
                <Button variant="text" color="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  color="secondary"
                  className="ml-2"
                  disabled={!control_ID[0]}
                  onClick={() => handleSaveQuestion()}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}
      </CustomModal>
    </div>
  );
};

export default CreateQuestions;

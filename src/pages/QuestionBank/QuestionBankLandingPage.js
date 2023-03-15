import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageWrapper from '../../components/wrappers/PageWrapper';
import QuestionBankBox from './QuestionBankBox/QuestionBankBox';
import './questionBankStyles.scss';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import FolderSpecialOutlinedIcon from '@mui/icons-material/FolderSpecialOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Button from '../../components/UI/Button';
import QuestionBankTable from './QuestionBankTable';
import CreateQuestions from './CreateQuestions';
import ModifyStandard from './ModifyStandard';
import { getSection1QuestionDataAction } from '../../redux/QuestionBank/QuestionBankAction';

const QuestionBank = () => {
  const [openCreateQuestions, setOpenCreateQuestions] = useState(false);
  const [openModifyStandard, setOpenModifyStandard] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    let payload = {
      controlId : "Standard"
    }
    dispatch(getSection1QuestionDataAction(payload))
  }, [])
  const handleOpenCreateQuestions = () => {
    setOpenCreateQuestions(true);
  };
  const handleCloseCreateQuestions = () => {
    setOpenCreateQuestions(false);
  };
  const handleOpenModifyStandard = () => {
    setOpenModifyStandard(true);
  };
  const handleCloseModifyStandard = () => {
    setOpenModifyStandard(false);
  };

  return (
    <PageWrapper>
      <div className="container py-5">
        <div className="row py-3">
          <div className="col-lg-5 py-4">
            <QuestionBankBox
              title="Create Questions for New MICS"
              description="Define MICS-Specific questions to create a new survey."
            >
              <Button
                variant="outlined"
                size="large"
                startIcon={<NoteAddOutlinedIcon />}
                onClick={handleOpenCreateQuestions}
              >
                <span className="text-white">Create MICS-Specific</span>
              </Button>
            </QuestionBankBox>
          </div>

          <div className="col-lg-7 py-4">
            <QuestionBankBox
              title="Modify Questions for Existing MICS"
              description="Add, delete, edit, and rearrange questions for any existing assessments."
            >
              <Button
                variant="outlined"
                size="large"
                startIcon={<DescriptionOutlinedIcon />}
                className="mr-4"
                onClick={handleOpenModifyStandard}
              >
                <span className="text-white">Modify Standard</span>
              </Button>
              <Button variant="outlined" size="large" startIcon={<FolderSpecialOutlinedIcon />}>
                <span className="text-white">Modify MICS-Specific</span>
              </Button>
            </QuestionBankBox>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <QuestionBankTable />
          </div>
        </div>

        <CreateQuestions open={openCreateQuestions} handleClose={handleCloseCreateQuestions} />
        <ModifyStandard open={openModifyStandard} handleClose={handleCloseModifyStandard} />
      </div>
    </PageWrapper>
  );
};

export default QuestionBank;
